import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './components/Routes/Routes';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
 <RouterProvider router={router}></RouterProvider>
 <Toaster></Toaster>
    </div>
  );
};

export default App;