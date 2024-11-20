/** @format */

import type {Metadata} from "next";
import {Nunito} from "next/font/google";
// import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import {TSafeUser} from "./types";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
	title: "Airbnb",
	description: "Airbnb clone",
};

const font = Nunito({
	subsets: ["latin"],
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const currentUser = await getCurrentUser();
	return (
		<html lang='en'>
			<body className={font.className}>
				<ClientOnly>
					<ToasterProvider />
					<SearchModal />
					<RentModal />
					<RegisterModal />
					<LoginModal />
					<Navbar currentUser={currentUser as TSafeUser} />
				</ClientOnly>
				<div className='pb-10 pt-28 sm:pt-28 md:pt-24 lg:pt-20 h-full overflow-auto'>
					{children}
				</div>
			</body>
		</html>
	);
}
