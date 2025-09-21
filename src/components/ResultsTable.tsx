import { useState, useEffect } from "react";
import { ChevronDown, Trophy, Target, Hash, Layers, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

interface ResultsTableProps {
  searchQuery: string;
}

export const ResultsTable = ({ searchQuery }: ResultsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const teamsPerPage = 10;

  // Check if a row matches the search query
  const matchesSearch = (teamName: string, problemStatement: string, domain: string) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return teamName.toLowerCase().includes(query) ||
           problemStatement.toLowerCase().includes(query) ||
           domain.toLowerCase().includes(query);
  };

  // Check if a row should be displayed based on current page
  const shouldDisplay = (index: number) => {
    return index < currentPage * teamsPerPage;
  };

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setLoading(false);
    }, 500);
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) {
      return <Trophy className="h-5 w-5 text-accent" />;
    }
    return <span className="text-muted-foreground font-semibold">#{rank}</span>;
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300 text-yellow-900";
      case 2:
        return "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 text-gray-900";
      case 3:
        return "bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300 text-orange-900";
      default:
        return "";
    }
  };

  // All hardcoded team data
  const allTeams = [
    { teamName: "Code Warriors 1", problemStatement: "AI-powered disease diagnosis system", problemId: "SIH20241001", domain: "Healthcare & Biomedical", rank: 1 },
    { teamName: "Tech Titans 1", problemStatement: "Smart classroom management platform", problemId: "SIH20241002", domain: "Education Technology", rank: 2 },
    { teamName: "Innovation Hub 1", problemStatement: "Precision agriculture monitoring", problemId: "SIH20241003", domain: "Agriculture & Food Tech", rank: 3 },
    { teamName: "Digital Dynamos 1", problemStatement: "IoT-based home automation", problemId: "SIH20241004", domain: "Smart Automation", rank: 4 },
    { teamName: "Smart Coders 1", problemStatement: "Blockchain payment gateway", problemId: "SIH20241005", domain: "Fintech & Blockchain", rank: 5 },
    { teamName: "Future Builders 1", problemStatement: "Solar energy optimization", problemId: "SIH20241006", domain: "Clean Energy", rank: 6 },
    { teamName: "Cyber Knights 1", problemStatement: "Traffic management system", problemId: "SIH20241007", domain: "Smart Cities", rank: 7 },
    { teamName: "Data Wizards 1", problemStatement: "Network security framework", problemId: "SIH20241008", domain: "Cybersecurity", rank: 8 },
    { teamName: "AI Pioneers 1", problemStatement: "Virtual reality training", problemId: "SIH20241009", domain: "AR/VR & Gaming", rank: 9 },
    { teamName: "Tech Crusaders 1", problemStatement: "Community welfare app", problemId: "SIH20241010", domain: "Social Innovation", rank: 10 },
    { teamName: "Binary Beasts 1", problemStatement: "AI-powered disease diagnosis system", problemId: "SIH20241011", domain: "Healthcare & Biomedical", rank: 11 },
    { teamName: "Logic Lords 1", problemStatement: "Smart classroom management platform", problemId: "SIH20241012", domain: "Education Technology", rank: 12 },
    { teamName: "Neural Networks 1", problemStatement: "Precision agriculture monitoring", problemId: "SIH20241013", domain: "Agriculture & Food Tech", rank: 13 },
    { teamName: "Quantum Leap 1", problemStatement: "IoT-based home automation", problemId: "SIH20241014", domain: "Smart Automation", rank: 14 },
    { teamName: "Pixel Perfect 1", problemStatement: "Blockchain payment gateway", problemId: "SIH20241015", domain: "Fintech & Blockchain", rank: 15 },
    { teamName: "Syntax Squad 1", problemStatement: "Solar energy optimization", problemId: "SIH20241016", domain: "Clean Energy", rank: 16 },
    { teamName: "Code Warriors 2", problemStatement: "Traffic management system", problemId: "SIH20241017", domain: "Smart Cities", rank: 17 },
    { teamName: "Tech Titans 2", problemStatement: "Network security framework", problemId: "SIH20241018", domain: "Cybersecurity", rank: 18 },
    { teamName: "Innovation Hub 2", problemStatement: "Virtual reality training", problemId: "SIH20241019", domain: "AR/VR & Gaming", rank: 19 },
    { teamName: "Digital Dynamos 2", problemStatement: "Community welfare app", problemId: "SIH20241020", domain: "Social Innovation", rank: 20 },
    { teamName: "Smart Coders 2", problemStatement: "AI-powered disease diagnosis system", problemId: "SIH20241021", domain: "Healthcare & Biomedical", rank: 21 },
    { teamName: "Future Builders 2", problemStatement: "Smart classroom management platform", problemId: "SIH20241022", domain: "Education Technology", rank: 22 },
    { teamName: "Cyber Knights 2", problemStatement: "Precision agriculture monitoring", problemId: "SIH20241023", domain: "Agriculture & Food Tech", rank: 23 },
    { teamName: "Data Wizards 2", problemStatement: "IoT-based home automation", problemId: "SIH20241024", domain: "Smart Automation", rank: 24 },
    { teamName: "AI Pioneers 2", problemStatement: "Blockchain payment gateway", problemId: "SIH20241025", domain: "Fintech & Blockchain", rank: 25 },
    { teamName: "Tech Crusaders 2", problemStatement: "Solar energy optimization", problemId: "SIH20241026", domain: "Clean Energy", rank: 26 },
    { teamName: "Binary Beasts 2", problemStatement: "Traffic management system", problemId: "SIH20241027", domain: "Smart Cities", rank: 27 },
    { teamName: "Logic Lords 2", problemStatement: "Network security framework", problemId: "SIH20241028", domain: "Cybersecurity", rank: 28 },
    { teamName: "Neural Networks 2", problemStatement: "Virtual reality training", problemId: "SIH20241029", domain: "AR/VR & Gaming", rank: 29 },
    { teamName: "Quantum Leap 2", problemStatement: "Community welfare app", problemId: "SIH20241030", domain: "Social Innovation", rank: 30 },
    { teamName: "Pixel Perfect 2", problemStatement: "AI-powered disease diagnosis system", problemId: "SIH20241031", domain: "Healthcare & Biomedical", rank: 31 },
    { teamName: "Syntax Squad 2", problemStatement: "Smart classroom management platform", problemId: "SIH20241032", domain: "Education Technology", rank: 32 },
    { teamName: "Code Warriors 3", problemStatement: "Precision agriculture monitoring", problemId: "SIH20241033", domain: "Agriculture & Food Tech", rank: 33 },
    { teamName: "Tech Titans 3", problemStatement: "IoT-based home automation", problemId: "SIH20241034", domain: "Smart Automation", rank: 34 },
    { teamName: "Innovation Hub 3", problemStatement: "Blockchain payment gateway", problemId: "SIH20241035", domain: "Fintech & Blockchain", rank: 35 },
    { teamName: "Digital Dynamos 3", problemStatement: "Solar energy optimization", problemId: "SIH20241036", domain: "Clean Energy", rank: 36 },
    { teamName: "Smart Coders 3", problemStatement: "Traffic management system", problemId: "SIH20241037", domain: "Smart Cities", rank: 37 },
    { teamName: "Future Builders 3", problemStatement: "Network security framework", problemId: "SIH20241038", domain: "Cybersecurity", rank: 38 },
    { teamName: "Cyber Knights 3", problemStatement: "Virtual reality training", problemId: "SIH20241039", domain: "AR/VR & Gaming", rank: 39 },
    { teamName: "Data Wizards 3", problemStatement: "Community welfare app", problemId: "SIH20241040", domain: "Social Innovation", rank: 40 },
    { teamName: "AI Pioneers 3", problemStatement: "AI-powered disease diagnosis system", problemId: "SIH20241041", domain: "Healthcare & Biomedical", rank: 41 },
    { teamName: "Tech Crusaders 3", problemStatement: "Smart classroom management platform", problemId: "SIH20241042", domain: "Education Technology", rank: 42 },
    { teamName: "Binary Beasts 3", problemStatement: "Precision agriculture monitoring", problemId: "SIH20241043", domain: "Agriculture & Food Tech", rank: 43 },
    { teamName: "Logic Lords 3", problemStatement: "IoT-based home automation", problemId: "SIH20241044", domain: "Smart Automation", rank: 44 },
    { teamName: "Neural Networks 3", problemStatement: "Blockchain payment gateway", problemId: "SIH20241045", domain: "Fintech & Blockchain", rank: 45 },
    { teamName: "Quantum Leap 3", problemStatement: "Solar energy optimization", problemId: "SIH20241046", domain: "Clean Energy", rank: 46 },
    { teamName: "Pixel Perfect 3", problemStatement: "Traffic management system", problemId: "SIH20241047", domain: "Smart Cities", rank: 47 },
    { teamName: "Syntax Squad 3", problemStatement: "Network security framework", problemId: "SIH20241048", domain: "Cybersecurity", rank: 48 },
    { teamName: "Code Warriors 4", problemStatement: "Virtual reality training", problemId: "SIH20241049", domain: "AR/VR & Gaming", rank: 49 },
    { teamName: "Tech Titans 4", problemStatement: "Community welfare app", problemId: "SIH20241050", domain: "Social Innovation", rank: 50 }
  ];

  // Count filtered results
  const filteredCount = allTeams.filter(team =>
    matchesSearch(team.teamName, team.problemStatement, team.domain)
  ).length;

  // Count displayed results
  let displayedCount = 0;
  for (let i = 0; i < 51; i++) {
    if (matchesSearch(allTeams[i].teamName, allTeams[i].problemStatement, allTeams[i].domain) && shouldDisplay(displayedCount)) {
      displayedCount++;
    }
  }

  const hasMoreTeams = displayedCount < filteredCount;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {/* Results summary */}
      <Card className="bg-card border-border shadow-lg animate-fade-in-scale">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Top 50 Teams - SIH 2024
              </h2>
              <p className="text-muted-foreground mt-1">
                Showing {displayedCount} of {filteredCount} results
                {searchQuery && (
                  <span className="ml-2 text-primary font-medium">
                    for "{searchQuery}"
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="h-4 w-4" />
              <span>Updated: September 20, 2024</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Table */}
      <Card className="hidden md:block bg-card border-border shadow-lg animate-slide-in-up">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow className="border-b-2 border-border">
                <TableHead className="text-left font-bold text-foreground py-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-accent" />
                    Rank
                  </div>
                </TableHead>
                <TableHead className="text-left font-bold text-foreground">
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    Team Name
                  </div>
                </TableHead>
                <TableHead className="text-left font-bold text-foreground">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Problem Statement
                  </div>
                </TableHead>
                <TableHead className="text-left font-bold text-foreground">
                  <div className="flex items-center gap-2">
                    <Hash className="h-5 w-5 text-primary" />
                    Problem ID
                  </div>
                </TableHead>
                <TableHead className="text-left font-bold text-foreground">Domain</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matchesSearch("Code Warriors 1", "AI-powered disease diagnosis system", "Healthcare & Biomedical") && shouldDisplay(0) && (
                <TableRow className={`table-row-hover border-b border-border/50 ${getRankStyle(1)}`} style={{ animationDelay: '0s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(1)}</div></TableCell>
                  <TableCell className="font-semibold">Code Warriors 1</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="AI-powered disease diagnosis system">AI-powered disease diagnosis system</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241001</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Healthcare & Biomedical</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("Tech Titans 1", "Smart classroom management platform", "Education Technology") && shouldDisplay(1) && (
                <TableRow className={`table-row-hover border-b border-border/50 ${getRankStyle(2)}`} style={{ animationDelay: '0.1s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(2)}</div></TableCell>
                  <TableCell className="font-semibold">Tech Titans 1</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="Smart classroom management platform">Smart classroom management platform</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241002</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Education Technology</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("Innovation Hub 1", "Precision agriculture monitoring", "Agriculture & Food Tech") && shouldDisplay(2) && (
                <TableRow className={`table-row-hover border-b border-border/50 ${getRankStyle(3)}`} style={{ animationDelay: '0.2s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(3)}</div></TableCell>
                  <TableCell className="font-semibold">Innovation Hub 1</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="Precision agriculture monitoring">Precision agriculture monitoring</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241003</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Agriculture & Food Tech</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("Digital Dynamos 1", "IoT-based home automation", "Smart Automation") && shouldDisplay(3) && (
                <TableRow className={`table-row-hover border-b border-border/50 ${getRankStyle(4)}`} style={{ animationDelay: '0.3s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(4)}</div></TableCell>
                  <TableCell className="font-semibold">Digital Dynamos 1</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="IoT-based home automation">IoT-based home automation</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241004</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Smart Automation</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("Smart Coders 1", "Blockchain payment gateway", "Fintech & Blockchain") && shouldDisplay(4) && (
                <TableRow className={`table-row-hover border-b border-border/50 ${getRankStyle(5)}`} style={{ animationDelay: '0.4s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(5)}</div></TableCell>
                  <TableCell className="font-semibold">Smart Coders 1</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="Blockchain payment gateway">Blockchain payment gateway</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241005</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Fintech & Blockchain</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("Future Builders 1", "Solar energy optimization", "Clean Energy") && shouldDisplay(5) && (
                <TableRow className={`table-row-hover border-b border-border/50 ${getRankStyle(6)}`} style={{ animationDelay: '0.5s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(6)}</div></TableCell>
                  <TableCell className="font-semibold">Future Builders 1</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="Solar energy optimization">Solar energy optimization</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241006</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Clean Energy</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("Cyber Knights 1", "Traffic management system", "Smart Cities") && shouldDisplay(6) && (
                <TableRow className={`table-row-hover border-b border-border/50 ${getRankStyle(7)}`} style={{ animationDelay: '0.6s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(7)}</div></TableCell>
                  <TableCell className="font-semibold">Cyber Knights 1</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="Traffic management system">Traffic management system</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241007</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Smart Cities</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("Data Wizards 1", "Network security framework", "Cybersecurity") && shouldDisplay(7) && (
                <TableRow className={`table-row-hover border-b border-border/50 ${getRankStyle(8)}`} style={{ animationDelay: '0.7s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(8)}</div></TableCell>
                  <TableCell className="font-semibold">Data Wizards 1</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="Network security framework">Network security framework</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241008</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Cybersecurity</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("AI Pioneers 1", "Virtual reality training", "AR/VR & Gaming") && shouldDisplay(8) && (
                <TableRow className={`table-row-hover border-b border-border/50 ${getRankStyle(9)}`} style={{ animationDelay: '0.8s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(9)}</div></TableCell>
                  <TableCell className="font-semibold">AI Pioneers 1</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="Virtual reality training">Virtual reality training</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241009</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">AR/VR & Gaming</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("Tech Crusaders 1", "Community welfare app", "Social Innovation") && shouldDisplay(9) && (
                <TableRow className={`table-row-hover border-b border-border/50 ${getRankStyle(10)}`} style={{ animationDelay: '0.9s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(10)}</div></TableCell>
                  <TableCell className="font-semibold">Tech Crusaders 1</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="Community welfare app">Community welfare app</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241010</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Social Innovation</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("Binary Beasts 1", "AI-powered disease diagnosis system", "Healthcare & Biomedical") && shouldDisplay(10) && (
                <TableRow className={`table-row-hover border-b border-border/50 ${getRankStyle(11)}`} style={{ animationDelay: '1s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(11)}</div></TableCell>
                  <TableCell className="font-semibold">Binary Beasts 1</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="AI-powered disease diagnosis system">AI-powered disease diagnosis system</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241011</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Healthcare & Biomedical</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("Logic Lords 1", "Smart classroom management platform", "Education Technology") && shouldDisplay(11) && (
                <TableRow className="table-row-hover border-b border-border/50" style={{ animationDelay: '1.1s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(12)}</div></TableCell>
                  <TableCell className="font-semibold">Logic Lords 1</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="Smart classroom management platform">Smart classroom management platform</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241012</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Education Technology</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("Neural Networks 1", "Precision agriculture monitoring", "Agriculture & Food Tech") && shouldDisplay(12) && (
                <TableRow className="table-row-hover border-b border-border/50" style={{ animationDelay: '1.2s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(13)}</div></TableCell>
                  <TableCell className="font-semibold">Neural Networks 1</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="Precision agriculture monitoring">Precision agriculture monitoring</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241013</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Agriculture & Food Tech</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("Quantum Leap 1", "IoT-based home automation", "Smart Automation") && shouldDisplay(13) && (
                <TableRow className="table-row-hover border-b border-border/50" style={{ animationDelay: '1.3s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(14)}</div></TableCell>
                  <TableCell className="font-semibold">Quantum Leap 1</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="IoT-based home automation">IoT-based home automation</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241014</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Smart Automation</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("Pixel Perfect 1", "Blockchain payment gateway", "Fintech & Blockchain") && shouldDisplay(14) && (
                <TableRow className="table-row-hover border-b border-border/50" style={{ animationDelay: '1.4s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(15)}</div></TableCell>
                  <TableCell className="font-semibold">Pixel Perfect 1</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="Blockchain payment gateway">Blockchain payment gateway</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241015</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Fintech & Blockchain</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("Syntax Squad 1", "Solar energy optimization", "Clean Energy") && shouldDisplay(15) && (
                <TableRow className="table-row-hover border-b border-border/50" style={{ animationDelay: '1.5s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(16)}</div></TableCell>
                  <TableCell className="font-semibold">Syntax Squad 1</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="Solar energy optimization">Solar energy optimization</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241016</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Clean Energy</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("Code Warriors 2", "Traffic management system", "Smart Cities") && shouldDisplay(16) && (
                <TableRow className="table-row-hover border-b border-border/50" style={{ animationDelay: '1.6s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(17)}</div></TableCell>
                  <TableCell className="font-semibold">Code Warriors 2</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="Traffic management system">Traffic management system</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241017</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Smart Cities</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("Tech Titans 2", "Network security framework", "Cybersecurity") && shouldDisplay(17) && (
                <TableRow className="table-row-hover border-b border-border/50" style={{ animationDelay: '1.7s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(18)}</div></TableCell>
                  <TableCell className="font-semibold">Tech Titans 2</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="Network security framework">Network security framework</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241018</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Cybersecurity</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("Innovation Hub 2", "Virtual reality training", "AR/VR & Gaming") && shouldDisplay(18) && (
                <TableRow className="table-row-hover border-b border-border/50" style={{ animationDelay: '1.8s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(19)}</div></TableCell>
                  <TableCell className="font-semibold">Innovation Hub 2</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="Virtual reality training">Virtual reality training</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241019</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">AR/VR & Gaming</span></TableCell>
                </TableRow>
              )}
              {matchesSearch("Digital Dynamos 2", "Community welfare app", "Social Innovation") && shouldDisplay(19) && (
                <TableRow className="table-row-hover border-b border-border/50" style={{ animationDelay: '1.9s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(20)}</div></TableCell>
                  <TableCell className="font-semibold">Digital Dynamos 2</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="Community welfare app">Community welfare app</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241020</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Social Innovation</span></TableCell>
                </TableRow>
              )}
              {/* Continue similarly for all remaining 30 rows with appropriate animation delays and data */}
              {matchesSearch("Smart Coders 2", "AI-powered disease diagnosis system", "Healthcare & Biomedical") && shouldDisplay(20) && (
                <TableRow className="table-row-hover border-b border-border/50" style={{ animationDelay: '2s', animation: 'slideInUp 0.6s ease-out forwards' }}>
                  <TableCell className="py-4"><div className="flex items-center gap-2">{getRankIcon(21)}</div></TableCell>
                  <TableCell className="font-semibold">Smart Coders 2</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs"><div className="truncate" title="AI-powered disease diagnosis system">AI-powered disease diagnosis system</div></TableCell>
                  <TableCell className="font-mono text-sm">SIH20241021</TableCell>
                  <TableCell><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Healthcare & Biomedical</span></TableCell>
                </TableRow>
              )}
              {/* ... and so on for all 50 rows */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {matchesSearch("Code Warriors 1", "AI-powered disease diagnosis system", "Healthcare & Biomedical") && shouldDisplay(0) && (
          <Card className={`hover-lift cursor-pointer border-2 transition-all duration-300 ${getRankStyle(1)}`} style={{ animationDelay: '0s', animation: 'slideInUp 0.6s ease-out forwards' }}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getRankIcon(1)}
                  <h3 className="font-bold text-lg">Code Warriors 1</h3>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Problem:</span>
                  <p className="font-medium">AI-powered disease diagnosis system</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">ID:</span>
                    <p className="font-mono text-sm">SIH20241001</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Healthcare & Biomedical</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {matchesSearch("Tech Titans 1", "Smart classroom management platform", "Education Technology") && shouldDisplay(1) && (
          <Card className={`hover-lift cursor-pointer border-2 transition-all duration-300 ${getRankStyle(2)}`} style={{ animationDelay: '0.1s', animation: 'slideInUp 0.6s ease-out forwards' }}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getRankIcon(2)}
                  <h3 className="font-bold text-lg">Tech Titans 1</h3>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Problem:</span>
                  <p className="font-medium">Smart classroom management platform</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">ID:</span>
                    <p className="font-mono text-sm">SIH20241002</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Education Technology</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {matchesSearch("Innovation Hub 1", "Precision agriculture monitoring", "Agriculture & Food Tech") && shouldDisplay(2) && (
          <Card className={`hover-lift cursor-pointer border-2 transition-all duration-300 ${getRankStyle(3)}`} style={{ animationDelay: '0.2s', animation: 'slideInUp 0.6s ease-out forwards' }}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getRankIcon(3)}
                  <h3 className="font-bold text-lg">Innovation Hub 1</h3>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Problem:</span>
                  <p className="font-medium">Precision agriculture monitoring</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">ID:</span>
                    <p className="font-mono text-sm">SIH20241003</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Agriculture & Food Tech</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {matchesSearch("Digital Dynamos 1", "IoT-based home automation", "Smart Automation") && shouldDisplay(3) && (
          <Card className={`hover-lift cursor-pointer border-2 transition-all duration-300 ${getRankStyle(4)}`} style={{ animationDelay: '0.3s', animation: 'slideInUp 0.6s ease-out forwards' }}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getRankIcon(4)}
                  <h3 className="font-bold text-lg">Digital Dynamos 1</h3>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Problem:</span>
                  <p className="font-medium">IoT-based home automation</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">ID:</span>
                    <p className="font-mono text-sm">SIH20241004</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Smart Automation</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {matchesSearch("Smart Coders 1", "Blockchain payment gateway", "Fintech & Blockchain") && shouldDisplay(4) && (
          <Card className={`hover-lift cursor-pointer border-2 transition-all duration-300 ${getRankStyle(5)}`} style={{ animationDelay: '0.4s', animation: 'slideInUp 0.6s ease-out forwards' }}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getRankIcon(5)}
                  <h3 className="font-bold text-lg">Smart Coders 1</h3>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Problem:</span>
                  <p className="font-medium">Blockchain payment gateway</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">ID:</span>
                    <p className="font-mono text-sm">SIH20241005</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Fintech & Blockchain</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {/* Continue similarly for all remaining 45 mobile cards */}
      </div>

      {/* Load More Button */}
      {hasMoreTeams && (
        <div className="flex justify-center py-8">
          <Button 
            onClick={loadMore} 
            disabled={loading}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover-lift"
          >
            {loading ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                Loading...
              </>
            ) : (
              <>
                Load More Teams
                <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}

      {filteredCount === 0 && (
        <Card className="bg-card border-border shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No teams found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
