import { DeleteApi, GetApi } from "../../../lib/Apis";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import Link from "next/link";
import Head from "next/head";
import React from "react";

//FETCH SINGLE STUDENT
const id = ({ data }) => {
  //INITIALIZE ROUTER TO USE IT WHEN WE PUSH
  const router = useRouter();

  //EXTRACT USER DATA
  const { _id, Name, Birthday, Address, Grade } = data.data;

  //HERE WHEN USER CLICK DELETE
  async function Delete() {
    await DeleteApi(
      `${process.env.API_URL}/api/students/delete-student/${_id}`
    );
    router.push("/");
  }
  return (
    <>
      <Head>
        <title>{Name}</title>
      </Head>
      <section style={{ textAlign: "center" }}>
        <h1>Student :</h1>
        <div style={{ textAlign: "center" }}>
          <h2>Name : {Name}</h2>
          <h2>Birthday :{Birthday.slice(0, 10)}</h2>
          <h2>Address : {Address}</h2>
          <h2>Grade : {Grade}</h2>
        </div>
        <button onClick={Delete}>Delete</button>
        <button>
          <Link href={`/edit/student/${_id}`}>Update</Link>
        </button>
      </section>
    </>
  );
};

//TO SHOW DETAILS THE USER SHOULD BE THE CREATOR OF THIS STUDENT TO DELETE EDIT ...

export async function getServerSideProps(context) {
  //EXTRACT JWT FROM COOKIES
  const jwt = parseCookies(context).jwt || null;

  //SENDING JWT WITH URL AND IF SATA SUCCESS THEN SAVE ALL HIS INFO
  const data = await GetApi(
    `${process.env.API_URL}/api/students/get-student/${context.params.id}`,
    jwt
  );

  //RETURN HIS DATA

  return {
    props: {
      data,
    },
  };
}

export default id;
