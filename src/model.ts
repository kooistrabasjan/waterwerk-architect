export const types=['BusinessActor','BusinessRole','BusinessProcess','BusinessService','BusinessObject','ApplicationComponent','ApplicationService','DataObject','Node','Device','SystemSoftware','TechnologyService','Goal','Requirement'] as const;
export type ElementType=typeof types[number];
export const relationships=['Assignment','Serving','Access','Realization','Triggering','Flow','Association','Composition','Aggregation','Influence'] as const;
export type RelationType=typeof relationships[number];
export type Element={id:string;type:ElementType;name:string;x?:number;y?:number};
export type Relation={id:string;type:RelationType;source:string;target:string};
export type Model={title:string;elements:Element[];relations:Relation[];assumptions:string[]};
export function validate(m:Model){const errors:string[]=[];const ids=new Set(m.elements.map(e=>e.id));for(const e of m.elements){if(!types.includes(e.type))errors.push('Ongeldig elementtype');if(!e.name.trim())errors.push('Elementnaam ontbreekt')}for(const r of m.relations){if(!relationships.includes(r.type))errors.push('Ongeldig relatietype');if(!ids.has(r.source)||!ids.has(r.target))errors.push('Relatie verwijst naar een onbekend element');if(r.source===r.target)errors.push('Zelfrelatie niet toegestaan');if(r.type==='Access'&&!['BusinessObject','DataObject'].includes(m.elements.find(e=>e.id===r.target)?.type||''))errors.push('Access moet naar een object wijzen')}return errors}
export function color(t:ElementType){return t.startsWith('Application')||t==='DataObject'?'#d5ebff':t.startsWith('Business')?'#fff0b7':t==='Goal'||t==='Requirement'?'#eadafa':'#d8f1d7'}
