import app from "./app.js";
import {ENV} from "./config/ENV.js";
const PORT = ENV.PORT

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})