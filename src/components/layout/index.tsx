import { Outlet } from "react-router-dom";
import Header from "./header";

export const Layout = () => {
  return (
    <div className="flex font-sans">
      <Header />
      <Outlet />
    </div>
  );
};
