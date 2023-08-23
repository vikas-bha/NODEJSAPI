import express from "express";
import { User } from "../models/user.js";
import { getAllUsers,register, login, getMyProfile , logout} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.get("/all", getAllUsers)

router.post("/new",register )

router.post("/login", login)

router.get("/logout", logout);

// now the thing between the two api's is whichever of them is going to above will be executed first
// router.get("/userId/special",special )

router.get("/me",isAuthenticated,getMyProfile)

// router.put("/userId/:id",updateSingleUser)

// router.delete("/userId/:id",deleteUser)



export default router;