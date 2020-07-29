import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import { BulletList } from "react-content-loader";
import { getUsers } from "./apiUsers";
export default class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isLoaded: false,
    };
  }

  // load Profiles and set form data
  init = () => {
    getUsers().then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        // console.log("users", data.users);

        this.setState({ users: data.users });
      }
    });
  };
  componentDidMount() {
    this.setState({ isLoaded: true }, () => {
      setTimeout(() => {
        this.init();
        this.setState({
          isLoaded: false,
        });
      }, 3000);
    });
  }

  navigateTo = (user, i) => {
    // console.log("user", user);
    this.props.history.push(`/user/${user.id}`);
    // history.push(`/user/${user.id}`);
  };

  render() {
    return (
      <>
        <div class="curved-div">
          <div class="container h-100">
            <div class="row align-items-center h-100">
              <div class="col-6 mx-auto">
                <div
                  class="card justify-content-center shadow-lg"
                  style={{
                    height: "30rem",
                    borderRadius: "3%",
                    marginBottom: "-320px",
                    marginTop: "120px",
                  }}
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
                    {this.state.isLoaded ? (
                      <BulletList />
                    ) : (
                      <>
                        {this.state.users.map((user, i) => (
                          <div
                            class="d-flex pt-2 pl-3 border-bottom"
                            key={`item_${i}`}
                          >
                            <Avatar alt={user.name} src={user.profilepicture} />
                            <h5
                              style={{ cursor: "pointer" }}
                              class="ml-3 mt-2 text-muted"
                              onClick={() => {
                                this.navigateTo(user, i);
                              }}
                            >
                              {user.name}
                            </h5>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <svg viewBox="0 0 1440 319">
            <path
              fill="#fff"
              fill-opacity="1"
              d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </>
    );
  }
}
