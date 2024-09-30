import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true});

export const Address = mongoose.model("Address", addressSchema);