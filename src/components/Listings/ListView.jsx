import React, { Fragment, Component } from "react";
import styled from "styled-components";
import axios from "axios";
import Navbar from "../Navbar";
import Footer from "../../components/footer/Footer";
import { Link, useParams } from "react-router-dom";
import Loader from "../../assets/loader.gif";
import { withRouter } from "react-router";
import { AuthContext } from "../../context/AuthContext";
const Liststyle = styled.div`
  width: 90%;
  padding-top: 120px;
  margin: 0px auto;
  img {
    width: 100%;
  }
  .viewright {
    text-align: justified;
    h5 {
      background-color: #b7c2f1;
      padding: 20px;
    }
  }
  .btn {
    text-align: center;
  }
  input[type="button"] {
    height: 45px;
    width: 192px;
    border: 0;
    border-radius: 0.5em;
    font-size: larger;
    padding: -23px;
    background-color: #031249;
    color: #b7c2f1;
  }
  .Image {
    width: 25%;
    margin: 0px auto;
    position: relative;
    left: 37%;
  }
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
`;

const Listgroup = styled.div`
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
`;
function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
class ListView extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      list: {},
      ready: "initial",
    };
  }
  componentDidMount() {
    let { id } = this.props.params;
    this.setState({ ready: "loading" });
    axios({
      method: "post",
      url: `http://localhost/realestate-backend/index.php`,
      data: {
        api: "property",
        action: "viewPropertyByid",
        propId: id,
      },
    }).then((response) => {
      console.log(response.data, "get prop");
      this.setState({
        list: response.data.returndata,
        ready: "loaded",
      });
    });
  }

  onRequest() {
    const { user, userType, isLogin } = this.context;
    const { list, ready } = this.state;
    let { id } = this.props.params;

    axios({
      method: "post",
      url: `http://localhost/realestate-backend/index.php`,
      data: {
        api: "salesreq",
        action: "sendRequest",
        buyerName: user.userinfo.name,
        buyerId: parseInt(user.userinfo.id),
        sellerId: parseInt(list[0].id),
        propertyId: parseInt(id),
      },
    }).then((response) => {
      if (response.data.status_code == 200) {
        alert("request Sent successfuly");
      } else {
        alert("already requested");
      }
    });
  }

  onPromote() {
    const { list } = this.state;
    let { id } = this.props.params;
    axios({
      method: "post",
      url: `http://localhost/realestate-backend/index.php`,
      data: {
        api: "promotion",
        action: "promoteproperty",
        sellerId: list[0].id,
        propertyId: id,
      },
    }).then((response) => {
      console.log(response.data, "rofdkfjdfkdjf");
      if (response.data.status_code == 200) {
        alert("promote Sent successfuly");
      } else {
        alert("already promoted");
      }
    });
  }
  render() {
    const { list, ready } = this.state;
    const { user, userType, isLogin } = this.context;

    console.log(list, "render");
    const OddImage =
      "https://tse2.mm.bing.net/th?id=OIP.-iYRlQTd5QZIjHwGJFJQSAHaE9&pid=Api&P=0";
    const imageUrl =
      "https://dyimg2.realestateindia.com/proj_images/project26003/proj_header_image-26003.png";
    return (
      <Fragment>
        <Navbar />
        <Liststyle>
          {ready === "loading" ? (
            <img src={Loader} className="Image" alt="loader" />
          ) : (
            ""
          )}
          {ready === "loaded" && (
            <Fragment>
              <Listgroup>
                <div className="viewleft">
                  <img
                    src={list[0].id % 2 == 0 ? imageUrl : OddImage}
                    alt="listing items"
                  />
                </div>
                <div className="viewright">
                  <h4>{"Rs." + list[0].askingprice }</h4>
                  <h5>{list[0].sellername}</h5>
                  <h5>{list[0].description}</h5>
                  <Info>
                    <h6>Bedrooms: {list[0].bedrooms}</h6>
                    <h6>Bathrooms: {list[0].bathrooms}</h6>
                    <h6>Area: {list[0].area}</h6>
                    <h6>phone: {list[0].sellerphone}</h6>
                  </Info>

                  <div className="btn">
                    <Link to="/Listings">
                      <input type="button" value="Return" />
                    </Link>
                  </div>
                  <br></br>
                  {isLogin && userType == "user" ? (
                    <div className="btn">
                      <input
                        type="button"
                        value="Request for buying"
                        onClick={() => this.onRequest()}
                      />
                    </div>
                  ) : null}
                  {isLogin && userType == "seller" ? (
                    <div className="btn">
                      <input
                        type="button"
                        value="Request for Promote"
                        onClick={() => this.onPromote()}
                      />
                    <a href="http://localhost:3002/pricing" style={{textdecoration:"none"}}>Select Package--→</a><br></br>
                    </div>
                  ) : null}
                </div>
              </Listgroup>
            </Fragment>
          )}
        </Liststyle>
        <Footer />
      </Fragment>
    );
  }
}
export default withParams(ListView);
