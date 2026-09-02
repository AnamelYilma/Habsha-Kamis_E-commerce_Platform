import type {Metadata} from "next";
import "./globals.css"
import Navbar from "@/components/navbar";

export const metadata: Metadata={
    title:"habshaKamsie",
    description:"",
}

export default function RootLayout({children} : {children: React.ReactNode }){
    return(
    <html lang="en" suppressHydrationWarning>
        <body>
            <Navbar/>
            <main>
            {children}
            </main>
        </body>
    </html>
    );
}
