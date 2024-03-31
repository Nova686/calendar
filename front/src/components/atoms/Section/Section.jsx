import React, {useContext} from "react";
import {styled} from "styled-components";
import {NestingContext, NestingProvider} from "../../../contexts";

const StyleSection = styled.section`
    background: ${props => props.theme.primary};
    color: ${props => props.theme.secondary};
`;

const Section = ({children}) => {
    const nestContext = useContext(NestingContext)

    return (
        <StyleSection>
            <NestingProvider value={nestContext === 6 ? nestContext : nestContext + 1}>
                {children}
            </NestingProvider>
        </StyleSection>
    );
};

export default Section;