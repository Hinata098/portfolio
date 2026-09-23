import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Terminal from './components/Terminal';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-cyber-bg text-slate-100 relative overflow-x-hidden selection:bg-cyber-cyan selection:text-black">
      {/* Dynamic Ambient Background Glows with New Color Grade */}
      <div className="fixed top-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full bg-cyber-cyan/10 blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-[25%] right-[-10%] w-[550px] h-[550px] rounded-full bg-cyber-crimson/8 blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-cyber-purple/10 blur-[150px] pointer-events-none -z-10" />

      {/* Main Layout Sections */}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Terminal />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
