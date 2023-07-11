import express from "express";
const router = express.Router();
import { getUser, getUserFriends,addRemoveFriend} from "../controller/users.js";
import { verifyToken } from "../middleware/auth.js";

export default router;
