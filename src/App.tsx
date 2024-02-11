import { ReactFlowProvider } from "reactflow";
import { Home, Create, View, Settings } from "./routes";
import {
  // createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components/layout";

export default function App() {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" index element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/view" element={<View />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    )
  );

  return (
    <ReactFlowProvider>
      <RouterProvider router={router} />
    </ReactFlowProvider>
  );
}
