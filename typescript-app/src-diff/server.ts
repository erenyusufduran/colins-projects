import app from "./index";
import { connectMongo } from "./database/mongoose";

const PORT = process.env.PORT || 3000;

connectMongo();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
