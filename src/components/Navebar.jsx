function Navebar() {
  return (
    <nav className="block w-full sticky top-0 px-4 py-2 mx-auto text-white bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md rounded-md lg:px-8 lg:py-3">
      <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
        <a
          href="#"
          className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold "
        >
          Just Explorer
        </a>
      </div>
    </nav>
  );
}
export default Navebar;
