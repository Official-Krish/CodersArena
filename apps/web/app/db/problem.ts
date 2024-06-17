import { db } from ".";

export const getProblems = async () => {
    const problems = await db.problem.findMany({
        where: {
            hidden: false
        },
    });
    return problems;
}