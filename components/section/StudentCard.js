import { useSelector, useDispatch } from "react-redux";
import { isPermitted } from "../../lib/token";
import React, { useState } from "react";
import Link from "next/link";

const StudentCard = ({ student }) => {
  //CALL ISLOGGED IN TO CHECK
  const isLoggedIn = useSelector((state) => state.credential.isSignedIn);

  //HERE WE EXTRACT OUR DATA
  const { Name, Birthday, Address, Grade, _id, creator } = student;

  //MAKE STATE SHOW AND SETSHOW TO PUT THEM ON EACH STUDENT CARD
  const [show, setShow] = useState(false);

  //WE CALL IS PERMITTED TO EXTRACT ID FROM JWT AND COMPARE IT WITH CREATOR
  const [isPermit, setIsPermit] = useState(isPermitted());

  return (
    <div>
      <h4>Name: {Name}</h4>
      <h4>Birthday : {Birthday.slice(0, 10)}</h4>
      <h4>Address : {Address}</h4>
      <h4>Grade : {Grade}</h4>
      {/* IF CREATE EQUAL THIS USER SO HE IS THE CREATOR THEN HE CAN VIEW DETAILS ,DELETE ,EDIT  */}
      {isPermit === creator && isLoggedIn ? (
        <Link href={`/fetch/student/${_id}`}>
          <a>More Details!</a>
        </Link>
      ) : (
        "you are not authorized to access this page"
      )}
    </div>
  );
};

export default StudentCard;
