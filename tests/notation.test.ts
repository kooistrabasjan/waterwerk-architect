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
