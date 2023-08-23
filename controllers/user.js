import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendCookie } from "../utils.js/features.js"
export const getAllUsers =async(req,res)=>{}

    
    

export const login = async(req,res, next) =>{

    const {email, password } = req.body;

    const user = await User.findOne({email}).select("+password")
    if(!user){

        return res.status(404).json({
            success: false,
            message : " not found"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
        return res.status(400).json({
            success: false,
            message : " Invalid  credentials"
        })

    }

    sendCookie(user, res, 200, `welcome back ${user.name}`)
    //   return next(new ErrorHandler("Invalid Email or Password", 400));


}

export  const logout = async(req,res)=>{
    res.status(200).cookie("token", "", {expires : new Date(Date.now()),  sameSite :  processe.env.NODE_ENV ==="Development"? "lax":"none",
    secure: processe.env.NODE_ENV ==="Development"? true:false}).json({
        success: true, 
        user: req.user
    })

}
export const register = async(req,res)=>{
    const {name, email, password} = req.body;

    let user = await User.findOne({email});
    if(user){

        return res.status(404).json({
            success: false,
            message : "already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);
  user =  await User.create({name, email, password: hashedPassword});
   
  sendCookie(user, res, 201, "Registered successfully");
  
}

// export const special = async (req,res)=>{
//     res.status(200).json({
//         success: true,
//         message : "Just asking"
//     })
// }

export const getMyProfile =  async(req,res)=>{
    // const id = req.body.id;
    // const user = await User.findById(id)
    // const {id} = req.query;

    // const {token} = req.cookies;
    // console.log(token)

    // if(!token){
    //     return res.status(404).json({
    //         success:false,
    //         message:"login failed"
    //     })
    // }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // const user =await User.findById(decoded._id);
    // after authentiating we saved the logged in user inside the request object and now we sending it out
    res.status(200).json({
        success: true,
        user: req.user
      });
    
  
}

// export const updateSingleUser =  async(req,res)=>{
//     const {id} = req.params
//     const user = await User.findById(id);

//     res.status(201).json({
//         success: true,
//         message: "updated"
//     })
// }


// export const deleteUser = async(req,res)=>{
//     const {id} = req.params;
//     const user = await User.findById(id);

//     await user.deleteOne();

//     res.json({
//         success: true,
//         message:"deleted"
//     })
// }