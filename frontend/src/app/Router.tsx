import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
    </Routes>
  );
}
