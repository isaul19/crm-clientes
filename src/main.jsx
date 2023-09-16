import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AppLayout } from "./layouts/AppLayout";
import { ClientsPage, clientsPageLoader } from "./pages/ClientsPage";
import { NewClientPage, newClientPageLoader } from "./pages/NewClientPage";
import { EditClientPage, editClientAction, editClientLoader } from "./pages/EditClientPage";

import { clientActionDestroy } from "./components/Client";
import { Error } from "./pages/Error";
import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <ClientsPage />,
        loader: clientsPageLoader,
        errorElement: <Error />,
      },
      {
        path: "/clients/create",
        element: <NewClientPage />,
        errorElement: <Error />,
        action: newClientPageLoader,
      },
      {
        path: "/clients/edit/:clientId",
        element: <EditClientPage />,
        errorElement: <Error />,
        action: editClientAction,
        loader: editClientLoader,
      },
      {
        path: "/clients/destroy/:clientId",
        action: clientActionDestroy,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
