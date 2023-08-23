import { User } from "../models/user.js"
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login First",
    });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);
  // we are saving the trying logged in user inside the req.user  and after that it gives us the profile of the logged in user when we call the next() function
  next();
};