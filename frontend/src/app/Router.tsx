import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../shared/layout/MainLayout/MainLayout";
import MainPage from "../pages/MainPage/MainPage";
import JimnyTourPage from "../pages/JimnyTourPage/JimnyTourPage";
import ToursPage from "../pages/ToursPage/ToursPage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />, // Hero сам занимает весь экран
      },
      {
        path: "/tours/jimny",
        element: <JimnyTourPage />,
      },
      {
        path: "/tours",
        element: <ToursPage />,
      },
    ],
  },
]);
