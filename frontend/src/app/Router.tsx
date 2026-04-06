import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../shared/layout/MainLayout/MainLayout";
import MainPage from "../pages/MainPage/MainPage";
import { PageLayout } from "../shared/layout";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,  // Hero сам занимает весь экран
      },
      {
        path: "/about",
        element: (
          <PageLayout>
            вв
          </PageLayout>
        ),
      },
    ],
  },
]);