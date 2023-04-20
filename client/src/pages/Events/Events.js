import React from "react";
import EventsComponent from "../../components/EventsComponent/EventsComponent";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Events() {
  return (
    <div>
      <Header />
      <EventsComponent />
      <Footer />
    </div>
  );
}
