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
import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import axios from "axios";

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

function Tags() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [newTagName, setNewTagName] = useState("");
  const [creatingTag, setCreatingTag] = useState(false); 

  useEffect(() => {
    const getTags = async () => {
      try {
        const response = await axios.get("/admin/tags");
        setTags(response.data);
      } catch (error) {
        setError("Error fetching tags " + error.message);
      } finally {
        setLoading(false);
      }
    };
    getTags();
  }, [creatingTag]);

  const handleDelete = async () => {
    handleCloseDialog();
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("No access token found");
      await axios.delete(`/admin/tags/${selectedTagId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTags(tags.filter((tag) => tag.tag_id !== selectedTagId));
    } catch (error) {
      setError("Error deleting tag: " + error.message);
    }
  };

  const handleEditTag = (tagId) => {
    setEditingTag(tagId);
    const tagToEdit = tags.find((tag) => tag.tag_id === tagId);
    setNewTagName(tagToEdit.tag_name);
  };

  const handleSaveEdit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("No access token found");
      await axios.patch(
        `/admin/tags/${editingTag}`,
        { tag_name: newTagName },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTags((prevTags) =>
        prevTags.map((tag) =>
          tag.tag_id === editingTag ? { ...tag, tag_name: newTagName } : tag
        )
      );
      setEditingTag(null);
    } catch (error) {
      setError("Error updating tag: " + error.message);
    }
  };

  const handleOpenDialog = (tagId) => {
    setSelectedTagId(tagId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTagId(null);
  };

  const handleCreateTagClick = () => {
    setCreatingTag(true);
    setNewTagName("");
  };

  const handleCreateTagSubmit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("No access token found");
        await axios.post(
        "/admin/tags",
        { tag_name: newTagName },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      setCreatingTag(false);
    } catch (error) {
      setError("Error creating tag: " + error.message);
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
                Tags Management
              </Typography>
              <Button
                variant="contained"
                color="success"
                size="large"
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
                onClick={handleCreateTagClick}
              >
                Create A Tag
              </Button>
            </Box>

            {creatingTag && (
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Tag Name"
                  variant="outlined"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={handleCreateTagSubmit}
                  disabled={loading || !newTagName.trim()}
                >
                  {loading ? <CircularProgress size={24} /> : "Submit"}
                </Button>
              </Box>
            )}

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Tag ID</StyledTableCell>
                    <StyledTableCell align="left">Tag Name</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tags.map((tag) => (
                    <StyledTableRow key={tag.tag_id}>
                      <StyledTableCell component="th" scope="row">
                        {tag.tag_id}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {editingTag === tag.tag_id ? (
                          <TextField
                            value={newTagName}
                            onChange={(e) => setNewTagName(e.target.value)}
                            fullWidth
                          />
                        ) : (
                          tag.tag_name
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {editingTag === tag.tag_id ? (
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
                              onClick={() => handleEditTag(tag.tag_id)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleOpenDialog(tag.tag_id)}
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
              Are you sure you want to delete this tag? This action cannot be
              undone.
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

export default Tags;
