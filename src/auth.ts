import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "./database-models/user.model"; // Your User model
import bcrypt from "bcryptjs"; // Assuming you're using bcrypt for password hashing
import dbConnect from "./lib/database-connection";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;
        await dbConnect();
        const user = await User.findOne({ email, provider: "credentials" });
        if (!user) {
          throw new Error("The Email or the Password is incorrect");
        }
        const isValid = await bcrypt.compare(password as string, user.password);
        if (!isValid) {
          throw new Error("The Email or the Password is incorrect");
        }
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
          provider: "credentials", // Explicitly set provider for credentials login
        };
      },
    }),
  ],
  pages: {
    error: "/sign-in",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        // If it's a social login, handle creation of user and token
        if (account.provider !== "credentials") {
          const providerAccountId = account.providerAccountId;
          const provider = account.provider;
          await dbConnect();

          let existingUser = await User.findOne({
            providerAccountId,
            provider,
          });

          if (!existingUser) {
            // If user doesn't exist, create a new user
            existingUser = await User.create({
              name: user?.name as string,
              email: user?.email as string,
              image: user?.image as string,
              provider,
              providerAccountId,
            });
          }

          // Attach the user ID to the token for session handling
          token.sub = existingUser._id.toString();
          token.provider = existingUser.provider;
          token.providerAccountId = existingUser.providerAccountId;
        }
      }
      if (user) {
        // If the user logs in using credentials
        token.sub = user.id;
        token.provider = "credentials";
        token.providerAccountId = ""; // Credentials login doesn't use providerAccountId
      }
      return token;
    },
    async session({ session, token }) {
      // Attach user ID to the session
      session.user.id = token.sub as string;
      session.user.provider = token.provider as string;
      session.user.providerAccountId = token.providerAccountId as string;
      return session;
    },
  },
});
