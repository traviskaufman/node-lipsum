/**
 * @fileoverview Provides a CLI wrapper for the main module.
 */
import { ArgumentParser } from 'argparse';
import { Lipsum } from './lipsum';
/**
 * Runs the CLI program.
 */
export declare class CLI {
    private optparser;
    private lipsum;
    constructor(optparser?: ArgumentParser, lipsum?: Lipsum);
    run(args?: string[]): void;
}
