/** @format */

import styled from "@emotion/styled";
import { Box, TextField } from "@mui/material";

export const FormBody = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

export const FormInput = styled(TextField)({
  width: "50%",
});

export const FormHeader = styled(Box)({
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  padding: "1.5rem",
  color: "white",
  fontWeight: "bold",
});

export const FormFooter = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
  padding: "1rem",
});
