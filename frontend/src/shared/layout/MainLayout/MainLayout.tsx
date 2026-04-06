import { Outlet } from "react-router-dom";
import Header from "../../../widgets/Header";

export function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
