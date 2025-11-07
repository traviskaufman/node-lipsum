#!/usr/bin/env node

/**
 * Lipsum Command-line Interface
 *
 * This module provides a CLI wrapper for the main module, allowing it to be
 * easily used via anyone's login shell.
 */

import { Command } from "commander";
import Lipsum from "./lipsum.ts";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read version from package.json
const packageJson = JSON.parse(
  readFileSync(join(__dirname, "..", "package.json"), "utf-8"),
);

const program = new Command();

program
  .version(packageJson.version)
  .description("The CLI for the NodeJS Lorem Ipsum Service")
  .option(
    "-s, --start-with-lipsum",
    'Whether or not the text should start with "Lorem Ipsum dolor sit amet...".',
    false,
  )
  .option(
    "-w, --what <type>",
    'The type of each text structure that will be returned. Choose from "paras" (paragraphs), "words", or "bytes"',
    "paras",
  )
  .option(
    "-a, --amount <number>",
    "The number of text structures that will be returned. Defaults to 5.",
    "5",
  );

export async function run() {
  program.parse();

  const options = program.opts();

  const lipsum = new Lipsum();

  const text = await lipsum.getText({
    start: options.startWithLipsum ? "yes" : "no",
    what: options.what,
    amount: parseInt(options.amount, 10),
  });

  console.log(text);
}

if (import.meta.main) {
  run().catch((err) => {
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  });
}
