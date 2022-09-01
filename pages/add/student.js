import StudentForm from "../../components/section/studentForm/StudentForm";
import { PostApi } from "../../lib/Apis";
import Head from "next/head";
import React from "react";

//ADD SINGLE STUDENT

const student = () => {
  const URL = `${process.env.API_URL}/api/students/add-student`;

  return (
    <>
      <Head>
        <title>Add New Student</title>
      </Head>
      {/* USE STUDENT FORM TO ADD STUDENT */}
      <StudentForm API={PostApi} URL={URL} />
    </>
  );
};

export default student;
