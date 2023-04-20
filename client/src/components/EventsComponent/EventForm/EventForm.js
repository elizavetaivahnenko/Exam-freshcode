import React from "react";
import { Formik, Form, Field } from "formik";
import styles from "./EventForm.module.scss";
import DateInput from "../../DateInput/DateInput";
import FormInput from "../../FormInput/FormInput";
import Schems from "../../../validators/validationSchems";

export default function EventForm({ setEvents }) {
  const handlerValues = (values) => {
    values.firstDate = new Date();
    setEvents((events) => [values, ...(events || [])]);
  };

  const formInputClasses = {
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
    valid: styles.valid,
  };

  return (
    <section className={styles.eventForm}>
      <h3 className={styles.title}>Track time to create new content</h3>
      <Formik
        initialValues={{
          name: "",
          date: "",
          toggle: false,
          time: "",
        }}
        validationSchema={Schems.EventsSchema}
        onSubmit={(values, { resetForm }) => {
          handlerValues(values);
          resetForm({
            values: {
              name: "",
              date: "",
              toggle: false,
              time: "",
            },
          });
        }}
      >
        {({ values }) => (
          <Form className={styles.formContainer}>
            <div className={styles.mainContent}>
              <FormInput
                classes={formInputClasses}
                name="name"
                label="Enter event name"
              />
              <DateInput classes={formInputClasses} name="date" />
            </div>
            <div className={styles.notificationContent}>
              <div className={styles.container}>
                <label className={styles.toggleName} htmlFor="toggle">
                  Notify me in advance of this event
                </label>
                <Field
                  type="checkbox"
                  name="toggle"
                  className={styles.toggleCheckbox}
                />
              </div>
              {values.toggle && (
                <div className={styles.select}>
                  <Field name="time" as="select">
                    <option>Select time</option>
                    <option value="1 hours">
                      1 hour before the upcoming event
                    </option>
                    <option value="6 hours">
                      6 hours before the upcoming event
                    </option>
                    <option value="24 hours">
                      24 hours before the upcoming event
                    </option>
                    <option value="72 hours">
                      3 days before the upcoming event
                    </option>
                    <option value="week">
                      1 week before the upcoming event
                    </option>
                  </Field>
                </div>
              )}
            </div>
            <button type="submit" className={styles.submitButton}>
              CREATE
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
