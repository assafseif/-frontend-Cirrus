import { TeacherForm } from "../../components/section/teacherForm/TeacherForm";
import { PostApi, GetApi } from "../../lib/Apis";
import { parseCookies } from "nookies";
import Head from "next/head";

//ADD SINGLE TEACHER

export default function Home(props) {
  const URL = `${process.env.API_URL}/api/teachers/add-teacher`;
  return (
    <>
      <Head>
        <title>Add New Teacher</title>
      </Head>
      {/* USE TAECHER FORM TO ADD TEACHER */}
      <TeacherForm data={props.data} API={PostApi} URL={URL} />
    </>
  );
}

//ON EACH REQUEST WE CALL GETAPI TO RETRIVE STUDENTS
export async function getServerSideProps(context) {
  const data = await GetApi(`${process.env.API_URL}/api/students/get-Students`);
  return {
    props: {
      data,
    },
  };
}
