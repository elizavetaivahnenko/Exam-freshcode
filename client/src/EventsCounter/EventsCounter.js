import React from "react";
import { useSelector } from "react-redux";

export default function EventsCounter() {
  const counterEvents = useSelector((state) => state.timers);
  return <div>Total Events: {counterEvents}</div>;
}
