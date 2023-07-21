import styled from "styled-components";

export const Coordinates = styled.div<DivPosition>`
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`

export const CoordinateOverlay = styled.div`
  position: absolute;
  inset: 0;
  color: red;
  z-index: 1001;
  pointer-events: none;
`;

interface DivPosition {
  top: number;
  left: number;
}

interface IHorizontalLine extends DivPosition {
  translateX?: number;
}
interface IVerticalLine extends DivPosition {
  translateY?: number;
}

const lineStroke = "1px";

const Line = styled.div<DivPosition>`
  position: absolute;
  background-color: red;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

export const HorizontalLine = styled(Line)<IHorizontalLine>`
  width: 100%;
  height: ${lineStroke};
  transform: translateX(${(props) => props.translateX}%);
`;

export const VerticalLine = styled(Line)<IVerticalLine>`
  height: 100%;
  width: ${lineStroke};
  transform: translateY(${(props) => props.translateY}%);
`;
