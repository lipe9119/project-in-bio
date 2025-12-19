import { FirestoreAdapter } from "@auth/firebase-adapter";
import { Timestamp } from "firebase-admin/firestore";
import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { TRAIL_DAYS } from "./config";
import { db, firebaseCert } from "./firebase";

declare module "next-auth" {
  interface Session {
    user: {
      createdAt: number;
      isTrial: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    createdAt: number;
    isTrial?: boolean;
    isSubscribed?: boolean;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: FirestoreAdapter({
    credential: firebaseCert,
  }),
  providers: [Google],
  events: {
    createUser: async ({ user }) => {
      if (!user.id) return;

      await db.collection("profiles").doc(user.id).update({
        createdAt: Timestamp.now().toMillis(),
      });
    },
  },
  callbacks: {
    session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          isTrial:
            new Date(user.createdAt).getTime() >
              new Date().getTime() - TRAIL_DAYS * 24 * 60 * 60 * 1000 || false,
        },
      };
    },
  },
});
