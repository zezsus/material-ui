/** @format */

import { Stack, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UserPage from "./UserPage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setShowAdd } from "../features/userSlices";
import AddUserComponent from "../components/AddUserComponent";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isShowAddUser = useSelector(
    (state: RootState) => state.users.isShowAddUser
  );
  const handleClickAddUser = () => {
    dispatch(setShowAdd(true));
  };
  return (
    <Stack direction='column' spacing={2}>
      <Box pt={1}>
        {!isShowAddUser ? (
          <Button
            variant='contained'
            title='Add New User'
            color='info'
            onClick={handleClickAddUser}>
            <AddIcon />
          </Button>
        ) : (
          <AddUserComponent />
        )}
      </Box>
      <Box>
        <UserPage />
      </Box>
    </Stack>
  );
};

export default HomePage;
