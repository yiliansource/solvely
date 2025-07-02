import { MobileSidebar } from "@/components/mobile-sidebar";
import { DesktopNavigation } from "@/components/navigation";
import { UserWidget } from "@/components/user-widget";
import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import "katex/dist/katex.min.css";
import type { Metadata } from "next";
import { Inconsolata, Inter, Kurale } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const inconsolata = Inconsolata({
    variable: "--font-inconsolata",
    subsets: ["latin"],
    weight: ["400"],
});

const kurale = Kurale({
    variable: "--font-kurale",
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "solvely",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={clsx(
                    [inter, kurale, inconsolata].map((f) => f.variable),
                    inter.className,
                    `antialiased`,
                )}
            >
                <div className="flex flex-col min-h-dvh mx-auto max-w-5xl px-3">
                    <header className="flex flex-row justify-between items-center h-18 select-none">
                        <Link href="/" className="text-2xl font-bold text-blue-500">
                            <Image
                                src="/solvely-icon.png"
                                width={40}
                                height={40}
                                priority
                                alt="Solvely Logo"
                                draggable={false}
                            />
                        </Link>
                        <div className="hidden lg:block">
                            <DesktopNavigation />
                        </div>
                        <div className="hidden lg:block">
                            <UserWidget />
                        </div>
                        <div className="block lg:hidden">
                            <MobileSidebar />
                        </div>
                    </header>
                    <main className="flex flex-col w-full mx-auto max-w-5xl grow">{children}</main>
                    <footer className="flex flex-row justify-between items-center h-12 text-sm lg:text-md font-mono text-neutral-400 select-none">
                        <p>Copyright &copy; {new Date().getFullYear()} solvely</p>
                        <p>
                            <Link href="https://github.com/yiliansource/solvely" target="_blank">
                                <GithubLogoIcon className="text-xl" />
                            </Link>
                        </p>
                    </footer>
                </div>
            </body>
        </html>
    );
}
