import {useCallback,useState} from 'react';
import type {Model} from './model';

type Timeline={past:Model[];present:Model;future:Model[]};
export function useModelHistory(initial:Model){
 const [timeline,setTimeline]=useState<Timeline>({past:[],present:initial,future:[]});
 const setModel=useCallback((change:Model|((old:Model)=>Model))=>{
  setTimeline(h=>{
   const next=typeof change==='function'?(change as (old:Model)=>Model)(h.present):change;
   if(next===h.present)return h;
   return {past:[...h.past.slice(-49),h.present],present:next,future:[]};
  });
 },[]);
 const undo=useCallback(()=>setTimeline(h=>h.past.length?{
  past:h.past.slice(0,-1),present:h.past[h.past.length-1],future:[h.present,...h.future]
 }:h),[]);
 const redo=useCallback(()=>setTimeline(h=>h.future.length?{
  past:[...h.past,h.present],present:h.future[0],future:h.future.slice(1)
 }:h),[]);
 return {model:timeline.present,setModel,undo,redo,canUndo:timeline.past.length>0,canRedo:timeline.future.length>0};
}
