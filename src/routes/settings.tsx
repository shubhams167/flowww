export const Settings = () => {
  return (
    <div className="w-full p-8 flex flex-col">
      <h1 className="mb-10 text-3xl text-slate-800 font-serif tracking-normal">Settings</h1>
      <div className="flex-grow text-center mt-20 text-slate-600">
        Nothing to show here. Come back later.
      </div>
      <div className="p-8 pb-0 text-slate-600 text-center">
        <span className="font-bold text-slate-800">{process.env.REACT_APP_NAME}</span>{" "}
        <span>{process.env.REACT_APP_VERSION}</span>
      </div>
    </div>
  );
};
