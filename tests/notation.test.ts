import {describe,it,expect} from 'vitest';
import {glyphPaths,glyphSvg} from '../src/notation';
import {types} from '../src/model';
import {ARCHI_ICONS,officialIconSvg} from '../src/ArchiIcons';
import {svg} from '../src/export';
describe('vector notation',()=>{
 it('has an Archi source definition for all supported elements',()=>{for(const t of types){expect(ARCHI_ICONS[t]).toBeDefined();expect(officialIconSvg(t,0,0)).toContain('<svg');}});
 it('provides a path for every supported element',()=>{for(const t of types){expect(glyphPaths[t].length).toBeGreaterThan(8);expect(glyphSvg(t,5,6)).toContain('<path d=');}});
 it('renders matching symbols in SVG diagrams',()=>{const output=svg({title:'View',elements:[{id:'a',type:'ApplicationComponent',name:'Applicatie'}],relations:[],assumptions:[]});expect(output).toContain('svg');expect(output).toContain('Applicatie');expect(output).toContain('Applicatie');});
});

import type {Model} from '../src/model';
describe('ArchiMate relatienotatie',()=>{it('tekent source-markers voor structuurrelaties',()=>{const m:Model={title:'Test',elements:[{id:'a',type:'ApplicationComponent',name:'Geheel'},{id:'b',type:'ApplicationComponent',name:'Deel'}],relations:[{id:'c',type:'Composition',source:'a',target:'b'},{id:'d',type:'Aggregation',source:'a',target:'b'},{id:'e',type:'Assignment',source:'a',target:'b'}],assumptions:[]};const x=svg(m);expect(x).toContain('marker-start="url(#filled-diamond)"');expect(x).toContain('marker-start="url(#open-diamond)"');expect(x).toContain('marker-start="url(#assignment-dot)"');});});

import {lineStyle} from '../src/notation';
describe('relatie-eindpunten volgens notatie',()=>{it('gebruikt holle driehoek bij Realization',()=>{expect(lineStyle('Realization').end).toBe('triangle');expect(lineStyle('Realization').dash).toBeTruthy();});it('gebruikt gevulde pijl bij Triggering en Flow',()=>{expect(lineStyle('Triggering').end).toBe('filled');expect(lineStyle('Flow').end).toBe('filled');});it('Access heeft niet automatisch een richting',()=>{expect(lineStyle('Access').end).toBeUndefined()});});
