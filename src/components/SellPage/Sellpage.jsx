import React, { Component, Fragment } from "react";
import styled from "styled-components";
import axios from "axios";
import Navbar from "../Navbar";
import Footer from "../../components/footer/Footer";
import { AuthContext } from "../../context/AuthContext";

const SellpageStyle = styled.div`
  width:90%;
  margin:0px auto;
  padding-top:60px;
  .sellhead{
    text-align:center;
    background-color: #293064;
    color: #b7c2f1;
    border-radius: .5em;
    h3,h4{
      padding:5px;
    }
  }
 
}
`;

const SellGroup = styled.div`
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  .sellLeft {
    text-align: center;
    img {
      width: 100%;
      border-radius: 1em;
    }
  }
  .sellRight {
    display: block;
    background-color: #acd9f8;
    text-align: center;
    border-radius: 0.5em;
    @media (min-width: 1440px) {
      height: fit-content;
      margin: auto 0px;
    }
    form {
      padding: 10px;
      @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: fit-content;
        align-items: center;
      }
    }
    .formInput {
      margin: 10px 0;
      display: block;
    }
    input {
      width: 90%;
      height: 35px;
      border-radius: 0.1em;
    }
    select {
      width: 80%;
    }
    .info {
      display: block;
      .Area {
        width: 80%;
      }
      @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
    }

    .item {
      margin: 10px 0;
    }
    textarea {
      width: 90%;
    }
    .btn {
      text-align: center;
    }
    button {
      height: 45px;
      width: 192px;
      border: 0;
      border-radius: 0.5em;
      font-size: larger;
      padding: -23px;
      background-color: #031249;
      color: #b7c2f1;
    }
    label {
      display: block;
    }
  }
`;

class Sellpage extends Component {
  static contextType = AuthContext;

  constructor() {
    super();
    this.state = {
      Name: "",
      Summary: "",
      Bedrooms: "",
      Asking: 0,
      Bathrooms: " ",
      Area: 0,
      Phone: "",
      Tag: " ",
      DateListed: " ",
    };
  }
  NewListing(event) {
    event.preventDefault();

    const { user } = this.context;
    console.log(typeof user.userinfo.id);
    console.log(user.userinfo.name);
    console.log(user.userinfo.email);

    axios({
      method: "post",
      url: "http://localhost/realestate-backend/index.php",
      data: {
        api: "property",
        action: "addProperty",
        sellerId: parseInt(user.userinfo.id),
        sellerName: user.userinfo.name,
        sellerEmail: user.userinfo.email,
        description: this.state.Summary,
        bedRooms: this.state.Bedrooms,
        askingPrice: this.state.Asking,
        bathRooms: this.state.Bathrooms,
        area: this.state.Area,
        sellerPhone: this.state.Phone,
        propertyType: this.state.Tag,
        sellerAddress: this.state.Name,
      },
    })
      .then((response) => {
        console.log(response, "===========res");
        if (response.data.status_code == 200) {
          alert(" Property added successfully");
        } else {
          alert("some data missing");
        }
      })
      .catch((error) => {
        alert("network error");
      });
  }

  inputName(event) {
    this.setState({
      Name: event.target.value,
    });
  }
  inputSummary(event) {
    this.setState({
      Summary: event.target.value,
    });
  }

  inputNumber(event) {
    this.setState({
      Phone: event.target.value,
    });
  }

  inputBed(event) {
    this.setState({
      Bedrooms: event.target.value,
    });
  }
  inputBath(event) {
    this.setState({
      Bathrooms: event.target.value,
    });
  }
  inputArea(event) {
    this.setState({
      Area: event.target.value,
    });
  }
  inputTag(event) {
    this.setState({
      Tag: event.target.value,
    });
  }
  inputDate(event) {
    this.setState({
      DateListed: event.target.value,
    });
  }
  inputAsk(event) {
    this.setState({
      Asking: event.target.value,
    });
  }

