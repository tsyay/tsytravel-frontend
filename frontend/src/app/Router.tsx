import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../shared/layout/MainLayout/MainLayout";
import MainPage from "../pages/MainPage/MainPage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <MainPage/>
      },
      {
        path: "/about",
      },
    ],
  },
]);