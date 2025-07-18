'use client';
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Stats from "../components/Stats";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Navbar from "@/components/Navbar";
import { LoaderCircle } from "lucide-react";
import UserContext from "@/contexts/UserContext";
import { useContext, useEffect } from "react";

export default function Home() {
  const { user, loading } = useContext(UserContext);
  console.log(user);
  
  if (loading) return (
  <div className="fixed w-screen h-screen flex items-center justify-center bg-gray-100">
    <div className='flex items-center justify-center w-[100px] h-[100px] bg-gray-200 rounded-lg shadow-lg'>
        <LoaderCircle className='animate-spin text-gray-600 stroke-3'/>
    </div>
  </div>
)
  return (
    <div className="min-h-screen">
      <div className="flex w-full h justify-center items-center ">
        
            <Navbar/>
        
      </div>
      <div className="pt-8"> 
        <Hero />
        <Services />
        <About />
        <Stats />
        <Contact />     
        <Footer />
      </div>
    </div>
  );
}
