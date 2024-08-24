import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/js/Header';
import { Popular } from './components/js/Popular';
import { SearchTemplate } from './components/js/SearchTemplate';


const App = () => {

    return (
        <>
            <Header />
            <Popular />
        </>
    );
};

export default App;
