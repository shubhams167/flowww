import { Transition } from "@headlessui/react";
import { BadgePlus, Workflow } from "lucide-react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex w-full flex-col items-center gap-10 p-10">
      <div>
        <Transition
          as={Fragment}
          appear={true}
          show={true}
          enter="transition-all duration-300"
          enterFrom="opacity-0 translate-y-[20%]"
          enterTo="opacity-100 translate-y-0"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-[20%]"
        >
          <h1 className="translate-x- mt-20 p-20 pb-4 text-center font-serif text-9xl font-bold tracking-wider text-slate-800">
            Flowww
          </h1>
        </Transition>
        <Transition
          as={Fragment}
          appear={true}
          show={true}
          enter="transition-all duration-300 delay-150"
          enterFrom="opacity-0 translate-y-1/4"
          enterTo="opacity-100 translate-y-0"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1/4"
        >
          <h2 className="p-2 text-center font-serif text-xl tracking-wide text-slate-700">
            Streamline your workflow with Flowww
          </h2>
        </Transition>
      </div>
      <div className="flex flex-col gap-4">
        <Transition
          as={"div"}
          appear={true}
          show={true}
          enter="transition-all duration-300 delay-300"
          enterFrom="opacity-0 translate-y-1/2"
          enterTo="opacity-100 translate-y-0"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1/2"
        >
          <Link
            to="/create"
            className="flex w-60 items-center justify-center gap-3 rounded-md border-2 border-slate-700 bg-slate-700 px-6 py-4 text-white transition-colors duration-200 hover:border-slate-900 hover:bg-slate-900"
          >
            <BadgePlus size={24} absoluteStrokeWidth />
            <span className="text-left text-xl font-semibold">Create a flow</span>
          </Link>
        </Transition>
        <Transition
          as="div"
          appear={true}
          show={true}
          enter="transition-all duration-300 delay-300"
          enterFrom="opacity-0 translate-y-1/2"
          enterTo="opacity-100 translate-y-0"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1/2"
        >
          <Link
            to="/view"
            className="flex w-60 items-center justify-center gap-3 rounded-md border-2 border-slate-800 px-6 py-4 text-black transition-colors duration-200 hover:bg-slate-100"
          >
            <Workflow size={24} absoluteStrokeWidth />
            <span className="text-left text-xl font-semibold">See your flows</span>
          </Link>
        </Transition>
      </div>
    </div>
  );
};
