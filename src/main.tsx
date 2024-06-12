import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import { menus } from "./utils/const";

const theme = extendTheme({
  colors: {
    grey: "#5E6468",
    blue: "#1B74E8",
    red: "#D73226",
    yellow: "#F8AC02",
    green: "#188139",
    pink: "#D01A85",
    purple: "#A143F4",
    cyan: "#027C84",
    orange: "#F8913F",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: menus.map((menu) => {
      return {
        path: menu.path,
        element: menu.element,
      };
    }),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
