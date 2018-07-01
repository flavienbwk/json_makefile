class ConsoleColors {

    constructor() {
        this._Reset = "\x1b[0m";
        this._Bright = "\x1b[1m";
        this._Dim = "\x1b[2m";
        this._Underscore = "\x1b[4m";
        this._Blink = "\x1b[5m";
        this._Reverse = "\x1b[7m";
        this._Hidden = "\x1b[8m";

        this._FgBlack = "\x1b[30m";
        this._FgRed = "\x1b[31m";
        this._FgGreen = "\x1b[32m";
        this._FgYellow = "\x1b[33m";
        this._FgBlue = "\x1b[34m";
        this._FgMagenta = "\x1b[35m";
        this._FgCyan = "\x1b[36m";
        this._FgWhite = "\x1b[37m";

        this._BgBlack = "\x1b[40m";
        this._BgRed = "\x1b[41m";
        this._BgGreen = "\x1b[42m";
        this._BgYellow = "\x1b[43m";
        this._BgBlue = "\x1b[44m";
        this._BgMagenta = "\x1b[45m";
        this._BgCyan = "\x1b[46m";
        this._BgWhite = "\x1b[47m";
    }
    
    /*
     * Methods.
     */

    print_title(str) {
        console.log(this._BgMagenta + this._FgWhite + str + this._Reset);
    }

    print_error(str) {
        console.log(this._FgRed + str + this._Reset);
    }

    print_success(str) {
        console.log(this._FgGreen + str + this._Reset);
    }

    print_warning(str) {
        console.log(this._FgYellow + str + this._Reset);
    }

    print_info(str) {
        console.log(this._FgBlue + str + this._Reset);
    }
}

module.exports = ConsoleColors;