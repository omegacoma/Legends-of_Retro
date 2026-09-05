const URL='https://bbyejaouyjcihhbgokgn.supabase.co'

async function readJson(r){
  const txt=await r.text()
  if(!txt) return null
  try{return JSON.parse(txt)}catch{return {message:txt}}
}

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'})

  const secret=process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY
  if(!secret) return res.status(500).json({error:'Vercel SUPABASE_SERVICE_ROLE_KEY is not configured.'})

  const {userId,email,username}=req.body||{}
  const cleanName=String(username||'').trim().slice(0,40)
  if(!userId||!email||cleanName.length<2) return res.status(400).json({error:'Missing account information.'})

  try{
    // Verify that the Supabase Auth account really exists and that its email
    // matches the browser signup before using the service-role credential.
    const ur=await fetch(`${URL}/auth/v1/admin/users/${encodeURIComponent(userId)}`,{
      headers:{apikey:secret,Authorization:`Bearer ${secret}`}
    })
    const authUser=await readJson(ur)
    if(!ur.ok) return res.status(400).json({error:authUser?.msg||authUser?.message||'Auth account was not found.'})
    if(String(authUser?.email||'').toLowerCase()!==String(email).toLowerCase()){
      return res.status(403).json({error:'Account verification failed.'})
    }

    // Check whether the profile already exists. This makes retries safe.
    const pr=await fetch(`${URL}/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}&select=id`,{
      headers:{apikey:secret,Authorization:`Bearer ${secret}`}
    })
    const profiles=await readJson(pr)
    if(!pr.ok) return res.status(pr.status).json({error:profiles?.message||profiles?.error||'Could not check runner profile.'})
    if(Array.isArray(profiles)&&profiles.length) return res.status(200).json({ok:true})

    // Service-role requests bypass RLS, so a brand-new public account can
    // always receive its required Runner profile row.
    const ir=await fetch(`${URL}/rest/v1/profiles`,{
      method:'POST',
      headers:{
        apikey:secret,
        Authorization:`Bearer ${secret}`,
        'Content-Type':'application/json',
        Prefer:'return=minimal'
      },
      body:JSON.stringify({id:userId,username:cleanName,role:'Runner',disabled:false})
    })
    const inserted=await readJson(ir)
    if(!ir.ok) return res.status(ir.status).json({error:inserted?.message||inserted?.error||'Runner profile could not be created.'})

    return res.status(200).json({ok:true})
  }catch(e){
    console.error('register-profile failed',e)
    return res.status(500).json({error:e?.message||'Runner profile could not be created.'})
  }
}
