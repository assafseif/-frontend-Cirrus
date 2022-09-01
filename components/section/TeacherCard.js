import { useSelector, useDispatch } from "react-redux";
import { isPermitted } from "../../lib/token";
import { DeleteApi } from "../../lib/Apis";
import React, { useState } from "react";
import Link from "next/link";

const TeacherCard = ({ teacher }) => {
  //CALL ISLOGGED IN TO CHECK
  const isLoggedIn = useSelector((state) => state.credential.isSignedIn);

  //EXTRACT OUR DATA
  const { Name, Birthday, Address, Students, _id, creator } = teacher;
  //MAKE STATE SHOW AND SETSHOW TO PUT THEM ON EACH STUDENT CARD
  const [show, setShow] = useState(false);

  //WE CALL IS PERMITTED TO EXTRACT ID FROM JWT AND COMPARE IT WITH CREATOR

  const [isPermit, setIsPermit] = useState(isPermitted());
  return (
    <div>
      <h4>Name: {Name}</h4>
      <h4>Birthday : {Birthday.slice(0, 10)}</h4>
      <h4>Address : {Address}</h4>
      <p>
        {/* HERE WHEN USER CLICK THIS BUTTON WE CHANGE STATE IF ITS TRUE WE SHOW ALL STUDENTS ELSE ONLY STUDENTS LENGTH */}
        <button
          onClick={() => {
            setShow((prev) => !prev);
          }}
        >
          Students
        </button>
        : {Students.length}
      </p>
      {show &&
        Students.map((Student, index) => <p key={index}>{Student.Name}</p>)}

      {/* IF CREATE EQUAL THIS USER SO HE IS THE CREATOR THEN HE CAN VIEW DETAILS ,DELETE ,EDIT  */}

      {isPermit === creator && isLoggedIn ? (
        <Link href={`/fetch/teacher/${_id}`}>
          <a>More Details!</a>
        </Link>
      ) : (
        "you are not authorized to access this page"
      )}
    </div>
  );
};

export default TeacherCard;
