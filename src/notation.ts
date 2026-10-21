import type {ElementType,RelationType} from './model';
/** ArchiMate 3.2-style geometry adapted from MIT-licensed Archi figure icon implementations.\n * Source: archimatetool/archi and ThomasRohde/archi-online src/canvas/figures/icons.tsx.\n * Simplified SVG path translations; exact conformance still requires visual reference verification. */
export const glyphPaths:Record<ElementType,string>={
 BusinessActor:'M12 2 A3 3 0 1 1 12 8 A3 3 0 1 1 12 2 M12 8 V16 M12 16 L8 22 M12 16 L16 22 M8 12 H16',
 BusinessRole:'M5 5 C1 5 1 19 5 19 H17 M5 5 H17 M17 5 C21 5 21 19 17 19 C13 19 13 5 17 5',
 BusinessProcess:'M2 9 H12 V5 L22 12 L12 19 V15 H2 Z',
 BusinessService:'M8 6 H16 A5 5 0 0 1 21 11 V13 A5 5 0 0 1 16 18 H8 A5 5 0 0 1 3 13 V11 A5 5 0 0 1 8 6 Z',
 BusinessObject:'M3 4 H21 V20 H3 Z M3 10 H21',
 ApplicationComponent:'M5 3 H21 V21 H5 Z M2 6 H9 V9 H2 Z M2 13 H9 V16 H2 Z',
 ApplicationService:'M8 6 H16 A5 5 0 0 1 21 11 V13 A5 5 0 0 1 16 18 H8 A5 5 0 0 1 3 13 V11 A5 5 0 0 1 8 6 Z',
 DataObject:'M3 4 H21 V20 H3 Z M3 10 H21',
 Node:'M4 7 H17 V20 H4 Z M4 7 L8 3 H21 V16 L17 20 M17 7 L21 3',
 Device:'M4 4 H20 Q21 4 21 5 V15 H3 V5 Q3 4 4 4 Z M3 15 L1 20 H23 L21 15',
 SystemSoftware:'M4 5 A8 8 0 1 1 4 21 A8 8 0 1 1 4 5 M9 3 A8 8 0 0 1 20 15',
 TechnologyService:'M8 6 H16 A5 5 0 0 1 21 11 V13 A5 5 0 0 1 16 18 H8 A5 5 0 0 1 3 13 V11 A5 5 0 0 1 8 6 Z',
 Goal:'M3 12 A9 9 0 1 0 21 12 A9 9 0 1 0 3 12 M7 12 A5 5 0 1 0 17 12 A5 5 0 1 0 7 12 M10 12 A2 2 0 1 0 14 12 A2 2 0 1 0 10 12',
 Requirement:'M5 7 H21 L17 18 H1 Z'
};
export const symbol:Record<ElementType,string>={
 BusinessActor:'Actor',BusinessRole:'Role',BusinessProcess:'Process',BusinessService:'Service',BusinessObject:'Object',
 ApplicationComponent:'Component',ApplicationService:'Service',DataObject:'Data',Node:'Node',Device:'Device',
 SystemSoftware:'Software',TechnologyService:'Service',Goal:'Goal',Requirement:'Requirement'
};
export function glyphSvg(type:ElementType,x:number,y:number,size=24){
 return '<svg xmlns="http://www.w3.org/2000/svg" x="'+x+'" y="'+y+'" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="#254861" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="'+glyphPaths[type]+'"/></svg>';
}
export function lineStyle(type:RelationType):{stroke:string;dash?:string;marker?:'triangle'|'open'|'diamond'|'circle'}{
 switch(type){
 case 'Serving':return {stroke:'#425c75',marker:'open'};
 case 'Assignment':return {stroke:'#425c75',marker:'circle'};
 case 'Realization':return {stroke:'#425c75',dash:'7 4',marker:'open'};
 case 'Access':return {stroke:'#425c75',dash:'4 4',marker:'open'};
 case 'Triggering':return {stroke:'#425c75',marker:'triangle'};
 case 'Flow':return {stroke:'#425c75',dash:'6 4',marker:'triangle'};
 case 'Influence':return {stroke:'#425c75',dash:'3 4',marker:'open'};
 case 'Aggregation':return {stroke:'#425c75',marker:'diamond'};
 case 'Composition':return {stroke:'#425c75',marker:'diamond'};
 case 'Association':return {stroke:'#667b91'};
 }
}
