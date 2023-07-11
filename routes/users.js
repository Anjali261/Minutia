import express from "express";
const router = express.Router();
import { getUser, getUserFriends,addRemoveFriends} from "../controller/users.js";
import { verifyToken } from "../middleware/auth.js";

// READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

//UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriends);

export default router;
