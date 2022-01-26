import {Button, styled} from '@mui/material';
import React from 'react';

type MuiButtonProps = {
    onClick: () => void,
    text: string
}

const MuiButton = (props: MuiButtonProps):JSX.Element => {
    return (
        <StyledButton onClick={() => props.onClick()}>
            {`${props.text}`}
        </StyledButton>
    );
};

export default MuiButton;

const StyledButton = styled(Button)((props) => ({
    width: 200,
    background: "black",
    color: "white",
    "&:hover": {
        background: "grey",
    }
}));
