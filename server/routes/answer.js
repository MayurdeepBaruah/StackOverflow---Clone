import express from 'express';
import { postAnswer, deleteAnswer } from "../controllers/Answers.js";
import auth from '../middleware/auth.js';
const router = express.Router();

router.patch("/post/:id", auth, postAnswer);
router.patch("/delete/:id", auth, deleteAnswer)                       // bcz we are not deleting the entire data just deleting a speific entry thats why patch instead of delete 

export default router;