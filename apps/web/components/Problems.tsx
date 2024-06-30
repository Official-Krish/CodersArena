import { getProblems } from "../app/db/problem";
import { ProblemCard } from "./ProblemCard";

export const Problems = async () => {
    const getProblem = await getProblems();
    return (
        <div className="py-4 px-10 mb-8">
            <div className="font-bold text-3xl">
                Popular Problems
            </div>
            <div className="text-gray-500 dark:text-gray-400 py-3">
                Check out the most popular programming problems on Coders Arena.
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getProblem.map((problem) => (
              <ProblemCard
              id={problem.id}
              title={problem.title}
              difficulty={problem.difficulty}
              submissions={problem.solved}
              />
            ))}
          </div>
        </div>
    )
}