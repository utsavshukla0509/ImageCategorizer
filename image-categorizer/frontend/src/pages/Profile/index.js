import React from "react";
import Joi from "@hapi/joi";
import "./style.css";
import { connect } from "react-redux";
import { getOTP, 
    updateAndVerify ,
    userDetail,
    addUserImage,
    signOut,
    deleteUserImage
} from "../../actions/authAction";
import { Redirect } from 'react-router-dom';

class Profile extends React.Component {
   constructor(props){
     super(props);
    this.state = {
      data: {
        username: "",
        email: "",
        otp: "",
        password: "",
        currentpassword: "",
      },
      errors: {},
      // visible:false
    };
    this.logOut = this.logOut.bind(this);
    this.handleVerify = this.handleVerify.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResend = this.handleResend.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.userDetail();
  }

  

  logOut = () => {
    localStorage.setItem("loggedIn", false);
    this.props.signOut();
  };

  validateProperty = (input) => {
    const { name, value } = input;
    // console.log(name,value);
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    // console.log("input");
    // console.log(input);

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;

    const errors = {};
    result.error.details.forEach(
      (element) => (errors[element.path[0]] = element.message)
    );
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
      // console.log(e);
      if(this.state.data.email !== ""){
        this.props.getOTP(this.state.data.email);
      }
      else{
        // console.log("ehrbfuehbf");
        const {username, password, email,currentpassword ,otp} = this.state.data;
        this.props.updateAndVerify({username, email, password,currentpassword ,otp});
      }
      // let data = {...this.state.data};
      // data.username = "";
      // data.email = "";
      // data.otp = "";
      // data.password = "";
      // data.currentpassword = "";
      // this.setState({data : data})
    };

  handleVerify = (e) =>{
    e.preventDefault();
    // console.log(this.state.data,"verfiy");
    const { username, password, currentpassword, email, otp } = this.state.data;
    this.props.updateAndVerify({ username, email, password,currentpassword, otp });
  };

  handleResend = (e) => {
    e.preventDefault();
    this.props.getOTP(this.state.data.email);
  };

  handleUpload = (e) => {
    e.preventDefault();
    this.props.addUserImage(e.target.files[0]);
  };

  handleDelete = (e) => {
    e.preventDefault();
    this.props.deleteUserImage();
  }

  schema = {
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
    currentpassword: Joi.string().min(8).required().label("Password"),
    otp: Joi.string().min(6).max(6),
  };
   


