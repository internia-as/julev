export interface GrammarError {
  error_text: string;
  start_index: number;
  end_index: number;
  error_code: string;
  description: string;
  suggestions: string[];
  title: string;
}

export interface GrammarResult {
  text: string;
  errs: GrammarError[];
}
