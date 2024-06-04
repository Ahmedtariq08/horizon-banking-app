import MobileNav from "@/components/home/MobileNav";
import { Sidebar } from "lucide-react";
import Image from "next/image";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedIn = { firstName: "Ahmed", lastName: "Tariq" };
    return (
        <main className="flex h-screen w-full font-inter">
            {/* <Sidebar user={loggedIn} /> */}
            <Sidebar />
            <div className="flex size-full flex-col">
                <div className="root-layout">
                    <Image
                        src="/icons/logo.svg"
                        width={30}
                        height={30}
                        alt="logo"
                    />
                    <div>
                        <MobileNav user={loggedIn} />
                    </div>
                </div>
                {children}
            </div>
        </main>
    );
}
