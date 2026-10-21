import {describe,it,expect} from 'vitest';
import {checkModelQuality} from '../src/quality';
import type {Model} from '../src/model';
const model:Model={title:'Test',elements:[{id:'a',type:'BusinessProcess',name:'Proces'},{id:'b',type:'ApplicationComponent',name:'Systeem'},{id:'c',type:'DataObject',name:'Gegevens'}],relations:[{id:'r1',type:'Serving',source:'b',target:'a',reviewStatus:'proposed'},{id:'r2',type:'Serving',source:'b',target:'a',reviewStatus:'approved'}],assumptions:[]};
describe('modelkwaliteitscontrole',()=>{
 it('herkent losse elementen, dubbelingen en openstaande beoordelingen',()=>{const issues=checkModelQuality(model);expect(issues.some(i=>i.code==='isolated'&&i.elementId==='c')).toBe(true);expect(issues.some(i=>i.code==='duplicate'&&i.relationId==='r2')).toBe(true);expect(issues.some(i=>i.code==='pending'&&i.relationId==='r1')).toBe(true);});
 it('negeert afgewezen relaties bij actieve verbindingen',()=>{const m:Model={...model,relations:[{...model.relations[0],reviewStatus:'rejected'}]};const issues=checkModelQuality(m);expect(issues.filter(i=>i.code==='isolated')).toHaveLength(3);expect(issues.some(i=>i.code==='unconnected-layer')).toBe(true);});
 it('geeft geen signalen voor geldig gekoppelde en goedgekeurde twee-elementen-view',()=>{const m:Model={...model,elements:model.elements.slice(0,2),relations:[{...model.relations[0],reviewStatus:'approved'}]};expect(checkModelQuality(m)).toEqual([]);});
});