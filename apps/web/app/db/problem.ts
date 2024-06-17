import { db } from ".";

export const getProblems = async () => {
    const problems = await db.problem.findMany({
        where: {
            hidden: false
        },
    });
    return problems;
}

export const getProblem = async (ProblemId: string) => {
    const problem = await db.problem.findFirst({
        where: {
            id : ProblemId
        },
    });
    return problem;
}