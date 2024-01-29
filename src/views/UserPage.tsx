/** @format */

import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { useQuery } from "react-query";
import axios from "axios";
import SpinnerComponent from "../components/SpinnerComponent";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setShowDelete, setShowEdit, setUserId } from "../features/userSlices";
import EditUserComponent from "../components/EditUserComponent";
import DeleteUserComponent from "../components/DeleteUserComponent";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const isShowEditUser = useSelector(
    (state: RootState) => state.users.isShowEditUser
  );
  const isShowDeleteUser = useSelector(
    (state: RootState) => state.users.isShowDeleteUser
  );
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, isError, data, error } = useQuery(["users"], async () => {
    const res = await axios.get("https://fakestoreapi.com/users");
    return res.data;
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }} justifyContent='center'>
        <SpinnerComponent />
      </Box>
    );
  }

  if (isError) {
    console.log(error);
  }

  const handleClickEdit = (userId: any) => {
    dispatch(setShowEdit(true));
    dispatch(setUserId(userId));
  };

  const handleClickDelete = (id: number) => {
    dispatch(setShowDelete(true));
    dispatch(setUserId(id));
  };

  return (
    <Stack>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 490 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Index</TableCell>
                <TableCell align='center'>Name</TableCell>
                <TableCell align='center'>Phone</TableCell>
                <TableCell align='center'>Address</TableCell>
                <TableCell align='center'>Username</TableCell>
                <TableCell align='center'>Password</TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((user: any, index: number) => (
                <TableRow key={user.id}>
                  <TableCell align='center' sx={{ fontWeight: "bold" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/user-detail/${user.id}`)}>
                    {user.name.lastname}
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.address.city}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell
                    sx={{ display: "flex", justifyContent: "space-evenly" }}>
                    <IconButton
                      aria-label='delete'
                      title='Delete User'
                      onClick={() => handleClickDelete(user.id)}>
                      <DeleteIcon color='error' />
                    </IconButton>
                    <IconButton
                      aria-label='edit'
                      title='Edit User'
                      onClick={() => handleClickEdit(user.id)}>
                      <EditCalendarIcon color='warning' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {isShowEditUser && <EditUserComponent />}
      {isShowDeleteUser && <DeleteUserComponent />}
    </Stack>
  );
};

export default UserPage;
