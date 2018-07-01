const   ConsoleColors = require('./lib/ConsoleColors.ts');
const   Parser = require('./lib/Parser.ts');
const   Utilities = require('./lib/Utilities.ts');
var     fs = require('fs');

var files = [];
var valid_files = [];
let consoleColors = new ConsoleColors();
let utilities = new Utilities();

consoleColors.print_title("Welcome to JSON_TO_MAKEFILE script.");

process.argv.forEach(function (file, index, array) {
    if (index > 1)
        files.push(file);
});

if (files.length) {
    consoleColors.print_info("Now checking files passed as arguments...");
    files.forEach((file, index) => {
        if (fs.existsSync(file))
            valid_files.push(file);
        else
            consoleColors.print_error("Invalid or inexistant file : " + file);
    });

    if (valid_files.length) {
        files.forEach((file, index) => {
            consoleColors.print_info("\nChecking " + file + "...");
            let parser = new Parser(file);
            if (parser.parse())
                consoleColors.print_success("Successfuly parserd the file.");
            else
                consoleColors.print_error(parser.message);
        });
        consoleColors.print_info("\nEnded checks.");
    } else
        consoleColors.print_error("No valid file found.");
} else
    consoleColors.print_error("Please provide a file path.");