import {symbol,lineStyle} from './notation';
import {archimateXml} from './archimateXml';
import type{Model}from './model';import {color} from './model';
const escape=(x:string)=>x.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
export function svg(m:Model){
 const coords=new Map(m.elements.map((e,i)=>[e.id,{x:e.x??(i%3)*270,y:e.y??Math.floor(i/3)*140}]));
 const positions=[...coords.values()];
 const minX=Math.min(0,...positions.map(p=>p.x))-30,minY=Math.min(0,...positions.map(p=>p.y))-65;
 const maxX=Math.max(700,...positions.map(p=>p.x+215))+50,maxY=Math.max(220,...positions.map(p=>p.y+90))+50;
 const w=maxX-minX,h=maxY-minY;
 const lines=m.relations.map(r=>{
  const a=coords.get(r.source),b=coords.get(r.target);if(!a||!b)return '';
  const side=(handle:string|undefined,fallback:string)=>(handle??fallback).split('-').at(-1);const sa=side(r.sourceHandle,'right'),ta=side(r.targetHandle,'left');
  const port=(p:{x:number;y:number},d:string|undefined)=>({x:p.x+(d==='left'?0:d==='right'?215:107.5)-minX,y:p.y+(d==='top'?0:d==='bottom'?90:45)-minY});
  const start=port(a,sa),end=port(b,ta);const ax=start.x,ay=start.y,bx=end.x,by=end.y;
  const horizontal=sa==='left'||sa==='right';const mid=horizontal?(ax+bx)/2:(ay+by)/2;const path=horizontal?`M ${ax} ${ay} H ${mid} V ${by} H ${bx}`:`M ${ax} ${ay} V ${mid} H ${bx} V ${by}`;
  const style=lineStyle(r.type);
  return '<g><path d="'+path+'" fill="none" stroke="'+style.stroke+'" stroke-width="2"'+(style.dash?' stroke-dasharray="'+style.dash+'"':'')+(style.marker?' marker-end="url(#arrow)"':'')+'/><text x="'+((ax+bx)/2)+'" y="'+((ay+by)/2-8)+'" text-anchor="middle" font-size="11" fill="#354b60">'+escape(r.type)+'</text></g>';
 }).join('');
 const groups=(m.groups??[]).map(g=>{const members=m.elements.filter(e=>g.elementIds.includes(e.id));if(!members.length)return '';const xs=members.map(e=>coords.get(e.id)!.x),ys=members.map(e=>coords.get(e.id)!.y);const pad=g.padding??30;const x=Math.min(...xs)-minX-pad,y=Math.min(...ys)-minY-pad-25,width=Math.max(...xs)-Math.min(...xs)+215+2*pad,height=Math.max(...ys)-Math.min(...ys)+90+2*pad+25;return '<g><rect x="'+x+'" y="'+y+'" width="'+width+'" height="'+height+'" rx="12" fill="#eaf4fc" fill-opacity=".6" stroke="#5687b2" stroke-dasharray="7 4"/><text x="'+(x+10)+'" y="'+(y+22)+'" font-size="14" fill="#174a74">'+escape(g.name)+'</text></g>'}).join('');
 const nodes=m.elements.map(e=>{
 const p=coords.get(e.id)!;const x=p.x-minX,y=p.y-minY;
 return '<g><rect x="'+x+'" y="'+y+'" width="215" height="90" rx="8" fill="'+color(e.type)+'" stroke="#7891a6"/><text x="'+(x+10)+'" y="'+(y+24)+'" font-size="13" fill="#243247">'+escape(symbol[e.type]+' '+e.type)+'</text><text x="'+(x+10)+'" y="'+(y+57)+'" font-size="14" fill="#243247">'+escape(e.name)+'</text></g>';
 }).join('');
 return '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'"><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="#425c75"/></marker></defs><rect width="100%" height="100%" fill="#fff"/><text x="25" y="34" font-size="22" fill="#243247">'+escape(m.title)+'</text>'+groups+lines+nodes+'</svg>';
}
function save(blob:Blob,name:string){const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
export async function exportModel(m:Model,format:string){if(format==='JSON'){save(new Blob([JSON.stringify(m,null,2)],{type:'application/json'}),'waterwerk-model.json');return}if(format==='XML'){save(new Blob([archimateXml(m)],{type:'application/xml'}),'waterwerk-model.xml');return}if(format==='SVG'){save(new Blob([svg(m)],{type:'image/svg+xml'}),'waterwerk-view.svg');return}if(format==='PDF'){const {jsPDF}=await import('jspdf');const image=new Image();const url=URL.createObjectURL(new Blob([svg(m)],{type:'image/svg+xml;charset=utf-8'}));try{await new Promise<void>((resolve,reject)=>{image.onload=()=>resolve();image.onerror=()=>reject(new Error('Diagram kon niet worden geladen'));image.src=url});const canvas=document.createElement('canvas');const scale=2;canvas.width=image.naturalWidth*scale;canvas.height=image.naturalHeight*scale;const ctx=canvas.getContext('2d');if(!ctx)throw Error('Canvas niet beschikbaar');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.scale(scale,scale);ctx.drawImage(image,0,0);const pdf=new jsPDF({orientation:canvas.width>=canvas.height?'landscape':'portrait',unit:'mm',format:'a4'});const pw=pdf.internal.pageSize.getWidth(),ph=pdf.internal.pageSize.getHeight(),ratio=Math.min((pw-20)/canvas.width,(ph-20)/canvas.height);pdf.addImage(canvas.toDataURL('image/png'),'PNG',10,10,canvas.width*ratio,canvas.height*ratio);pdf.save('waterwerk-diagram.pdf');return}finally{URL.revokeObjectURL(url)}}const image=new Image();const url=URL.createObjectURL(new Blob([svg(m)],{type:'image/svg+xml'}));try{await new Promise<void>((resolve,reject)=>{image.onload=()=>resolve();image.onerror=reject;image.src=url});const canvas=document.createElement('canvas');canvas.width=image.width*2;canvas.height=image.height*2;const ctx=canvas.getContext('2d')!;ctx.scale(2,2);ctx.drawImage(image,0,0);const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('PNG mislukt'))));save(blob,'waterwerk-view.png')}finally{URL.revokeObjectURL(url)}}
