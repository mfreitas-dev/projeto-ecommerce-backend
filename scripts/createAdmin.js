import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';
dotenv.config();

const createAdmin = async () => {
    try {
    await connectDB();

    const username = 'AdminMatheus';
    const senhaCrua = 'admsenha123?';
    const saltRounds = 10;
    const hash = await bcrypt.hash(senhaCrua, saltRounds);
    const loginAdmin = await Admin.create({
        username: username,
        password: hash,
    });

    console.log("Sucesso, login criado:", loginAdmin);
    } catch(error) {
        console.error(error);
        process.exit(1);
    }

    process.exit(0);
};

createAdmin();