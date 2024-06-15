export class ProblemDefinitionParser {
    problemName : string = "";
    functionName : string = "";
    inputFields : { type: string, name: string }[] = [];
    outputFields : { type: string, name: string }[] = [];

    parse(input : string) : void {
        const lines = input.split("\n").map((line) => line.trim());
        let currentSection : string | null = null;

        lines.forEach((line) => {
            if (line.startsWith("Problem Name:")){
                this.problemName = this.extractQuotedValue(line);
            } else if (line.startsWith("Function Name:")){
                this.functionName = this.extractValue(line);
            } else if (line.startsWith("Input Structure:")){
                currentSection = "input";
            } else if (line.startsWith("Output Structure:")){
                currentSection = "output";
            } else if (line.startsWith("Input field:")){
                if (currentSection === "input"){
                    const field = this.extractField(line);
                    if (field) this.inputFields.push(field);
                } 
            } else if (line.startsWith("Output field:")){
                if (currentSection === "output"){
                    const field = this.extractField(line);
                    if (field) this.outputFields.push(field);
                }
            }
        });
    }

    extractQuotedValue(line : string) : string {
        const match = line.match(/:"(.*)"$/);
        return match ? match[1] : "";
    }

    extractValue(line : string) : string {
        const match = line.match(/:(\w+)$/);
        return match ? match[1].trim() : "";
    }

    extractField(line : string) : { type: string, name: string } | null {
        const match = line.match(/Field: (\w+(?:<\w+>)?) (\w+)$/);
        return match ? { type: match[1], name: match[2] } : null;
    }

    generateCpp() : string {
        const inputs = this.inputFields.map((field) => `${field.type} ${field.name}`).join(", ");
        return `${this.outputFields[0].type} ${this.functionName}(${inputs}) {\n    // Implementation goes here\n    return result;\n}`;
    }

    generateJs() : string {
        const inputs = this.inputFields.map((field) => field.name).join(", ");
        return `function ${this.functionName}(${inputs}) {\n    // Implementation goes here\n    return result;\n}`;
    }
    generatePython() : string {
        const inputs = this.inputFields.map((field) => field.name).join(", ");
        return `def ${this.functionName}(${inputs}):\n    # Implementation goes here\n    return result`;
    }

    mapTypeToCpp(type : string) : string {
        switch (type) {
            case "int": return "int";
            case "string": return "std::string";
            case "char": return "char";
            case "bool": return "bool";
            case "float": return "float";
            case "double": return "double";
            case "long": return "long";
            case "long long": return "long long";
            case "int[]": return "std::vector<int>";
            case "string[]": return "std::vector<std::string>";
            case "char[]": return "std::vector<char>";
            case "bool[]": return "std::vector<bool>";
            case "float[]": return "std::vector<float>";
            case "double[]": return "std::vector<double>";
            case "long[]": return "std::vector<long>";
            case "long long[]": return "std::vector<long long>";
            case "int[][]": return "std::vector<std::vector<int>>";
            default: return "unknown";
        }
    }

    mapTypeToJs(type : string) : string {
        switch (type) {
            case "int": return "number";
            case "string": return "string";
            case "char": return "string";
            case "bool": return "boolean";
            case "float": return "number";
            case "double": return "number";
            case "long": return "number";
            case "long long": return "number";
            case "int[]": return "number[]";
            case "string[]": return "string[]";
            case "char[]": return "string[]";
            case "bool[]": return "boolean[]";
            case "float[]": return "number[]";
            case "double[]": return "number[]";
            case "long[]": return "number[]";
            case "long long[]": return "number[]";
            case "int[][]": return "number[][]";
            default: return "unknown";
        }
    }

    mapTypeToPython(type : string) : string {
        switch (type) {
            case "int": return "int";
            case "string": return "str";
            case "char": return "str";
            case "bool": return "bool";
            case "float": return "float";
            case "double": return "float";
            case "long": return "int";
            case "long long": return "int";
            case "int[]": return "List[int]";
            case "string[]": return "List[str]";
            case "char[]": return "List[str]";
            case "bool[]": return "List[bool]";
            case "float[]": return "List[float]";
            case "double[]": return "List[float]";
            case "long[]": return "List[int]";
            case "long long[]": return "List[int]";
            case "int[][]": return "List[List[int]]";
            default: return "unknown";
        }
    }


}