import { DeleteApi, GetApi } from "../../../lib/Apis";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const Teacherid = ({ data }) => {
  const router = useRouter();

  //EXTRACT USER INPPUTS
  const { _id, Name, Birthday, Address, Students } = data.data;

  //WHEN USER DELETE
  async function Delete() {
    await DeleteApi(
      `${process.env.API_URL}/api/teachers/delete-teacher/${_id}`
    );
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>{Name}</title>
      </Head>
      <section style={{ textAlign: "center" }}>
        {/* RETURN TEACHER DATA */}
        <h1>Teacher :</h1>
        <div style={{ textAlign: "center" }}>
          <h2>Name : {Name}</h2>
          <h2>Birthday :{Birthday.slice(0, 10)}</h2>
          <h2>Address : {Address}</h2>
        </div>
        <h1>Students :</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* RETURN ALL STUDENTS BELONG TO THIS TEACHER */}

          {Students.map((stud, index) => {
            return (
              <div style={{ padding: "45px" }} key={index}>
                <h2>Name : {stud.Name}</h2>
                <h2>Grade : {stud.Grade}</h2>
                <h2>Birthday : {stud.Birthday}</h2>
              </div>
            );
          })}
        </div>
        <button onClick={Delete}>Delete</button>{" "}
        <button>
          <Link href={`/edit/teacher/${_id}`}>Update</Link>
        </button>
      </section>
    </>
  );
};

//TO FETCH SINGLE TEACHER THE USER SHOULD BE CREATOR
export async function getServerSideProps(context) {
  //EXTRACT JWT
  const jwt = parseCookies(context).jwt || null;

  //SEND URL AND JWT USING GETAPI AND IF SUCCESS SAVE USER DATA
  const data = await GetApi(
    `${process.env.API_URL}/api/teachers/get-teacher/${context.params.id}`,
    jwt
  );

  //SEND DATA BACK
  return {
    props: {
      data,
    },
  };
}

export default Teacherid;
