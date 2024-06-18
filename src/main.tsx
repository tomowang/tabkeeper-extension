import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import { menus } from "./utils/const";

const theme = extendTheme({
  colors: {
    g_grey: "#5E6468",
    g_blue: "#1B74E8",
    g_red: "#D73226",
    g_yellow: "#F8AC02",
    g_green: "#188139",
    g_pink: "#D01A85",
    g_purple: "#A143F4",
    g_cyan: "#027C84",
    g_orange: "#F8913F",
  },
});

const router = createHashRouter([
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
