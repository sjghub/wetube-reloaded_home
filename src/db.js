import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;
const hadleOpen = () => console.log("✅Connected to DB");
const hadleError = (error) => console.log("❌DB Error", error);
db.on("error", hadleError);
db.once("open", hadleOpen);
