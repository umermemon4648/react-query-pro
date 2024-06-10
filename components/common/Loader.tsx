const Loader = ({ width = 24, height = 24 }) => (
  <div className="flex-center w-full">
    <img
      src="/loader.svg"
      alt="loader"
      width={width}
      height={height}
      className="animate-spin"
    />
  </div>
);

export default Loader;
