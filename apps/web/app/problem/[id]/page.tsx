
import { ProblemStatement } from "../../../components/ProblemStatement";
import { getProblem } from "../../db/problem";

export default async function ProblemPage({
    params: { problemId },
  }: {
    params: {
      problemId: string;
    };
  }) {
    const problem = await getProblem(problemId);
    if (!problem) {
      return <div>Problem not found</div>;
    }
    return (
        <div className="flex flex-col min-h-screen">
        <main className="flex-1 py-8 md:py-12 grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="prose prose-stone">
                    <ProblemStatement description={problem.description} />
                </div>
                
            </div>
        </main>
      </div>
    )
  }