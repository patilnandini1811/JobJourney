import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-3xl dark:bg-white text-blue-500">
   
     <NavBar/>
     <HeroSection/>
    </div>
  );
}
