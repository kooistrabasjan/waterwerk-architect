import {describe,it,expect} from 'vitest';
import {layoutModel} from '../src/layout';
import type {Model} from '../src/model';
describe('ELK automatische indeling',()=>{
 it('behoudt IDs en relaties en kent posities toe',async()=>{
  const model:Model={title:'Test',elements:[{id:'a',type:'BusinessRole',name:'Rol'},{id:'b',type:'ApplicationComponent',name:'Systeem'}],relations:[{id:'r',type:'Serving',source:'b',target:'a'}],assumptions:[]};
  const laidOut=await layoutModel(model);
  expect(laidOut.elements.map(e=>e.id)).toEqual(['a','b']);
  expect(laidOut.relations).toEqual(model.relations);
  expect(laidOut.elements.every(e=>Number.isFinite(e.x)&&Number.isFinite(e.y))).toBe(true);
  expect(laidOut.elements[0].x).not.toBe(laidOut.elements[1].x);
 });
 it('laat lege modellen intact',async()=>{
  const empty:Model={title:'Leeg',elements:[],relations:[],assumptions:[]};
  expect(await layoutModel(empty)).toEqual(empty);
 });
});
