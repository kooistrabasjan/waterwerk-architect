import {describe,it,expect} from 'vitest';
import {validate,type Model} from '../src/model';
const original:Model={title:'Aansluitpunten',elements:[{id:'a',type:'ApplicationComponent',name:'A'},{id:'b',type:'ApplicationComponent',name:'B'}],relations:[{id:'r',type:'Serving',source:'a',target:'b',sourceHandle:'s-bottom',targetHandle:'t-top'}],assumptions:[]};
describe('vierzijdige verbindingen',()=>{
 it('accepteert top en bottom',()=>expect(validate(original)).toEqual([]));
 it('wijst onbekende bronzijde af',()=>expect(validate({...original,relations:[{...original.relations[0],sourceHandle:'s-middle'}]})).toContain('Ongeldig bronaansluitpunt'));
 it('wijst onbekende doelzijde af',()=>expect(validate({...original,relations:[{...original.relations[0],targetHandle:'t-middle'}]})).toContain('Ongeldig doelaansluitpunt'));
});
