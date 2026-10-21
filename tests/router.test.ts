import {describe,it,expect} from 'vitest';
import {routeOrthogonal,routePath} from '../src/router';
describe('Manhattan-routering',()=>{
 it('vermijdt een blok tussen horizontale endpoints',()=>{
  const route=routeOrthogonal({x:0,y:50},{x:400,y:50},[{x:150,y:10,width:100,height:80}]);
  expect(route.length).toBeGreaterThan(2);
  expect(routePath(route)).toMatch(/^M 0 50/);
  expect(route.every((p,i)=>i===0||p.x===route[i-1].x||p.y===route[i-1].y)).toBe(true);
 });
 it('kiest een eenvoudige route zonder obstakels',()=>{
  const route=routeOrthogonal({x:0,y:0},{x:200,y:100},[]);
  expect(route[0]).toEqual({x:0,y:0});
  expect(route.at(-1)).toEqual({x:200,y:100});
 });
});
