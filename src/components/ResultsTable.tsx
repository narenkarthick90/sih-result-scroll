import { useState, useEffect } from "react";
import { ChevronDown, Target, Hash, Layers, ExternalLink } from "lucide-react";
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

  // All hardcoded team data (without rank property)
  const allTeams = [
    { teamName: "Code Warriors 1", problemStatement: "AI-powered disease diagnosis system", problemId: "SIH20241001", domain: "Healthcare & Biomedical" },
    { teamName: "Tech Titans 1", problemStatement: "Smart classroom management platform", problemId: "SIH20241002", domain: "Education Technology" },
    { teamName: "Innovation Hub 1", problemStatement: "Precision agriculture monitoring", problemId: "SIH20241003", domain: "Agriculture & Food Tech" },
    { teamName: "Digital Dynamos 1", problemStatement: "IoT-based home automation", problemId: "SIH20241004", domain: "Smart Automation" },
    { teamName: "Smart Coders 1", problemStatement: "Blockchain payment gateway", problemId: "SIH20241005", domain: "Fintech & Blockchain" },
    { teamName: "Future Builders 1", problemStatement: "Solar energy optimization", problemId: "SIH20241006", domain: "Clean Energy" },
    { teamName: "Cyber Knights 1", problemStatement: "Traffic management system", problemId: "SIH20241007", domain: "Smart Cities" },
    { teamName: "Data Wizards 1", problemStatement: "Network security framework", problemId: "SIH20241008", domain: "Cybersecurity" },
    { teamName: "AI Pioneers 1", problemStatement: "Virtual reality training", problemId: "SIH20241009", domain: "AR/VR & Gaming" },
    { teamName: "Tech Crusaders 1", problemStatement: "Community welfare app", problemId: "SIH20241010", domain: "Social Innovation" },
    { teamName: "Binary Beasts 1", problemStatement: "AI-powered disease diagnosis system", problemId: "SIH20241011", domain: "Healthcare & Biomedical" },
    { teamName: "Logic Lords 1", problemStatement: "Smart classroom management platform", problemId: "SIH20241012", domain: "Education Technology" },
    { teamName: "Neural Networks 1", problemStatement: "Precision agriculture monitoring", problemId: "SIH20241013", domain: "Agriculture & Food Tech" },
    { teamName: "Quantum Leap 1", problemStatement: "IoT-based home automation", problemId: "SIH20241014", domain: "Smart Automation" },
    { teamName: "Pixel Perfect 1", problemStatement: "Blockchain payment gateway", problemId: "SIH20241015", domain: "Fintech & Blockchain" },
    { teamName: "Syntax Squad 1", problemStatement: "Solar energy optimization", problemId: "SIH20241016", domain: "Clean Energy" },
    { teamName: "Code Warriors 2", problemStatement: "Traffic management system", problemId: "SIH20241017", domain: "Smart Cities" },
    { teamName: "Tech Titans 2", problemStatement: "Network security framework", problemId: "SIH20241018", domain: "Cybersecurity" },
    { teamName: "Innovation Hub 2", problemStatement: "Virtual reality training", problemId: "SIH20241019", domain: "AR/VR & Gaming" },
    { teamName: "Digital Dynamos 2", problemStatement: "Community welfare app", problemId: "SIH20241020", domain: "Social Innovation" },
    { teamName: "Smart Coders 2", problemStatement: "AI-powered disease diagnosis system", problemId: "SIH20241021", domain: "Healthcare & Biomedical" },
    { teamName: "Future Builders 2", problemStatement: "Smart classroom management platform", problemId: "SIH20241022", domain: "Education Technology" },
    { teamName: "Cyber Knights 2", problemStatement: "Precision agriculture monitoring", problemId: "SIH20241023", domain: "Agriculture & Food Tech" },
    { teamName: "Data Wizards 2", problemStatement: "IoT-based home automation", problemId: "SIH20241024", domain: "Smart Automation" },
    { teamName: "AI Pioneers 2", problemStatement: "Blockchain payment gateway", problemId: "SIH20241025", domain: "Fintech & Blockchain" },
    { teamName: "Tech Crusaders 2", problemStatement: "Solar energy optimization", problemId: "SIH20241026", domain: "Clean Energy" },
    { teamName: "Binary Beasts 2", problemStatement: "Traffic management system", problemId: "SIH20241027", domain: "Smart Cities" },
    { teamName: "Logic Lords 2", problemStatement: "Network security framework", problemId: "SIH20241028", domain: "Cybersecurity" },
    { teamName: "Neural Networks 2", problemStatement: "Virtual reality training", problemId: "SIH20241029", domain: "AR/VR & Gaming" },
    { teamName: "Quantum Leap 2", problemStatement: "Community welfare app", problemId: "SIH20241030", domain: "Social Innovation" },
    { teamName: "Pixel Perfect 2", problemStatement: "AI-powered disease diagnosis system", problemId: "SIH20241031", domain: "Healthcare & Biomedical" },
    { teamName: "Syntax Squad 2", problemStatement: "Smart classroom management platform", problemId: "SIH20241032", domain: "Education Technology" },
    { teamName: "Code Warriors 3", problemStatement: "Precision agriculture monitoring", problemId: "SIH20241033", domain: "Agriculture & Food Tech" },
    { teamName: "Tech Titans 3", problemStatement: "IoT-based home automation", problemId: "SIH20241034", domain: "Smart Automation" },
    { teamName: "Innovation Hub 3", problemStatement: "Blockchain payment gateway", problemId: "SIH20241035", domain: "Fintech & Blockchain" },
    { teamName: "Digital Dynamos 3", problemStatement: "Solar energy optimization", problemId: "SIH20241036", domain: "Clean Energy" },
    { teamName: "Smart Coders 3", problemStatement: "Traffic management system", problemId: "SIH20241037", domain: "Smart Cities" },
    { teamName: "Future Builders 3", problemStatement: "Network security framework", problemId: "SIH20241038", domain: "Cybersecurity" },
    { teamName: "Cyber Knights 3", problemStatement: "Virtual reality training", problemId: "SIH20241039", domain: "AR/VR & Gaming" },
    { teamName: "Data Wizards 3", problemStatement: "Community welfare app", problemId: "SIH20241040", domain: "Social Innovation" },
    { teamName: "AI Pioneers 3", problemStatement: "AI-powered disease diagnosis system", problemId: "SIH20241041", domain: "Healthcare & Biomedical" },
    { teamName: "Tech Crusaders 3", problemStatement: "Smart classroom management platform", problemId: "SIH20241042", domain: "Education Technology" },
    { teamName: "Binary Beasts 3", problemStatement: "Precision agriculture monitoring", problemId: "SIH20241043", domain: "Agriculture & Food Tech" },
    { teamName: "Logic Lords 3", problemStatement: "IoT-based home automation", problemId: "SIH20241044", domain: "Smart Automation" },
    { teamName: "Neural Networks 3", problemStatement: "Blockchain payment gateway", problemId: "SIH20241045", domain: "Fintech & Blockchain" },
    { teamName: "Quantum Leap 3", problemStatement: "Solar energy optimization", problemId: "SIH20241046", domain: "Clean Energy" },
    { teamName: "Pixel Perfect 3", problemStatement: "Traffic management system", problemId: "SIH20241047", domain: "Smart Cities" },
    { teamName: "Syntax Squad 3", problemStatement: "Network security framework", problemId: "SIH20241048", domain: "Cybersecurity" },
    { teamName: "Code Warriors 4", problemStatement: "Virtual reality training", problemId: "SIH20241049", domain: "AR/VR & Gaming" },
    { teamName: "Tech Titans 4", problemStatement: "Community welfare app", problemId: "SIH20241050", domain: "Social Innovation" }
  ];

  // Count filtered results
  const filteredCount = allTeams.filter(team =>
    matchesSearch(team.teamName, team.problemStatement, team.domain)
  ).length;

  // Count displayed results
  let displayedCount = 0;
  for (let i = 0; i < allTeams.length; i++) {
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
                Selected Teams - SIH 2024
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
              {allTeams
                .filter(team => matchesSearch(team.teamName, team.problemStatement, team.domain))
                .slice(0, currentPage * teamsPerPage)
                .map((team, index) => (
                  <TableRow
                    key={team.problemId}
                    className="table-row-hover border-b border-border/50"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: "slideInUp 0.6s ease-out forwards",
                    }}
                  >
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
        {allTeams
          .filter(team => matchesSearch(team.teamName, team.problemStatement, team.domain))
          .slice(0, currentPage * teamsPerPage)
          .map((team, index) => (
            <Card key={team.problemId} className="hover-lift cursor-pointer border-2 transition-all duration-300" style={{ animationDelay: `${index * 0.1}s`, animation: 'slideInUp 0.6s ease-out forwards' }}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg">{team.teamName}</h3>
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
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">{team.domain}</span>
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