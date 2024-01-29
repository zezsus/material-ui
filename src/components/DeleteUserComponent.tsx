/** @format */

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setShowDelete } from "../features/userSlices";
import { Button, Drawer, Stack, Typography } from "@mui/material";
import { FormBody, FormFooter, FormHeader } from "../styles/FormComponent";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const DeleteUserComponent = () => {
  const isShowDeleteUser = useSelector(
    (state: RootState) => state.users.isShowDeleteUser
  );
  const userId = useSelector((state: RootState) => state.users.userId);

  const dispatch = useDispatch<AppDispatch>();

  const deleteUserMutation = useMutation(async (userId) => {
    try {
      const res = await axios.delete(
        `https://fakestoreapi.com/users/${userId}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  });

  const handleCloseDelete = () => {
    dispatch(setShowDelete(false));
  };

  const handleDeleteUser = (userId: any) => {
    deleteUserMutation.mutate(userId);
    handleCloseDelete();
  };

  return (
    <Stack>
      <Drawer anchor='top' open={isShowDeleteUser}>
        <FormHeader bgcolor='red'>
          <Typography variant='h5'>DELETE</Typography>
        </FormHeader>
        <FormBody height='100px'>
          <Typography component='div' variant='h6'>
            Do you want detele item?
          </Typography>
        </FormBody>
        <FormFooter>
          <Button
            variant='contained'
            color='error'
            onClick={() => handleDeleteUser(userId)}>
            Yes
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={handleCloseDelete}>
            No
          </Button>
        </FormFooter>
      </Drawer>
    </Stack>
  );
};
export default DeleteUserComponent;
