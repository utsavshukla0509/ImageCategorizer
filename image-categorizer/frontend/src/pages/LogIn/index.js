import React from "react";
import Joi from "@hapi/joi";

import _ from "lodash";
import { connect } from "react-redux";
import { signIn } from "../../actions/authAction";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
      },
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validateProperty = (input) => {
    const { name, value } = input;
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
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
    const errors = this.validate();
    if (_.isEmpty(errors)) this.props.signIn(this.state.data);
  };

  saveUserDetais(user, loggedIn) {
    if (loggedIn) {
      localStorage.setItem("name",user.token);
    //  localStorage.setItem("name",user.userInfo.userid)
      localStorage.setItem("loggedIn", true);
    }
  }

  render() {
    const { data, errors } = this.state;
    const { email, password } = data;
    const { authMessage, loggedIn, userData } = this.props;
    if (loggedIn) this.props.history.push("/dashboard");
    return (
      <div className="bg-image-login ">
        <div className=" d-flex h-100 justify-content-center align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-5 col-lg-6 col-md-10 col-sm-12 mx-auto mt-5">
                <div className="card wow fadeIn" data-wow-delay="0.3s">
                  <div className="card-body">
                    <div className="form-header purple-gradient">
                      <h3 className="font-weight-500 my-2 py-1">
                        <i className="fas fa-user"></i> Log in
                      </h3>
                    </div>

                    <form
                      onSubmit={this.handleSubmit}
                      onClick={this.saveUserDetais(userData, loggedIn)}
                    >
                      <div className="md-form">
                        <i className="fas fa-envelope prefix "></i>
                        <input
                          type="email"
                          name="email"
                          id="orangeForm-email"
                          className="form-control"
                          onChange={this.handleChange}
                          value={email}
                          autoFocus
                        />
                        <label htmlFor="orangeForm-email">Your email</label>
                        {errors["email"] && (
                          <div className="alert alert-danger">
                            {" "}
                            {errors["email"]}{" "}
                          </div>
                        )}
                      </div>

                      <div className="md-form">
                        <i className="fas fa-lock prefix "></i>
                        <input
                          name="password"
                          type="password"
                          onChange={this.handleChange}
                          value={password}
                          id="orangeForm-pass"
                          className="form-control"
                        />
                        <label htmlFor="orangeForm-pass">Your password</label>
                        {errors["password"] && (
                          <div className="alert alert-danger">
                            {" "}
                            {errors["password"]}{" "}
                          </div>
                        )}
                      </div>

                      {authMessage ? (
                        <p className="" style = {{color : "blue"}}> {authMessage}</p>
                      ) : (
                        <> </>
                      )}
                      <div className="text-center">
                        <button
                          className="btn purple-gradient btn-lg"
                          onClick={this.handleSubmit}
                        >
                          Login
                        </button>
                        <div className=" justify-content-center ">
                          <div className=" text-info text-center mt-3 ">
                            <a
                              href="http://localhost:3000/forgotpassword"
                             
                            >
                              <u><strong>Forgot your Password?</strong>  </u>
                            </a>
                            {/* <div
                              style={{
                                backgroundColor: "blue",
                                width: "120px",
                                height: "1px",
                              }}
                            /> */}
                          </div>
                          <div className="d-flex flex-row justify-content-center mt-3">
                            <span className="   mt-2  text-info">
                              No Account?
                            </span>
                            <a href="http://localhost:3000/register">
                              {" "}
                              <button
                                type="button"
                                className="btn btn-info btn-rounded btn-sm"
                              >
                                {" "}
                                Register{" "}
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    authMessage: state.auth.authMessage,
    userData: state.auth.userData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
