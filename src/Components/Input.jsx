

function Input({  type,
  name,
  placeholder,
  value,
  onChange, }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        px-4
        py-3
        rounded-xl
        bg-[#15172b]
        border
        border-[#2c3154]
        text-white
        placeholder:text-gray-400
        outline-none
        focus:border-cyan-400
        transition-all
      "
    />
  );
}


export default Input
