import {symbol,lineStyle} from './notation';
import {archimateXml} from './archimateXml';
import type{Model}from './model';import {color} from './model';
const escape=(x:string)=>x.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
export function svg(m:Model){
 const coords=new Map(m.elements.map((e,i)=>[e.id,{x:e.x??(i%3)*270,y:e.y??Math.floor(i/3)*140}]));
 const positions=[...coords.values()];
 const minX=Math.min(0,...positions.map(p=>p.x))-30,minY=Math.min(0,...positions.map(p=>p.y))-65;
 const maxX=Math.max(700,...positions.map(p=>p.x+215))+30,maxY=Math.max(220,...positions.map(p=>p.y+90))+30;
 const w=maxX-minX,h=maxY-minY;
 const lines=m.relations.map(r=>{
  const a=coords.get(r.source),b=coords.get(r.target);if(!a||!b)return '';
  const ax=a.x+107-minX,ay=a.y+45-minY,bx=b.x+107-minX,by=b.y+45-minY;
  const style=lineStyle(r.type);
  return '<g><line x1="'+ax+'" y1="'+ay+'" x2="'+bx+'" y2="'+by+'" stroke="'+style.stroke+'" stroke-width="2"'+(style.dash?' stroke-dasharray="'+style.dash+'"':'')+(style.marker?' marker-end="url(#arrow)"':'')+'/><text x="'+((ax+bx)/2)+'" y="'+((ay+by)/2-8)+'" text-anchor="middle" font-size="11" fill="#354b60">'+escape(r.type)+'</text></g>';
 }).join('');
 const nodes=m.elements.map(e=>{
 const p=coords.get(e.id)!;const x=p.x-minX,y=p.y-minY;
 return '<g><rect x="'+x+'" y="'+y+'" width="215" height="90" rx="8" fill="'+color(e.type)+'" stroke="#7891a6"/><text x="'+(x+10)+'" y="'+(y+24)+'" font-size="13" fill="#243247">'+escape(symbol[e.type]+' '+e.type)+'</text><text x="'+(x+10)+'" y="'+(y+57)+'" font-size="14" fill="#243247">'+escape(e.name)+'</text></g>';
 }).join('');
 return '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'"><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="#425c75"/></marker></defs><rect width="100%" height="100%" fill="#fff"/><text x="25" y="34" font-size="22" fill="#243247">'+escape(m.title)+'</text>'+lines+nodes+'</svg>';
}
function save(blob:Blob,name:string){const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
export async function exportModel(m:Model,format:string){if(format==='JSON'){save(new Blob([JSON.stringify(m,null,2)],{type:'application/json'}),'waterwerk-model.json');return}if(format==='XML'){save(new Blob([archimateXml(m)],{type:'application/xml'}),'waterwerk-model.xml');return}if(format==='SVG'){save(new Blob([svg(m)],{type:'image/svg+xml'}),'waterwerk-view.svg');return}if(format==='PDF'){const {jsPDF}=await import('jspdf');const pdf=new jsPDF({orientation:'landscape'});pdf.text(m.title,16,20);m.elements.slice(0,20).forEach((e,i)=>pdf.text(e.type+' : '+e.name,16,35+i*9));pdf.save('waterwerk-overzicht.pdf');return}const image=new Image();const url=URL.createObjectURL(new Blob([svg(m)],{type:'image/svg+xml'}));try{await new Promise<void>((resolve,reject)=>{image.onload=()=>resolve();image.onerror=reject;image.src=url});const canvas=document.createElement('canvas');canvas.width=image.width*2;canvas.height=image.height*2;const ctx=canvas.getContext('2d')!;ctx.scale(2,2);ctx.drawImage(image,0,0);const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('PNG mislukt'))));save(blob,'waterwerk-view.png')}finally{URL.revokeObjectURL(url)}}
