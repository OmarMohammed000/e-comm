import {
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Skeleton,
  Box,
  Typography,
  Alert,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import axios from "axios";
import apiLink from "../../data/ApiLink";
import { useNavigate } from "react-router-dom";

function AdminProduct() {
  const   StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  // start of getting the products logic
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("No access token found");
        const response = await axios.get(`${apiLink}/admin/products`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProducts(response.data);
     
    } catch (error) {
      setError("Error fetching Products" + error.response);
    } finally {
      setLoading(false);
    }
  };
    getProducts()
  }, []);
  // delete logic 
  const [deleteError,setDeleteError]=useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const handleDelete=async()=>{
    handleCloseDialog();
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("No access token found");
      await axios.delete(`${apiLink}/admin/products/${selectedProductId}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setProducts(products.filter((product) => product.id !== selectedProductId));
      setOpenDialog(false);
    } catch (error) {
      setDeleteError("Error Deleting Product "+error.status)
    }
  }
  const handleOpenDialog = (productId) => {
    setSelectedProductId(productId);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProductId(null);
  };
// start of the edit logic
  const navigate =useNavigate()
  const handleEdit=(id,title,description,imageArray)=>{
    navigate('/admin/products/productCreation',{state:{
      id,
      title,
      description,
      imageArray,
    }})
  }

  return (
    <Grid2 container >
      <AdminSideBar />
      
      {error ? (
        <div>{error}</div> // Display the error message if there's an error
      ) : loading ? (
        <Box sx={{ width: "100%"}}>
        <Skeleton animation="wave"/>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </Box> // Display a loading message or indicator if data is still loading
      ) : (
        <Grid2 size={{ xs: 4, md: 9, lg: 10 }} sx={{ padding: 2 }}>
          {deleteError &&<Alert severity="error" onClose={() => {setDeleteError(null)}}>{deleteError}</Alert>}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Product Management
            </Typography>
            <Button
              variant="contained"
              color="success"
              sx={{

                fontSize: "16px",
                fontWeight: "bold",
              }}
              onClick={()=>{
                navigate('/admin/products/productCreation')
              }}
            >
              Create A Product
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Product ID</StyledTableCell>
                  <StyledTableCell align="left">Title</StyledTableCell>
                  <StyledTableCell align="left">Description</StyledTableCell>
                  <StyledTableCell align="left">Price</StyledTableCell>
                  <StyledTableCell align="center">Images</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.title}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.description.length > 150
                        ? row.description.substring(0, 150) + "..."
                        : row.description}
                    </StyledTableCell>
                    <StyledTableCell align="left">${row.price}</StyledTableCell>
                    <StyledTableCell align="left">
                      <Grid2 container spacing={1}>
                        {row.Images.map((image) => (
                          <Grid2 key={image.id} item xs={6} md={4}>
                            <img
                              src={image.image_location}
                              alt="product"
                              style={{ width: "100px", height: "75px" }}
                            />
                          </Grid2>
                        ))}
                      </Grid2>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{width:75}}
                        onClick={()=>{
                          handleEdit(row.id,row.title,row.description,row.Images)
                        }}
                      >
                        Edit
                      </Button>
                      <Button variant="contained" color="error" sx={{width:75}} onClick={() => handleOpenDialog(row.id)}>
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid2>
      )}
        <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title"sx={{color:"black"}}>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{color:"black"}}>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid2>
  );
}

export default AdminProduct;
