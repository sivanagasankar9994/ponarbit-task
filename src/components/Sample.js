import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

import { getUsers } from "./apiUsers";

const Users = () => {
  const history = useHistory();
  const [users, setusers] = useState([]);

  useEffect(() => {
    // load Profiles and set form data
    const init = () => {
      getUsers().then((data) => {
        if (data.error) {
          setusers({ ...users, error: data.error });
        } else {
          // console.log("users", data.users);
          setusers(data.users);
        }
      });
    };
    if (!users.length) {
      //api call and setOptions
      init();
    }
  }, [users]);

  // var sectionStyle = {
  //   width: "100vw",
  //   height: "100vh",
  //   backgroundImage: `url(${bgImage})`,
  //   backgroundSize: "cover",
  // };

  // useEffect(() => {
  //   init();
  // }, []);

  // const navigateTo = () => history.push("/user");
  const navigateTo = (user, i) => {
    // console.log("user", user);
    history.push(`/user/${user.id}`);
  };

  return (
    <>
      <div class="header">
        {/* <!--Content before waves--> */}
        <div class="inner-header flex"></div>

        {/* <!--Waves Container--> */}
        <div>
          <svg
            class="waves"
            xmlns="http://www.w3.org/2000/svg"
            xlinkHref="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g class="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7"
              />

              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
        {/* <!--Waves end--> */}
      </div>
      <div class="content">
        <div
          class="card shadow-lg border-0"
          style={{ width: "35rem",height:"35rem", borderRadius: "3%" }}
        >
          <div
            class="p-5 "
            style={{
              borderTopLeftRadius: "14px",
              borderTopRightRadius: "14px",
              backgroundColor: "#F6F6F6",
            }}
          >
            <h5 class="card-title text-muted">Select an account</h5>
          </div>
          <div class="center-col p-3 ">
            {users.map((user, i) => (
              <div class="d-flex pt-2 pl-3 border-bottom" key={`item_${i}`}>
                <Avatar alt={user.name} src={user.profilepicture} />
                <h5
                  style={{ cursor: "pointer" }}
                  class="ml-3 mt-2 text-muted"
                  onClick={() => {
                    navigateTo(user, i);
                  }}
                >
                  {user.name}
                </h5>
              </div>
            ))}
          </div>
      
      
        </div>
     
     
     
      </div>
    </>
  );
};

export default Users;
