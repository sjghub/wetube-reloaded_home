import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
const hadleOpen = () => console.log("✅Connected to DB");
const hadleError = (error) => console.log("❌DB Error", error);
db.on("error", hadleError);
db.once("open", hadleOpen);
