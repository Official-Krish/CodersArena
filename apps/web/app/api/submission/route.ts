import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";
import { db } from "../../db";

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