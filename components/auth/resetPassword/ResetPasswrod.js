import React from "react";
import { useState } from "react";
import Router from "next/router";
import { PatchApi } from "../../../lib/Apis";
import { FormContainer } from "./style";
const ResetPassword = ({ token }) => {
  //NEW STATE FOR ERROR IF EXIST
  const [error, setError] = useState();

  //STATE FOR DATA TO SAVE THEM
  const [formData, setFormData] = useState({
    Password: "",
    confirmPassword: "",
  });

  //WHEN USER WRITE OR ENTER THIS WILL CHANGE AND STORE THESE DATA IN FORMDATA
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  //WHEN USER SUBMIT THIS WILL HAPPEN
  async function handleSubmit(e) {
    // FOR PREVENTING RELOAD
    e.preventDefault();

    try {
      //SENDING DATA TO BACKEND
      const data = await PatchApi(
        formData,
        `${process.env.API_URL}/api/auth/resetPassword?token=${token}`
      );

      //IF SUCCES REDIRECT TO LOGINPAGE
      if (data.success) {
        setTimeout(() => {
          Router.push("/auth/login");
        }, 1000);
      }

      //ELSE SETTING ERROR
      setError(data?.error?.message || data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {error && <p>{error}</p>}
      <FormContainer onSubmit={handleSubmit}>
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
        <button>Submit</button>
      </FormContainer>
    </>
  );
};

export default ResetPassword;
