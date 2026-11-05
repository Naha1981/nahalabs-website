import { test } from 'node:test';
import assert from 'node:assert/strict';
import { publicAddress, resolvePublic, pinnedLookup } from '../api/_safe-fetch.js';
import { clientIp, consume, type CounterStore } from '../api/_rate-limit.js';

test('rejects nonpublic IPv4, IPv6 and IPv4 mapped IPv6', () => {
  for (const ip of ['127.0.0.1','10.1.2.3','169.254.169.254','100.64.1.2','192.168.2.1','0.0.0.0','::1','fe80::1','fc00::1','::ffff:127.0.0.1','::ffff:169.254.169.254','192.0.2.1']) assert.equal(publicAddress(ip),false,ip);
  for (const ip of ['8.8.8.8','1.1.1.1','2606:4700:4700::1111']) assert.equal(publicAddress(ip),true,ip);
});
test('pins the validated resolution without a second lookup; keeps TLS host in URL', async () => {
 let calls=0;
 const resolver:any=async()=>{calls++;return [{address:calls===1?'8.8.8.8':'127.0.0.1',family:4}]};
 const url=new URL('https://public.example/test');
 const address=await resolvePublic(url,resolver);
 const lookup=pinnedLookup(address);
 lookup(url.hostname,{},(error:any,ip:string)=>{assert.equal(error,null);assert.equal(ip,'8.8.8.8')});
 lookup(url.hostname,{all:true},(error:any,ips:any)=>assert.deepEqual(ips,[address]));
 assert.equal(calls,1);assert.equal(url.hostname,'public.example');
});
test('rejects mixed DNS answers and every redirect address through shared resolver',async()=>{
 await assert.rejects(resolvePublic(new URL('https://public.example'),(async()=>[{address:'8.8.8.8',family:4},{address:'127.0.0.1',family:4}]) as any));
 for(const url of ['http://[::ffff:127.0.0.1]/','https://user:pass@example.com','http://example.com:22','file:///etc/passwd']) await assert.rejects(resolvePublic(new URL(url)));
});
test('ignores spoofed forwarding headers off Vercel',()=>{
 const old=process.env.VERCEL; delete process.env.VERCEL;
 assert.equal(clientIp({headers:{'x-forwarded-for':'1.1.1.1','x-vercel-forwarded-for':'2.2.2.2'},socket:{remoteAddress:'127.0.0.1'}}),'127.0.0.1');
 process.env.VERCEL='1';assert.equal(clientIp({headers:{'x-forwarded-for':'1.1.1.1','x-vercel-forwarded-for':'2.2.2.2'}}),'2.2.2.2');
 assert.equal(clientIp({headers:{'x-vercel-forwarded-for':'2.2.2.2, 3.3.3.3'}}),'unknown');
 if(old===undefined)delete process.env.VERCEL;else process.env.VERCEL=old;
});
test('shared CAS counter survives clients and concurrent writes and expires',async()=>{
 let row:any=null;let version=0;
 class BlobPreconditionFailedError extends Error {}
 const store:CounterStore={async read(){return row?{...row}:null},async write(_path,value,etag){if((row?.etag)!==etag)throw new BlobPreconditionFailedError();row={...value,etag:String(++version)}}};
 const allowed=await Promise.all(Array.from({length:6},()=>consume(store,'shared',3,60000,1000)));
 assert.equal(allowed.filter(Boolean).length,3);assert.equal(row.count,3);
 assert.equal(await consume(store,'shared',3,60000,62000),true);assert.equal(row.count,1);
});
test('store failure never becomes allowed',async()=>{
 await assert.rejects(consume({read:async()=>{throw new Error('offline')},write:async()=>{}},'x',3,1000));
});
