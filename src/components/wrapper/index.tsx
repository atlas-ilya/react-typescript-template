import React from 'react';

type WrapperProps = {
    children: React.ReactNode,
}

const Wrapper = ({children}: WrapperProps): JSX.Element  => {
    return (
        <div>
            {children}
        </div>
    );
};

export default Wrapper;
