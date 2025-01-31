"use client";

import React, { Suspense, lazy } from 'react';
import dynamic from 'next/dynamic'
const Display = dynamic(
    () => import("@/section/Display/Display"),
    { ssr: false },
);

const DisplayOptions = () => {
    return (
        <div>
            <h1>Hiiii.....</h1>
            <h1><Display/></h1>
        </div>
    )
}

export default DisplayOptions;