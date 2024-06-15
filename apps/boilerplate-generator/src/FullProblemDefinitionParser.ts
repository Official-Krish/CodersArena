export class FullProblemDefinitionParser {
    problemName : string = "";
    functionName : string = "";
    inputFields : { type : string, name : string }[] = [];
    outputFields : { type : string, name : string }[] = [];

    parse (input : string){
        const lines = input.split("\n").map((line) => line.trim());
        let currentSection : string | null = null;

        lines.forEach((line) => {
            if (line.startsWith("ProblemName:")){
                this.problemName = this.extractQuotedValue(line);
            }
            else if (line.startsWith("FunctionName:")){
                this.functionName = this.extractValue(line);
            } else if (line.startsWith("Input Structure:")){
                currentSection = "Input";
            } else if (line.startsWith("Output Structure:")){
                currentSection = "Output";
            } else if (line.startsWith("Input Field:")){
                if (currentSection === "Input"){
                    const field = this.extractField(line);
                    if (field) this.inputFields.push(field);
                }
            } else if (line.startsWith("Output Field:")){
                if (currentSection === "Output"){
                    const field = this.extractField(line);
                    if (field) this.outputFields.push(field);
                }
            }
        });
    }

    extractQuotedValue (line : string) : string {
        const match = line.match(/: "(.*)"$/);
        return match ? match[1] : "";
    }

    extractValue (line : string) : string {
        const match = line.match(/: (\w+)$/);
        return match ? match[1] : "";
    }

    extractField (line : string) : { type : string, name : string } | null {
        const match = line.match(/: (\w+) (\w+)$/);
        if (match){
            return { type: match[1], name: match[2] };
        }
        return null;
    }

    generateCpp () : string {
        const inputs = this.inputFields.map((field) => `${field.type} ${field.name}`).join(", ");

        const inputReads = this.inputFields
        .map((field) => {
          if (field.type.startsWith("list<")) {
            return `int size_${field.name};\n  std::cin >> size_${field.name};\n  ${this.mapTypeToCpp(field.type)} ${field.name}(size_${field.name});\n  for(int i = 0; i < size_${field.name}; ++i) std::cin >> ${field.name}[i];`;
          } else {
            return `std::cin >> ${field.name};`;
          }
        })
        .join("\n  ");

        const outputType = this.outputFields[0].type;
        const functionCall = `${outputType} result = ${this.functionName}(${this.inputFields.map((field) => field.name).join(", ")});`;
        const outputWrite = `std::cout << result << std::endl;`;

        return `
        #include <iostream>
        #include <vector>
        #include <string>
        #include <algorithm>
        #include <numeric>

        ##USER_CODE_HERE##
        int main(){
            ${inputReads}
            ${functionCall}
            ${outputWrite}
            return 0;
        }   
        `;
    }

    generateJs(): string {
        const inputs = this.inputFields.map((field) => field.name).join(", ");
        const inputReads = this.inputFields
          .map((field) => {
            if (field.type.startsWith("list<")) {
              return `const size_${field.name} = parseInt(input.shift());\nconst ${field.name} = input.splice(0, size_${field.name}).map(Number);`;
            } else {
              return `const ${field.name} = parseInt(input.shift());`;
            }
          })
          .join("\n  ");
        const outputType = this.outputFields[0].type;
        const functionCall = `${outputType} result = ${this.functionName}(${this.inputFields.map((field) => field.name).join(", ")});`;
        const outputWrite = `console.log(result);`;
    
        return `
        ##USER_CODE_HERE##
        
        const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\\n').join(' ').split(' ');
        ${inputReads}
        ${functionCall}
        ${outputWrite}
        `;
    }

    generatePython(): string {
        const inputs = this.inputFields.map((field) => field.name).join(", ");

        const inputReads = this.inputFields
          .map((field) => {
            if (field.type.startsWith("list<")) {
              return `size_${field.name} = int(input.readline())\n${field.name} = [int(x) for x in input.readline().split()]`;
            } else {
              return `${field.name} = int(input.readline())`;
            }
          })
          .join("\n  ");

        const outputType = this.outputFields[0].type;
        const functionCall = `result = ${this.functionName}(${inputs})`;
        const outputWrite = `print(result)`;

        return `
        ##USER_CODE_HERE##
        
        import sys
        input = sys.stdin.read().split()
        ${inputReads}
        ${functionCall}
        ${outputWrite}
        `;
    }

    mapTypeToCpp(type: string): string {
        switch (type) {
            case "int":
                return "int";
            case "float":
                return "float";
            case "string":
                return "std::string";
            case "bool":
                return "bool";
            case "list<int>":
                return "std::vector<int>";
            case "list<float>":
                return "std::vector<float>";
            case "list<string>":
                return "std::vector<std::string>";
            case "list<bool>":
                return "std::vector<bool>";
            default:
                return "unknown";
        }
    }

    


}