import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../shared/layout/MainLayout/MainLayout";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
      },
      {
        path: "/about",
      },
    ],
  },
]);