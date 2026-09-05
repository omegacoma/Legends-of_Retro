const URL='https://bbyejaouyjcihhbgokgn.supabase.co'
const KEY='sb_publishable_LSji76JlF7FEKgIIvtn0UQ_fXNk3BQF'
export async function requireAdmin(req){
 const token=(req.headers.authorization||'').replace(/^Bearer\s+/i,'');if(!token)throw Object.assign(new Error('Missing login token'),{status:401})
 const service=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!service)throw Object.assign(new Error('Vercel SUPABASE_SERVICE_ROLE_KEY is not configured yet.'),{status:503})
 const ur=await fetch(`${URL}/auth/v1/user`,{headers:{apikey:KEY,Authorization:`Bearer ${token}`}});if(!ur.ok)throw Object.assign(new Error('Your Legends login session is not valid.'),{status:401});const user=await ur.json()
 const pr=await fetch(`${URL}/rest/v1/profiles?id=eq.${encodeURIComponent(user.id)}&select=id,username,role,disabled`,{headers:{apikey:service,Authorization:`Bearer ${service}`}});const profiles=await pr.json();const profile=profiles?.[0]
 if(!profile||profile.disabled||profile.role!=='Admin')throw Object.assign(new Error('Admin access required.'),{status:403})
 return {user,profile,service}
}
export async function rest(service,path,{method='GET',body,prefer='return=representation'}={}){const r=await fetch(`${URL}/rest/v1/${path}`,{method,headers:{apikey:service,Authorization:`Bearer ${service}`,'Content-Type':'application/json',Prefer:prefer},body:body===undefined?undefined:JSON.stringify(body)});const txt=await r.text();let out=null;try{out=txt?JSON.parse(txt):null}catch{out=txt}if(!r.ok)throw Object.assign(new Error(out?.message||out?.error||txt||`Supabase ${r.status}`),{status:r.status});return out}
export async function authAdmin(service,path,{method='GET',body}={}){const r=await fetch(`${URL}/auth/v1/admin/${path}`,{method,headers:{apikey:service,Authorization:`Bearer ${service}`,'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});const txt=await r.text();let out=null;try{out=txt?JSON.parse(txt):null}catch{out=txt}if(!r.ok)throw Object.assign(new Error(out?.msg||out?.message||out?.error||txt||`Supabase Auth ${r.status}`),{status:r.status});return out}
export async function logAudit(service,userId,action,details=''){try{await rest(service,'audit_log',{method:'POST',body:{user_id:userId,action,details,created_at:new Date().toISOString()},prefer:'return=minimal'})}catch{}}
export function sendError(res,e){res.status(e.status||500).json({error:e.message||String(e)})}
