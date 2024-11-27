import styled from "styled-components";

interface Props {
  type: "button" | "submit" | "reset" | "start" | "pause" | "remove";
  height: number;
  width: number;
}

const StyledButton = styled.button<Props>`
  background-color: ${(p) => {
    if (p.type === "start") {
      return "#3b89a8";
    } else if (p.type === "pause") {
      return "#DBD225";
    } else if (p.type === "reset") {
      return "#864451";
    } else {
      return "#3E535C";
    }
  }};
  height: ${(props) => {
    return props.height;
  }}px;
  border: none;
  border-radius: 10px;
  &:hover {
    background-color: #db2549;
  }
  width: ${(props) => {
    return props.width;
  }}px;
  padding: 0.5rem;
  margin: 0.25rem;
  cursor: pointer;
  font-weight: 700;
  color: #b8bebf;
`;

const Button = ({
  children,
  type,
  height,
  width,
  onClick,
}: {
  children: React.ReactNode;
  type: "button" | "submit" | "reset" | "start" | "pause" | "remove";
  height: number;
  width: number;
  onClick: () => void;
}) => {
  return (
    <StyledButton type={type} height={height} width={width} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
