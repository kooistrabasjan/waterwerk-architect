import {describe,it,expect} from 'vitest';
import {parseModelJson} from '../src/importModel';
import type {Model} from '../src/model';
const example:Model={title:'Test',elements:[{id:'a',type:'BusinessRole',name:'Rol',x:10,y:20}],relations:[],groups:[{id:'g',name:'Groep',elementIds:['a']}],assumptions:[]};
describe('JSON-modellen importeren',()=>{
 it('behoudt groupings en coordinaten',()=>expect(parseModelJson(JSON.stringify(example))).toEqual(example));
 it('weigert onbekende groepsleden',()=>expect(()=>parseModelJson(JSON.stringify({...example,groups:[{id:'g',name:'Groep',elementIds:['onbekend']}]}))).toThrow());
});
