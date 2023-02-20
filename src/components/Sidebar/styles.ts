import styled from "styled-components";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";

export const Label = styled(InputLabel)`
  color: white;
`;

export const Option = styled(MenuItem)``;

export const Container = styled.aside`
  padding: 1rem;
  background-color: black;
  color: white;
`;

export const StyledSelect = styled(Select)`
  display: block;
  background-color: white;

  .MuiSelect-select {
    padding: 0.75rem;
  }
`;

export const Wrapper = styled.div`
  margin: 10px;
`;

export const StyledInput = styled(Input)`
  background-color: white;
  padding: 0.5rem;
`;

export const StyledFormHelperText = styled(FormHelperText)`
  color: white;
`;
