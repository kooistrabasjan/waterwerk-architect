import {type Model,validate} from './model';

const NS='http://www.opengroup.org/xsd/archimate/3.0/';
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
/**
 * Model-only Exchange Format export (3.1 exchange schema for ArchiMate 3.2).
 * Diagram positions and viewpoints are deliberately not included yet.
 * XSD validation and Archi interoperability still need independent verification.
 */
export function archimateXml(model:Model):string{
 const problems=validate(model);
 if(problems.length)throw new Error('Model kan niet worden geëxporteerd: '+problems.join('; '));
 const ids=new Map(model.elements.map((e,i)=>[e.id,'ww-e-'+(i+1)]));
 const els=model.elements.map(e=>`    <element identifier="${ids.get(e.id)}" xsi:type="${esc(e.type)}"><name xml:lang="nl">${esc(e.name)}</name></element>`).join('\n');
 const rels=model.relations.map((r,i)=>`    <relationship identifier="ww-r-${i+1}" xsi:type="${esc(r.type)}" source="${ids.get(r.source)}" target="${ids.get(r.target)}"/>`).join('\n');
 return `<?xml version="1.0" encoding="UTF-8"?>\n<model xmlns="${NS}" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" identifier="ww-model" version="3.2">\n  <name xml:lang="nl">${esc(model.title)}</name>\n  <elements>\n${els}\n  </elements>${model.relations.length?`\n  <relationships>\n${rels}\n  </relationships>`:''}\n</model>\n`;
}
