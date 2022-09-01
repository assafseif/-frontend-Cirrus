import { PostApi } from "../../../lib/Apis";
import { FormContainer } from "./style";
import { useState } from "react";
import Router from "next/router";
import React from "react";
const Register = () => {
  //SETTING  STATE FOR ERROR IF EXIST
  const [error, setMessage] = useState();

  //SETTING STATE TO SET DATA ON IT
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    Name: "",
    confirmPassword: "",
  });

  //ON EACH CHANGE WE PUT DATA IN FORMDATA
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  //WHEN USER PRESS SUBMIT WE GO HERE
  async function handleSubmit(e) {
    //TO PREVENT RELOADING
    e.preventDefault();

    try {
      //SENDING DATA TO SERVER SIDE
      const data = await PostApi(
        formData,
        `${process.env.API_URL}/api/auth/register`
      );

      //ELSE IF THERE IS SOME ERROR OR MESSAGES PUT THEM IN STATE
      setMessage(data?.message);

      // IF SUCCESS THEN WE PUSH TO LOGIN PAGE
      if (data.success) {
        setTimeout(() => {
          Router.push("/auth/login");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {error && <p>{error}</p>}
      <FormContainer onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Name"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="Password"
          value={formData.Password}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button>Sign up</button>
      </FormContainer>
    </>
  );
};

export default Register;
