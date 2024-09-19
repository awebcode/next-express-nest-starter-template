import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../providers/ThemeProvider";
import Navbar from "../components/header/Header";
import { generateSEO, generateViewport } from "@/config/seo/seo";
import Footer from "../components/Footer";
import ScrollToTop from "../components/reusables/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/QueryProvider";
import ProgressBar from "@/components/reusables/ProgressBar";
// In app directory
// import { ArticleJsonLd, DefaultSeo } from "next-seo";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700", "900"], variable: "--font-poppins" });
// setup SEO
export const viewport = generateViewport({});
// setup SEO
export const metadata = generateSEO({})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} ${poppins.variable} antialiased min-h-screen flex justify-around flex-col gap-4 `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <QueryProvider>

          <Navbar />
          {/* Blur background elements */}
          {/* <div className="absolute top-[0%] left-[5%] h-[35rem] w-[45rem] bg-pink-200  rounded-full blur-3xl dark:bg-gray-800 "></div>
          <div className="absolute top-[0%] right-[5%] h-[35rem] w-[45rem] bg-blue-200  rounded-full blur-3xl dark:bg-gray-700"></div> */}
          <main className="flex-grow">
            {children}
          </main>
          <footer>
            <Footer/>
            </footer>
          </QueryProvider>
          <Toaster toastOptions={{ duration: 3000, }} theme="light" />
          <ScrollToTop />
          <ProgressBar/>
        </ThemeProvider>
      </body>
    </html>
  );
}
