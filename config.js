// config.js
//const DB_URI =
// "mongodb+srv://mushfiqafarzana3535:zxcvbnm098@cluster01.sjlngve.mongodb.net/?retryWrites=true&w=majority";
const DB_URI =
  "mongodb://mushfiqafarzana3535:zxcvbnm098@ac-evog4r8-shard-00-00.sjlngve.mongodb.net:27017,ac-evog4r8-shard-00-01.sjlngve.mongodb.net:27017,ac-evog4r8-shard-00-02.sjlngve.mongodb.net:27017/?replicaSet=atlas-pkdvex-shard-0&ssl=true&authSource=admin";
const API =
  process.env.NODE_ENV === "production"
    ? "https://xxx.vercel.com/api"
    : "http://localhost:3000/api";

const NEXTAUTH_SECRET = "hfdksjfhbhdjfd";
const GOOGLE_CLIENT_ID =
  "136887268768-r01mrej5h3ume4moq6sf8fil40h0aioc.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
module.exports = {
  DB_URI,
  API,
  NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
};
