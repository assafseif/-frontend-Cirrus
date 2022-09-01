import { SetLoggedOut } from "../../feature/credentialSlice";
import { removeToken, getToken } from "../../lib/token";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import { DivContainer } from "./style";
import Link from "next/Link";

const Layout = (props) => {
  //IF NO TOKEN THEN
  useLayoutEffect(() => {
    if (!getToken()) {
      //SET STATE TO LOGOUT
      dispatch(SetLoggedOut());
    }
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();

  //EXTRACT PATH NAME TO CHECK AND PUT CLASSNAME ACTIVATE
  const path = router.pathname;

  //GET ISLOGGEDIN STATE TO CHECK AND PUT NAVBAR
  const isLoggedIn = useSelector((state) => state.credential.isSignedIn);

  return (
    <DivContainer>
      <ul>
        <li>
          <Link href="/">
            {path === "/" ? <a className="active">Home</a> : <a>Home</a>}
          </Link>
        </li>
        {!isLoggedIn ? (
          <div>
            <li style={{ float: "right" }}>
              <Link href="/auth/login">
                {path === "/auth/login" ? (
                  <a className="active">login</a>
                ) : (
                  <a>Login</a>
                )}
              </Link>
            </li>
            <li style={{ float: "right" }}>
              <Link href="/auth/signup">
                {path === "/auth/signup" ? (
                  <a className="active">Signup</a>
                ) : (
                  <a>Signup</a>
                )}
              </Link>
            </li>
          </div>
        ) : (
          <div>
            <li>
              <Link href="/add/teacher">
                {path === "/add/teacher" ? (
                  <a className="active">Add Teacher</a>
                ) : (
                  <a>Add Teacher</a>
                )}
              </Link>
            </li>
            <li>
              <Link href="/add/student">
                {path === "/add/student" ? (
                  <a className="active">Add Student</a>
                ) : (
                  <a>Add Student</a>
                )}
              </Link>
            </li>

            <li style={{ float: "right" }}>
              <a
                onClick={() => {
                  removeToken();
                  dispatch(SetLoggedOut());
                }}
              >
                Logout
              </a>
            </li>
          </div>
        )}
      </ul>
    </DivContainer>
  );
};

export default Layout;
