import styled from "styled-components";
import { colors } from "../../styles/variables";

export const StyledCheckbox = styled.input`
  color: ${colors.darkGreen};

  &.Mui-checked {
    color: ${colors.green};
  }
`;
export const Option = styled.option``;

export const Container = styled.aside`
  padding: 1rem;
  background-color: ${colors.black};
  color: ${colors.white};
`;

export const Wrapper = styled.div`
  margin: 10px;
`;
