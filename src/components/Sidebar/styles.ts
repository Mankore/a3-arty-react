import styled from "styled-components";
import { colors } from "../../styles/variables";

export const StyledCheckbox = styled.input`
  color: ${colors.darkGreen};

  &.Mui-checked {
    color: ${colors.green};
  }
`;

export const Label = styled.label`
  color: ${colors.white};
`;

export const Option = styled.option``;

export const Container = styled.aside`
  padding: 1rem;
  background-color: ${colors.black};
  color: ${colors.white};
`;

export const StyledSelect = styled.select`
  display: block;
  background-color: ${colors.white};

  .MuiSelect-select {
    padding: 0.75rem;
  }
`;

export const Wrapper = styled.div`
  margin: 10px;
`;

export const StyledInput = styled.input`
  background-color: ${colors.white};
  padding: 0.5rem;
`;

export const StyledFormHelperText = styled.span`
  color: ${colors.white};
`;
