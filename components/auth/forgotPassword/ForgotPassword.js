import { useState, useEffect } from "react";
import { PostApi } from "../../../lib/Apis";
import { FormContainer } from "./style";
import { useRouter } from "next/router";
import React from "react";

const ForgotPassword = () => {
  const router = useRouter();

  //USE STATE FOR ERROR IF ERROR OCCURED
  const [error, setError] = useState();

  //USE STATE FOR STORING DATA
  const [formData, setFormData] = useState({
    Email: "",
  });

  //ON EACH CHANGE WE STORE VALUES IN FORMDATA
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  // WHEN USE SUBMIT WE GO HERE
  async function handleSubmit(e) {
    //TO PREVENT RELOADING
    e.preventDefault();

    try {
      //HERE WE POST DATA TO BACKEND
      const data = await PostApi(
        formData,
        `${process.env.API_URL}/api/auth/forgotPassword`
      );

      //IF SUCCESS REDIRECT TO HOME PAGE
      if (data.success) {
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }

      //ELSE SETTING THE ERROR
      setError(data?.message);
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
        <button>Submit</button>
      </FormContainer>
    </>
  );
};

export default ForgotPassword;
