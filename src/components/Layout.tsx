import Head from 'next/head'
import {ReactNode, useEffect} from "react";
import {useRouter} from "next/router";
import {FavProvider} from "../hooks/FavContext";
import Link from "next/link";

type LayoutProps = {
    title: string;
    children: ReactNode;
};

// renders the layout of the application (header, footer, etc.)
// also renders common components between pages like the navigation component
const Layout = ({title, children}: LayoutProps) => {
    const {pathname} = useRouter()

    return (
        <FavProvider>
            <div className="hero max-h-[95vh] md:min-h-full bg-base-300 overflow-auto pb-8">
                <Head>
                    <title>{title}</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <main className="container mx-auto pt-8 min-h-screen bg-base-300">
                    {children}
                </main>

            </div>
            <div className="btm-nav">
            <Link className={pathname === '/' ? 'active' : ''} href="/">
                <div> <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                <span className="btm-nav-label">Home</span></div>
            </Link>
            <Link className={pathname === '/favorites' ? 'active' : ''} href="/favorites">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                    <span className="btm-nav-label">Favorites</span>
                </div>
            </Link>
        </div>
        </FavProvider>
    )
}
export default Layout