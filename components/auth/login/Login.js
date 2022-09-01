import { setSignedIn } from "../../../feature/credentialSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../../lib/token";
import { useState, useEffect } from "react";
import { PostApi } from "../../../lib/Apis";
import { useRouter } from "next/router";
import { FormContainer } from "./style";
import { setCookie } from "nookies";
import React from "react";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  //USE STATE FOR SETTING ERROR OR MESSAGES IF THERE IS
  const [message, setMessage] = useState();

  //USE STATE FOR SETTING LOGIN INFO
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  // Remove the User's token which saved before.
  useEffect(() => {
    removeToken();
  }, []);

  //SEETING INFO IN FORMDATA IN EACH CHANGE
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      //SENDING TO SERVER SIDE LOGIN INFO

      const data = await PostApi(
        formData,
        `${process.env.API_URL}/api/auth/login`
      );

      //IF SUCCES THEN PUTTING JWT IN COOKIES

      if (data.success) {
        //SETTING SIGNEDIN STATE
        dispatch(setSignedIn());

        //Setting jwt in cookie
        setCookie(null, "jwt", data.jwt, {
          maxAge: 60 * 60 * 24,
          path: "/",
        });
        router.push("/");
      }

      //SETTING ERROR IF EXIST
      setMessage(data?.message);
    } catch (error) {
      console.log(error);
    }
  }

  async function refreshToken(e) {
    e.preventDefault();
    setMessage();

    try {
      //SENDING TO SERVER SIDE REFRESHTOKEN INFO

      const data = await PostApi(
        formData,
        `${process.env.API_URL}/api/auth/refreshToken`
      );

      setMessage(data?.message || data?.data?.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {message && <p>{message}</p>}
      <FormContainer onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="Password"
          value={formData.Password}
          onChange={handleChange}
        />
        <button>Login</button>
      </FormContainer>
      <button
        onClick={() => {
          router.push("/auth/forgotPassword");
        }}
      >
        forget Password ?
      </button>
      <br />
      <p>
        Refresh Token ? If Yes write your Email and
        <button onClick={refreshToken}>click here</button>
      </p>
    </>
  );
};

export default Login;
