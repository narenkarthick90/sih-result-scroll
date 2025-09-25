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
  // Force cache refresh - all ranking removed
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const teamsPerPage = 10;

  // Check if a row matches the search query
  const matchesSearch = (teamName: string, problemStatement: string, status: string) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return teamName.toLowerCase().includes(query) ||
           problemStatement.toLowerCase().includes(query) ||
           status.toLowerCase().includes(query);
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

  // All team data with status
  const allTeams = [
    { teamName: "CodePlay", problemStatement: "AI-Powered Personal Farming Assistant for Kerala Farmers", problemId: "SIH25074", status: "Shortlisted" },
    { teamName: "TECHSEA", problemStatement: "Development of a Digital Mental Health and Psychological Support System for Students in Higher Education", problemId: "SIH25092", status: "Shortlisted" },
    { teamName: "ByteForce", problemStatement: "Maximizing Section Throughput Using Al-Powered Precise Train Traffic Control", problemId: "SIH25022", status: "Shortlisted" },
    { teamName: "Hexabyte", problemStatement: "Smart Tourist Safety Monitoring & Incident Response System using Al, Geo-Fencing, and Blockchain-based Digital ID", problemId: "SIH25002", status: "Shortlisted" },
    { teamName: "TeamTitanic", problemStatement: "Document Overload at Kochi Metro Rail Limited (KMRL)-An automated solution", problemId: "SIH25080", status: "Shortlisted" },
    { teamName: "Innov8ors", problemStatement: "Sentiment analysis of comments received through E-consultation module", problemId: "SIH25035", status: "Shortlisted" },
    { teamName: "24CaratGoldLabubus", problemStatement: "Development of a Digital Mental Health and Psychological Support System for Students in Higher Education", problemId: "SIH25092", status: "Shortlisted" },
    { teamName: "CodeX", problemStatement: "Real-Time Public Transport Tracking for Small Cities", problemId: "SIH25013", status: "Shortlisted" },
    { teamName: "spyder", problemStatement: "Student Innovation: Swadeshi for Atmanirbhar Bharat - Miscellaneous", problemId: "SIH25115", status: "Shortlisted" },
    { teamName: "404 Finders", problemStatement: "AI-Powered Personal Farming Assistant for Kerala Farmers", problemId: "SIH25074", status: "Shortlisted" },
    { teamName: "Synergy", problemStatement: "Crowdsourced Civic lssue Reporting and Resolution System", problemId: "SIH25031", status: "Shortlisted" },
    { teamName: "Six Elixir", problemStatement: "Maximizing Section Throughput Using Al-Powered Precise Train Traffic Control", problemId: "SIH25022", status: "Shortlisted" },
    { teamName: "ctrl+alt+elite", problemStatement: "Smart Traffic Management Systern for Urban Congestion", problemId: "SIH25050", status: "Shortlisted" },
    { teamName: "Scientific Mavericks", problemStatement: "Disaster Preparedness and Response Education System for Schools and Colleges", problemId: "SIH25008", status: "Shortlisted" },
    { teamName: "Innoverse", problemStatement: "E tongue for Dravya identification", problemId: "SIH25025", status: "Shortlisted" },
    { teamName: "200_OK", problemStatement: "Secure Data Wiping for Trustworthy IT Asset Recycling", problemId: "SIH25070", status: "Shortlisted" },
    { teamName: "SIH SPARKLERS", problemStatement: "Gamified Learning Platform for Rural Education", problemId: "SIH25048", status: "Shortlisted" },
    { teamName: "ArchBTW!", problemStatement: "Smart Tourist Safety Monitoring & Incident Response System using Al, Geo-Fencing, and Blockchain-based Digital ID", problemId: "SIH25002", status: "Shortlisted" },
    { teamName: "SPECKTRUM", problemStatement: "Development of Sensor for Detection Of Microplastics", problemId: "SIH25036", status: "Shortlisted" },
    { teamName: "The Newbies", problemStatement: "FloatChat - AI-Powered Conversational Interface for ARGO Ocean Data Discovery and Visualization", problemId: "SIH25040", status: "Shortlisted" },
    { teamName: "Hexa Mavericks", problemStatement: "Development of a Digital Mental Health and Psychological Support System for Students in Higher Education", problemId: "SIH25092", status: "Shortlisted" },
    { teamName: "Vegonix", problemStatement: "Improved Onion storage technology for enhancing shelf life of onions", problemId: "SIH25053", status: "Shortlisted" },
    { teamName: "SPECI4GE", problemStatement: "Automated Specimen Preparation System for testing of Cable samples as per IS 10810 and IS 7098.", problemId: "SIH25055", status: "Shortlisted" },
    { teamName: "Kernel Panic", problemStatement: "Develop a blockchain-based system for botanical traceability of Ayurvedic herbs, including geo-tagging from the point of collection (farmers/wild collectors) to the final Ayurvedic formulation label.", problemId: "SIH25027", status: "Shortlisted" },
    { teamName: "SpiChain", problemStatement: "Blockchain-Based Supply Chain Transparency for Agricultural Produce", problemId: "SIH25045", status: "Shortlisted" },
    { teamName: "OmniMatrix", problemStatement: "Develop computer programs (in any language, preferably Python) to identify the design principles behind the Kolam designs and recreate the kolams.", problemId: "SIH12507", status: "Shortlisted" },
    { teamName: "Beans", problemStatement: "Automated Attendance System for Rural Schools", problemId: "SIH25012", status: "Shortlisted" },
    { teamName: "Error 404", problemStatement: "Student Innovation: Swadeshi for Atmanirbhar Bharat - Miscellaneous", problemId: "SIH25115", status: "Shortlisted" },
    { teamName: "Zephyr", problemStatement: "FloatChat - AI-Powered Conversational Interface for ARGO Ocean Data Discovery and Visualization", problemId: "SIH25040", status: "Shortlisted" },
    { teamName: "ArtXCode", problemStatement: "Develop computer programs (in any language, preferably Python) to identify the design principles behind the Kolam designs and recreate the kolams.", problemId: "SIH12507", status: "Shortlisted" },
    { teamName: "InnovatHers", problemStatement: "Telemedicine Access for Rural Healthcare in Nabha", problemId: "SIH25018", status: "Shortlisted" },
    { teamName: "Brute Forces", problemStatement: "Al-Powered Crop Yield Prediction and Optimization", problemId: "SIH25044", status: "Shortlisted" },
    { teamName: "Data Dynamos", problemStatement: "Digital Platform for Centralized Alumni Data Management and Engagement", problemId: "SIH25017", status: "Shortlisted" },
    { teamName: "Atmanirbhar", problemStatement: "FloatChat - AI-Powered Conversational Interface for ARGO Ocean Data Discovery and Visualization", problemId: "SIH25040", status: "Shortlisted" },
    { teamName: "Unsteady State", problemStatement: "Improved Onion storage technology for enhancing shelf life of onions", problemId: "SIH25053", status: "Shortlisted" },
    { teamName: "Nakshatra", problemStatement: "Student Innovation: Swadeshi for Atmanirbhar Bharat - Space Technology", problemId: "SIH25142", status: "Shortlisted" },
    { teamName: "Qubits", problemStatement: "Blockchain-Based Blue Carbon Registry and MRV System", problemId: "SIH25038", status: "Shortlisted" },
    { teamName: "Delta Quacks", problemStatement: "Integrated Platform for Crowdsourced Ocean Hazard Reporting and Social Media Analytics", problemId: "SIH25039", status: "Shortlisted" },
    { teamName: "Cypher", problemStatement: "Telemedicine Access for Rural Healthcare in Nabha", problemId: "SIH25018", status: "Shortlisted" },
    { teamName: "Code Catalyst", problemStatement: "Al-Based Internship Recommendation Engine for PM Internship Scheme", problemId: "SIH25034", status: "Shortlisted" },
    { teamName: "NeuroByte", problemStatement: "FloatChat - AI-Powered Conversational Interface for ARGO Ocean Data Discovery and Visualization", problemId: "SIH25040", status: "Shortlisted" },
    { teamName: "dHexagon", problemStatement: "FloatChat - AI-Powered Conversational Interface for ARGO Ocean Data Discovery and Visualization", problemId: "SIH25040", status: "Shortlisted" },
    { teamName: "En Passant", problemStatement: "Development of AI-powered FRA Atlas and WebGIS-based Decision Support System (DSS) for Integrated Monitoring of Forest Rights Act (FRA) Implementation. (States to be concentrated: Madhya Pradesh, Tripura , Odisha, Telangana)", problemId: "SIH12508", status: "Shortlisted" },
    { teamName: "ParadoxifY", problemStatement: "Development of a travel related software app that can be installed on mobile phones that could capture trip related information", problemId: "SIH25082", status: "Shortlisted" },
    { teamName: "Ajayya", problemStatement: "Smart Traffic Management Systern for Urban Congestion", problemId: "SIH25050", status: "Shortlisted" },
    { teamName: "Tech Innovators", problemStatement: "Smart City Infrastructure Monitoring", problemId: "SIH25151", status: "Waitlisted" },
    { teamName: "Future Coders", problemStatement: "AI-Based Education Assessment System", problemId: "SIH25152", status: "Waitlisted" },
    { teamName: "Digital Pioneers", problemStatement: "Blockchain-Based Voting System", problemId: "SIH25153", status: "Waitlisted" },
    { teamName: "Code Masters", problemStatement: "IoT-Based Environmental Monitoring", problemId: "SIH25154", status: "Waitlisted" },
    { teamName: "Innovation Squad", problemStatement: "Machine Learning for Predictive Analytics", problemId: "SIH25155", status: "Waitlisted" }
  ];

  // Count filtered results
  const filteredCount = allTeams.filter(team =>
    matchesSearch(team.teamName, team.problemStatement, team.status)
  ).length;

  // Count displayed results
  let displayedCount = 0;
  for (let i = 0; i < allTeams.length; i++) {
    if (matchesSearch(allTeams[i].teamName, allTeams[i].problemStatement, allTeams[i].status) && shouldDisplay(displayedCount)) {
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
                <TableHead className="text-left font-bold text-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allTeams
                .filter(team => matchesSearch(team.teamName, team.problemStatement, team.status))
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
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${team.status === 'Shortlisted' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                        {team.status}
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
          .filter(team => matchesSearch(team.teamName, team.problemStatement, team.status))
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
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${team.status === 'Shortlisted' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>{team.status}</span>
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