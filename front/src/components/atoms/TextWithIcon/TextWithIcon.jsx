import React from "react";
import { styled } from "styled-components";

const StyledTextWithIcon = styled.text`
  ${(props) => (props.height ? "height: " + props.height + " ;" : "")}
  ${(props) => (props.width ? "width: " + props.width + " ;" : "")}
    background: ${(props) =>
    props.background ? props.background : props.theme.secondary};
  color: ${(props) => (props.color ? props.color : props.theme.primary)};
`;

const TextWithIcon = ({ icon = <></>, text = "", ...props }) => {
  return (
    <StyledTextWithIcon {...props}>
      {icon}
      {text}
    </StyledTextWithIcon>
  );
};

export default TextWithIcon;
