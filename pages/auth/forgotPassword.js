import ForgotPassword from "../../components/auth/forgotPassword/ForgotPassword";
import Head from "next/head";
import React from "react";

//FORGET PASSWORD

const forgotPassword = () => {
  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <div>
        {/* FORGET PASSWORD FORM TO SEND EMAIL */}
        <ForgotPassword />
      </div>
    </>
  );
};

export default forgotPassword;
