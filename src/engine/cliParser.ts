export interface ParsedCommand {
  raw: string;
  tokens: string[];
  program: string;
  service: string;
  operation: string;
  options: Record<string, string | boolean>;
  positionals: string[];
}

export function tokenize(input: string): string[] {
  // Normalize line continuations like \ followed by newline
  const cleaned = input.replace(/\\\r?\n/g, " ").trim();
  const tokens: string[] = [];
  let current = "";
  let inDouble = false;
  let inSingle = false;

  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];

    if (char === '"' && !inSingle) {
      inDouble = !inDouble;
    } else if (char === "'" && !inDouble) {
      inSingle = !inSingle;
    } else if ((char === " " || char === "\t" || char === "\n") && !inDouble && !inSingle) {
      if (current.length > 0) {
        tokens.push(current);
        current = "";
      }
    } else {
      current += char;
    }
  }

  if (current.length > 0) {
    tokens.push(current);
  }

  return tokens;
}

export function parseAwsCommand(input: string): ParsedCommand {
  const tokens = tokenize(input);
  const options: Record<string, string | boolean> = {};
  const positionals: string[] = [];

  let program = "";
  let service = "";
  let operation = "";

  if (tokens.length > 0) {
    program = tokens[0].toLowerCase();
  }
  if (tokens.length > 1) {
    service = tokens[1].toLowerCase();
  }
  if (tokens.length > 2) {
    operation = tokens[2].toLowerCase();
  }

  // Parse options and positionals starting from index 3 (or 2 if operation is part of service)
  let i = 3;
  while (i < tokens.length) {
    const token = tokens[i];
    if (token.startsWith("--")) {
      const eqIdx = token.indexOf("=");
      if (eqIdx !== -1) {
        const key = token.slice(2, eqIdx).toLowerCase();
        const val = token.slice(eqIdx + 1);
        options[key] = val;
        i++;
      } else {
        const key = token.slice(2).toLowerCase();
        // check if next token is a value (does not start with --)
        if (i + 1 < tokens.length && !tokens[i + 1].startsWith("--")) {
          options[key] = tokens[i + 1];
          i += 2;
        } else {
          options[key] = true;
          i++;
        }
      }
    } else {
      positionals.push(token);
      i++;
    }
  }

  return {
    raw: input,
    tokens,
    program,
    service,
    operation,
    options,
    positionals,
  };
}
