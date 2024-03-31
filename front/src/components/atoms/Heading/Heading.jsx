import React from "react";
import { styled } from "styled-components";

const StyledHeading = styled(({ as: Element, ...rest }) => <Element {...rest} />)`
    background: ${(props) => props.background || props.theme.secondary};
    color: ${(props) => props.color || props.theme.primary};
    text-align: ${(props) => props.textAlign || props.theme[props.as]?.textAlign || "left"};
`;

const Heading = ({ children, as: Element = "h1", ...props }) => {
    return <StyledHeading as={Element} {...props}>{children}</StyledHeading>;
};

export default Heading;
