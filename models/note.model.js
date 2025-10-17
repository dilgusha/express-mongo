// import mongoose from "mongoose";

// const noteSchema = new mongoose.Schema({
//     title: { type: String, required: true, trim: true },
//     content: { type: String, required: true, trim: true },
// }, { timestamps: true });



// export const Note = mongoose.model("Note", noteSchema);



import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
    title: {
        type: String, required: true, trim: true
    },
    content: {
        type: String, required: true, trim: true
    },
    deleted: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',   // User modelinə referans
        required: true
    },
}, { timestamps: true })


export const Note = mongoose.model('Note', noteSchema)