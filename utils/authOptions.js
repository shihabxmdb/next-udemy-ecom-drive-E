import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import bcrypt from "bcrypt";
import dbConnect from "@/utils/dbConnect";
export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials, req) {
        dbConnect();
        const { email, password } = credentials;
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid email or password");
        }
        // If the user has no password (i.e., they signed up via a socialnetwork), throw an error
        if (!user?.password) {
          throw new Error("Please login via the method you used to signup");
        }
        const isPasswordMatched = await bcrypt.compare(
          password,
          user?.password
        );
        if (!isPasswordMatched) {
          throw new Error("Invalid email or password");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      //console.log("user data=>", user);
      dbConnect();
      const { email } = user;
      // Try to find a user with the provided email
      let dbUser = await User.findOne({ email });
      // If the user doesn't exist, create a new one
      if (!dbUser) {
        await User.create({
          email,
          name: user?.name,
          image: user?.image,
        });
      }
      return true;
    },

    jwt: async ({ token, user }) => {
      console.log("token=>", token);
      console.log("üser=>", user);
      const userByEmail = await User.findOne({ email: token.email });

      userByEmail.password = undefined;
      userByEmail.resetCode = undefined;
      console.log("userByEmail=>", userByEmail);
      token.user = userByEmail;
      console.log("token=>", token);
      return token;
    },
    session: async ({ session, token }) => {
      console.log("session=>", session);
      session.user = token.user;
      console.log("session=>", session);
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};