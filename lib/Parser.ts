var Pjson = require('../package.json');
var Fs = require('fs');
const   Utilities = require('./Utilities.ts');

let     g_utils = new Utilities();

class Parser {

    constructor(src_path) {
        this._version = Pjson.version;
        this._src_path = src_path;
        this._src_content = Fs.readFileSync(src_path, 'utf8');
        this._src_json = null;
        this._dst_content = null;

        this._error = 0;
        this._message = "An error occured while parsing the file.";
    }

    /*
     * Methods (public).
     */

    parse() {
        this._error = 1;

        if (!this._checkContentValidity())
            return (!this._error);
        if (!this._checkJsonMakefileValidity(this._src_json))
            return (!this._error);
        if (!g_utils.writeFile(this._src_json.output, "<json_to_makefile:\
parser:g_utils.writeFile:" + this._version + ">"))
            return (!this._error);
        if (!this._computeJsonToMakefile(this._src_json))
            return (!this._error);
        this._error = 0;
        return (!this._error);
    }

    /*
     * Methods (private).
     */

    _checkContentValidity() {
        if (this._src_content.length > 1) {
            if (g_utils.isJSON(this._src_content)) {
                this._src_json = JSON.parse(this._src_content);
                if (this._version !== this._src_json.parser_version)
                    console.log("(WARN) Wrong parser version ("
                            + this._version
                            + ") for file (" + this._src_json["parser_version"]
                            + ").");
                return true;
            } else
                this._message = "Invalid JSON.";
        } else
            this._message = "File is empty.";
        return false;
    }

    _checkJsonMakefileValidity(array) {
        var error = 1;

        if (g_utils.checkKeysPresenceInArray(array, [
            "output",
            "parser_version",
            "variables",
            "targets"
        ])) {
            this._dst_content = array.output;
            for (var key in array["variables"]) {
                error = 1;
                if (key in array["variables"]) {
                    if (key.length > 0)
                        if (g_utils.isArray(array["variables"][key]))
                            if (array["variables"][key].length > 0)
                                error = 0;
                            else
                                this._message = "Nothing in this array."
                        else
                            error = 0;
                    else
                        this._message = "A variable has been not set.";
                } else
                    this._message = "Invalid format for variables.";
                if (error) {
                    this._message += " For variable " + (key) + ".";
                    return false;
                }
            }

            if (g_utils.isArray(array["targets"]))
                for (var i in array["targets"]) {
                    error = 1;
                    if (i in array["targets"]) {
                        if (g_utils.checkKeysPresenceInArray(array["targets"][i], [
                            "name",
                            "dependencies",
                            "commands"
                        ]))
                            if (g_utils.isArray(array["targets"][i]["commands"]))
                                if (g_utils.isArray(array["targets"][i]["dependencies"]))
                                    error = 0;
                                else
                                    this._message = "Dependencies directive is not an array.";
                            else
                                this._message = "Commands directive is not an array.";
                        else
                            this._message = g_utils.message;
                    } else
                        this._message = "Invalid format for targets.";
                    if (error) {
                        this._message += " For target " + (++i) + ".";
                        return false;
                    }
                }
            else {
                this._message = "Targets isn't an array.";
                return false;
            }
            return true;
        }
        return false;
    }

    _computeJsonToMakefile(array) {
        var max_align = 0;
        var mf_content = "";

        for (var variable_key in array.variables)
            if (variable_key.length > max_align)
                max_align = variable_key.length;
        for (var i in array.targets)
            if (array.targets[i].name.length > max_align)
                max_align = array.targets[i].name.length;

        for (var variable_key in array.variables) {
            if (g_utils.isArray(array.variables[variable_key])) {
                if (array.variables[variable_key].length > 0)
                    mf_content += variable_key
                            + g_utils.getSpaces(max_align - variable_key.length)
                            + " = "
                            + array.variables[variable_key][0] + "\n";
                for (var i_key in array.variables[variable_key])
                    if (i_key > 0) {
                        mf_content += g_utils.getSpaces(max_align + 3)
                                + array.variables[variable_key][i_key]
                        if (i_key == array.variables[variable_key].length - 1)
                            mf_content += " \\"
                        mf_content += "\n";
                    }
            } else
                mf_content += variable_key
                        + g_utils.getSpaces(max_align - variable_key.length)
                        + " = "
                        + array.variables[variable_key]
                        + "\n";
        }

        mf_content += "\n";
        for (var target in array.targets) {
            mf_content += array.targets[target]["name"]
                    + ": "
                    + g_utils.getSpaces(max_align
                            - array.targets[target]["name"].length
                            + 1);
            for (var dependency in array.targets[target]["dependencies"])
                mf_content += array.targets[target]["dependencies"][dependency]
                        + " ";
            for (var command in array.targets[target]["commands"])
                mf_content += "\n"
                        + g_utils.getSpaces(max_align + 3)
                        + array.targets[target]["commands"][command];
            mf_content += "\n\n";
        }
        mf_content = mf_content.slice(0, -1);
        return g_utils.writeFile(this._dst_content, mf_content);
    }

    /*
     * Getters.
     */

    get error() {
        return this._error;
    }

    get message() {
        return this._message;
    }

}

module.exports = Parser;