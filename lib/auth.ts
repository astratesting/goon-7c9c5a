import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Demo users that work without any database
const DEMO_USERS = [
  {
    id: "demo-user-001",
    email: "demo@demo.app",
    password: "demo123",
    name: "Demo Maker",
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Check against demo users (works without database)
        const demoUser = DEMO_USERS.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (demoUser) {
          return {
            id: demoUser.id,
            email: demoUser.email,
            name: demoUser.name,
          };
        }

        // Allow any email/password combination for demo purposes
        // In production, this would validate against a real database
        if (credentials.email && credentials.password.length >= 3) {
          return {
            id: `user-${credentials.email}`,
            email: credentials.email,
            name: credentials.email.split("@")[0],
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "goon-fallback-secret-do-not-use-in-production",
};
