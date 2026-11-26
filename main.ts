// Entry for "The 3AM Commit Message" (make.fun program/v1).
// The grader runs this file and reads /output/entry.txt: one line,
// at most 139 characters, judged as a 3am commit message.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

// The winning line from the local V1-V5 race (see build log).
const COMMIT_MESSAGE =
  "revert: my 2am fix for my 1am hallucination; 3am verdict: the original bug has seniority";

// Mirror the sealed gate locally: 1-139 characters, not only
// white space, exactly one line. Fail loudly instead of writing
// an entry the gate would refuse.
function checkGate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 139) {
    throw new Error(`entry length ${chars} outside 1..139`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry is not one line");
  }
}

function writeEntry(): void {
  checkGate(COMMIT_MESSAGE);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, COMMIT_MESSAGE, "utf8");
}

writeEntry();
