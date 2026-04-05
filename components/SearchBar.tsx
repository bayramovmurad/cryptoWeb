"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBar({ value, onChange }: Props) {
return (
  <div className="w-full">
    <input
      type="text"
      placeholder="Search by coin name or symbol..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-12 rounded-[14px] border border-white/10 bg-[#0f172a] text-white px-3 outline-none focus:border-[#647cff] focus:ring-2 focus:ring-[#647cff]/20"
    />
  </div>
);
}

export default  SearchBar;