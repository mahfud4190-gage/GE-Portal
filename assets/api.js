const API='/.netlify/functions/portal-api';
const AUTH='/.netlify/functions/auth';
export const session={token:sessionStorage.getItem('ge_token')||'',profile:JSON.parse(sessionStorage.getItem('ge_profile')||'null')};
export async function login(identity,password){const r=await fetch(AUTH,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({identity,password})});const j=await r.json();if(!r.ok||!j.ok)throw Error(j.message||'Login gagal');session.token=j.idToken;session.profile=j.profile;sessionStorage.setItem('ge_token',j.idToken);sessionStorage.setItem('ge_profile',JSON.stringify(j.profile));return j.profile}
export function logout(){sessionStorage.clear();session.token='';session.profile=null;location.hash='';location.reload()}
async function req(url,opt={}){const r=await fetch(url,{...opt,headers:{'content-type':'application/json','authorization':`Bearer ${session.token}`,...opt.headers}});const j=await r.json();if(r.status===401){logout();throw Error('Sesi berakhir')}if(!r.ok||!j.ok)throw Error(j.message||'Permintaan gagal');return j}
export async function read(...collections){return (await req(`${API}?collections=${encodeURIComponent(collections.join(','))}`)).collections}
export async function write(collection,action,data={},id=''){return (await req(API,{method:'POST',body:JSON.stringify({collection,action,data,id})})).result}
