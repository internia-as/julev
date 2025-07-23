export const getParadigmTemplates = (lang: string, pos: string) => {
  const templates: Record<string, string[]> = {
    n: [
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
