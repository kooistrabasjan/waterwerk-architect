import {validate,type ElementType,type Model,type RelationType} from './model';
// Regelgebaseerde herkenning, zonder externe AI. Relaties worden uitsluitend bij tekstuele aanwijzingen gelegd.
const vocabulary:[RegExp,ElementType,string][]=[
 [/peilbeheerder/i,'BusinessRole','Peilbeheerder'],[/vergunningverlener/i,'BusinessRole','Vergunningverlener'],[/inspecteurs?/i,'BusinessRole','Inspecteur'],[/onderhoudsplanners?/i,'BusinessRole','Onderhoudsplanner'],[/burgers?|organisaties?|aanvragers?/i,'BusinessActor','Aanvrager'],
 [/telemetriesysteem/i,'ApplicationComponent','Telemetriesysteem'],[/peilbeheerapplicatie/i,'ApplicationComponent','Peilbeheerapplicatie'],[/zaaksysteem/i,'ApplicationComponent','Zaaksysteem'],[/assetmanagementsysteem/i,'ApplicationComponent','Assetmanagementsysteem'],
 [/meetstations?/i,'Device','Meetstation'],[/waterstanden|waterstandgegevens/i,'DataObject','Waterstanden'],[/vergunningaanvra(?:ag|gen)/i,'BusinessObject','Vergunningaanvraag'],[/besluiten?\b/i,'BusinessObject','Besluit'],[/bevindingen/i,'BusinessObject','Inspectiebevindingen'],
 [/inspecties?|inspecteren/i,'BusinessProcess','Inspecteren'],[/onderhoudswerkzaamheden|onderhoud voorbereiden/i,'BusinessProcess','Onderhoud voorbereiden']
];
const interaction=/\b(ondersteunt|ondersteunen|gebruikt|gebruiken|registreert|registreren|verwerkt|verwerken|levert|leveren|ontvangt|ontvangen|raadpleegt|raadplegen|verzorgt|verzorgen|voert|voeren|beoordeelt|beoordelen|beheert|beheren|meet|meten|stuurt|sturen|wisselt|uitwisseling|koppeling|gekoppeld|doorsturen|beschikbaar|invoeren|inzien)\b/i;
function relationType(a:ElementType,b:ElementType):RelationType{
 if(b==='BusinessObject'||b==='DataObject')return 'Access';
 if(a==='BusinessRole'&&b==='BusinessProcess')return 'Assignment';
 if(a==='BusinessProcess'&&b==='BusinessProcess')return 'Triggering';
 if(a==='ApplicationComponent'&&b==='BusinessProcess')return 'Serving';
 if(a==='ApplicationComponent'&&b==='ApplicationComponent')return 'Flow';
 if(a==='BusinessRole'&&b==='ApplicationComponent')return 'Serving';
 return 'Association';
}
export function extract(source:string,title:string):Model{
 const detected=vocabulary.map(([pattern,type,name],i)=>({pattern,type,name,id:'e'+i})).filter(item=>item.pattern.test(source));
 const elements=detected.map(({id,type,name})=>({id,type,name}));
 const relations:Model['relations']=[];
 const seen=new Set<string>();
 // Alleen woorden in dezelfde zin én een concreet interactiewerkwoord vormen een relatiekandidaat.
 const sentences=source.split(/[.!?\n]+/).map(s=>s.trim()).filter(Boolean);
 for(const sentence of sentences){
  if(!interaction.test(sentence))continue;
  const mentioned=detected.flatMap(e=>{const match=e.pattern.exec(sentence);return match?[{...e,position:match.index}]:[]}).sort((a,b)=>a.position-b.position);
  for(let i=0;i<mentioned.length-1;i++){
   const a=mentioned[i],b=mentioned[i+1];
   if(a.id===b.id)continue;
   // Kies de relatie alleen als de interactie ook daadwerkelijk tussen de twee termen staat.
   const between=sentence.slice(a.position+a.name.length,b.position);
   const suffix=sentence.slice(b.position);
   if(!interaction.test(between)&&!(mentioned.length===2&&interaction.test(suffix)))continue;
   const type=relationType(a.type,b.type);
   // Bij Serving vanuit een rol richting applicatie de richting omkeren:
   const reverse=type==='Serving'&&a.type==='BusinessRole'&&b.type==='ApplicationComponent';
   const from=reverse?b:a,to=reverse?a:b;
   const key=from.id+'|'+to.id+'|'+type;
   if(seen.has(key))continue;
   seen.add(key);
   relations.push({id:'r'+relations.length,source:from.id,target:to.id,type});
  }
 }
 const draft:Model={title,elements,relations,assumptions:[]};
 const errors=validate(draft);
 if(errors.length){const validRelations=relations.filter(r=>validate({...draft,relations:[r]}).length===0);return {...draft,relations:validRelations,assumptions:errors.map(error=>'Niet automatisch overgenomen: '+error)};}
 return draft;
}
