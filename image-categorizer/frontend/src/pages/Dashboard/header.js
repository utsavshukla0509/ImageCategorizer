import React from "react";
import img from "./dashboardUserImage.jpg";
import FileUpload from "./fileUpload";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userDetail, signOut } from "../../actions/authAction";
import MultiDropDown from "./multiDropDown";

class Header extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        logout_status: localStorage.getItem("loggedIn")
      };
      this.logOut = this.logOut.bind(this);
    }

  componentDidMount() {
   this.props.userDetail();
  }

  logOut = () => {
    this.setState({ logout_status: false });
    localStorage.setItem("loggedIn", false);
    this.props.signOut();
  };

   checkClass(opt, active) {
    return opt === active ? ' active' : '';
  }

  render() {
    const { authMessage, userData ,active,onOption} = this.props;
    // console.log("user",this.props);
    let coverImage = img;
    if(userData && userData.image !== undefined && userData.image !== "" && userData.image !== null){
      coverImage = userData.image;
    }

    if (!this.state.logout_status) {
      return <Redirect to="/login" />;
    }

    return (
      <header>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
          
          <div className="container-fluid">
            {
              userData && userData.username ?
              <p style = {{
                color : "#2196f3",
                width : "40%",
                marginTop : "20px",
                fontWeight : "600",
                fontSize : "110%"
              }}>Hi, {userData.username[0].toUpperCase() + userData.username.slice(1)}</p>
              :
              <></>
            }
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <div className="dropdown">
                    <FileUpload />
                  </div>
                </li>
                <MultiDropDown />
                <li className="nav-item">
                  <div className="dropdown ">
                    <img
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        marginTop: "3px",
                        cursor: "pointer",
                      }}
                      src={coverImage}
                      alt="Avatar"
                      className="avatar dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                    />

                    <div
                      className="dropdown-menu  dropdown-menu-right"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        className="dropdown-item "
                        id="filebtn"
                        href="http://localhost:3000/profile"
                      >
                        My Profile
                      </a>
                      <a
                        className="dropdown-item "
                        id="filebtn2"
                        onClick={this.logOut}
                      >
                        Log out
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="sidebar-fixed position-fixed">
          <a className="logo-wrapper waves-effect" href = "http://localhost:3000/dashboard">
            <h2>
              <strong className="blue-text ">ImageCat</strong>
            </h2>
          </a>
          <div className="list-group list-group-flush">
            <a href="#" onClick = {()=>{onOption("label")}} 
              className = {"list-group-item waves-effect" + this.checkClass("label",active)}>
              <i className="far fa-images mr-3"></i>Label</a>
            <a href="#" 
              onClick = {()=>{onOption("date")}} 
              className = {"list-group-item waves-effect" + this.checkClass("date",active)}>
              <i className="fas fa-clock mr-3"></i>Date</a>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authMessage: state.auth.authMessage,
    userData: state.auth.userData,
    // images: state.image.images,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    userDetail: () => dispatch(userDetail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
