export type Point={x:number;y:number};
export type Box={x:number;y:number;width:number;height:number};
const eps=0.01;
function intersects(a:Point,b:Point,rect:Box){
 const minX=rect.x-12,maxX=rect.x+rect.width+12,minY=rect.y-12,maxY=rect.y+rect.height+12;
 if(Math.abs(a.y-b.y)<eps)return a.y>minY&&a.y<maxY&&Math.max(a.x,b.x)>minX&&Math.min(a.x,b.x)<maxX;
 if(Math.abs(a.x-b.x)<eps)return a.x>minX&&a.x<maxX&&Math.max(a.y,b.y)>minY&&Math.min(a.y,b.y)<maxY;
 return true;
}
function clean(points:Point[]){return points.filter((p,i)=>i===0||p.x!==points[i-1].x||p.y!==points[i-1].y);}
export function routeOrthogonal(start:Point,end:Point,obstacles:Box[]):Point[]{
 const xs=[(start.x+end.x)/2,...obstacles.flatMap(r=>[r.x-24,r.x+r.width+24]),Math.min(start.x,end.x)-35,Math.max(start.x,end.x)+35];
 const ys=[(start.y+end.y)/2,...obstacles.flatMap(r=>[r.y-24,r.y+r.height+24]),Math.min(start.y,end.y)-35,Math.max(start.y,end.y)+35];
 const options:Point[][]=[
 [start,{x:end.x,y:start.y},end],
 [start,{x:start.x,y:end.y},end],
 ...xs.map(x=>[start,{x,y:start.y},{x,y:end.y},end]),
 ...ys.map(y=>[start,{x:start.x,y},{x:end.x,y},end])
 ];
 const score=(path:Point[])=>{const segments=path.slice(1).map((p,i)=>[path[i],p] as const);const collisions=segments.reduce((acc,[a,b])=>acc+obstacles.filter(box=>intersects(a,b,box)).length,0);const distance=segments.reduce((acc,[a,b])=>acc+Math.abs(a.x-b.x)+Math.abs(a.y-b.y),0);return collisions*100000+distance+(path.length-2)*12;};
 return clean(options.reduce((best,p)=>score(p)<score(best)?p:best,options[0]));
}
export const routePath=(points:Point[])=>points.map((p,i)=>(i?'L ':'M ')+p.x+' '+p.y).join(' ');
