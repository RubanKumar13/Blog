import mongoose from "mongoose";

const connectMango =async ()=>mongoose.connect(process.env.MANGO_URI);

export default connectMango;