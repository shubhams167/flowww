import Header from "./header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex font-sans">
      <Header />
      <Outlet />
    </div>
  );
};
