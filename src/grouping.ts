import type {Model} from './model';

/** Move all members of a visual grouping; semantic relations remain unchanged. */
export function moveGrouping(model:Model,groupId:string,dx:number,dy:number):Model{
 const group=model.groups?.find(g=>g.id===groupId);
 if(!group||!Number.isFinite(dx)||!Number.isFinite(dy)||(dx===0&&dy===0))return model;
 const members=new Set(group.elementIds);
 return {...model,elements:model.elements.map((e,i)=>{
   if(!members.has(e.id))return e;
   return {...e,x:(e.x??(i%3)*270)+dx,y:(e.y??Math.floor(i/3)*140)+dy};
 })};
}
