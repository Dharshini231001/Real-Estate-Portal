import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../../components/footer/Footer";
import styled from "styled-components";
import ListItems from "./ListItems";
import axios from "axios";
import Loader from "../../assets/loader.gif";

const List = styled.div`
  padding: 50px 0;
  .listgroup {
    width: 90%;
    margin: 0px auto;
  }
  .listLeft {
    text-align: center;
    @media (min-width: 1024px) {
      height: 515px;
    }
  }
  input {
    width: 239px;
    height: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px;
    @media (min-width: 425px) {
      width: 315px;
    }
    @media (min-width: 768px) {
      width: 425px;
    }
    @media (min-width: 1024px) {
      width: 280px;
    }
  }

  select {
    border-radius: 0.4em;
    width: 239px;
    height: 30px;
    border: 0;
    margin-top: 20px;
    margin-bottom: 20px;
    @media (min-width: 425px) {
      width: 315px;
    }
    @media (min-width: 768px) {
      width: 425px;
    }
    @media (min-width: 1024px) {
      width: 280px;
    }
  }
  .propt_btn {
    height: 45px;
    width: 192px;
    border: 0;
    border-radius: 0.5em;
    font-size: larger;
    padding: -23px;
    background-color: #031249;
    color: #b7c2f1;
  }

  @media (min-width: 1024px) {
    .listgroup {
      display: grid;
      grid-template-columns: 1fr 3fr;
      grid-gap: 20px;
    }

    .listLeft {
      height: auto;
      width: 300px;
      padding: 15px 0;
      background-color: #b7c2f1;
      border-radius: 0.4em;
      border-bottom-left-radius: 0.4em;
      @media (min-width: 1024px) {
        height: 515px;
      }
    }

    .listRight {
      height: auto;
    }
  }
`;
const ListRight = styled.div`
  @media (min-width: 768px){  
    .loader-img{
        width: 345px;
        margin: 0px auto;
    }
  }
  .right{
    @media (min-width: 768px){
      display:grid;
      grid-template-columns:1fr 1fr;
      
    }
    @media (min-width: 1440px){
      display:grid;
      grid-template-columns:1fr 1fr 1fr;
    }
  }
  .Image {
    width: 100%;
    margin: 0px auto;
    }
  }
  

`;

const Info = styled.div`
  @media (min-width: 375px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
  }
`;

class Listing extends Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      ready: "initial",
      search: "",
    };
  }
  componentDidMount() {
    this.setState({
      ready: "loading",
    });
    axios({
      method: "post",
      url: `http://localhost/realestate-backend/index.php`,
      data: {
        api: "property",
        action: "viewProperties",
      },
    }).then((response) => {
     console.log(response.data)
      this.setState({
        ready: "loaded",
        lists: response.data.returndata,
      });
    });
  }
  locationChange(e) {
    this.setState({
      search: e.target.value,
    });
  }
  PropertyChange(e) {
    this.setState({
      search: e.target.value,
    });
  }

  render() {
    const { lists, ready, search } = this.state;
    console.log(lists.length,"=============")
    const OddImage =
      "https://dyimg2.realestateindia.com/proj_images/project26003/proj_header_image-26003.png";
    const imageUrl =
      "https://tse2.mm.bing.net/th?id=OIP.-iYRlQTd5QZIjHwGJFJQSAHaE9&pid=Api&P=0";
    return (
      <div>
        <Navbar PropertyData = {lists} />
        <List>
          <div className="listgroup">
            <div className="listLeft">
              <h3>Filter</h3>
              <form>
                <input
                  type="search"
                  name="search"
                  placeholder="Location"
                  onChange={this.locationChange.bind(this)}
                />
                <div className="Property">
                  <select name="property-type" className="app-select" required>
                    <option data-display="Property Type">Property Type</option>
                    <option value="type1">Farm houses</option>
                      <option value="type2">Villas</option>
                      <option value="type3">Apartment</option>
                      <option value="type4">Offices & Studios</option>
                      <option value="type5">Lands and plots</option>
                  </select>
                </div>
                <div className="bedrooms">
                  <select
                    name="bedroom"
                    className="app-select"
                    required
                    onChange={this.PropertyChange.bind(this)}
                  >
                    <option data-display="Bedrooms">Bedrooms</option>
                    <option value="1">1BR</option>
                    <option value="2">2BR</option>
                    <option value="3">3BR</option>
                    <option value="4">4BR</option>
                    <option value="5">5BR</option>
                  </select>
                </div>
                <div className="PriceRange">
                  <input
                    type="text"
                    id="range"
                    name="range"
                    placeholder="Price Limit"
                  />
                </div>
                <div className="AreaRange">
                  <input
                    type="text"
                    id="range2"
                    name="range"
                    placeholder="Area"
                  />
                </div>
                <div className="button">
                  <button className="propt_btn">Search Properties</button>
                </div>
              </form>
            </div>
            <ListRight>
              <div className="loader">
                {lists.length== 0 ? <h3 style={{textAlign:"center"}}>There are no list items,pleas add the property</h3> : null}
                {ready === "loading" ? (
                  <div className="loader-img">
                    <img src={Loader} className="Image" alt="loader" />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="right">
                {lists.length > 0?lists.map((list, index) => (
                  <div key={list.id}>
                    <Link to={`/Listview/${list.id}`}>
                      <ListItems image={index % 2 == 0 ? OddImage : imageUrl}>
                        <h4>{"Rs." + list.askingprice }</h4>
                        <h5>{list.sellername}</h5>
                        <Info>
                          <h6>Bedrooms: {list.bedrooms}</h6>
                          <h6>Bathrooms: {list.bathrooms}</h6>
                          <h6>Area: {list.area}</h6>
                          <h6>phone: {list.sellerphone}</h6>
                        </Info>
                      </ListItems>
                    </Link>
                  </div>
                )):null}
              </div>
            </ListRight>
          </div>
        </List>
        <Footer />
      </div>
    );
  }
}
export default Listing;
