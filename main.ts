// Dad Joke Showdown (round 2) — one original dad joke, 81 characters.
//
// The joke is a plain constant. The program validates it against the
// competition gate (1-200 characters, single line, not only whitespace),
// writes it to /output/entry.txt with no trailing newline, then reads the
// file back and verifies it is byte-identical to the constant.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "I told the scissors to cut it out. They said, 'We're just trying to make the cut.'";

const OUT_PATH = "/output/entry.txt";

function codePointCount(text: string): number {
  return [...text].length;
}

function main(): void {
  const chars = codePointCount(JOKE);
  if (chars < 1 || chars > 200) {
    throw new Error(`joke must be 1-200 characters, got ${chars}`);
  }
  if (JOKE.includes("\n") || JOKE.includes("\r")) {
    throw new Error("joke must be a single line");
  }
  if (JOKE.trim().length === 0) {
    throw new Error("joke must not be only whitespace");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, JOKE, "utf8");
  const back = readFileSync(OUT_PATH, "utf8");
  if (back !== JOKE) {
    throw new Error("read-back mismatch: /output/entry.txt differs from the joke");
  }
  console.log(`wrote ${codePointCount(back)} characters to ${OUT_PATH}`);
}

main();
