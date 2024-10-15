import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventsPage, loader as eventsPageLoader } from "./pages/EventsPage";
import { EventPage, loader as eventPageLoader } from "./pages/EventPage";
import { FormPage /* , loader as formPageLoader */ } from "./pages/FormPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventsPageLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventPageLoader,
      },
      {
        path: "/form/:new",
        element: <FormPage />,
        // loader: formPageLoader,
        // action: addComment,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider toastOptions={{ defaultOptions: { position: "top" } }}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