  render() {

    const { authMessage,userData,isVerify} = this.props;
    const { username, email,otp,password,currentpassword} = this.state.data;
    const {errors} = this.state;
    if(localStorage.getItem('loggedIn') === 'false'){
      return <Redirect to = {"/login"} />
    }

  let coverImage = "https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg";
    console.log(userData);
  if(userData && userData.image !== undefined && userData.image !== "" && userData.image !== null){
    coverImage = userData.image;
  }
  

    return (
      <div>
        <header>
          <div id="slide-out" class="side-nav sn-bg-4 fixed">
            <div class="sidenav-bg mask-strong"></div>
          </div>
          <nav class="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
          {
            authMessage 
            ? 
            (<p className={"fade-out"}> {authMessage}</p>)
            
            : 
              (<> </>)
          }
           
            <ul class="nav navbar-nav nav-flex-icons ml-auto">
              <li class="nav-item dropdown">
                <a
                  class="nav-link "
                  href="/dashboard"
                  id="userDropdown"
                  style={{ color: "black" }}
                >
                  <i class="fas fa-home"></i>{" "}
                  <span class=" clearfix d-none d-sm-inline-block">
                    Dashboard
                  </span>
                </a>
              </li>

              <li class="nav-item">
                <a
                  class="nav-link waves-effect"
                  onClick={this.logOut}
                  style={{ color: "black" }}
                >
                  <i class="fas fa-sign-out-alt"></i>{" "}
                  <span class="clearfix d-none d-sm-inline-block">Log out</span>
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main style={{ paddingLeft: "0px" }}>
          <div class="container-fluid bg-image-profile">
            <section class="section">
              <div class="rowp">
                <div class="col-lg-4 mb-4">
                  <div class="card card-cascade narrower">
                    <div class="view view-cascade gradient-card-header mdb-color lighten-3">
                      <h5 class="mb-0 font-weight-bold">Edit Photo</h5>
                    </div>
                    <div class="card-body card-body-cascade text-center">
                      <img
                        src={coverImage}
                        alt="User Photo"
                        class="z-depth-1 mb-1 mx-auto profile-img"
                        
                      />

                      <div class="rowp flex-center">
                        <input
                          id="user_input_file"
                          name="image_input_file"
                          onChange={this.handleUpload}
                          accept="image/*"
                          type="file"
                          style={{ visibility: "hidden" }}
                        />

                        <a
                          class=" btn btn-info btn-rounded btn-sm"
                          onClick={() =>
                            document.getElementById("user_input_file").click()
                          }
                          for="file"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Upload your photo
                        </a>

                        {/* <button className="btn btn-info btn-rounded btn-sm">Upload New Photo</button><br/> */}
                        <button className="btn btn-danger btn-rounded btn-sm"
                        onClick = {this.handleDelete}
                        >Delete</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={"align-user-details"}
                  style={{ display: "contents" }}
                >
                  <div class="col-lg-8 mb-4">
                    <div class="card card-cascade narrower">
                      <div class="view view-cascade gradient-card-header mdb-color lighten-3">
                        <h5 class="mb-0 font-weight-bold">Account Details</h5>
                      </div>

                      <div class="card-body card-body-cascade text-center">
                        <form onSubmit={this.handleSubmit}>
                          <div class="md-form">
                            <input
                              type="text"
                              name="username"
                              id="orangeForm-name"
                              class="form-control"
                              error={errors["username"]}
                              onChange={this.handleChange}
                              value={username}
                            />
                            <label for="orangeForm-name">Your name</label>
                            {errors["username"] && (
                          <div className="alert alert-danger">
                            {" "}
                            {errors["username"]}{" "}
                          </div>
                        )}
                          </div>
                          <div class="md-form">
                            <input
                              name="email"
                              id="orangeForm-email"
                              class="form-control"
                              type="email"
                              onChange={this.handleChange}
                              value={email}
                            />
                            <label for="orangeForm-email">Your email</label>
                            {errors["email"] && (
                          <div className="alert alert-danger">
                            {" "}
                            {errors["email"]}{" "}
                          </div>
                        )}
                          </div>

                          {isVerify ? (
                            <div class="md-form">
                              <i class="fas fa-key prefix set_icon"></i>
                              <input
                                type="text"
                                name="otp"
                                id="orangeForm-otp"
                                class="form-control"
                                error={errors["otp"]}
                                onChange={this.handleChange}
                                value={otp}
                              />
                              <label for="orangeForm-otp">Enter OTP</label>
                            </div>
                          ) : (
                            ""
                          )}

                          {/* {authMessage ? (
                            <p className="bg-info text-white"> {authMessage}</p>
                          ) : (
                            <> </>
                          )} */}
                          {isVerify ? (
                            <div style={{ display: "flex" }}>
                              <div class="text-center">
                                <button
                                  class="btn btn-indigo btn-rounded mt-5"
                                  type="button"
                                  onClick={this.handleVerify}
                                >
                                  {"Verify & Update"}
                                </button>
                              </div>

                              <div class="text-center">
                                <button
                                  class="btn btn-indigo btn-rounded mt-5"
                                  type="button"
                                  onClick={this.handleResend}
                                >
                                  Resend
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div class="text-center">
                              <button
                                class="btn btn-info btn-lg btn-rounded mt-5"
                                type="button"
                                disabled = {(username !== "" || email !== "" ) ? false : true}
                                onClick={this.handleSubmit}
                              >
                                Update
                              </button>
                            </div>
                          )}
                        </form>
                      </div>
                    </div>
                    <div class="card card-cascade narrower mt-5">
                      <div class="view view-cascade gradient-card-header mdb-color lighten-3">
                        <h5 class="mb-0 font-weight-bold">Change password</h5>
                      </div>

                      <div class="card-body card-body-cascade text-center ">
                        <form onSubmit={this.handleSubmit}>
                          <div class="md-form pass">
                            <input
                              name="password"
                              id="orangeForm-pass"
                              class="form-control pass"
                              type="password"
                              onChange={this.handleChange}
                              value={password}
                            />
                            <label for="orangeForm-pass">
                              Current password
                            </label>
                          </div>
                          <div class="md-form repass">
                            <input
                              name="currentpassword"
                              id="orangeForm-repass"
                              class="form-control repass"
                              type="password"
                              onChange={this.handleChange}
                              value={currentpassword}
                            />
                            <label for="orangeForm-repass">New password</label>
                            {errors["password"] && (
                          <div className="alert alert-danger">
                            {" "}
                            {errors["password"]}{" "}
                          </div>
                        )}
                          </div>
                          <div class="text-center">
                            <button
                              class="btn btn-info btn-lg btn-rounded mt-5"
                              type="button"
                              disabled = {(password !== "" && currentpassword !== "" ) ? false : true}
                              onClick={this.handleSubmit}
                            >
                              Update
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authMessage: state.auth.authMessage,
    userData: state.auth.userData,
    loggedIn: state.auth.loggedIn,
    isVerify : state.auth.isVerify
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    userDetail: () => dispatch(userDetail()),
    updateAndVerify: (creds) => dispatch(updateAndVerify(creds)),
    getOTP: (email) => dispatch(getOTP(email)),
    signOut: () => dispatch(signOut()),
    addUserImage: (image) => dispatch(addUserImage(image)),
    deleteUserImage : () => dispatch(deleteUserImage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
