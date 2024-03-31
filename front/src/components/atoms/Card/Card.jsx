import React from "react";
import { styled } from "styled-components";

const CardStyle = styled.div`
    background-color: ${(props) => props.theme.secondary ?? "white"};
    color: ${(props) => props.theme.primary ?? "white"};
`;

const Card = (props) => {
    return <CardStyle {...props}>{"Cette card n'a pas de contenu"}</CardStyle>;
};

export default Card;