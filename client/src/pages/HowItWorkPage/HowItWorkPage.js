import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/HowItWorks/HeroSection/HeroSection";
import "./HowItWorksPageStyle.scss";
import OurService from "../../components/HowItWorks/OurService/OurService";
import Naming from "../../components/HowItWorks/Naming/Naming";
import FaqSection from "../../components/HowItWorks/FaqTopics/FaqSection";
import StartContest from "../../components/HowItWorks/StartContest/StartContest";
import Stats from "../../components/HowItWorks/Stats/Stats";
import Pricing from "../../components/HowItWorks/Pricing/Pricing";
import ClientsSection from "../../components/HowItWorks/ClientsSection/ClientsSection";

export default function HowItWorkPage() {
  return (
    <>
      <Header />
      <main className="main">
        <section className="main__container">
          <HeroSection />
          <OurService />
        </section>
        <hr />
        <section className="main__container-naming">
          <Naming />
        </section>
        <hr />
        <section className="main__container-faq">
          <FaqSection />
        </section>
        <StartContest />
        <section className="main__container-stat">
          <Stats />
          <Pricing />
          <ClientsSection />
        </section>
      </main>
      <Footer />
    </>
  );
}
