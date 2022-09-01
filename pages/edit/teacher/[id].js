import { TeacherForm } from "../../../components/section/teacherForm/TeacherForm";
import { PutApi, GetApi } from "../../../lib/Apis";
import { parseCookies } from "nookies";
import React from "react";

const id = (props) => {
  const data = {
    Students: props.Students.Students,
    Teacher: props.data.data,
  };
  const URL = `${process.env.API_URL}/api/teachers/edit-teacher/${props.data.data._id}`;
  return <>{<TeacherForm data={data} API={PutApi} URL={URL} />}</>;
};

export async function getServerSideProps(context) {
  //EXTRACT JWT FROM COOKIE
  const jwt = parseCookies(context).jwt || null;

  //SAVE SPECIFIC TEACHER TO SEND HIS DATA SO USER WHEN OPEN EDITING HE WILL SEE HIS OLD DATA
  const data = await GetApi(
    `${process.env.API_URL}/api/teachers/get-teacher/${context.params.id}`,
    jwt
  );

  //SAVE STUDENTS TO SEND THEM SO USER HE CAN RE CHOOSE BETWEEN THEM
  const Students = await GetApi(
    `${process.env.API_URL}/api/students/get-Students`,
    jwt
  );
  return {
    props: {
      data,
      Students,
    },
  };
}

export default id;
