import { ReactNode } from "react";
// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// // import { DbWorkerProvider } from "@/providers/db";

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Next Electric",
//   description: "Next Electric",
// };

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html
            suppressHydrationWarning
            lang="en"
        >
            <body
            // suppressHydrationWarning
            // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {/* <DbWorkerProvider> */}
                {children}
                {/* </DbWorkerProvider> */}
            </body>
        </html>
    );
}
