/** @format */

import { Button, Drawer, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setShowAdd } from "../features/userSlices";
import {
  FormBody,
  FormFooter,
  FormHeader,
  FormInput,
} from "../styles/FormComponent";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const AddUserComponent = () => {
  const [address, setAddress] = useState({
    city: "",
    street: "",
  });
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState({
    lastName: "",
    firstName: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const isShowAddUser = useSelector(
    (state: RootState) => state.users.isShowAddUser
  );

  const queryClient = useQueryClient();

  const addUserMutation = useMutation(
    async (newUser) => {
      try {
        const res = await axios.post(`https://fakestoreapi.com/users`, newUser);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: () => {
        queryClient.getQueriesData(["users"]);
      },
    }
  );

  const handleOnChangeAddress = (e: any) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleOnChangeName = (e: any) => {
    setName({ ...name, [e.target.name]: e.target.value });
  };

  const handleCloseAddUser = () => {
    dispatch(setShowAdd(false));
  };

  const handleAddNewUser = () => {
    if (!address || !email || !username || !password || !name || !phone) {
      alert("Missing required fields");
    } else {
      const newUser: any = {
        id: Math.random() * 1000,
        address: {
          city: address.city,
          street: address.street,
        },
        email: email,
        username: username,
        password: password,
        name: {
          lastName: name.lastName,
          firstName: name.firstName,
        },
        phone: phone,
      };

      addUserMutation.mutate(newUser);
      handleCloseAddUser();
    }
  };

  return (
    <Drawer anchor='top' open={isShowAddUser}>
      <Stack spacing={2} justifyContent='center'>
        <FormHeader bgcolor='blue'>
          <Typography variant='h5'>ADD USER</Typography>
        </FormHeader>
        <FormBody>
          <FormInput
            id='city'
            label='City'
            variant='standard'
            value={address.city}
            name='city'
            onChange={handleOnChangeAddress}
          />
          <FormInput
            id='street'
            label='Street'
            variant='standard'
            value={address.street}
            name='street'
            onChange={handleOnChangeAddress}
          />
          <FormInput
            id='email'
            label='Email'
            variant='standard'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            id='username'
            label='Username'
            variant='standard'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormInput
            id='password'
            label='Password'
            variant='standard'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormInput
            id='lastName'
            label='Last Name'
            variant='standard'
            value={name.lastName}
            name='lastName'
            onChange={handleOnChangeName}
          />
          <FormInput
            id='firstName'
            label='First Name'
            variant='standard'
            value={name.firstName}
            name='firstName'
            onChange={handleOnChangeName}
          />
          <FormInput
            id='phone'
            label='Phone'
            variant='standard'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormBody>
        <FormFooter>
          <Button variant='contained' color='info' onClick={handleAddNewUser}>
            Add New
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={handleCloseAddUser}>
            Close
          </Button>
        </FormFooter>
      </Stack>
    </Drawer>
  );
};

export default AddUserComponent;
