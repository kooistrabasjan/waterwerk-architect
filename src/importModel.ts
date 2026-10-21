import {types,relationships,validate,type Model} from './model';

export function parseModelJson(content:string):Model{
  const parsed:unknown=JSON.parse(content);
  if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))throw Error('JSON bevat geen modelobject');
  const obj=parsed as Record<string,unknown>;
  if(typeof obj.title!=='string'||!Array.isArray(obj.elements)||!Array.isArray(obj.relations)||!Array.isArray(obj.assumptions)||!obj.assumptions.every(x=>typeof x==='string'))throw Error('Verplichte modelvelden ontbreken of hebben een onjuist type');
  if(obj.groups!==undefined&&!Array.isArray(obj.groups))throw Error('Groupings moeten een lijst zijn');
  for(const e of obj.elements){if(!e||typeof e!=='object'||typeof e.id!=='string'||typeof e.name!=='string'||!types.includes(e.type))throw Error('Ongeldig element in JSON');if((e.x!==undefined&&!Number.isFinite(e.x))||(e.y!==undefined&&!Number.isFinite(e.y)))throw Error('Ongeldige elementpositie');}
  for(const r of obj.relations){if(!r||typeof r!=='object'||typeof r.id!=='string'||typeof r.source!=='string'||typeof r.target!=='string'||!relationships.includes(r.type))throw Error('Ongeldige relatie in JSON');if((r.sourceHandle!==undefined&&typeof r.sourceHandle!=='string')||(r.targetHandle!==undefined&&typeof r.targetHandle!=='string'))throw Error('Ongeldig aansluitpunt');}
  for(const g of (obj.groups??[]) as unknown[]){if(!g||typeof g!=='object')throw Error('Ongeldige grouping');const v=g as Record<string,unknown>;if(typeof v.id!=='string'||typeof v.name!=='string'||!Array.isArray(v.elementIds)||!v.elementIds.every(x=>typeof x==='string'))throw Error('Ongeldige groupingvelden');}
  const model=parsed as Model;
  const errors=validate(model);
  if(errors.length)throw Error(errors.join('; '));
  return model;
}
