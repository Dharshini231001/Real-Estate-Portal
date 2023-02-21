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
import Navbar from "./Navbar";

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

const ViewRequest = () => {
  const { user } = useContext(AuthContext);

  console.log(user, "=============user");

  const navigate = useNavigate();

  const [requestdata, setRequest] = useState([]);

  useEffect(() => {
    console.log(user.userinfo.id, "===========================");
    axios({
      method: "post",
      url: `http://localhost/realestate-backend/index.php`,
      data: {
        api: "salesreq",
        action: "getRequestbysellerId",
        sellerId: user.userinfo.id,
      },
    }).then((response) => {
      console.log(response, "----------------");
      if (response.data.status_code == 200) {
        setRequest(response.data.returndata);
      }
    });
  }, [requestdata]);

  return (
    <div>
      <Navbar />

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
                  <StyledTableCell>buyername</StyledTableCell>
                  <StyledTableCell>buyerid</StyledTableCell>
                  <StyledTableCell>propertyid</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requestdata.map(
                  ({ buyername, buyerid, propertyid }, index) => (
                    <StyledTableRow>
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {buyername}
                      </StyledTableCell>
                      <StyledTableCell>{buyerid}</StyledTableCell>
                      <StyledTableCell>{propertyid}</StyledTableCell>
                    </StyledTableRow>
                  )
                )}
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

export default ViewRequest;
