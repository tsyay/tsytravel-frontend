import { Outlet, Link } from "react-router-dom";

export default function Layout() {
    return <>
        {/* место под хеадер */}
        <Outlet/>
        {/* место под футер */}
    </>
}