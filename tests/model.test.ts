import {describe,it,expect} from 'vitest';import {validate} from '../src/model';import {extract} from '../src/extract';import {examples} from '../src/examples';describe('basisvalidatie',()=>{it('heeft drie voorbeelden',()=>expect(Object.keys(examples)).toHaveLength(3));it('herkent expliciete termen',()=>expect(extract(examples.Peilbeheer,'Peilbeheer').elements.some(e=>e.name==='Telemetriesysteem')).toBe(true));it('wijst ontbrekend relatiedoel af',()=>expect(validate({title:'x',elements:[],relations:[{id:'r',type:'Serving',source:'a',target:'b'}],assumptions:[]}).length).toBeGreaterThan(0))});


describe('referentiële modelintegriteit',()=>{
  it('wijst dubbele element-ID's af',()=>{
    expect(validate({title:'x',elements:[{id:'e1',type:'BusinessRole',name:'A'},{id:'e1',type:'BusinessRole',name:'B'}],relations:[],assumptions:[]})).toContain('Ontbrekende of dubbele element-ID: e1');
  });
  it('wijst ongeldige typen af, ook bij ongeldige JSON',()=>{
    expect(validate({title:'x',elements:[{id:'e1',type:'FantasieType' as never,name:'A'}],relations:[],assumptions:[]}).some(x=>x.includes('Ongeldig elementtype'))).toBe(true);
  });
  it('wijst Access naar actieve component af',()=>{
    const model={title:'x',elements:[{id:'a',type:'BusinessRole' as const,name:'Gebruiker'},{id:'b',type:'ApplicationComponent' as const,name:'Systeem'}],relations:[{id:'r',type:'Access' as const,source:'a',target:'b'}],assumptions:[]};
    expect(validate(model).some(x=>x.includes('Access'))).toBe(true);
  });
});
