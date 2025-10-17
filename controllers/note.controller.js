import { Note } from '../models/note.model.js'

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const createNote = async (req, res) => {
    try {  
        const { title, content } = req.body;
        const newNote = new Note({ title, content,author: req.user._id  });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id).populate('author', 'name email');;
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const note = await Note.findById(id);
        if (note.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to edit this note" });
        }
        note.title = title || note.title
        note.content = content || note.content
        await note.save();
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id)
          if (note.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this note" });
        }
        await note.deleteOne()
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(204).send('Note deleted successfully');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




// export const toggleComplete = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const note = await Note.findById(id);
//         if (!note) return res.status(404).json({ message: "Note not found" });

//         note.completed = !note.completed;
//         await note.save();

//         res.status(200).json({ message: "Note status updated", note });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };




// export const searchNotes = async (req, res) => {
//   try {
//     const { q } = req.query;
//     const notes = await Note.find({
//       $or: [
//         { title: { $regex: q, $options: 'i' } },
//         { content: { $regex: q, $options: 'i' } },
//       ],
//     });
//     res.status(200).json(notes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// export const getAllNotes = async (req, res) => {
//   try {
//     const { page = 1, limit = 5,sort } = req.query;

    
//     const notes = await Note.find({deleted:false}).sort({ createdAt: 1 })
//     .skip((page - 1) * limit)
//     .limit(Number(limit));  //ASC
//     res.status(200).json(notes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };




// //Soft delete

// export const deleteNote = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const note = await Note.findById(id);
//     if (!note) {
//       return res.status(404).json({ message: "Note not found" });
//     }

//     if (note.deleted) {
//       return res.status(400).json({ message: "Note already deleted" });
//     }

//     note.deleted = true;
//     note.deletedAt = new Date();
//     await note.save();

//     res.status(200).json({ message: "Note soft deleted successfully", note });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
