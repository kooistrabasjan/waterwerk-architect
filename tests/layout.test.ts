import {describe,it,expect} from 'vitest';
import {layoutModel,layerFor} from '../src/layout';
import type {Model} from '../src/model';
describe('ELK automatische indeling',()=>{
 it('behoudt IDs en relaties en kent posities toe',async()=>{
  const model:Model={title:'Test',elements:[{id:'a',type:'BusinessRole',name:'Rol'},{id:'b',type:'ApplicationComponent',name:'Systeem'}],relations:[{id:'r',type:'Serving',source:'b',target:'a'}],assumptions:[]};
  const laidOut=await layoutModel(model);
  expect(laidOut.elements.map(e=>e.id)).toEqual(['a','b']);
  expect(laidOut.relations).toEqual(model.relations);
  expect(laidOut.elements.every(e=>Number.isFinite(e.x)&&Number.isFinite(e.y))).toBe(true);
  expect(laidOut.elements[0].y).toBeLessThan(laidOut.elements[1].y!);
 });
 it('verdeelt lagen in aparte horizontale banen zonder overlap',async()=>{const model:Model={title:'Gelaagd',elements:[{id:'t',type:'Device',name:'Sensor'},{id:'a',type:'ApplicationComponent',name:'Systeem'},{id:'b',type:'BusinessProcess',name:'Proces'},{id:'m',type:'Goal',name:'Doel'},{id:'d',type:'DataObject',name:'Gegevens'},{id:'r',type:'BusinessRole',name:'Rol'}],relations:[],assumptions:[]};const actual=await layoutModel(model);const y=(id:string)=>actual.elements.find(e=>e.id===id)!.y!;expect(y('m')).toBeLessThan(y('b'));expect(y('b')).toBeLessThan(y('a'));expect(y('a')).toBeLessThan(y('t'));expect(Math.abs(y('d')-y('a'))).toBeLessThan(125);expect(Math.abs(y('r')-y('b'))).toBeLessThan(125);expect(layerFor('DataObject')).toBe('Applicatie');});
 it('laat lege modellen intact',async()=>{
  const empty:Model={title:'Leeg',elements:[],relations:[],assumptions:[]};
  expect(await layoutModel(empty)).toEqual(empty);
 });
});
