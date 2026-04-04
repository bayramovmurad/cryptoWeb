"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBar({ value, onChange }: Props) {
  return (
    <div className="searchBox">
      <input
        type="text"
        placeholder="Search by coin name or symbol..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input"
      />
    </div>
  );
}

export default  SearchBar;