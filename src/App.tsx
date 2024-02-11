import { ReactFlowProvider } from "reactflow";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";

export default function App() {
  return (
    <ReactFlowProvider>
      <RouterProvider router={router} />
    </ReactFlowProvider>
  );
}
