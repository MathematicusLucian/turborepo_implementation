import { ReactNode } from "react";
import type { Metadata } from "next";
import { DataWorkerProvider } from "@/providers/dataWorker";

export const metadata: Metadata = {
    title: "Next Electric",
    description: "Next Electric",
};

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
                suppressHydrationWarning
            >
                <DataWorkerProvider>
                    {children}
                </DataWorkerProvider>
            </body>
        </html>
    );
}
