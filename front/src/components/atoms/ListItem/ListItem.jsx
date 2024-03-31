import React from "react";
import {styled} from "styled-components";

const StyleListItem = styled.li``;

const ListItem = ({children}) => {
    return <StyleListItem>{children}</StyleListItem>
}

export default ListItem