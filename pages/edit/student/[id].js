import StudentForm from "../../../components/section/studentForm/StudentForm";
import { PutApi, GetApi } from "../../../lib/Apis";
import { parseCookies } from "nookies";
import React from "react";

const id = (props) => {
  const URL = `${process.env.API_URL}/api/students/edit-student/${props.data.data._id}`;
  return (
    <>
      {/* HERE WE USE STUDENT FORM TO EDIT */}
      <StudentForm URL={URL} API={PutApi} data={props.data.data} />
    </>
  );
};

//NOW WE EXTRACT STUDENT WITH SPECIFIC ID AND HERE WHE SHOULD BE THE CREATOR TO FETCH IT AND SEND IT TI STUDENT FORM
export async function getServerSideProps(context) {
  //EXTRACTING JWT FROM COOKIES
  const jwt = parseCookies(context).jwt || null;

  //USE GET API TO GET STUDENT
  const data = await GetApi(
    `${process.env.API_URL}/api/students/get-student/${context.params.id}`,
    jwt
  );
  return {
    props: {
      data,
    },
  };
}

export default id;
