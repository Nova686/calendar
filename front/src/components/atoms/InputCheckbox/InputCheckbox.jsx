import React from "react";
import {styled} from "styled-components";

const StyleInputCheckbox = styled.input``

const InputCheckbox = ({...props}) => {
    return <StyleInputCheckbox type={"checkbox"} {...props}/>
}

export default InputCheckbox;