import  fs  from "fs";
import path, { parse } from "path";
import { ProblemDefinitionParser } from "./ProblemDefinitionParser";
import { FullProblemDefinitionParser } from "./FullProblemDefinitionParser";

function generatePartialBoilerPlate(generatorFilePath : string){
    const inputFilePath = path.join(__dirname, generatorFilePath, "Structure.md");
    const boilerplatePath = path.join(__dirname, generatorFilePath, "boilerplate");

    const input = fs.readFileSync(inputFilePath, "utf-8");

    const parser = new ProblemDefinitionParser();
    parser.parse(input);

    const cppCode = parser.generateCpp();
    const jsCode = parser.generateJs();
    const pythonCode = parser.generatePython();
    const rustCode = parser.generateRust();

    if (!fs.existsSync(boilerplatePath)){
        fs.mkdirSync(boilerplatePath, { recursive: true });
    }

    fs.writeFileSync(path.join(boilerplatePath, "function.cpp"), cppCode);
    fs.writeFileSync(path.join(boilerplatePath, "function.js"), jsCode);
    fs.writeFileSync(path.join(boilerplatePath, "function.py"), pythonCode);
    fs.writeFileSync(path.join(boilerplatePath, "function.rs"), rustCode);

    console.log("Boilerplate generated successfully");
}

function generateFullBoilerPlate(generatorFilePath : string){
    const inputFilePath = path.join(__dirname, generatorFilePath, "Structure.md");
    const boilerplatePath = path.join(__dirname, generatorFilePath, "boilerplate-full");

    const input = fs.readFileSync(inputFilePath, "utf-8");

    const parser = new FullProblemDefinitionParser();
    parser.parse(input);

    const cppCode = parser.generateCpp();
    const jsCode = parser.generateJs();
    const pythonCode = parser.generatePython();
    const rustCode = parser.generateRust();

    if (!fs.existsSync(boilerplatePath)){
        fs.mkdirSync(boilerplatePath, { recursive: true });
    }

    fs.writeFileSync(path.join(boilerplatePath, "function.cpp"), cppCode);
    fs.writeFileSync(path.join(boilerplatePath, "function.js"), jsCode);
    fs.writeFileSync(path.join(boilerplatePath, "function.py"), pythonCode);
    fs.writeFileSync(path.join(boilerplatePath, "function.rs"), rustCode);

    console.log("Full Boilerplate Code generated successfully");
}

generatePartialBoilerPlate(process.env.GENERATOR_FILE_PATH ?? "");
generateFullBoilerPlate(process.env.GENERATOR_FILE_PATH ?? "");