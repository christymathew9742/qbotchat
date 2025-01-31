"use client";

import React from 'react';
import { CircularProgress, Stack } from '@mui/material';

interface LoaderProps {
  status: boolean; // true if loading, false otherwise
}

const Loader: React.FC<LoaderProps> = ({ status }) => {
  return status && (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 ${
        status ? 'bg-black bg-opacity-40 opacity-100' : 'opacity-0'
      }`}
    >
      {status && (
        <Stack spacing={2} alignItems="center">
          <CircularProgress size={40} disableShrink={true} />
        </Stack>
      )}
      {/* If status is false, the whole page will have opacity 0 */}
      <div className={`fixed inset-0 ${status ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
        {/* Page content */}
      </div>
    </div>
  );
};

export default Loader;
