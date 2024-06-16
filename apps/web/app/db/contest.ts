import { db } from ".";

export const UpcomingContest = async () => {
    const contests = await db.contest.findMany({
        where: {
            hidden: false,
            endTime: {
                gt: new Date()
            }
        },
        orderBy: {
            startTime: 'asc'
        }
    });
    return contests;
}

export const getExistingContest = async () => {
    const contests = await db.contest.findMany({
        where: {
            hidden: false,
            endTime: {
                gt: new Date()
            }
        },
        orderBy: {
            startTime: 'asc'
        }
    });
    return contests;
} 