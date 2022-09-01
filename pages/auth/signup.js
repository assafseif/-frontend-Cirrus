import Register from "../../components/auth/register/Register";
import Link from "next/Link";
import Head from "next/head";
import React from "react";

//SIGN UP

const signup = () => {
  return (
    <>
      <Head>
        <title>SignUp</title>
      </Head>
      <div>
        <Register />
        <p>
          Registered Before?
          <Link href="/auth/login">Signin Now!</Link>
        </p>
      </div>
    </>
  );
};

export default signup;
