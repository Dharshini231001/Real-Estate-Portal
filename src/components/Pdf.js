import { Box, Divider } from "@material-ui/core";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Logo from "../assets/logo-via-logohub.png";
import Typography from "@mui/material/Typography";
export class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  render() {
    return (
      <Box margin="auto" px={"4em"}>
       <center><img src={Logo} className="logo2" alt="logo" style={{ marginRight:"35%",position:"initial"}}/><br></br></center> 
        <Box>
          <Typography variant="h3" gutterBottom textAlign={"center"}>
          <br></br>  Your Perfect RealEstate Partner
          </Typography>
        </Box>
        <Box>
          <h1 textAlign="center">Monthwise Property Listings Report</h1>
        </Box>
        <Divider />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>City</TableCell>
                <TableCell align="right">Area</TableCell>
                <TableCell align="right">Bedrooms</TableCell>
                <TableCell align="right">Bathrooms</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.selleraddress}
                  </TableCell>
                  <TableCell align="right">{row.area}</TableCell>
                  <TableCell align="right">{row.bedrooms}</TableCell>
                  <TableCell align="right">{row.bathrooms}</TableCell>
                  <TableCell align="right">{row.askingprice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}
const Pdf = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <button onClick={handlePrint}>Print !</button>
    </div>
  );
};

export default Pdf;
