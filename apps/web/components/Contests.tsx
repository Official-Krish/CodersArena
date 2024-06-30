import { UpcomingContest, getExistingContest } from "../app/db/contest";
import { ContestCard } from "./ContestCard";

export const Contests = async () => {
    const [upcomingContests, pastContests] = await Promise.all([
        getExistingContest(),
        UpcomingContest()
    ]);
    return (
        <div className="py-12 px-10">
            <div className="font-bold text-3xl">
                Upcoming Contests
            </div>
            <div className="text-gray-500 dark:text-gray-400 py-3">
                Check out the upcoming contests on Coders Arena
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingContests.map((contest) => (
              <ContestCard
                key={contest.id}
                title={contest.title}
                id={contest.id}
                startTime={contest.startTime}
                endTime={contest.endTime}
              />
            ))}
          </div>

          <div className="font-bold text-3xl pt-6">
            Previous Contests
          </div>
            <div className="text-gray-500 dark:text-gray-400 py-3">
              Check out the previous contests on Coders Arena
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastContests.map((contest) => (
              <ContestCard
                key={contest.id}
                title={contest.title}
                id={contest.id}
                startTime={contest.startTime}
                endTime={contest.endTime}
              />
            ))}
          </div>
        </div>
    )
}