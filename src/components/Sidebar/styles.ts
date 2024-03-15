import styled from "styled-components";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { colors } from "../../styles/variables";

export const StyledCheckbox = styled(Checkbox)`
  color: ${colors.darkGreen};

  &.Mui-checked {
    color: ${colors.green};
  }
`;

export const Label = styled(InputLabel)`
  color: ${colors.white};
`;

export const Option = styled(MenuItem)``;

export const Container = styled.aside`
  padding: 1rem;
  background-color: ${colors.black};
  color: ${colors.white};
`;

export const StyledSelect = styled(Select)`
  display: block;
  background-color: ${colors.white};

  .MuiSelect-select {
    padding: 0.75rem;
  }
`;

export const Wrapper = styled.div`
  margin: 10px;
`;

export const StyledInput = styled(Input)`
  background-color: ${colors.white};
  padding: 0.5rem;
`;

export const StyledFormHelperText = styled(FormHelperText)`
  color: ${colors.white};
`;

export const KeyBindingTip = styled.div`
  margin-bottom: 1rem;
`;

export const KeyBindingTipTitle = styled.span`
  background: ${colors.darkGreen};
  border-radius: 3px;
  padding: 3px;
`;
