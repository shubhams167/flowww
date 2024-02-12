import { ReactFlowProvider } from "reactflow";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <ReactFlowProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </ReactFlowProvider>
  );
}
