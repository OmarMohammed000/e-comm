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
  tableCellClasses,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import UserCreationForm from "./UserCreationForm";
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

function Users() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUserCreationForm, setOpenUserCreationForm] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("No access token found");
        const response = await axios.get(`${apiLink}/admin/users`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [openUserCreationForm]);

  const handleDelete = async () => {
    handleCloseDialog();
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("No access token found");
      await axios.delete(`${apiLink}/admin/users/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUsers(users.filter((user) => user.id !== selectedUserId));
      setOpenDialog(false);
    } catch (error) {
      setError("Error Deleting Product " + error.status);
    }
  };

  const handleOpenDialog = (userId) => {
    setSelectedUserId(userId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUserId(null);
  };

  const handleUserCreated = () => {
    setUsers([...users]); 
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
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Users Management
              </Typography>
              <Button
                variant="contained"
                color="success"
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
                onClick={() => setOpenUserCreationForm(true)}
              >
                Create A User
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>User Name</StyledTableCell>
                    <StyledTableCell align="left">Email</StyledTableCell>
                    <StyledTableCell align="left">Is Admin</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <StyledTableRow key={user.id}>
                      <StyledTableCell component="th" scope="row">
                        {user.user_name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {user.email}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {user.isAdmin ? "Yes" : "No"}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleOpenDialog(user.id)}
                        >
                          Delete
                        </Button>
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
              Are you sure you want to delete this user? This action cannot be
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

        <UserCreationForm
          open={openUserCreationForm}
          handleClose={() => setOpenUserCreationForm(false)}
          onUserCreated={handleUserCreated}
        />
      </Grid2>
    </Grid2>
  );
}

export default Users;
