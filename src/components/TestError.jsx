import React, { useEffect } from 'react';

const TestError = () => {
    useEffect(() => {
        throw new Error("This is a test error to verify the Error Boundary.");
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <h1>Testing Error Boundary...</h1>
        </div>
    );
};

export default TestError;
