import React, { useState } from "react";
import { FormContainer } from "./style";
import { PostApi } from "../../../lib/Apis";

export const TeacherForm = ({ data, API, URL }) => {
  //STATE FOR SAVING DATA
  const [formData, setFormData] = useState({
    Name: data?.Teacher?.Name || "",
    Birthday: data?.Teacher?.Birthday || "",
    Address: data?.Teacher?.Address || "",
    Students: [],
  });

  //SETTING STATE FOR STUDENTS SO WHEN ADD ONE TO FORMDATA STUDENTS WE REMOVE IT FROM HERE
  const [Stud, setStud] = useState(data.Students);

  //STATE FOR SETTING ERROR
  const [error, setError] = useState();

  //ON EACH CHANGE WE SAVE DATA OF FORMDATA
  function handleChange(e) {
    const { name, value, type } = e.target;

    //IF WE USE SELECT OPTION THEN ON EACH CLICK WE REMOVE IT FROM STUD STATE
    if (type === "select-multiple") {
      setStud(Stud.filter((student) => student._id !== value));
    }
    setFormData((prev) => {
      return {
        ...prev,

        //IF WE USE OPPPTION WE PUSH NEW ID IN ARRAY
        [name]: type === "select-multiple" ? [...prev.Students, value] : value,
      };
    });
  }

  //HERE WHEN USER SUBMIT
  async function handleSubmit(e) {
    //FOR PREVENTING RELOAD
    e.preventDefault();

    //SETERROR EMPTY
    setError();

    try {
      //SENDING FORMDATA TO SERVER SIDE DEPENDING ON API
      const ServerData = await API(formData, URL);

      //IF DATA SUCCESS AND WE ARE ADDING NOT EDITING THEN RE EMPTY STATE
      if (!data?.Teacher && ServerData.success) {
        setFormData((prevFormData) => {
          return {
            Name: "",
            Birthday: "",
            Address: "",
            Students: [],
          };
        });

        //AND REPUT ALL THE STUDENTS TO THE STATE
        setStud(Students);
      }

      //ELSE SETTING ERROR
      setError(ServerData?.error?.message || ServerData?.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <FormContainer onSubmit={handleSubmit}>
        <label htmlFor="Name">Teacher name:</label>
        <br />
        <input
          type="text"
          placeholder="Enter your name"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
        />
        <label htmlFor="date">Teacher Birthday:</label>
        <br />
        <input
          type="date"
          placeholder="Your Birthday"
          name="Birthday"
          value={formData.Birthday}
          onChange={handleChange}
        />
        <label htmlFor="Address">Teacher Address:</label>
        <br />
        <input
          type="text"
          placeholder="542 W. 15th Street"
          name="Address"
          value={formData.Address}
          onChange={handleChange}
        />
        <label htmlFor="student">Choose your Students:</label>
        <br />
        <select
          id="favColor"
          value={formData.Students}
          onChange={handleChange}
          name="Students"
          multiple
        >
          {/* HERE WE MAP STUD AND WE PUT VALUE ID AND WHEN STUDENT CLICK WE STORE THE ID AND REMOVE THIS ID FROM STUD */}
          {Stud.map((student, index) => {
            return (
              <option value={student._id} key={index}>
                {student.Name}
              </option>
            );
          })}
        </select>
        <br />
        <button>
          {/* HERE WE CHECK TO PUT ADD OR EDIT */}
          {data?.Teacher?.Name === undefined ? "Add Teacher" : "Edit Teacher"}
        </button>
      </FormContainer>
    </>
  );
};
