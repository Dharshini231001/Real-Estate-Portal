import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import { AppBar, Toolbar, BottomNavigation, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
//tablecell stying
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: "1px solid gray",
    textAlign: "center",
  },
  [`&.${tableCellClasses.head}`]: {
    border: "1px solid gray",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
}));

//table row stying
const StyledTableRow = styled(TableRow)(({ theme }) => ({}));
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Admin = () => {
  const navigate = useNavigate();

  const { dispatch, userType } = useContext(AuthContext);

  const [user, setUser] = useState([]);
  const [promotionView, setPromotionView] = useState([]);

  const handleLogout = () => {
    navigate("/sign");
    dispatch({
      type: "LOGOUT",
    });
  };
 
  useEffect(() => {
    axios({
      method: "post",
      url: `http://localhost/realestate-backend/index.php`,
      data: {
        api: "promotion",
        action: "viewpromotions",
      },
    }).then((response) => {
      if (response.data.status_code == 200) {
        setPromotionView(response.data.returndata);
      }
    });
  }, [promotionView]);

  useEffect(() => {
    axios({
      method: "post",
      url: `http://localhost/realestate-backend/index.php`,
      data: {
        api: "user",
        action: "getallusers",
      },
    }).then((response) => {
      console.log(response.data.returndata, "user");
      if (response.data.status_code == 200) {
        setUser(response.data.returndata);
      }
    });
  }, [user]);
  return (
    <div style={{ backgroundColor: "#EEF2F2" }}>
      <AppBar
        style={{
          backgroundColor: "#031249",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Toolbar>
          <h3> Admin Panel</h3>
        </Toolbar>
        <Toolbar>
        <button style={{background:"#1976d2",height:"45px",width:"100px",borderRadius:"20px"}}><a href="http://localhost:3000/owner/home" style={{color:"white",textDecoration:"none"}}><strong>RECORDS</strong></a></button>
        <button style={{background:"#1976d2",height:"45px",width:"150px",borderRadius:"20px"}}><a href="http://localhost:3001/Listings" style={{color:"white",textDecoration:"none"}}><strong>PROPERTY REPORT</strong></a></button>
        
          <Button variant="contained" onClick={() => handleLogout()}>
            logout
          </Button>
        </Toolbar>
      </AppBar>
      <Offset />
      <div className="row" style={{backgroundColor:"#acd9f8"}}>
                  <marquee behavior="" direction="left"><h3>WELCOME TO ADMIN PANEL!</h3></marquee></div>
      <Grid
        container
        direction="row"
        justifyContent={"center"}
        alignItems="center"
      >
        <Grid item xs={11}>
          <div>
            <h3 style={{ textAlign: "center" }}>USERS LIST</h3>
          </div>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700, border: "1px solid gray" }}
              aria-label="customized table"
            >
              <TableHead style={{ backgroundColor: "#031249" }}>
                <TableRow>
                  <StyledTableCell>Sl No</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>User Type</StyledTableCell>
                  <StyledTableCell>Details</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.map(({ name, email, usertype }, index) => (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell>{name}</StyledTableCell>
                    <StyledTableCell>{email}</StyledTableCell>
                    <StyledTableCell>{usertype}</StyledTableCell>
                    <StyledTableCell><button style={{background:"lightgreen",height:"45px",width:"150px",borderColor:"white"}}>Update Details</button>
                    <br></br><button style={{background:"lightpink",height:"45px",width:"150px",borderColor:"white"}}>Delete Record</button></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <br></br>
      <br></br>

      <div>
        <h3 style={{ textAlign: "center" }}>PROMOTION REQUESTS</h3>
      </div>
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        alignItems="center"
        direction="row"
      >
        <Grid item xs={11}>
          <TableContainer component={Paper}>
            <Table
              sx={{ border: "1px solid gray" }}
              aria-label="customized table"
            >
              <TableHead style={{ backgroundColor: "#031249" }}>
                <TableRow>
                  <StyledTableCell>Sl No</StyledTableCell>
                  <StyledTableCell>SellerId </StyledTableCell>
                  <StyledTableCell>Land Id</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {promotionView.map(({ sellerid, propertyid }, index) => (
                  <StyledTableRow>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {sellerid}
                    </StyledTableCell>
                    <StyledTableCell>{propertyid}</StyledTableCell>
                    <StyledTableCell><button style={{background:"lightgreen",height:"30px",width:"100px",borderColor:"white"}}>Accept</button>
                    <button style={{background:"lightpink",height:"30px",width:"100px",borderColor:"white"}}>Reject</button></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <br></br>
      <br></br>
    </div>
  );
};

export default Admin;
