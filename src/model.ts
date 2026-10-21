export const types=['BusinessActor','BusinessRole','BusinessProcess','BusinessService','BusinessObject','ApplicationComponent','ApplicationService','DataObject','Node','Device','SystemSoftware','TechnologyService','Goal','Requirement'] as const;
export type ElementType=typeof types[number];
export const relationships=['Assignment','Serving','Access','Realization','Triggering','Flow','Association','Composition','Aggregation','Influence'] as const;
export type RelationType=typeof relationships[number];
export type Element={id:string;type:ElementType;name:string;x?:number;y?:number};
export type Side='top'|'right'|'bottom'|'left';
export type Relation={id:string;type:RelationType;source:string;target:string;sourceHandle?:string;targetHandle?:string;sourceText?:string;reviewStatus?:'proposed'|'approved'|'rejected'};
export type Grouping={id:string;name:string;elementIds:string[];padding?:number};
export type Model={title:string;elements:Element[];relations:Relation[];assumptions:string[];groups?:Grouping[]};
export function validate(m:Model){
  const errors:string[]=[];
  const ids=new Set<string>();
  for(const e of m.elements){
    if(!types.includes(e.type))errors.push('Ongeldig elementtype: '+e.type);
    if(!e.name.trim())errors.push('Elementnaam ontbreekt');
    if(!e.id.trim()||ids.has(e.id))errors.push('Ontbrekende of dubbele element-ID: '+e.id);
    ids.add(e.id);
  }
  const relationIds=new Set<string>();
  for(const r of m.relations){
    if(!relationships.includes(r.type))errors.push('Ongeldig relatietype: '+r.type);
    if(!r.id.trim()||relationIds.has(r.id))errors.push('Ontbrekende of dubbele relatie-ID: '+r.id);
    relationIds.add(r.id);
    if(r.reviewStatus&&!['proposed','approved','rejected'].includes(r.reviewStatus))errors.push('Ongeldige beoordelingsstatus');
    if(r.sourceHandle&&!/^s-(left|right|top|bottom)$/.test(r.sourceHandle))errors.push('Ongeldig bronaansluitpunt');
    if(r.targetHandle&&!/^t-(left|right|top|bottom)$/.test(r.targetHandle))errors.push('Ongeldig doelaansluitpunt');
    if(!ids.has(r.source)||!ids.has(r.target)){errors.push('Relatie verwijst naar een onbekend element');continue;}
    if(r.source===r.target)errors.push('Zelfrelatie niet toegestaan in deze editor');
    const source=m.elements.find(e=>e.id===r.source)!;
    const target=m.elements.find(e=>e.id===r.target)!;
    if(r.type==='Access'&&!['BusinessObject','DataObject'].includes(target.type))errors.push('Access moet naar een object wijzen');
    if(r.type==='Serving'&&['BusinessObject','DataObject'].includes(source.type))errors.push('Serving kan niet vanuit een passief object starten');
    if(r.type==='Triggering'&&['BusinessObject','DataObject'].includes(source.type))errors.push('Triggering kan niet vanuit een passief object starten');
  }
  for(const g of m.groups??[]){if(!g.name.trim())errors.push('Groepsnaam ontbreekt');if(g.padding!==undefined&&(!Number.isFinite(g.padding)||g.padding<15||g.padding>150))errors.push('Groepsmarge moet tussen 15 en 150 pixels liggen');for(const id of g.elementIds){if(!ids.has(id))errors.push('Groep verwijst naar onbekend element: '+id);}}
  return errors;
}
export function color(t:ElementType){return t.startsWith('Application')||t==='DataObject'?'#d5ebff':t.startsWith('Business')?'#fff0b7':t==='Goal'||t==='Requirement'?'#eadafa':'#d8f1d7'}
