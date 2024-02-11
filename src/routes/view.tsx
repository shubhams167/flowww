import { useMemo } from "react";
import { getFlowsFromLocalStorage } from "../utils";
import { Link } from "react-router-dom";
import { BadgePlus, Cloud, CloudOff, SquarePen } from "lucide-react";

export const View = () => {
  const flows = useMemo(() => getFlowsFromLocalStorage(), []);

  return (
    <div className="w-full p-8">
      <h1 className="mx-auto mb-10 text-3xl text-slate-800 font-serif tracking-normal">
        Your flows
      </h1>
      <div className="flex flex-col gap-4">
        {flows.map((flow, idx) => (
          <Link
            key={flow?.uuid || idx}
            to={`/create/${flow?.uuid}`}
            className="flex p-4 border-2 border-slate-500 hover:bg-gray-100 hover:border-slate-800 transition-colors duration-200 rounded-md items-center"
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
        <div className="text-center flex flex-col justify-center items-center gap-6 mt-20">
          <h2 className="text-slate-600">Oops! Looks like you don't have any flows.</h2>
          <Link
            to="/create"
            className="text-white bg-slate-700 rounded-md px-6 py-4 flex justify-center items-center gap-3 hover:bg-slate-900 transition-colors duration-200"
          >
            <BadgePlus size={20} absoluteStrokeWidth />
            <span className="font-semibold text-2xl text-left">Create a flow</span>
          </Link>
        </div>
      )}
    </div>
  );
};
