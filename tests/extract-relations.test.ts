import {describe,it,expect} from 'vitest';
import {extract} from '../src/extract';
import {validate} from '../src/model';
describe('documentherkenning met onderlinge relaties',()=>{
 it('herkent de relatie tussen zaaksysteem en vergunningaanvraag',()=>{
  const m=extract('Het zaaksysteem registreert de vergunningaanvraag.','Vergunningverlening');
  expect(m.elements).toHaveLength(2);
  expect(m.relations).toMatchObject([{type:'Access'}]);
  expect(m.relations[0].reviewStatus).toBe('proposed');
  expect(m.relations[0].sourceText).toBe('Het zaaksysteem registreert de vergunningaanvraag');
  expect(validate(m)).toEqual([]);
 });
 it('tekent geen relaties tussen alleen opgesomde namen',()=>{
  const m=extract('Wij werken met een zaaksysteem, telemetriesysteem en vergunningaanvraag.','Lijst');
  expect(m.relations).toHaveLength(0);
 });
 it('tekent geen relaties bij slechts één herkend element',()=>{
  const m=extract('Inspecteurs voeren inspecties uit.','Inspectie');
  expect(validate(m)).toEqual([]);
 });
});
