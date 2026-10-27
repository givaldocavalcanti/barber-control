import type { Metadata } from "next";
import { cookies } from 'next/headers';
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/controllers";

const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		template: "BarberControl - %s",
		default: "BarberControl"
	},
	description: "BarberControl, sua barbearia sob controle",
};

export const instant = false;

export default async function RootLayout({ children }: LayoutProps<"/">) {
	const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('barber-session')?.value;
	const initialUser = sessionCookie ? JSON.parse(sessionCookie) : null;
	
	return (
		<html
			lang="pt-BR"
			className={`${montserrat.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<AuthProvider initialUser={initialUser}>{children}</AuthProvider>
			</body>
		</html>
	);
}
