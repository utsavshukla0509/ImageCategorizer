import React from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import { ImageTable, Pagination } from "../../components";
import "react-datepicker/dist/react-datepicker.css";
import { getImagesByDate} from "../../actions/imageAction";

class FilterByDate extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            date : null,
            showDate  : "--",
            pageSize: 12,
            currentPage: 1,
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        // this.handleDateSelect = this.handleDateSelect.bind(this);
    }

     convert(str) {
      let mnths = {
          Jan: "01",
          Feb: "02",
          Mar: "03",
          Apr: "04",
          May: "05",
          Jun: "06",
          Jul: "07",
          Aug: "08",
          Sep: "09",
          Oct: "10",
          Nov: "11",
          Dec: "12"
        },
        date = str.split(" ");
    
      return [date[3], mnths[date[1]], date[2]].join("-");
    }

    handleDateChange = (date) => {
        const newDate = this.convert(String(date));
        this.setState({date : date,showDate : newDate});
        if(newDate !== "--"){
          this.props.getImagesByDate(newDate);
        }
    }
    // handleDateSelect = (selectDate) => {
    //   console.log(selectDate);
    // }

    render(){
        const {date,showDate,pageSize,currentPage} = this.state;
        // console.log(showDate);
        const {imagesByDate} = this.props;
        // console.log(imagesByDate);
        let filteredImages = [];
        filteredImages = imagesByDate.data;
        return(
            <div>
                 <main className="pt-5 mx-lg-5">
                <div className="container-fluid mt-5">
            <div className="card mb-4 wow fadeIn">
              <div className="card-body d-sm-flex justify-content-between">
                <h4 className="mb-2 mb-sm-0 pt-1">
                  <span>Dashboard</span>
                </h4>
                <div style = {{display : "flex",paddingTop : "8px"}}>
                
                    <p style = {{
                        color : "#2196f3",
                        fontWeight : "bold",
                        paddingTop : "3px",
                        paddingRight : "3px"
                        }}>Enter Date: </p>
                  <form className="d-flex justify-content-center">
                    <DatePicker
                        dateFormat = {"dd/MM/yyyy"}
                        selected={date}
                        // onSelect={this.handleDateSelect} //when day is clicked
                        onChange={(date) => {this.handleDateChange(date)}} //only when value has changed
                        isClearable
                        showYearDropdown
                        showMonthDropdown
                        scrollableMonthYearDropdown
                        
                    />
                  </form>
                </div>
              </div>
            </div>
            </div>

            {showDate !== "--"
            ? 
              // <div className="card">
              <div className="list-group">
                <div className="d-flex p-2 bd-highlight mx-md-auto">
                  <div key={"all"} className="p-2 bd-highlight ">
                    <button
                      type="button"
                      className={"btn btn-info btn-rounded waves-effect"}
                    >
                      {showDate}
                    </button>
                  </div>
                </div>
              </div>
            // </div>
            :
            <></>
            }

            <div className="container-mason">
            <div id = "mdb-lightbox-ui" >
            </div>  
            {!!filteredImages && showDate !== "--" ? (
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



            </main>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
  return {
    getImagesByDate: (date) => dispatch(getImagesByDate(date)),
  };
};

const mapStateToProps = (state) => {
  return {
    imagesByDate: state.image.imagesByDate,
    loading: state.image.loading,
    loadingPage: state.image.loadingPage,
    loggedIn: state.auth.loggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterByDate);