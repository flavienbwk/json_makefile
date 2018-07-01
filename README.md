# JSON to Makefile
A simple utility to convert a JSON file to a well-formatted Makefile.
Helps you to generate a beautiful, programmable, with error checks and portable Makefile.

## Install :

```bash
apt install nodejs -y
apt install npm -y
git clone https://github.com/flavienbwk/json_to_makefile
cd json_to_makefile
```

## Use :

Assuming `makefile_example.json` is the JSON Makefile you want to convert.
```bash
node json_to_makefile.js makefile_example.json # [, makefile_example_2.json[, makefile_example_3.json ...]]
```


## Creating the JSON Makefile (example) :

```javascript
{
    "parser_version": "0.0.1",      // Version of json_to_makefile for which the JSON has been designed.
    "output": "Makefile",           // Name of the output file converted.
    "variables": {                  // Declare here your variables and their values.
        "CC": "gcc",
        "MAIN_PRGM": "main.c",
        "NAME_PRGM": "my_program"
    },
    "targets": [                    // Define here your targets.
        {
            "name": "bindprgm",     // Name of the target.
            "dependencies" : [      // Dependencies of the target.
                "$(LMY)",
                "$(NAME)"
            ],
            "commands": [           // Commands associated with the target.
                "gcc-o $(NAME_PRGM) $(MAIN_PRGM)"
            ]
        },
        {                           // Another example.
            "name": "$(NAME)",
            "dependencies" : [
                "$(OBJ)"
            ],
            "commands": [
                "ar rc $(NAME) $(OBJ)",
                "ranlib $(NAME)",
                "chmod +x $(NAME)"
            ]
        },
        // [...]
    ]
}
```