  render() {
    return (
      <Fragment>
        <Navbar />
        <SellpageStyle>
        <div className="row" style={{backgroundColor:"#acd9f8"}}>
                  <marquee behavior="" direction="left"><h3>WELCOME TO SELLER PANEL!</h3></marquee></div>
          <div className="sellhead"> 
           <h3>Want to sell your Property</h3>
            <h4>
              Lets take that burden off you, just fill the form below and we
              will contact you
            </h4>
          </div>
          <SellGroup>
            <div className="sellLeft">
              <img
                src={require("../../assets/pexels-photo-955793.jpeg")}
                alt="sellpage"
              />
            </div>
            <div className="sellRight">
              <form action="post" onSubmit={this.NewListing.bind(this)}>
                <div className="formInput">
                  <label htmlFor="Name">Property Name:</label>
                  <input type="text" name="Name" />
                </div>

                <div className="formInput">
                  <label htmlFor="Email">Email:</label>
                  <input type="email" name="Email" />
                </div>

                <div className="formInput">
                  <label htmlFor="Number">Number:</label>
                  <input
                    type="number"
                    name="Number"
                    onChange={this.inputNumber.bind(this)}
                  />
                </div>

                <div className="formInput">
                  <label htmlFor="Address">Location:</label>
                  <input
                    type="text"
                    name="Address"
                    onChange={this.inputName.bind(this)}
                  />
                </div>

                <div className="info formInput">
                  <div className="item">
                    <label htmlFor="Area">Area:</label>
                    <input
                      className="Area"
                      type="text"
                      name="area"
                      onChange={this.inputArea.bind(this)}
                    />
                  </div>
                  <div className="item">
                    <label htmlFor="Type">Type</label>
                    <select name="Type" onChange={this.inputTag.bind(this)}>
                      <option data-display="Type of property">
                        Type of property
                      </option>
                      <option value="type1">Farm houses</option>
                      <option value="type2">Villas</option>
                      <option value="type3">Apartment</option>
                      <option value="type4">Offices & Studios</option>
                      <option value="type5">Lands and plots</option>
                    </select>
                  </div>
                  <div className="bed item">
                    <label htmlFor="Bedroom">Bedroom(s):</label>
                    <select name="Bedroom" onChange={this.inputBed.bind(this)}>
                      <option data-display="Bedroom">Bedroom</option>o
                      <option value="1"> nil</option>
                      <option value="2"> 1BR</option>
                      <option value="3">2BR</option>
                      <option value="4">3BR</option>
                      <option value="5">4BR</option>
                    </select>
                  </div>
                  <div className="bath item">
                    <label htmlFor="Bedroom">Bathroom(s):</label>
                    <select
                      name="Bathroom"
                      onChange={this.inputBath.bind(this)}
                    >
                      <option data-display="Bathroom">Bathroom</option>o
                      <option value="1"> nil</option>
                      <option value="2"> 1BA</option>
                      <option value="3">2BA</option>
                      <option value="4">3BA</option>
                      <option value="5">4BA</option>
                    </select>
                  </div>
                </div>

                <div className="formInput">
                  <label htmlFor="Date">Date:</label>
                  <input
                    type="date"
                    name="Date"
                    onChange={this.inputDate.bind(this)}
                  />
                </div>

                <div className="formInput">
                  <label htmlFor="Price">Asking Price(₦):</label>
                  <input
                    type="text"
                    name="Price"
                    onChange={this.inputAsk.bind(this)}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="image1">Image 1:</label>
                  <input
                    type="file"
                    name="image1"
                    onChange={this.inputAsk.bind(this)}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="image2">Image 2:</label>
                  <input
                    type="file"
                    name="image2"
                    onChange={this.inputAsk.bind(this)}
                  />
                </div>

                <div className="formInput">
                  <label htmlFor="Summary">Summary:</label>
                  <textarea
                    name="Summary"
                    cols="30"
                    rows="10"
                    onChange={this.inputSummary.bind(this)}
                  ></textarea>
                </div>

                <div className="btn">
                  {" "}
                  <button type="submit">Submit</button>{" "}
                </div>
              </form>
            </div>
          </SellGroup>
        </SellpageStyle>
        <Footer />
      </Fragment>
    );
  }
}

export default Sellpage;
