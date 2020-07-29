import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { getUsers } from "./apiUsers";
import "../mysass.scss";
// import MapWrapped from './Map'
import Avatar from "@material-ui/core/Avatar";
import Loading from "./Loading";
import Typography from "@material-ui/core/Typography";

const useStyles = (theme) => ({
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    marginLeft: "40px",
  },
  medium: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginLeft: "40px",
  },
  modalStyles: {
    marginLeft: theme.spacing(135),
    marginTop: theme.spacing(-2),
  },
  backDrop: {
    background: "none",
  },
  chatButton: {
    marginLeft: theme.spacing(45),
    marginTop: theme.spacing(10),
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  extraSmall: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  chatBody: {
    marginLeft: theme.spacing(141),
    marginTop: theme.spacing(71),
  },
  paper: { minWidth: "321px", borderRadius: "7%" },
  tabs: {
    borderBottom: "1px solid #808080",
  },
  tab: {
    matginTop: theme.spacing(70),
  },
});

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultTab: 0,
      user: "",
      open: false,
      chat: false,
      active: false,
      sideNav: false,
      isLoaded: false,
      profiles: [],
    };
  }
  // tab change
  handleTabChange(event, newValue) {
    this.setState({ defaultTab: newValue }, () => {
      // if (this.state.defaultTab === 1) {
      //   // alert("Posts");
      // }
    });
  }

  // custom tabs
  customTabs = () => {
    const { defaultTab } = this.state;
    let { classes } = this.props;
    return (
      <div
        class="p-4 d-flex justify-content-center"
        style={{ marginTop: "15rem" }}
      >
        <Tabs
          orientation="vertical"
          value={defaultTab}
          onChange={this.handleTabChange.bind(this)}
          indicatorColor="white"
        >
          <Tab label="Profile" className={classes.tabs} />
          <Tab label="Posts" className={classes.tabs} />
          <Tab label="Gallery" className={classes.tabs} />
          <Tab label="Todo" />
        </Tabs>
      </div>
    );
  };

  activeStyles = () => {
    const { defaultTab } = this.state;
    if (defaultTab === 0) {
      return (
        <div class="custom-menu">
          <button
            type="button"
            id="sidebarCollapse"
            class="btn btn-primary"
            onClick={this.sideNavClose}
          >
            <i class="fa fa-chevron-right"></i>
            <span class="sr-only">Toggle Menu</span>
          </button>
        </div>
      );
    }
    if (defaultTab === 1) {
      return (
        <div class="post-active">
          <button
            type="button"
            id="sidebarCollapse"
            class="btn btn-primary"
            onClick={this.sideNavClose}
          >
            <i class="fa fa-chevron-right"></i>
            <span class="sr-only">Toggle Menu</span>
          </button>
        </div>
      );
    }
    if (defaultTab === 2) {
      return (
        <div class="gallery-active">
          <button
            type="button"
            id="sidebarCollapse"
            class="btn btn-primary"
            onClick={this.sideNavClose}
          >
            <i class="fa fa-chevron-right"></i>
            <span class="sr-only">Toggle Menu</span>
          </button>
        </div>
      );
    }
    if (defaultTab === 3) {
      return (
        <div class="todo-active">
          <button
            type="button"
            id="sidebarCollapse"
            class="btn btn-primary"
            onClick={this.sideNavClose}
          >
            <i class="fa fa-chevron-right"></i>
            <span class="sr-only">Toggle Menu</span>
          </button>
        </div>
      );
    }
  };

  customActive = () => {
    const { sideNav } = this.state;
    return (
      <nav class={sideNav ? "sidenavclose" : "sidebar rounded-sidebar"}>
        {this.activeStyles()}
        {this.customTabs()}
      </nav>
    );
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("dynamic id", id);
    this.setState({ isLoaded: true }, () => {
      setTimeout(() => {
        getUsers().then((data) => {
          if (data.error) {
            this.setState({ error: data.error });
          } else {
            console.log("users", data.users);
            let chatProfiles = data.users.slice(0, 6);
            this.setState({
              chatProfiles,
              isLoaded: false,
            });
            this.setState(
              {
                profiles: data.users,
              },
              () => {
                const obj = this.state.profiles
                  .sort(() => Math.random() - Math.random())
                  .slice(0, 2);
                // console.log("random", obj);
                this.setState({
                  randomProfiles: obj,
                });
                // let chatProfiles = this.state.profiles.slice(0, 2);
                // this.setState({
                //   chatProfiles,
                // });
              }
            );
            const users = data.users;
            users.map((user) => {
              if (parseInt(id) === user.id) {
                console.log("matched user", user);
                return this.setState({ user });
              }
            });
            return null; // Nothing found
          }
        });
      }, 3000);
    });
  }
  // open profile  model
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  // sideNav close
  sideNavClose = () => {
    this.setState({
      sideNav: !this.state.sideNav,
    });
  };
  // close profile model
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  // open chat button
  handleClickChatOpen = () => {
    this.setState({
      chat: !this.state.chat,
    });
  };

  // open chat active
  handleClickActiveUser = () => {
    this.setState({
      active: true,
    });
  };
  // close chat button
  handleChatClose = () => {
    this.setState({
      chat: false,
      active: false,
    });
  };
  // close chat active
  handleChatActiveClose = () => {
    this.setState({
      active: false,
      chat: false,
    });
  };
  // navigate to Landing page
  navigateToPage = () => {
    this.props.history.push("/");
  };
  // navigate to select user
  navigateUser = (item) => {
    this.props.history.push(`/user/${item.id}`);
    this.setState(
      {
        open: false,
      },
      () => {
        window.location.reload();
      }
    );
  };
  // random profiles getting
  randomProfiles = () => {
    const { user, open, randomProfiles } = this.state;
    let { classes } = this.props;
    return (
      <Dialog
        onClose={this.handleClose}
        className={classes.modalStyles}
        open={open}
        classes={{ paper: classes.paper }}
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <div class="mx-auto ml-5 my-4 ">
          <div class="text-center">
            <Avatar
              alt={user.name}
              src={user.profilepicture}
              className={classes.medium}
            />
            <h5 class="ml-3 mt-2">{user.name}</h5>
            <h6 class="text-muted">{user.email}</h6>
          </div>
          <ul class="list-group list-group-flush">
            {randomProfiles &&
              randomProfiles.map((item, index) => {
                return (
                  <div class="d-flex mt-3 border-top">
                    <Avatar alt={item.name} src={item.profilepicture} />
                    <h6
                      class="ml-3 mt-3"
                      onClick={() => {
                        this.navigateUser(item);
                      }}
                    >
                      {item.name}
                    </h6>
                  </div>
                );
              })}
          </ul>
          <div class="text-center">
            <button
              type="button"
              class="btn btn-danger mt-4"
              onClick={this.navigateToPage}
            >
              Signout
            </button>
          </div>
        </div>
      </Dialog>
    );
  };
  // Profile Info
  profileInfo = () => {
    const { user } = this.state;
    let { classes } = this.props;
    return (
      <>
        <Avatar
          alt={user.name}
          src={user.profilepicture}
          className={classes.large}
        />

        <div class="ml-4 border-bottom">
          <h3 class="ml-5 mt-3 text-muted">{user.name}</h3>
          <h5 class="dt text-muted ">Username</h5>
          <h5 class="dd">{user.username}</h5>
          <h5 class="dt text-muted ">Email</h5>
          <h5 class="dd">{user.email}</h5>
          <h5 class="dt text-muted ">Phone</h5>
          <h5 class="dd">{user.phone}</h5>
          <h5 class="dt text-muted ">Website</h5>
          <h5 class="dd">{user.website}</h5>
        </div>
        {user.company && (
          <div>
            <h5 class="text-muted text-center">Company</h5>
            <h5 class="dt text-muted ">Name</h5>
            <h5 class="dd">{user.company.name}</h5>
            <h5 class="dt text-muted ">catchphrase</h5>
            <h5 class="dd mr-3">{user.company.catchPhrase}</h5>
            <h5 class="dt text-muted ">bs</h5>
            <h5 class="dd">{user.company.bs}</h5>
          </div>
        )}
      </>
    );
  };
  // Coming soon
  comingSoon = (value) => {
    console.log("value", value);
    return (
      <div class=" h-100 d-flex justify-content-center align-items-center">
        <Typography variant="h1" component="h2" color={`${value}`} gutterBottom>
          Coming Soon
        </Typography>
      </div>
    );
  };
  // Profile Header
  profileHeader = () => {
    const { user } = this.state;
    return (
      <>
        <div class="d-flex pb-3" onClick={this.handleClickOpen}>
          <Avatar alt={user.name} src={user.profilepicture} />
          <h5 class="ml-3 mt-2">{user.name}</h5>
        </div>
        {/* style={{marginLeft:"73rem",marginTop:"-27rem"}} */}
        {this.randomProfiles()}
      </>
    );
  };

  // Profile address

  profileAddress = () => {
    const { user, chat, chatProfiles, active } = this.state;
    console.log("profiles", chatProfiles);
    let { classes } = this.props;
    return (
      <>
        {user.address && (
          <div class="ml-4">
            <h5 class="text-muted ">Address</h5>
            <div>
              <h5 class="dt text-muted ">Street</h5>
              <h5 class="dd">{user.address.street}</h5>
              <h5 class="dt text-muted ">Suite</h5>
              <h5 class="dd">{user.address.suite}</h5>
              <h5 class="dt text-muted ">City</h5>
              <h5 class="dd">{user.address.city}</h5>
              <h5 class="dt text-muted ">Zipcode</h5>
              <h5 class="dd">{user.address.zipcode}</h5>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1456.6401543078075!2d78.38525420892037!3d17.486765309978374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x49c345e1ce438676!2sAyyappa+Towers!5e0!3m2!1sen!2sin!4v1538894997068"
              width="100%"
              height="400"
              class="rounded-map ml-4 mt-2"
              title="map"
              frameBorder="0"
              allowFullScreen
            />
            {user.address.geo && (
              <div class="float-right d-flex">
                <h6 class="text-muted">Lat : {user.address.geo.lat}</h6>
                <h6 class=" text-muted ml-3">Long : {user.address.geo.lng}</h6>
              </div>
            )}
          </div>
        )}
      </>
    );
  };

  chatSection = () => {
    const { user, chat, chatProfiles, active } = this.state;
    console.log("profiles", chatProfiles);
    let { classes } = this.props;
    return (
      <div class="row mt-5">
        <div class="col-6">
          <div class="d-flex ">
            {active ? (
              <div>
                <div
                  class="p-2 text-white"
                  style={{
                    borderTopLeftRadius: "14px",
                    borderTopRightRadius: "14px",
                    backgroundColor: "#2C65C8",
                  }}
                >
                  <div class="d-flex">
                    <Avatar
                      alt="Remy Sharp"
                      src={user.profilepicture}
                      className={classes.extraSmall}
                    />
                    <span class="ml-3">{user.name}</span>
                    <div class="ml-5">
                      <i class="fa fa-chevron-up ml-5"></i>
                      <i
                        class="fa fa-times ml-3 cursor-pointer"
                        aria-hidden="true"
                        onClick={this.handleChatActiveClose}
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="card" style={{ minWidth: "20rem" }}>
                  <div class="card-body center-col ">
                    <div class="received_withd_msg">
                      <p>H1,How are you</p>
                    </div>
                    <div class="sent_msg mt-3">
                      <p>Good Whats going on buddy</p>
                    </div>
                    <div class="received_withd_msg mt-3">
                      <p>Nothing Nice to meet you</p>
                    </div>
                    <div class="sent_msg mt-3">
                      <p>K, Bye Nice to meet you see you later</p>
                    </div>

                    <div class="type_msg">
                      <div class="input_msg_write">
                        <input
                          type="text"
                          class="write_msg"
                          placeholder="Type a message"
                        />
                        {/* <button class="msg_send_btn" type="button"> */}
                        {/* <i class="fa fa-paper-plane" aria-hidden="true"></i> */}
                        <i
                          class="fa fa-chevron-right"
                          style={{
                            marginLeft: "-27px",
                            fontSize: "20px",
                            color: "#2C65C8",
                          }}
                        ></i>
                        {/* </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div class="col-6" style={{ minWidth: "20rem" }}>
          <div
            class="p-1"
            style={{
              borderTopLeftRadius: "14px",
              borderTopRightRadius: "14px",
              backgroundColor: "#2C65C8",
            }}
          >
            <div class="card-title text-white pt-2">
              <span
                class="mt-2"
                style={{ marginRight: "9rem", marginLeft: "1rem" }}
              >
                <i class="fa fa-comment mr-2"></i>
                <span>Chats</span>
              </span>

              <i
                class="fa fa-chevron-up ml-4 cursor-pointer"
                onClick={this.handleClickChatOpen}
              ></i>
            </div>
          </div>
          {chat ? (
            <div>
              <div class="card" style={{ minWidth: "18rem", height: "11rem" }}>
                <div class="card-body center-col">
                  {chatProfiles.map((profile) => {
                    return (
                      <div class="d-flex bd-highlight">
                        <div class="bd-highlight">
                          <Avatar
                            alt="Remy Sharp"
                            src={profile.profilepicture}
                            className={classes.small}
                          />
                        </div>
                        <div class=" bd-highlight">
                          <p
                            class="mt-1 ml-3 cursor-pointer"
                            onClick={
                              profile.name === "Ervin Howell" ||
                              profile.name === "Clementine Bauch"
                                ? this.handleChatClose
                                : this.handleClickActiveUser
                            }
                          >
                            {profile.name}{" "}
                          </p>
                        </div>
                        <div class="ml-auto bd-highlight">
                          <p
                            class={
                              (profile.name === "Ervin Howell") |
                              (profile.name === "Clementine Bauch")
                                ? "ui-state-disabled"
                                : "ui-state"
                            }
                          ></p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };

  render() {
    return (
      <>
        <div class="wrapper d-flex align-items-stretch p-5">
          {this.customActive()}
          <div id="content" class="p-2 p-md-4">
            <>
              {this.state.defaultTab === 0 && (
                <>
                  <div class="mx-5 d-flex justify-content-between border-bottom">
                    <h4>Profile</h4>
                    {/* <div class="d-flex">
                  <Avatar alt={user.name} src={user.profilepicture} />
                  <h5 class="ml-3 mt-2">{user.name}</h5>
                </div> */}
                    {this.state.isLoaded ? <h5>Loading....</h5>:this.profileHeader()}
                  </div>
                  {this.state.isLoaded ? <Loading />:
                  <div class="container p-2">
                    <div class="row">
                      <div class="col-5 border-right">{this.profileInfo()}</div>
                      <div class="col-7">{this.profileAddress()}</div>
                    </div>
                  </div>
  }
                </>
              )}
              {this.state.defaultTab === 1 && (
                <>
                  <div class="mx-5 d-flex justify-content-between border-bottom">
                    <h4>Posts</h4>
                    {this.profileHeader()}
                  </div>
                  {this.comingSoon("textSecondary")}
                </>
              )}

              {this.state.defaultTab === 2 && (
                <>
                  <div class="mx-5 d-flex justify-content-between border-bottom">
                    <h4>Gallery</h4>
                    {this.profileHeader()}
                  </div>
                  {this.comingSoon("primary")}
                </>
              )}
              {this.state.defaultTab === 3 && (
                <>
                  <div class="mx-5 d-flex justify-content-between border-bottom">
                    <h4>Todo</h4>
                    {this.profileHeader()}
                  </div>
                  {this.comingSoon("secondary")}
                </>
              )}
            </>
          </div>
        </div>

        <div
          class="float-right"
          style={{ marginRight: "2rem", marginTop: "-8rem" }}
        >
          {/* <button
            type="button"
            class="btn btn-warning"
            onClick={() => alert("Hello")}
          >
            Warning
          </button> */}
          {this.chatSection()}
        </div>
      </>
    );
  }
}
export default withStyles(useStyles)(User);
