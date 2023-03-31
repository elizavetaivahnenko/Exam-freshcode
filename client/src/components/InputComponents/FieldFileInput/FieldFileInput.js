import React from "react";
import { Field } from "formik";

const FieldFileInput = ({ classes, name }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;

  return (
    <Field name={name}>
      {({ field, form }) => {
        const getFileName = () => (field.name ? field.value.name : "");

        return (
          <div className={fileUploadContainer}>
            <label htmlFor="fileInput" className={labelClass}>
              Choose file
            </label>
            <span id="fileNameContainer" className={fileNameClass}>
              {getFileName()}
            </span>
            <input
              {...field}
              value=""
              onChange={(event) =>
                form.setFieldValue("file", event.target.files[0])
              }
              className={fileInput}
              id="fileInput"
              type="file"
            />
          </div>
        );
      }}
    </Field>
  );
};

export default FieldFileInput;
