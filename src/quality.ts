import type {Model} from './model';
export type QualityIssue={code:'isolated'|'duplicate'|'pending'|'rejected'|'unconnected-layer';severity:'info'|'warning';message:string;elementId?:string;relationId?:string};
export function checkModelQuality(model:Model):QualityIssue[]{
 const issues:QualityIssue[]=[];
 const connected=new Set(model.relations.filter(r=>r.reviewStatus!=='rejected').flatMap(r=>[r.source,r.target]));
 for(const e of model.elements)if(!connected.has(e.id))issues.push({code:'isolated',severity:'warning',elementId:e.id,message:'Element zonder actieve relaties: '+e.name});
 const seen=new Map<string,string>();
 for(const r of model.relations){
  const key=[r.source,r.target,r.type].join('|');
  const earlier=seen.get(key);
  if(earlier)issues.push({code:'duplicate',severity:'warning',relationId:r.id,message:'Mogelijk dubbele relatie ('+r.type+'), ook aanwezig als '+earlier});
  else seen.set(key,r.id);
  if(r.reviewStatus==='proposed')issues.push({code:'pending',severity:'info',relationId:r.id,message:'Relatie wacht op beoordeling: '+r.type});
  if(r.reviewStatus==='rejected')issues.push({code:'rejected',severity:'info',relationId:r.id,message:'Afgewezen relatie blijft in het model: '+r.type});
 }
 const business=model.elements.filter(e=>e.type.startsWith('Business')).map(e=>e.id);
 const apps=new Set(model.elements.filter(e=>e.type.startsWith('Application')||e.type==='DataObject').map(e=>e.id));
 if(business.length&&apps.size&&!model.relations.some(r=>r.reviewStatus!=='rejected'&&((business.includes(r.source)&&apps.has(r.target))||(business.includes(r.target)&&apps.has(r.source)))))
  issues.push({code:'unconnected-layer',severity:'warning',message:'Business- en Applicatielaag hebben geen actieve onderlinge verbinding'});
 return issues;
}
