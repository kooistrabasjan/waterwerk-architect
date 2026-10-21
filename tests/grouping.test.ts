import {describe,it,expect} from 'vitest';
import {moveGrouping} from '../src/grouping';
import type {Model} from '../src/model';

const model:Model={
 title:'Waterschap',assumptions:[],
 elements:[
  {id:'a',type:'BusinessRole',name:'Peilbeheerder'},
  {id:'b',type:'ApplicationComponent',name:'Telemetrie',x:100,y:200},
  {id:'c',type:'DataObject',name:'Waterstand',x:500,y:400}
 ],
 relations:[{id:'r',type:'Serving',source:'b',target:'a'}],
 groups:[{id:'g',name:'Peilbeheer',elementIds:['a','b']}]
};
describe('groepsverplaatsing',()=>{
 it('verplaatst uitsluitend groepsleden zonder relaties te wijzigen',()=>{
  const next=moveGrouping(model,'g',30,60);
  expect(next.elements[0]).toMatchObject({x:30,y:60});
  expect(next.elements[1]).toMatchObject({x:130,y:260});
  expect(next.elements[2]).toEqual(model.elements[2]);
  expect(next.relations).toEqual(model.relations);
  expect(next.groups).toEqual(model.groups);
 });
 it('negeert onbekende groep of nulverplaatsing',()=>{
  expect(moveGrouping(model,'unknown',20,20)).toBe(model);
  expect(moveGrouping(model,'g',0,0)).toBe(model);
 });
});

import {validate} from '../src/model';
import {svg} from '../src/export';
describe('instelbare groepsruimte',()=>{
 it('houdt marge in model en SVG-export',()=>{
  const adjusted={...model,groups:[{id:'g',name:'Peilbeheer',elementIds:['a','b'],padding:80}]};
  expect(validate(adjusted)).toEqual([]);
  expect(svg(adjusted)).toContain('Peilbeheer');
 });
 it('wijst een negatieve marge af',()=>{
  const wrong={...model,groups:[{id:'g',name:'Peilbeheer',elementIds:['a'],padding:-4}]};
  expect(validate(wrong).length).toBeGreaterThan(0);
 });
});
