import {describe,it,expect} from 'vitest';
import {archimateXml} from '../src/archimateXml';
import type {Model} from '../src/model';
const model:Model={title:'Peilbeheer & waterstanden',elements:[{id:'one',type:'BusinessRole',name:'Peilbeheerder'},{id:'two',type:'DataObject',name:'Waterstand <actueel>'}],relations:[{id:'r1',type:'Access',source:'one',target:'two'}],assumptions:[]};
describe('ArchiMate XML (model-only)',()=>{
 it('serialiseert elementen, relaties en referenties',()=>{
  const xml=archimateXml(model);
  expect(xml).toContain('http://www.opengroup.org/xsd/archimate/3.0/');
  expect(xml).toContain('xsi:type="BusinessRole"');
  expect(xml).toContain('source="ww-e-1" target="ww-e-2"');
  expect(xml).toContain('Peilbeheer &amp; waterstanden');
  expect(xml).toContain('Waterstand &lt;actueel&gt;');
 });
 it('blokkeert ongeldige relaties voor export',()=>{
  expect(()=>archimateXml({...model,relations:[{id:'r',type:'Access',source:'one',target:'missing'}]})).toThrow();
 });
 it('blijft expliciet model-only',()=>expect(archimateXml(model)).not.toContain('<views>'));
});
