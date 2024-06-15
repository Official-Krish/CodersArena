import  fs  from "fs";
import path, { parse } from "path";
import { ProblemDefinitionParser } from "./ProblemDefinitionParser";

function generatePartialBoilerPlate(generatorFilePath : string){
    const inputFilePath = path.join(__dirname, generatorFilePath, "Structure.md");
    const boilerplatePath = path.join(__dirname, generatorFilePath, "boilerplate");

    const input = fs.readFileSync(inputFilePath, "utf-8");

    const parser = new ProblemDefinitionParser();
    parser.parse(input);

    const cppCode = parser.generateCpp();
    const jsCode = parser.generateJs();
    const pythonCode = parser.generatePython();

    if (!fs.existsSync(boilerplatePath)){
        fs.mkdirSync(boilerplatePath, { recursive: true });
    }

    fs.writeFileSync(path.join(boilerplatePath, "cpp.h"), cppCode);
    fs.writeFileSync(path.join(boilerplatePath, "js.js"), jsCode);
    fs.writeFileSync(path.join(boilerplatePath, "python.py"), pythonCode);

    console.log("Boilerplate generated successfully");
}

generatePartialBoilerPlate(process.env.GENERATOR_FILE_PATH ?? "");