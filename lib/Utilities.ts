var Fs = require('fs');

class Utilities {

    constructor() {
        this.message = null;
    }

    isObject(n) {
        if (n == null)
            return false;
        return (Object.prototype.toString.call(n) === '[object Object]');
    }

    isJSON(text) {
        if (typeof text !== "string" || text == null || !text)
            return false;
        try {
            JSON.parse(text);
            return true;
        } catch (error) {
            return false;
        }
    }

    checkKeysPresenceInArray(array, keys) {
        var error = 0;

        keys.forEach((value, key) => {
            if (!(array.hasOwnProperty(value))) {
                error = 1;
                this.message = "Missing \"" + value + "\" property in the file.";
                return false;
            }
        });
        return (!error);
    }

    /**
     * 
     * @param {string} path
     * @param {string} content
     * @returns {Boolean} Success writing or not.
     */
    writeFile(path, content) {
        try {
            Fs.writeFileSync(path, content, 'utf8');
            return true;
        } catch (e) {
            this.message = "Impossible to write the file " + path + "."
            return false;
        }
    }

    isArray(elm) {
        if (elm instanceof Array) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Generate x spaces characters.
     * 
     * @param {int} x The number of spaces to get.
     * @returns {Utilities.getSpaces.spaces|String}
     */
    getSpaces(x) {
        var spaces = "";

        if (x > 0)
            while (x-- > 0)
                spaces += " ";
        return (spaces);
    }

}

module.exports = Utilities;