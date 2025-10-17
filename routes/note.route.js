import { Router } from "express";
import { createNote, deleteNote, getAllNotes, getNoteById } from './../controllers/note.controller.js';
import { authMiddleware } from "../middlewares/auth.middleware.js";

const noteRouter = Router();

noteRouter.get("/", authMiddleware, getAllNotes);
noteRouter.post("/create", authMiddleware, createNote);
// noteRouter.get('/search', searchNotes)
noteRouter.get("/:id", authMiddleware, getNoteById);
noteRouter.delete("/:id", authMiddleware, deleteNote);



export default noteRouter;
