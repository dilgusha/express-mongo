import express from 'express';
import dotenv from 'dotenv';
import noteRoutes from './routes/note.route.js';
import mongoose, { connect } from 'mongoose';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to Mongoose database');
    })
    .catch((err) => {
        console.log(`${err.message}`);
    })

app.get('/', (req, res) => {
    res.send('Hello, Notes App!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
