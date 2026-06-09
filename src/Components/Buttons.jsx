function Buttons({ name }) {
  return (
    <button
      className="
        w-full
        py-3
        rounded-xl
        bg-cyan-400
        hover:bg-cyan-300
        text-black
        font-semibold
        transition-all
        duration-300
      "
    >
      {name}
    </button>
  );
}

export default Buttons;
