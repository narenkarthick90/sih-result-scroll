import { useState } from "react";
import { AnimatedBanner } from "@/components/AnimatedBanner";
import { SearchFilter } from "@/components/SearchFilter";
import { ResultsTable } from "@/components/ResultsTable";
import logo from "../Assets/iic-logo.png";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
             <div className="w-20 h-16 rounded-lg flex items-center justify-center">
              <img src={logo} alt="IIC Logo" className="h-full w-full object-contain" />
             </div>
            <div> 
                <h1 className="text-xl font-bold text-foreground">IIC-NITT</h1>
                <p className="text-sm text-muted-foreground ">Innovation Council</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>Live Results</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Animated Banner */}
        <AnimatedBanner 
          text="SIH Results Published"
        />

        {/* Search Filter */}
        <SearchFilter
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by team name, problem statement, or domain..."
        />

        {/* Results Table */}
        <ResultsTable searchQuery={searchQuery} />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
             <div className="w-20 h-20 rounded-lg flex items-center justify-center">
              <img src={logo} alt="IIC Logo" className="h-full w-full object-contain" />
             </div>
              <span className="font-semibold text-foreground">Institution's Innovation Council</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>National Institute of Technology, Tiruchirappalli</p>
              <p className="mt-1">Fostering innovation and entrepreneurship among students</p>
            </div>
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span>© 2025 IIC-NITT</span>
              <span>Smart India Hackathon Results</span>
              <span>All Rights Reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
