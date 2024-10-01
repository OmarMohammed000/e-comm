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
  MenuItem,
  Select,
  styled,
  tableCellClasses,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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

function Subcategory() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [creatingSubcategory, setCreatingSubcategory] = useState(false);
  const [newSubcategoryData, setNewSubcategoryData] = useState({
    name: "",
    category_id: "",
  });

  useEffect(() => {
    const getSubcategories = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("No access token found");
        const response = await axios.get(`${apiLink}/admin/subcategories`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setSubcategories(response.data);
      } catch (error) {
        setError("Error fetching subcategories: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    const getCategories = async () => {
      try {
        setLoading(true);
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

    getSubcategories();
    getCategories();
  }, []);

  const handleDelete = async () => {
    handleCloseDialog();
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("No access token found");
      await axios.delete(
        `${apiLink}/admin/subcategories/${selectedSubcategoryId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSubcategories(
        subcategories.filter((sub) => sub.id !== selectedSubcategoryId)
      );
    } catch (error) {
      setError("Error deleting subcategory: " + error.message);
    }
  };

  const handleEditSubcategory = (subcategory) => {
    setEditingSubcategory(subcategory.id);
    setNewSubcategoryName(subcategory.name);
    setNewCategoryId(subcategory.category_id);
  };

  const handleSaveEdit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("No access token found");
      await axios.patch(
        `${apiLink}/admin/subcategories/${editingSubcategory}`,
        {
          name: newSubcategoryName,
          category_id: newCategoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSubcategories((prevSubcategories) =>
        prevSubcategories.map((sub) =>
          sub.id === editingSubcategory
            ? { ...sub, name: newSubcategoryName, category_id: newCategoryId }
            : sub
        )
      );
      setEditingSubcategory(null);
    } catch (error) {
      setError("Error updating subcategory: " + error.message);
    }
  };

  const handleOpenDialog = (subcategoryId) => {
    setSelectedSubcategoryId(subcategoryId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSubcategoryId(null);
  };
  const handleCreateSubcategorySubmit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("No access token found");
      const payload = {
        name: newSubcategoryData.name,
        category_id: newSubcategoryData.category_id,
      };
      await axios.post(`${apiLink}/admin/subcategories`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const response = await axios.get(`${apiLink}/admin/subcategories`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSubcategories(response.data);

      setCreatingSubcategory(false);
      setNewSubcategoryData({ name: "", category_id: "" });
    } catch (error) {
      setError("Error creating subcategory: " + error.message);
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
                Subcategory Management
              </Typography>
              <Button
                variant="contained"
                color="success"
                size="large"
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
                onClick={() => setCreatingSubcategory(true)}
              >
                Create Subcategory
              </Button>
            </Box>
            {creatingSubcategory && (
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Subcategory Name"
                  variant="outlined"
                  value={newSubcategoryData.name}
                  onChange={(e) =>
                    setNewSubcategoryData({
                      ...newSubcategoryData,
                      name: e.target.value,
                    })
                  }
                  fullWidth
                />
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel sx={{ color: "black" }}>Category Name</InputLabel>
                  <Select
                    value={newSubcategoryData.category_id}
                    label="Category Name"
                    onChange={(e) =>
                      setNewSubcategoryData({
                        ...newSubcategoryData,
                        category_id: e.target.value,
                      })
                    }
                    fullWidth
                    sx={{ color: "black" }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={handleCreateSubcategorySubmit}
                  disabled={
                    !newSubcategoryData.name || !newSubcategoryData.category_id
                  }
                >
                  {loading ? <CircularProgress size={24} /> : "Submit"}
                </Button>
              </Box>
            )}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell align="left">
                      Subcategory Name
                    </StyledTableCell>
                    <StyledTableCell align="left">Category</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subcategories.map((subcategory) => (
                    <StyledTableRow key={subcategory.id}>
                      <StyledTableCell component="th" scope="row">
                        {subcategory.id}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {editingSubcategory === subcategory.id ? (
                          <TextField
                            value={newSubcategoryName}
                            onChange={(e) =>
                              setNewSubcategoryName(e.target.value)
                            }
                            fullWidth
                          />
                        ) : (
                          subcategory.name
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {editingSubcategory === subcategory.id ? (
                          <Select
                            value={newCategoryId}
                            onChange={(e) => setNewCategoryId(e.target.value)}
                            fullWidth
                          >
                            {categories.map((category) => (
                              <MenuItem key={category.id} value={category.id}>
                                {category.name}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : subcategory.Category ? (
                          subcategory.Category.name
                        ) : (
                          "No Category"
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {editingSubcategory === subcategory.id ? (
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
                              onClick={() => handleEditSubcategory(subcategory)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleOpenDialog(subcategory.id)}
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
              Are you sure you want to delete this subcategory? This action
              cannot be undone.
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

export default Subcategory;
