import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from './pages/Root/Root';
import Entry from './pages/Entry/Entry';
import Overview from './pages/Overview/Overview';
import Quiz from './pages/Quiz/Quiz';
import TestResult from './pages/Quiz/TestResult';
import Error from './pages/Error/Error';

import AuthContextProvider from './components/Providers/AuthContextProvider';
import AuthProtector from './components/Protectors/AuthProtector';
import UnAuthProtector from './components/Protectors/UnAuthProtector';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Root />,
    children:[
      {
        index:true,
        element: <UnAuthProtector component={<Entry/>} />
      },
      {
        path:'overview',
        element: <AuthProtector component={<Overview/>} />
      },
      {
        path:'quiz',
        element: <AuthProtector component={<Quiz/>} />
      },
      {
        path:'test/:testId',
        element: <AuthProtector component={<TestResult/>} />
      },
      {
        path:'*',
        element:<Error />
      }
    ]
  }
]);

function App() {

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
