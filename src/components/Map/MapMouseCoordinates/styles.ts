import styled from "styled-components";

export const Coordinates = styled.div`
  font-size: 14px;
  font-weight: bold;
  position: absolute;
`;

export const CoordinateOverlay = styled.div`
  position: absolute;
  inset: 0;
  color: red;
  z-index: 1001;
  pointer-events: none;
`;

interface IHorizontalLine {
  $translateX?: number;
}
interface IVerticalLine {
  $translateY?: number;
}

const lineStroke = "1px";

const Line = styled.div`
  position: absolute;
  background-color: red;
`;

export const HorizontalLine = styled(Line)<IHorizontalLine>`
  width: 100%;
  height: ${lineStroke};
  transform: translateX(${(props) => props.$translateX}%);
`;

export const VerticalLine = styled(Line)<IVerticalLine>`
  height: 100%;
  width: ${lineStroke};
  transform: translateY(${(props) => props.$translateY}%);
`;
