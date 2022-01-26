import Main from '@/pages/Main';
import React from 'react';
import {Route, Routes} from 'react-router-dom';

const Router = (): JSX.Element => {
    return (
        <Routes>
            <Route path={"/"} element={<Main/>}/>
        </Routes>
    );
};

export default Router;
