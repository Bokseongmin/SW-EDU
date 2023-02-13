import React, { useState, useEffect } from 'react';

function Test(props) {
    const [state, setState] = useState('');

    useEffect(() => {
        return () => {

        }
    }, []);

    return (
        <>
            ReactJS Starter Template by Varun Bardwaj
        </>
    )
}

export default Test;