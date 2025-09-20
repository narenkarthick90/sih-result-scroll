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

interface TeamResult {
  id: number;
  teamName: string;
  problemStatement: string;
  problemId: string;
  domain: string;
  rank: number;
}

interface ResultsTableProps {
  searchQuery: string;
}

// Generate 50 placeholder teams
const generateTeamData = (): TeamResult[] => {
  const domains = [
    "Healthcare & Biomedical",
    "Education Technology", 
    "Agriculture & Food Tech",
    "Smart Automation",
    "Fintech & Blockchain",
    "Clean Energy",
    "Smart Cities",
    "Cybersecurity",
    "AR/VR & Gaming",
    "Social Innovation"
  ];

  const problemStatements = [
    "AI-powered disease diagnosis system",
    "Smart classroom management platform",
    "Precision agriculture monitoring",
    "IoT-based home automation",
    "Blockchain payment gateway",
    "Solar energy optimization",
    "Traffic management system",
    "Network security framework",
    "Virtual reality training",
    "Community welfare app"
  ];

  const teamNames = [
    "Code Warriors", "Tech Titans", "Innovation Hub", "Digital Dynamos",
    "Smart Coders", "Future Builders", "Cyber Knights", "Data Wizards",
    "AI Pioneers", "Tech Crusaders", "Binary Beasts", "Logic Lords",
    "Neural Networks", "Quantum Leap", "Pixel Perfect", "Syntax Squad"
  ];

  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    teamName: `${teamNames[i % teamNames.length]} ${Math.floor(i / teamNames.length) + 1}`,
    problemStatement: problemStatements[i % problemStatements.length],
    problemId: `SIH${2024}${String(1001 + i).padStart(4, '0')}`,
    domain: domains[i % domains.length],
    rank: i + 1
  }));
};

export const ResultsTable = ({ searchQuery }: ResultsTableProps) => {
  const [teams] = useState<TeamResult[]>(generateTeamData());
  const [filteredTeams, setFilteredTeams] = useState<TeamResult[]>([]);
  const [displayedTeams, setDisplayedTeams] = useState<TeamResult[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const teamsPerPage = 10;

  // Filter teams based on search query
  useEffect(() => {
    const filtered = teams.filter(team =>
      team.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.problemStatement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.domain.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTeams(filtered);
    setCurrentPage(1);
  }, [searchQuery, teams]);

  // Update displayed teams when filter or page changes
  useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * teamsPerPage;
    setDisplayedTeams(filteredTeams.slice(startIndex, endIndex));
  }, [filteredTeams, currentPage]);

  const loadMore = () => {
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setLoading(false);
    }, 500);
  };

  const hasMoreTeams = currentPage * teamsPerPage < filteredTeams.length;

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
                Showing {displayedTeams.length} of {filteredTeams.length} results
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
              {displayedTeams.map((team, index) => (
                <TableRow 
                  key={team.id} 
                  className={`table-row-hover border-b border-border/50 ${getRankStyle(team.rank)}`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animation: 'slideInUp 0.6s ease-out forwards'
                  }}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      {getRankIcon(team.rank)}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">{team.teamName}</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs">
                    <div className="truncate" title={team.problemStatement}>
                      {team.problemStatement}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{team.problemId}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {team.domain}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {displayedTeams.map((team, index) => (
          <Card 
            key={team.id} 
            className={`hover-lift cursor-pointer border-2 transition-all duration-300 ${getRankStyle(team.rank)}`}
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animation: 'slideInUp 0.6s ease-out forwards'
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getRankIcon(team.rank)}
                  <h3 className="font-bold text-lg">{team.teamName}</h3>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Problem:</span>
                  <p className="font-medium">{team.problemStatement}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">ID:</span>
                    <p className="font-mono text-sm">{team.problemId}</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {team.domain}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreTeams && (
        <div className="flex justify-center py-8">
          <Button 
            onClick={loadMore} 
            disabled={loading}
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover-lift"
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

      {filteredTeams.length === 0 && (
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