import React, { Component, useContext, useEffect,useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../assets/logopp.jpg";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { useReactToPrint } from "react-to-print/lib";
import { Flag } from "@mui/icons-material";
import { ComponentToPrint } from "./Pdf";
import { Box, Button } from "@mui/material";
const Nav = styled.div`
  a img {
    width: 200px;
    height: 30px;
    float: left;
  }

  img {
    height: 40px;
    float: right;
  }
  .collapse::after {
    content: "";
    clear: both;
    display: ;
  }

  .navlinks a {
    text-decoration: none;
    display: block;
    text-align: center;
    font-size: 15px;
    padding: 10px;
    background-color: #b7c2f1;
    color: #293064;
    animation: fadeInLeft 0.6s both;
    &:nth-child(even) {
      background: #293064;
      color: #b7c2f1;
    }
  }
  .rm-navlinks {
    display: none;
  }

  @media (min-width: 768px) {
    .nav_respond {
      display: none;
    }
  }
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

const Navgroup = styled.nav`
  display:none @media (min-width:768px) {
    padding: 10px 0;
    text-align: center;
    display: flex;
    grid-template-columns: repeat(5, auto);
    width: 100%;
  }

  a {
    font-weight: bolder;
    font-size: 18px;
    color: #293064;
    margin: 90px;
  }

  a button {
    height: 35px;
    width: 116px;
    background-color: #031249;
    color: #b7c2f1;
    border: 0;
    border-radius: 0.5em;
    font-size: inherit;
  }
  .logo2 {
    height: 50px;
    padding-left:90px;
  }
`;

const Navbar = (props) => {

  const [active, setActive] = useState(true);
  
  const { dispatch, userType, isLogin } = useContext(AuthContext);
  const componentRef = useRef();
  const generateReport = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleBack = () => {
    setActive(true);
  };
  console.log(isLogin, "===============isLogin");
  const navigate = useNavigate();
  useEffect(() => {
    if (userType === "admin") {
      navigate("/admin");
    }
  }, [userType]);
console.log('propertydata',props.PropertyData)
  return (
    <Nav>
      <Navgroup>
        <Link to="/">
          <img src={Logo} className="logo2" alt="logo" />
        </Link>
        
        <Link to="/Listings">Listings</Link>
        
      
        {userType == "seller" ? <Link  to="/Sellpage">Sell</Link> : null}
        {userType == "seller" ? <Link to="/ViewReq">View Request</Link> : null}
        {userType == "" ? (
          <Link to="/sign">
            <button
            >Sign in</button>
          </Link>
        ) : (
          <Link to="/sign" >
            <button
              onClick={() =>
                dispatch({
                  type: "LOGOUT",
                })
              }
            >
              Sign out
            </button>
          </Link>
        )}
        {userType == "seller" ? <Box>
            {active ? (
              <Box>
                <Button
                  variant="contained"
                  style={{ background: "teal", color: "white", marginLeft:"87%", marginTop:"5px"}}
                  onClick={() => {
                    setActive(false);
                  }}
                >
                  Report
                </Button>
              </Box>
            ) : (
              <Box width={"80%"} margin={"auto"} py={"3em"}>
                <ComponentToPrint ref={componentRef} data={props.PropertyData} />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  pt="2em"
                  px={"4em"}
                >
                  <Box>
                    <Button
                      variant="contained"
                      style={{ background: "teal", color: "white" }}
                      onClick={generateReport}
                    >
                      Print this out!
                    </Button>
                  </Box>
                  <Box offset={2}>
                    {" "}
                    <Button
                      variant="contained"
                      style={{ background: "orange", color: "white"}}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>:null}

       
      </Navgroup>
    </Nav>
  );
};

export default Navbar;
