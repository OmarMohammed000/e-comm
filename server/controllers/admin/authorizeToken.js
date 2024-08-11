import jwt from "jsonwebtoken"
function authorizeToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]|| req.cookies.jwt;
  if (token === null) return res.sendStatus(401);
  jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err) return res.sendStatus(403);
    req.user=user
    
    next()
   
  })
}
export default authorizeToken
