import { PostApi } from "../../../lib/Apis";
import React, { useState } from "react";
import { FormContainer } from "./style";

const StudentForm = ({ data, URL, API }) => {
  //USE STATE TO SAVE DATA
  const [formData, setFormData] = useState({
    Name: data?.Name || "",
    Birthday: data?.Birthday || "",
    Address: data?.Address || "",
    Grade: data?.Grade || "",
  });

  //STATE TO SETERROR IF EXIST
  const [error, setError] = useState();

  //ON EACH CHANGE WE SAVE VALUES IN FORMDATA
  function handleChange(e) {
    const { name, value, type } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  //WHEN USER SUBMIT :
  async function handleSubmit(e) {
    //TO PREVENT RELOAD
    e.preventDefault();

    //SETERROR TO EMPTY IF EXIST TO REMOVE THE OLD ONE
    setError();

    try {
      //SENDING DATA DEPENDING ON API
      const data = await API(formData, URL);

      //IF EXISIT THEN PUT ALL DATA EMPTY MIGHT THE USER WHANT TO ADD ANOTHER STUDENT
      if (data.success) {
        setFormData((prevFormData) => {
          return {
            Name: "",
            Birthday: "",
            Address: "",
            Grade: "",
          };
        });
      }
      //ELSE SETTING THE ERRORS
      setError(data?.error?.message || data?.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <FormContainer onSubmit={handleSubmit}>
        <label htmlFor="Name">Student name:</label>
        <br />
        <input
          type="text"
          placeholder="Enter your name"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
        />
        <label htmlFor="date">Student Birthday:</label>
        <br />
        <input
          type="date"
          placeholder="Your Birthday"
          name="Birthday"
          value={formData.Birthday}
          onChange={handleChange}
        />

        <label htmlFor="Address">Student Address:</label>
        <br />
        <input
          type="text"
          placeholder="542 W. 15th Street"
          name="Address"
          value={formData.Address}
          onChange={handleChange}
        />
        <label htmlFor="Grade">Student Grade:</label>
        <br />
        <input
          type="Grade"
          placeholder="Your Grade"
          name="Grade"
          value={formData.Grade}
          onChange={handleChange}
        />

        <button>
          {data?.Name === undefined ? "Add Student" : "Edit Student"}
        </button>
      </FormContainer>
    </>
  );
};

export default StudentForm;
