export const Settings = () => {
  return (
    <div className="flex w-full flex-col p-8">
      <h1 className="mb-10 font-serif text-3xl tracking-normal text-slate-800">Settings</h1>
      <div className="mt-20 flex-grow text-center text-slate-600">Nothing to show here. Come back later.</div>
      <div className="p-8 pb-0 text-center text-slate-600">
        <span className="font-bold text-slate-800">{process.env.REACT_APP_NAME}</span>{" "}
        <span>{process.env.REACT_APP_VERSION}</span>
      </div>
    </div>
  );
};
