'use strict'
import process from 'node:process';


/**
 * Parses the arguments passed through the command line according to the configuration defined.
 *
 * @param {Array} args - The arguments to be parsed.
 * @param {Array} argsConfig - The configuration of the expected arguments, containing their name, type, and optional store_true flag.
 *
 * @returns {Object} - The parsed argument values as an object.
 * Example return value: { '--owner': 'John Doe', '--title': 'My Note', '--text': 'This is my note.', '--encrypt': true }
 * 
 * @throws {Error} - If a required argument is missing a value or if a numeric argument is not a valid number.
 */
export function parseArguments(args, argsConfig) {
    const argValues = [];
    for (let i = 0; i < args.length; i++) {
        const arg = argsConfig.find(a => a.name === args[i]);
        if (arg) {
            if (arg.type === 'boolean' && arg.store_true) {
                argValues[arg.name] = true;
            } else if (i + 1 >= args.length) {
                console.error(`Error: ${arg.name} argument requires a value`);
                process.exit(1);
            } else if (arg.type === 'number') {
                const numValue = Number(args[i + 1]);
                if (isNaN(numValue)) {
                    console.error(`Error: ${arg.name} argument must be a number`);
                    process.exit(1);
                }
                argValues[arg.name] = numValue;
                i++;
            } else if (arg.validate) {
                const validationResult = arg.validate(args[i + 1]);
                if (validationResult.success === false) {
                    throw new Error(validationResult.error);
                }
                argValues[arg.name] = args[i + 1];
                i++;
            } else {
                argValues[arg.name] = args[i + 1];
                i++;
            }
        }
    }
    const missing_args = getMissingRequiredArgs(argValues, argsConfig);
    if (missing_args.length > 0) {
        throw new Error(`Missing required arguments: ${missing_args.join(', ')}`);
    }
    // remove leading dashes from argument names
    return removeLeadingDashedFromArgNames(argValues);
}

function removeLeadingDashedFromArgNames(argValues) {
    const parsedArgValues = {};
    for (const argName in argValues) {
        parsedArgValues[removeLeadingDashes(argName)] = argValues[argName];
    }
    return parsedArgValues;
}

function removeLeadingDashes(str) {
    return str.replace(/^--/, '');
}

export function getMissingRequiredArgs(argValues, argsConfig) {
    const missing_args = [];
    for (let i = 0; i < argsConfig.length; i++) {
        const arg = argsConfig[i];
        if (arg.required && !argValues[arg.name]) {
            missing_args.push(arg.name);
        }
    }
    return missing_args;
}