import { Transition } from "@headlessui/react";
import { BadgePlus, Workflow } from "lucide-react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="w-full flex flex-col gap-10 items-center p-10">
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
          <h1 className="p-20 mt-20 pb-4 text-9xl translate-x- tracking-wider text-center font-serif font-bold text-slate-800">
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
          <h2 className="p-2 text-xl text-center tracking-wide font-serif text-slate-700">
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
            className="text-white bg-slate-700 w-60 rounded-md px-6 py-4 flex justify-center items-center gap-3 hover:bg-slate-900 transition-colors duration-200"
          >
            <BadgePlus size={24} absoluteStrokeWidth />
            <span className="font-semibold text-xl text-left">Create a flow</span>
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
            className="text-black border-2 border-slate-800 w-60 rounded-md px-6 py-4 flex justify-center items-center gap-3 hover:bg-slate-900 hover:text-white transition-colors duration-200"
          >
            <Workflow size={24} absoluteStrokeWidth />
            <span className="font-semibold text-xl text-left">See your flows</span>
          </Link>
        </Transition>
      </div>
    </div>
  );
};
