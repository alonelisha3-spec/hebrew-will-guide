import { useState, useMemo } from "react";
import { getLeads, type LeadData } from "@/lib/store";
import { calculateResults } from "@/lib/resultsEngine";
import { questions } from "@/lib/questions";
import { ArrowRight, Trash2, Eye, EyeOff, Users, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";

export default function AdminPage() {
  const [leads, setLeads] = useState<LeadData[]>(() => getLeads());
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = useMemo(() => {
    if (!searchTerm.trim()) return leads;
    const term = searchTerm.toLowerCase();
    return leads.filter(
      (l) =>
        l.fullName.toLowerCase().includes(term) ||
        l.phone.includes(term) ||
        (l.email && l.email.toLowerCase().includes(term))
    );
  }, [leads, searchTerm]);

  function deleteLead(index: number) {
    const updated = leads.filter((_, i) => i !== index);
    setLeads(updated);
    localStorage.setItem("will_check_leads", JSON.stringify(updated));
  }

  function getQuestionLabel(id: string): string {
    return questions.find((q) => q.id === id)?.text || id;
  }

  function getResultSummary(lead: LeadData) {
    if (!lead.answers || Object.keys(lead.answers).length === 0) return null;
    try {
      return calculateResults(lead.answers);
    } catch {
      return null;
    }
  }

  if (leads.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
          <Users className="w-16 h-16 text-muted-foreground/20" />
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">אין לידים במערכת</h1>
            <p className="text-muted-foreground text-sm">
              לידים יופיעו כאן לאחר שמשתמשים ישלימו את הבדיקה.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה לדף הראשי
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen py-8">
        <div className="container max-w-4xl px-4 md:px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-xl md:text-2xl font-bold">ניהול לידים</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {leads.length} פניות סה״כ
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              חזרה
            </Link>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="חיפוש לפי שם, טלפון או דוא״ל..."
              className="w-full rounded-lg border border-border/60 bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/40"
            />
          </div>

          {/* Leads */}
          <div className="space-y-3">
            {filteredLeads.map((lead, index) => {
              const originalIndex = leads.indexOf(lead);
              const isExpanded = expandedId === originalIndex;
              const result = getResultSummary(lead);
              const date = new Date(lead.timestamp);

              return (
                <div
                  key={originalIndex}
                  className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden transition-shadow hover:shadow-md"
                >
                  <div
                    className="p-4 md:p-5 flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : originalIndex)}
                  >
                    <div className="flex items-center gap-3 md:gap-4 min-w-0">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                        {lead.fullName.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm md:text-base truncate">{lead.fullName}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span dir="ltr">{lead.phone}</span>
                          </span>
                          {lead.email && (
                            <span className="flex items-center gap-1 hidden sm:flex">
                              <Mail className="w-3 h-3" />
                              {lead.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3 shrink-0">
                      {result && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium hidden sm:inline-block">
                          {result.willType}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {date.toLocaleDateString("he-IL")}
                      </span>
                      {isExpanded ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-border/30 px-4 md:px-5 py-5 bg-secondary/20 space-y-5 animate-fade-in">
                      {result && (
                        <div className="space-y-2">
                          <h3 className="text-sm font-bold">תוצאות הבדיקה</h3>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                              {result.willType}
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-risk-medium/15 text-risk-medium font-medium">
                              רמת סיכון: {result.riskLevel}
                            </span>
                          </div>
                          {result.riskItems.length > 0 && (
                            <ul className="mt-2 space-y-1">
                              {result.riskItems.map((item, i) => (
                                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}

                      {lead.answers && Object.keys(lead.answers).length > 0 && (
                        <div className="space-y-2">
                          <h3 className="text-sm font-bold">תשובות השאלון</h3>
                          <div className="grid gap-2">
                            {Object.entries(lead.answers).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-start gap-4 text-xs">
                                <span className="text-muted-foreground">{getQuestionLabel(key)}</span>
                                <span className="font-medium shrink-0">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-border/30">
                        <span className="text-xs text-muted-foreground">
                          {date.toLocaleString("he-IL")}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteLead(originalIndex);
                            setExpandedId(null);
                          }}
                          className="flex items-center gap-1.5 text-xs text-destructive hover:underline transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          מחיקה
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
