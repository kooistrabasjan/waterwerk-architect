import ELK from 'elkjs/lib/elk.bundled.js';
import type {ElementType,Model} from './model';

const elk=new ELK();
export type ArchitectureLayer='Motivatie'|'Business'|'Applicatie'|'Technologie';
export const layerOrder:ArchitectureLayer[]=['Motivatie','Business','Applicatie','Technologie'];
export function layerFor(type:ElementType):ArchitectureLayer{
 if(type==='Goal'||type==='Requirement')return 'Motivatie';
 if(type.startsWith('Business'))return 'Business';
 if(type.startsWith('Application')||type==='DataObject')return 'Applicatie';
 return 'Technologie';
}
/** Horizontale banen in een vaste architectuurlogische volgorde.
 * ELK bepaalt binnen elke baan de volgorde en vermindert kruisingen.
 * Een baan krijgt zijn eigen y-bereik zodat lagen nooit overlappen. */
export async function layoutModel(model:Model):Promise<Model>{
 if(!model.elements.length)return model;
 const positions=new Map<string,{x:number;y:number}>();
 let top=30;
 for(const layer of layerOrder){
  const members=model.elements.filter(e=>layerFor(e.type)===layer);
  if(!members.length)continue;
  const ids=new Set(members.map(e=>e.id));
  const graph=await elk.layout({
   id:'layer-'+layer,
   layoutOptions:{'elk.algorithm':'layered','elk.direction':'RIGHT','elk.spacing.nodeNode':'65','elk.layered.spacing.nodeNodeBetweenLayers':'95','elk.edgeRouting':'ORTHOGONAL'},
   children:members.map(e=>({id:e.id,width:215,height:90})),
   edges:model.relations.filter(r=>ids.has(r.source)&&ids.has(r.target)).map(r=>({id:r.id,sources:[r.source],targets:[r.target]}))
  });
  const nodes=graph.children??[];
  const minX=Math.min(...nodes.map(n=>n.x??0));
  const minY=Math.min(...nodes.map(n=>n.y??0));
  const height=Math.max(...nodes.map(n=>(n.y??0)-minY+90));
  for(const node of nodes)positions.set(node.id,{x:50+(node.x??0)-minX,y:top+(node.y??0)-minY});
  top+=height+125;
 }
 return {...model,elements:model.elements.map(e=>({...e,...positions.get(e.id)}))};
}

/** Default connection directions that follow vertical architectural bands. */
export function defaultLayerHandles(model:Model,sourceId:string,targetId:string){
 const from=model.elements.find(e=>e.id===sourceId),to=model.elements.find(e=>e.id===targetId);
 if(!from||!to)return {sourceHandle:'s-right',targetHandle:'t-left'};
 const a=layerOrder.indexOf(layerFor(from.type)),b=layerOrder.indexOf(layerFor(to.type));
 return a<b?{sourceHandle:'s-bottom',targetHandle:'t-top'}:a>b?{sourceHandle:'s-top',targetHandle:'t-bottom'}:{sourceHandle:'s-right',targetHandle:'t-left'};
}
