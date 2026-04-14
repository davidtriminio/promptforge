import app from "./app.js";
import {ENV} from "./config/ENV.js";
import {connectDB} from "./config/db.js";
const port = ENV.PORT

const startServer = async () => {
    await connectDB()
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`)
    })
}

startServer()