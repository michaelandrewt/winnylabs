// pages/index.tsx
import Head from "next/head";
import type { NextPage } from "next";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const Home: NextPage = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      <Head>
        <title>WinnyLabs | AI Agents for Real Ops</title>
        <meta name="description" content="Agent-native automation for real SMB workflow." />
      </Head>

      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 border-b dark:border-white/10">
        <div className="text-xl font-bold">WinnyLabs</div>
        <nav className="flex gap-4 items-center text-sm">
          <a href="#about" className="hover:underline">About</a>
          <a href="#agents" className="hover:underline">Agents</a>
          <a href="#layout1" className="hover:underline">Layout 2</a>
          <a href="#layout3" className="hover:underline">Layout 3</a>

          <div className="flex items-center gap-2">
            <Button variant="secondary">Get In Touch</Button>
            <Button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="ml-2"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon /> : <Sun />}
            </Button>
          </div>
        </nav>
      </header>

      {/* Rest of your content */}
      <main className="p-6">
        {/* ... */}
      </main>
    </div>
  );
};

export default Home;
