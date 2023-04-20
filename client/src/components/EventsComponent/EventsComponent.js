import React from "react";
import EventForm from "./EventForm/EventForm";
import DisplayTimer from "./DisplayTimer/DisplayTimer";
import { useState } from "react";
import styles from "./EventsComponent.module.scss";
import { useLocalStorage } from "../../hook/useLocalStorage";

export default function EventsComponent() {
  const [events, setEvents] = useLocalStorage("myData", null);
  const [isUpdate, setIsUpdate] = useState(true);

  return (
    <main className={styles.eventsComponent}>
      <div className={styles.eventsComponent__container}>
        <EventForm
          setIsUpdate={setIsUpdate}
          events={events}
          setEvents={setEvents}
        />
        <DisplayTimer events={events} />
      </div>
    </main>
  );
}
