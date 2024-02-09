export function Button({ label, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        className="  bg-black hover:bg-[#403e39] text-white font-bold py-2 px-4 rounded-full"
      >
        {label}
      </button>
    </div>
  );
}
