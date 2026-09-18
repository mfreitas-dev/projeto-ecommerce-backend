import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("=== AVISO 02: Sucesso na conexao com o banco ===")
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;