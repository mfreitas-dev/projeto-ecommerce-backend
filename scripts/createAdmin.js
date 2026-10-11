import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';
dotenv.config();

const createAdmin = async () => {
    try {
        await connectDB();

        const username = process.env.ADMIN_SEED_USERNAME;
        const senhaCrua = process.env.ADMIN_SEED_PASSWORD;

        if (!username || !senhaCrua) {
            console.error('Defina ADMIN_SEED_USERNAME e ADMIN_SEED_PASSWORD no .env antes de rodar este script.');
            process.exit(1);
        }

        const saltRounds = 10;
        const hash = await bcrypt.hash(senhaCrua, saltRounds);
        const loginAdmin = await Admin.create({
            username: username,
            password: hash,
        });

        console.log("Sucesso, login criado:", loginAdmin.username);
    } catch(error) {
        console.error(error);
        process.exit(1);
    }

    process.exit(0);
};

createAdmin();