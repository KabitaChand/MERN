import User from "../models/user.js";
import jwt from "jsonwebtoken";



export const verifyToken=(req,res,next) =>{
   const token=req.cookies.token;
   console.log(token);

   if(!token){
    return res.status(401).json(
        {
            message:"not found token"
        }
    );
   }

   try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user = decoded.userId;
    next();
   }
    catch(err){
    return res.status(400).json(
        {
            message:"Token is not valid"
        }
    );
   }


};



export const authorize = (roles = []) => {
  if (typeof roles === 'string') {
      roles = [roles];
  }

  return [
      verifyToken,
      async (req, res, next) => {
          try {
              const user = await User.findById(req.user);
              if (!user) {
                  return res.status(404).json({ message: 'User not found' });
              }

              if (roles.length && !roles.includes(user.role)) {
                  return res.status(403).json({ message: 'Unauthorized: Insufficient role' });
              }

              req.user = user;
              next();
          } catch (error) {
              console.error(error);
              return res.status(500).json({ message: 'Server error' });
          }
      }
  ];
};

export const isAdmin = () => authorize(['admin']);
export const isFriends = () => authorize(['friends']);