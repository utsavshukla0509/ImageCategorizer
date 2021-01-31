import React from "react";
import { connect } from "react-redux";
import Header from "./header";
import Footer from "./footer";
import FilterByLabel from "./filterByLabel";
import FilterByDate from "./filterByDate";
// import _ from "lodash";
// import { ImageTable, Pagination } from "../../components";
// import { ListGroup } from "../../components/common";
// import { getImages,downloadLabels, } from "../../actions/imageAction";
// import {
//   getGenres,
//   getAllGenres,
// } from "../../actions/genreAction";


class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentOption : "label",
    };
    this.handleOption = this.handleOption.bind(this);
  }

  handleOption = (option) => {
    this.setState({ currentOption : option});
  }

  render() {
    // console.log(localStorage.getItem('name'));
    if (localStorage.getItem('loggedIn') === false || 
      localStorage.getItem('name') === "" || 
    localStorage.getItem('name') === null || 
    localStorage.getItem('name') === undefined) this.props.history.push("/login");
    const {currentOption} = this.state;
    
    return (
      <div>
        <Header 
        active={currentOption}
        onOption = {(option) => this.handleOption(option)}
        />

      {
        currentOption === "label" ? <FilterByLabel/> : <></>
      }
      {
        currentOption === "date" ? <FilterByDate/> : <></>
      }
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   
  };
};

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
