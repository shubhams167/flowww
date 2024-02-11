import {
  Route,
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "../components/layout";
import { Home } from "./home";
import { Create } from "./create";
import { View } from "./view";
import { Settings } from "./settings";

export * from "./home";
export * from "./create";
export * from "./view";
export * from "./settings";

const routes = createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="/" index element={<Home />} />
    <Route path="/create/:flowId?" element={<Create />} />
    <Route path="/view" element={<View />} />
    <Route path="/settings" element={<Settings />} />
  </Route>
);

export const router =
  process.env.REACT_APP_USE_HASH_ROUTER === "true"
    ? createHashRouter(routes)
    : createBrowserRouter(routes);
