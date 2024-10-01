import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Grid2,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  TextField,
  CircularProgress,
  styled,
  tableCellClasses,
} from "@mui/material";
import AdminSideBar from "./AdminSideBar";
import axios from "axios";
import apiLink from "../../data/ApiLink";

// Styled Table Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

function Categories() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [creatingCategory, setCreatingCategory] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("No access token found");
        const response = await axios.get(`${apiLink}/admin/categories`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        setError("Error fetching categories: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, [creatingCategory]);

  const handleDelete = async () => {
    handleCloseDialog();
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("No access token found");
      await axios.delete(`${apiLink}/admin/categories/${selectedCategoryId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCategories(
        categories.filter((category) => category.id !== selectedCategoryId)
      );
    } catch (error) {
      setError("Error deleting category: " + error.message);
    }
  };

  const handleEditCategory = (categoryId) => {
    setEditingCategory(categoryId);
    const categoryToEdit = categories.find(
      (category) => category.id === categoryId
    );
    setNewCategoryName(categoryToEdit.name);
  };

  const handleSaveEdit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("No access token found");
      await axios.patch(
        `${apiLink}/admin/categories/${editingCategory}`,
        { name: newCategoryName },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === editingCategory
            ? { ...category, name: newCategoryName }
            : category
        )
      );
      setEditingCategory(null);
    } catch (error) {
      setError("Error updating category: " + error.message);
    }
  };

  const handleOpenDialog = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategoryId(null);
  };

  const handleCreateCategoryClick = () => {
    setCreatingCategory(true);
    setNewCategoryName("");
  };

  const handleCreateCategorySubmit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("No access token found");
      await axios.post(
        `${apiLink}/admin/categories`,
        { name: newCategoryName },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setCreatingCategory(false);
    } catch (error) {
      setError("Error creating category: " + error.message);
    }
  };

  return (
    <Grid2 container>
      <AdminSideBar />
      <Grid2 size={{ xs: 4, md: 9, lg: 10 }} sx={{ padding: 2 }}>
        {error ? (
          <Alert severity="error">{error}</Alert>
        ) : loading ? (
          <Box sx={{ width: "100%" }}>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 2,
                mt: 2,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Categories Management
              </Typography>
              <Button
                variant="contained"
                color="success"
                size="large"
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
                onClick={handleCreateCategoryClick}
              >
                Create A Category
              </Button>
            </Box>

            {creatingCategory && (
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Category Name"
                  variant="outlined"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={handleCreateCategorySubmit}
                  disabled={loading || !newCategoryName.trim()}
                >
                  {loading ? <CircularProgress size={24} /> : "Submit"}
                </Button>
              </Box>
            )}

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Category ID</StyledTableCell>
                    <StyledTableCell align="left">Category Name</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <StyledTableRow key={category.id}>
                      <StyledTableCell component="th" scope="row">
                        {category.id}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {editingCategory === category.id ? (
                          <TextField
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            fullWidth
                          />
                        ) : (
                          category.name
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {editingCategory === category.id ? (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSaveEdit}
                            disabled={loading}
                          >
                            Save
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{ marginLeft: 2 }}
                              onClick={() =>
                                handleEditCategory(category.id)
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() =>
                                handleOpenDialog(category.id)
                              }
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{ color: "black" }}>
            {"Confirm Deletion"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ color: "black" }}
            >
              Are you sure you want to delete this category? This action cannot
              be undone.
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
    </Grid2>
  );
}

export default Categories
