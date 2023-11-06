// config.js
const DB_URI =
  "mongodb+srv://mushfiqafarzana3535:zxcvbnm098@cluster01.sjlngve.mongodb.net/?retryWrites=true&w=majority";

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
