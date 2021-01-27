import React from "react";
import { connect } from "react-redux";
import Header from "./header";
import Footer from "./footer";
import _ from "lodash";
import { ImageTable, Pagination } from "../../components";
// import { ListGroup } from "../../components/common";
import { getImages } from "../../actions/imageAction";
import {
  getGenres,
  getAllGenres,
  downloadGenres,
} from "../../actions/genreAction";


class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      genres: [],
      pageSize: 12,
      currentPage: 1,
      currentGenre: "all",
      filteredGenres: [],
      showOptions: false,
      userInput: "",
      isGenreDisplay: false,
      toggleName: "all",
      enableName : '',
    };
    this.handleDownload = this.handleDownload.bind(this);
    this.onOpenGenre = this.onOpenGenre.bind(this);
    this.showSearchList = this.showSearchList.bind(this);
    this.changeSearchList = this.changeSearchList.bind(this);
  }

  componentDidMount() {
    this.props.getGenres();
    this.props.getAllGenres();
    this.props.getImages(this.state.currentGenre);
  }

  handleChange = (name, value) => {
    this.setState({ toggleName: value });
    this.setState({ [name]: value, currentPage: 1 });

    // console.log("CG",this.state.currentGenre);
    this.props.getImages(value);
  };

  onPageChange = (page) => {
    this.setState({ currentPage: page });
  };

  onOpenGenre = (e) => {
    // console.log(e.target.id);
    this.setState({ userInput: e.target.id });
    this.setState({toggleName:e.target.id});
    this.setState({ enableName: e.target.id });
    this.setState({ isGenreDisplay: true,showOptions : false });
    this.props.getImages(e.target.id);

  };

  showSearchList = () => {
    // e.preventDefault();
    const showOptions = this.state.showOptions;
    const userInput = this.state.userInput;
    const filteredGenres = this.state.filteredGenres;
    // console.log(filteredGenres);
    if (showOptions && userInput) {
      if (filteredGenres.length) {
        return (
          <ul className="options">
            {filteredGenres.map((optionName) => {
              //   console.log(optionName);
              return (
                <li
                  className={"showList"}
                  id={optionName.label}
                  key={optionName.label}
                  onClick={this.onOpenGenre}
                >
                  {optionName.label}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <ul className="options">
            <li>No Option!</li>
          </ul>
        );
      }
    }
  }

  changeSearchList = (e) => {
    // console.log(e.target.value);
     e.preventDefault();
    if (e.target.value === "") {
      this.setState({ currentGenre: "All", currentPage: 1 });
      this.props.getImages("All");

      this.setState({
        filteredGenres: [],
        showOptions: false,
        userInput: "",
        isGenreDisplay: false,
      });

      return;
    }
    else{

        const options = this.props.genreList;
        const userInput = e.target.value;

        const filteredGenres = options.filter(
          (optionName) =>
            optionName.label.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        // console.log(filteredGenres.length);
      if(filteredGenres.length === 0){
        this.setState({
            filteredGenres : [],
            showOptions : false,
        });
      }
      else{
      this.setState({
        filteredGenres,
        showOptions: true,
        userInput
      });
    }
  }
};


  handleDownload = (e) => {
   //e.preventDefault();

    let DownloadGenreList = [];
    DownloadGenreList.push(this.state.toggleName);

    // console.log(DownloadGenreList);
    this.props.downloadGenres(DownloadGenreList);

    alert("downloading... Please wait");
  };


  // handleDelete(img_url){
  //   console.log(img_url);
  // }


  render() {
   
    const { currentPage, pageSize} = this.state;
    const { images, genreAllList, loggedIn,loading,loadingPage} = this.props;
    if (!localStorage.getItem('loggedIn')) this.props.history.push("/login");
    let filteredImages = [];
    filteredImages = images.data;
    // console.log("images",filteredImages);
    // console.log(this.state.filteredGenres);

    // if (loadingPage) {
    //   return (
    //     <div className=" text-center  m-5">
    //     <button className="btn btn-primary btn-large " type="button">
    //       <span
    //         className="spinner-border spinner-border-sm"
    //         role="status"
    //         aria-hidden="false"
    //       ></span>
    //       Loading...
    //     </button>
    //   </div>
    //   );
    // }


    let div0 = ["btn", "btn-outline-info", "btn-rounded", " waves-effect"];
    let div1 = ["btn", "btn-outline-info", "btn-rounded", " waves-effect"];
    let div2 = ["btn", "btn-outline-info", "btn-rounded", " waves-effect"];
    let div3 = ["btn", "btn-outline-info", "btn-rounded", " waves-effect"];
    let div4 = ["btn", "btn-outline-info", "btn-rounded", " waves-effect"];
    let div5 = ["btn", "btn-outline-info", "btn-rounded", " waves-effect"];

    if (this.state.toggleName === Object(genreAllList[0]).label) {
      div0.push("btn-info");
      div0 = div0.filter((ele) => {
        return ele !== "btn-outline-info";
      });
    } else if (this.state.toggleName === Object(genreAllList[1]).label) {
      div1.push("btn-info");
      div1 = div1.filter((ele) => {
        return ele !== "btn-outline-info";
      });
    } else if (this.state.toggleName === Object(genreAllList[2]).label) {
      div2.push("btn-info");
      div2 = div2.filter((ele) => {
        return ele !== "btn-outline-info";
      });
    } else if (this.state.toggleName === Object(genreAllList[3]).label) {
      div3.push("btn-info");
      div3 = div3.filter((ele) => {
        return ele !== "btn-outline-info";
      });
    } else if (this.state.toggleName === Object(genreAllList[4]).label) {
      div4.push("btn-info");
      div4 = div4.filter((ele) => {
        return ele !== "btn-outline-info";
      });
    } else if (this.state.toggleName === Object(genreAllList[5]).label) {
      div5.push("btn-info");
      div5 = div5.filter((ele) => {
        return ele !== "btn-outline-info";
      });
    }

    // console.log(div3);



    return (
      <div>
        <Header />
        <main className="pt-5 mx-lg-5">
          <div className="container-fluid mt-5">
            <div className="card mb-4 wow fadeIn">
              <div className="card-body d-sm-flex justify-content-between">
                <h4 className="mb-2 mb-sm-0 pt-1">
                  {/* <a href="https://mdbootstrap.com/docs/jquery/" target="_blank">Home Page</a>
                        <span>/</span> */}
                  <span>Dashboard</span>
                </h4>
                <div>
                  <form className="d-flex justify-content-center">
                    <input
                      type="search"
                      placeholder="Type your query"
                      aria-label="Search"
                      className="form-control"
                      onChange={this.changeSearchList}
                    />
                    {/* <button className="btn btn-primary btn-sm my-0 p" type="submit">
                            <i className="fas fa-search"></i>
                            </button> */}
                  </form>
                  {this.showSearchList()}
                </div>
              </div>
            </div>

          {
            loading
            ?
            <div className=" text-center  m-2">
              <button className="btn btn-primary btn-large " type="button">
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="false"
                ></span>
                Uploading...
              </button>
            </div>
            :
            <></>
        }
            {this.state.isGenreDisplay ? (
              <div className="card">
                <div className="list-group">
                  <div className="d-flex p-2 bd-highlight mx-md-auto">
                    <div key={"all"} className="p-2 bd-highlight ">
                      <button
                        type="button"
                        className={"btn btn-info btn-rounded waves-effect"}
                      >
                        {this.state.toggleName}
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-floating"
                        onClick = {this.handleDownload}
                      >
                        <i className="fas fa-download"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (

              <div className="list-group ">
                {images && images.length !== 0 ? (
                  <div className="d-flex p-2 bd-highlight mx-md-auto">
                    <div
                      key={Object(genreAllList[0])._id}
                      className="p-2 bd-highlight "
                    >
                      <button
                        type="button"
                        className={div0.join(" ")}
                        onClick={() =>
                          this.handleChange(
                            "currentGenre",
                            Object(genreAllList[0]).label
                          )
                        }
                      >
                        {Object(genreAllList[0]).label}
                      </button>
                    </div>
                    <div
                      key={Object(genreAllList[1])._id}
                      className="p-2 bd-highlight "
                    >
                      <button
                        type="button"
                        className={div1.join(" ")}
                        onClick={() =>
                          this.handleChange(
                            "currentGenre",
                            Object(genreAllList[1]).label
                          )
                        }
                      >
                        {Object(genreAllList[1]).label}
                      </button>
                    </div>
                    <div
                      key={Object(genreAllList[2])._id}
                      className="p-2 bd-highlight "
                    >
                      <button
                        type="button"
                        className={div2.join(" ")}
                        onClick={() =>
                          this.handleChange(
                            "currentGenre",
                            Object(genreAllList[2]).label
                          )
                        }
                      >
                        {Object(genreAllList[2]).label}
                      </button>
                    </div>
                    <div
                      key={Object(genreAllList[3])._id}
                      className="p-2 bd-highlight "
                    >
                      <button
                        type="button"
                        className={div3.join(" ")}
                        onClick={() =>
                          this.handleChange(
                            "currentGenre",
                            Object(genreAllList[3]).label
                          )
                        }
                      >
                        {Object(genreAllList[3]).label}
                      </button>
                    </div>
                    <div
                      key={Object(genreAllList[4])._id}
                      className="p-2 bd-highlight "
                    >
                      <button
                        type="button"
                        className={div4.join(" ")}
                        onClick={() =>
                          this.handleChange(
                            "currentGenre",
                            Object(genreAllList[4]).label
                          )
                        }
                      >
                        {Object(genreAllList[4]).label}
                      </button>
                    </div>
                    <div
                      key={Object(genreAllList[5])._id}
                      className="p-2 bd-highlight "
                    >
                      <button
                        type="button"
                        className={div5.join(" ")}
                        onClick={() =>
                          this.handleChange(
                            "currentGenre",
                            Object(genreAllList[5]).label
                          )
                        }
                      >
                        {Object(genreAllList[5]).label}
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )}

            <p className="text-left text-muted mt-3 font-weight-bold text-primary">
              {filteredImages &&  filteredImages.length ? `${filteredImages.length} ` : "0 "}
              Images found.
            </p>
            <hr></hr>
                   <div className="container-mason">
                   <div id="mdb-lightbox-ui" >
                     </div>            
                  {!!filteredImages ? (
                    <ImageTable
                      pageSize={pageSize}
                      currentPage={currentPage}
                      images={filteredImages}
                      // onDelete={(img_url) => this.handleDelete(img_url)}
                      // genre = {currentGenre}
                    />
                  )
                 
                  
                  
                  : (
                    <h1 className="text-white">No Images</h1>
                  )}
                   </div>
                  
                
              <br />
              <Pagination
                itemsCount={filteredImages ? filteredImages.length : 0}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.onPageChange}
                images={filteredImages}
                // genre = {currentGenre}
              />
            
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getImages: (label) => dispatch(getImages(label)),
    getGenres: () => dispatch(getGenres()),
    getAllGenres: () => dispatch(getAllGenres()),
    // downloadGenres: (genre_list) => dispatch(downloadGenres(genre_list)),
  };
};

const mapStateToProps = (state) => {
  return {
    images: state.image.images,
    loading: state.image.loading,
    loadingPage: state.image.loadingPage,
    genreList: state.genre.genreList,
    genreAllList: state.genre.genreAllList,
    loggedIn: state.auth.loggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
