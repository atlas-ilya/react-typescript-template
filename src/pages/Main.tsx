import React from 'react';
import Wrapper from "@components/wrapper";
import styled from 'styled-components';
import MuiButton from "@components/muiButton";

const Main = () => {
    return (
        <Wrapper>
            <StyledText>
                hello
            </StyledText>
            <MuiButton onClick={() => alert("hello")} text={"press me"}/>
        </Wrapper>
    );
};

export default Main;

const StyledText = styled.div`
  color: red;
`;
