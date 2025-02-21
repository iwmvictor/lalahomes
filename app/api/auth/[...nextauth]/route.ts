import { signIn } from "@/services/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "email", placeholder: "me@domain.com" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					console.log(credentials);
					return (await signIn({
						password: credentials?.password,
						email: credentials?.email,
					})) as any;
				} catch (error: any) {
					throw new Error(error.response?.data?.message ?? error);
				}
			},
		}),
	],
	callbacks: {
		signIn(data) {
			return !!data.user.id;
		},
		async session({ session, token }) {
			return { ...session, ...token };
		},
		async jwt({ token, user }) {
			user && (token.user = user);
			return token;
		},
	},
	pages: {
		signIn: "/auth/signin",
	},
});

export { handler as GET, handler as POST };
