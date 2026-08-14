import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface border border-line">
      <Search size={14} className="text-text-muted" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search..."}
        className="bg-transparent outline-none text-sm text-text placeholder:text-text-muted w-40"
      />
    </div>
  );
}
