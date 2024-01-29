/** @format */

import { Button, Drawer, Stack, Typography } from "@mui/material";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setShowEdit } from "../features/userSlices";
import {
  FormBody,
  FormFooter,
  FormHeader,
  FormInput,
} from "../styles/FormComponent";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const EditUserComponent = () => {
  const [userValue, setUserValue] = useState({
    id: 0,
    address: {
      city: "",
      street: "",
    },
    email: "",
    username: "",
    password: "",
    name: {
      firstname: "",
      lastname: "",
    },
    phone: "",
  });

  const userId = useSelector((state: RootState) => state.users.userId);
  const isShowEditUser = useSelector(
    (state: RootState) => state.users.isShowEditUser
  );

  const clientQuery = useQueryClient();
  const listUser: any = clientQuery.getQueryData(["users"]);

  useEffect(() => {
    for (let i = 0; i < listUser.length; i++) {
      if (listUser[i].id === userId) {
        setUserValue(listUser[i]);
      }
    }
  }, []);

  const userData = useMutation(
    async (updateData: any) => {
      const res = await axios.put(
        `https://fakestoreapi.com/users/${userId}`,
        updateData
      );
      return res.data;
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(["users"]);
      },
    }
  );

  const dispatch = useDispatch<AppDispatch>();
  const handleOnChangeEditUser = (e: any) => {
    setUserValue({
      ...userValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseEdit = () => {
    dispatch(setShowEdit(false));
  };

  const handleSave = () => {
    const updateData = {
      id: Math.random() * 1000,
      address: {
        city: userValue.address.city,
        street: userValue.address.street,
      },
      email: userValue.email,
      username: userValue.username,
      password: userValue.password,
      name: {
        firstname: userValue.name.firstname,
        lastname: userValue.name.lastname,
      },
      phone: userValue.phone,
    };
    userData.mutate(updateData);
    handleCloseEdit();
  };

  return (
    <Drawer anchor='top' open={isShowEditUser}>
      <Stack spacing={2}>
        <FormHeader bgcolor='orange'>
          <Typography variant='h5'>EDIT USER</Typography>
        </FormHeader>
        <FormBody>
          <FormInput
            id='city'
            label='City'
            variant='standard'
            value={userValue.address.city}
            name='city'
            onChange={handleOnChangeEditUser}
          />
          <FormInput
            id='street'
            label='Street'
            variant='standard'
            value={userValue.address.street}
            name='street'
            onChange={handleOnChangeEditUser}
          />
          <FormInput
            id='email'
            label='Email'
            variant='standard'
            value={userValue.email}
            name='email'
            onChange={handleOnChangeEditUser}
          />
          <FormInput
            id='username'
            label='Username'
            variant='standard'
            value={userValue.username}
            name='username'
            onChange={handleOnChangeEditUser}
          />
          <FormInput
            id='password'
            label='Password'
            variant='standard'
            value={userValue.password}
            name='password'
            onChange={handleOnChangeEditUser}
          />
          <FormInput
            id='lastName'
            label='Last Name'
            variant='standard'
            value={userValue.name.lastname}
            name='lastname'
            onChange={handleOnChangeEditUser}
          />
          <FormInput
            id='firstName'
            label='First Name'
            variant='standard'
            value={userValue.name.firstname}
            name='firstname'
            onChange={handleOnChangeEditUser}
          />
          <FormInput
            id='phone'
            label='Phone'
            variant='standard'
            value={userValue.phone}
            name='phone'
            onChange={handleOnChangeEditUser}
          />
        </FormBody>
        <FormFooter>
          <Button variant='contained' color='warning' onClick={handleSave}>
            Save
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={handleCloseEdit}>
            Close
          </Button>
        </FormFooter>
      </Stack>
    </Drawer>
  );
};

export default EditUserComponent;
