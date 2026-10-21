import ELK from 'elkjs/lib/elk.bundled.js';
import type {Model} from './model';

const elk=new ELK();
export async function layoutModel(model:Model):Promise<Model>{
 if(model.elements.length===0)return model;
 const graph=await elk.layout({
  id:'root',
  layoutOptions:{'elk.algorithm':'layered','elk.direction':'RIGHT','elk.spacing.nodeNode':'60','elk.layered.spacing.nodeNodeBetweenLayers':'100','elk.edgeRouting':'ORTHOGONAL'},
  children:model.elements.map(e=>({id:e.id,width:215,height:90})),
  edges:model.relations.map(r=>({id:r.id,sources:[r.source],targets:[r.target]}))
 });
 const positions=new Map((graph.children||[]).map(n=>[n.id,{x:n.x??0,y:n.y??0}]));
 return {...model,elements:model.elements.map(e=>({...e,...positions.get(e.id)}))};
}
