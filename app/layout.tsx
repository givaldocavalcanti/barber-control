import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/controller";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="pt-BR"
			className={`${montserrat.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
