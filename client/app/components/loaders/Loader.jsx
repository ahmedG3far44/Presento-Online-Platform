function Loader({ large }) {
  return (
    <div
      className={`spin ${
        large ? "w-12 h-12 border-4" : " w-3 h-3 border"
      } rounded-full  border-primary  border-t-transparent  border-r-transparent `}
    ></div>
  );
}

export default Loader;
