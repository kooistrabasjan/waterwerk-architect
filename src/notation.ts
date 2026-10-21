import type {ElementType,RelationType} from './model';
/** Stylized vector pictograms, inspired by ArchiMate categories (not certified official artwork). */
export const glyphPaths:Record<ElementType,string>={
 BusinessActor:'M12 4a4 4 0 1 1 0 8a4 4 0 0 1 0-8 M4 23v-3a8 8 0 0 1 16 0v3',
 BusinessRole:'M12 3l8 5v13H4V8z M8 11h8 M8 15h8',
 BusinessProcess:'M5 8h14l-4-4 M19 8l-4 4 M19 16H5l4-4 M5 16l4 4',
 BusinessService:'M4 14a8 8 0 0 1 16 0 M4 14v5h16v-5',
 BusinessObject:'M5 3h10l4 4v14H5z M15 3v5h4 M8 12h8 M8 16h8',
 ApplicationComponent:'M5 4h15v16H5z M2 8h6v4H2z M2 15h6v4H2z',
 ApplicationService:'M4 14a8 8 0 0 1 16 0 M4 14v5h16v-5 M10 16h4',
 DataObject:'M5 3h10l4 4v14H5z M15 3v5h4 M8 12h8',
 Node:'M7 3h10l5 9-5 9H7l-5-9z',
 Device:'M3 5h18v12H3z M8 21h8 M12 17v4',
 SystemSoftware:'M4 4h16v16H4z M4 9h16 M8 6h1 M12 6h1 M7 13h10 M7 16h7',
 TechnologyService:'M4 14a8 8 0 0 1 16 0 M4 14v5h16v-5 M8 16h8',
 Goal:'M4 12a8 8 0 1 0 16 0a8 8 0 1 0-16 0 M8 12h8 M12 8v8',
 Requirement:'M5 3h14v18H5z M8 12l3 3 5-6'
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
