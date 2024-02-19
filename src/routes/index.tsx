import { createBrowserRouter, createHashRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "../components/layout";
import { Create } from "./create";
import { Home } from "./home";
import { Manage } from "./manage";
import { Settings } from "./settings";

export * from "./create";
export * from "./home";
export * from "./manage";
export * from "./settings";

const routes = createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="/" index element={<Home />} />
    <Route path="/create/:flowId?" element={<Create />} />
    <Route path="/manage" element={<Manage />} />
    <Route path="/settings" element={<Settings />} />
  </Route>
);

export const router =
  process.env.REACT_APP_USE_HASH_ROUTER === "true" ? createHashRouter(routes) : createBrowserRouter(routes);
