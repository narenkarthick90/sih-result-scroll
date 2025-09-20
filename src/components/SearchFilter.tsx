import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchFilter = ({ 
  value, 
  onChange, 
  placeholder = "Search by team name or problem statement..." 
}: SearchFilterProps) => {
  return (
    <div className="relative mb-6 animate-fade-in-scale">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-4 py-3 bg-card border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg text-base shadow-lg transition-all duration-300 hover-lift"
        />
        
        {/* Search input glow effect when focused */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
      </div>
      
      {value && (
        <div className="mt-2 text-sm text-muted-foreground animate-fade-in-scale">
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-md">
            Searching: "{value}"
          </span>
        </div>
      )}
    </div>
  );
};