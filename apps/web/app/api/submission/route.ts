import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";
import { db } from "../../db";
import { SubmissionInput } from "@repo/common/zod";
import { getProblem } from "../../lib/problems";
import axios from "axios";
import { LANGUAGE_MAPPING } from "@repo/common/language";

const JUDGE0_URL = process.env.JUDGE0_URL

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({
                message: "You must be logged in to view submissions",
            },
            {
                status: 401,
            }
        );
    }
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const submissionId = searchParams.get("id");
  
    if (!submissionId) {
        return NextResponse.json({
            message: "Invalid submission id",
        },
        {
            status: 400,
        });
    }
  
    var submission = await db.submission.findUnique({
        where: {
            id: submissionId,
        },
        include: {
            testcases: true,
        },
    });
  
    if (!submission) {
        return NextResponse.json(
            {
                message: "Submission not found",
            },
            {
                status: 404,
            }
        );
    }
  
  
    return NextResponse.json(
        {
            submission,
        },
        {
            status: 200,
        }
    );
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({
                message: "You must be logged in to submit a problem",
            },
            {
                status: 401,
            }
        );
    }
    const userId = session.user.id;
    // add rate limiting

    const submissionInput = SubmissionInput.safeParse(await req.json());
    if (!submissionInput.success) {
        return NextResponse.json({
            message: "Invalid submission input",
        },
        {
            status: 400,
        });
    }

    let formData = new FormData();
    formData.append("response", submissionInput.data.token);

    const dbProblem = await db.problem.findUnique({
        where: {
            id: submissionInput.data.problemId,
        },
    });

    if (!dbProblem) {
        return NextResponse.json({
            message: "Problem not found",
        },
        {
            status: 404,
        });
    }

    const problem = await getProblem(
        dbProblem.slug,
        submissionInput.data.languageId
    )
    problem.fullBoilerplateCode = problem.fullBoilerplateCode.replace(
        "##USER_CODE_HERE##",
        submissionInput.data.code
    );

    const response = await axios.post(
        `${JUDGE0_URL}/submissions/batch?base64_encoded=false`,
        {
          submissions: problem.inputs.map((input, index) => ({
            language_id: LANGUAGE_MAPPING[submissionInput.data.languageId]?.judge0,
            source_code: problem.fullBoilerplateCode.replace(
              "##INPUT_FILE_INDEX##",
              index.toString()
            ),
            expected_output: problem.outputs[index],
          })),
        }
      );

    const submission = await db.submission.create({
        data: {
            userId: session.user.id,
            problemId: dbProblem.id,
            code : submissionInput.data.code,
            activeContestId: submissionInput.data.activeContestId,
            testcases:{
                connect: response.data,
            },
        },
        include: {
            testcases: true,
        }
    })

    return NextResponse.json({
        message : "Submission made",
        id : submission.id,
    },
    {
        status: 200,
    });
}