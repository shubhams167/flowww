import { BadgePlus, Cloud, CloudOff, SquarePen } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { getFlowsFromLocalStorage } from "../lib/utils";

export const Manage = () => {
  const flows = useMemo(() => getFlowsFromLocalStorage(), []);

  return (
    <div className="w-full p-8">
      <h1 className="mx-auto mb-10 font-serif text-3xl tracking-normal text-slate-800">Your flows</h1>
      <div className="flex flex-col gap-4">
        {flows.map((flow, idx) => (
          <Link
            key={flow?.uuid || idx}
            to={`/create/${flow?.uuid}`}
            className="flex items-center rounded-md border-2 border-slate-500 p-4 transition-colors duration-200 hover:border-slate-800 hover:bg-gray-100"
          >
            <div className="flex-grow">
              <h2 className="text-lg font-bold">{flow?.name || "Untitled Flow"}</h2>
              <h3 className="text-xs text-slate-600">{flow?.uuid}</h3>
            </div>
            <div className="flex gap-4">
              {flow?.published ? (
                <Cloud size={20} aria-label="Published" className="text-green-600" />
              ) : (
                <CloudOff size={20} aria-label="Unpublished" className="text-red-600" />
              )}
              <SquarePen size={20} aria-label="Edit" className="text-slate-600" />
            </div>
          </Link>
        ))}
      </div>
      {flows.length === 0 && (
        <div className="mt-20 flex flex-col items-center justify-center gap-6 text-center">
          <h2 className="text-slate-600">Oops! Looks like you don't have any flows.</h2>
          <Link
            to="/create"
            className="flex items-center justify-center gap-3 rounded-md bg-slate-700 px-6 py-4 text-white transition-colors duration-200 hover:bg-slate-900"
          >
            <BadgePlus size={20} absoluteStrokeWidth />
            <span className="text-left text-2xl font-semibold">Create a flow</span>
          </Link>
        </div>
      )}
    </div>
  );
};
