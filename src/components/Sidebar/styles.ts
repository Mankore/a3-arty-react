import styled from "styled-components";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

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
`;

export const Wrapper = styled.div`
  margin: 10px;
`;
