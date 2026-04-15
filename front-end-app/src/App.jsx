import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home";
import Aboutus from "./Components/Aboutus";
import Programme from "./Components/Programme";
import Subscribe from "./pages/subscribe";
import Transformation from "./Components/Transformation";
import Confirme from "./pages/Confirme";
import Footer from "./Components/Footer";

function App() {
  const [currentSection, setCurrentSection] = useState("home");
  
  // Gestion du défilement pour changer la section active
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = "";
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute('id');
        }
      });
      
      setCurrentSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll si on arrive avec un paramètre ?s=section depuis une autre page
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const target = params.get('s');
    if (target) {
      // Attendre que les sections soient présentes dans le DOM
      setTimeout(() => scrollToSection(target), 0);
    }
  }, [location.search]);
  
  // Fonction pour faire défiler jusqu'à une section spécifique
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar currentSection={currentSection} scrollToSection={scrollToSection} />
              <section id="home">
                <Home onStartNow={() => scrollToSection('subscribe')} />
              </section>
              <section id="about-us">
                <Aboutus />
              </section>
              <section id="program">
                <Programme />
              </section>
              <section id="transformation">
                <Transformation />
              </section>
              <section id="subscribe">
                <Subscribe />
              </section>
              <Footer scrollToSection={scrollToSection} />
            </>
          }
        />
        <Route
          path="/confirme"
          element={
            <>
              <Navbar isFixed />
              <div className="pt-20">
                <Confirme />
              </div>
            </>
          }
        />
      </Routes>
    </>
    
  );
}

export default App;