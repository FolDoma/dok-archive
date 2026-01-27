import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrains = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Jedlik DÖK arhív",
	description: "Made by FolDoma",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="hu">
			<body
				className={`${jetBrains.variable} antialiased grainy-container`}
			>
				{children}
			</body>
		</html>
	);
}
