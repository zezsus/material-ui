/** @format */

import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  isShowAddUser: boolean;
  isShowEditUser: boolean;
  isShowDeleteUser: boolean;
  userId: number;
  editUser: any;
}

const initialState: CounterState = {
  isShowAddUser: false,
  isShowEditUser: false,
  isShowDeleteUser: false,
  userId: 0,
  editUser: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setShowAdd: (state, action) => {
      state.isShowAddUser = action.payload;
    },
    setShowEdit: (state, action) => {
      state.isShowEditUser = action.payload;
    },
    setShowDelete: (state, action) => {
      state.isShowDeleteUser = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },

    setEidtUser: (state, action) => {
      state.editUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setShowAdd,
  setShowEdit,
  setShowDelete,
  setUserId,
  setEidtUser,
} = userSlice.actions;

export default userSlice.reducer;
