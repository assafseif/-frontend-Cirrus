import Login from "../../components/auth/login/Login";
import Head from "next/head";
import React from "react";

//LOGIN

const login = () => {
  return (
    <section>
      <Head>
        <title>Login</title>
      </Head>
      <Login />
    </section>
  );
};

export default login;
