import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
  } from "@repo/ui/card";
  import { PrimaryButton } from "./LinkButton";
  
  interface ProblemCardParams {
    title: string;
    id: string;
    difficulty: string;
    submissions: number;
  }
  
  export function ProblemCard({
    title,
    id,
    difficulty,
    submissions,
  }: ProblemCardParams) {
  
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div >
                <div className="text-gray-500 dark:text-gray-400">
                    Difficulty
                </div>
                <p>{difficulty}</p>
            </div>
            <div>
                <div className="text-gray-500 dark:text-gray-400">
                    Submissions
                </div>
                <p>{submissions}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <PrimaryButton href={`/problem/${id}`}>
            View Problem
          </PrimaryButton>
        </CardFooter>
      </Card>
    );
  }