import React from 'react';
import Wrapper from "@components/wrapper";
import styled from 'styled-components';

const Main = () => {
    return (
        <Wrapper>
            <StyledText>
                hello
            </StyledText>
        </Wrapper>
    );
};

export default Main;

const StyledText = styled.div`
  color: red;
`;
