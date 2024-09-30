import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})

import connectDB from "./db/index.js";
import { app } from "./app.js"


connectDB()
.then(() => {
    const PORT = process.env.PORT || 8080;
    
    app.listen(PORT, () => {
        console.log(`Server is up at PORT: ${PORT}`);
    })
})
.catch((error) => {
    console.error("Error in connecting MongoDB in index.js\n", error);
})