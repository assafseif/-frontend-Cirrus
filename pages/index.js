import StudentCard from "../components/section/StudentCard";
import TeacherCard from "../components/section/TeacherCard";
import styles from "../styles/Home.module.css";
import { parseCookies } from "nookies";
import { GetApi } from "../lib/Apis";
import { useState } from "react";
import Head from "next/head";

export default function Home(props) {
  //USE STATE FOR SHOW AND SETSHOW TO SEE WETHERE THE USER NEED TO SEE STUDENTS OR TEACHERS

  const [show, setShow] = useState(true);
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1
        style={{ textDecoration: "underline", cursor: "pointer" }}
        // WHEN USER CLICK IT CHANGE STATE

        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        {/* USE THIS LOGIC TO USER SEE WHERE HE IS */}
        {show ? "All Teachers" : "All Students"}
      </h1>
      <hr />
      {show
        ? //HERE IF USER WHANT TO SEE TEACHERS WE USE THIS LOGIC
          props?.data?.data?.length > 0 &&
          props.data.data.map((teacher, index) => {
            return (
              <div key={index}>
                <TeacherCard teacher={teacher} />
                <hr />
              </div>
            );
          })
        : // ELSE WE USE THIS ONE TO FETCH STUDENTS
          props?.Students?.Students.length > 0 &&
          props.Students.Students.map((student, index) => {
            return (
              <div key={index}>
                <StudentCard student={student} />
                <hr />
              </div>
            );
          })}
    </>
  );
}

export async function getServerSideProps(context) {
  const jwt = parseCookies(context).jwt || null;
  const data = await GetApi(
    `${process.env.API_URL}/api/teachers/fetch-teachers`
  );
  const Students = await GetApi(
    `${process.env.API_URL}/api/students/get-students`
  );
  return {
    props: {
      data,
      Students,
    },
  };
}
