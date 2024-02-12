import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";
import { router } from "./routes";

export default function App() {
  return (
    <ReactFlowProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </ReactFlowProvider>
  );
}
