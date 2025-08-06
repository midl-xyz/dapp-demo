import Header from "@/app/Header";
import Web3Provider from "@/app/Web3Provider";
import "@midl-xyz/satoshi-kit/styles.css";
import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "MIDL DApp Demo",
	description:
		"A demo application for building decentralized applications with MIDL.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Web3Provider>
				<body className={`${inter.variable} ${geistMono.variable}`}>
					<Header />
					{children}
				</body>
			</Web3Provider>
		</html>
	);
}
