import "dotenv/config"
import app from './app.js';
import {connectDB} from "./config/db.js"

const port = process.env.PORT || 4000;

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server running on port ${port}`)
    });
});