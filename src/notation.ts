import type {ElementType,RelationType} from './model';
export const symbol:Record<ElementType,string>={
 BusinessActor:'♟',BusinessRole:'◉',BusinessProcess:'↻',BusinessService:'⌒',BusinessObject:'▤',
 ApplicationComponent:'▣',ApplicationService:'⌒',DataObject:'▤',Node:'⬡',Device:'▥',
 SystemSoftware:'▦',TechnologyService:'⌒',Goal:'⚑',Requirement:'☑'
};
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
