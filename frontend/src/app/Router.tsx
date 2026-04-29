import { MainLayout } from "../shared/layout/MainLayout/MainLayout";
import MainPage from "../pages/MainPage/MainPage";
import JimnyTourPage from "../pages/JimnyTourPage/JimnyTourPage";
import ToursPage from "../pages/ToursPage/ToursPage";
import { createHashRouter } from "react-router-dom";

export const router = createHashRouter([
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
