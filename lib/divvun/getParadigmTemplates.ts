export const getParadigmTemplates = (pos: string) => {
  const templates: Record<string, string[]> = {
    V: [
      "+V+Ind+Prs+Sg1",
      "+V+Ind+Prt+Sg1",
      "+V+Ind+Prs+Sg2",
      "+V+Ind+Prt+Sg2",
      "+V+Ind+Prs+Sg3",
      "+V+Ind+Prt+Sg3",
      "+V+Ind+Prs+Du1",
      "+V+Ind+Prt+Du1",
      "+V+Ind+Prs+Du2",
      "+V+Ind+Prt+Du2",
      "+V+Ind+Prs+Du3",
      "+V+Ind+Prt+Du3",
      "+V+Ind+Prs+Pl1",
      "+V+Ind+Prt+Pl1",
      "+V+Ind+Prs+Pl2",
      "+V+Ind+Prt+Pl2",
      "+V+Ind+Prs+Pl3",
      "+V+Ind+Prt+Pl3",
    ],
    N: [
      "+N+Sg+Nom",
      "+N+Pl+Nom",
      "+N+Sg+Acc",
      "+N+Pl+Acc",
      "+N+Sg+Gen",
      "+N+Pl+Gen",
      "+N+Sg+Ill",
      "+N+Pl+Ill",
      "+N+Sg+Loc",
      "+N+Pl+Loc",
      "+N+Sg+Com",
      "+N+Pl+Com",
      "+N+Ess",
    ],
  };

  return templates[pos] || [];
};
