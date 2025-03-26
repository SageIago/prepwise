import InterviewCard from "@/components/shared/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="font-semibold text-[28px] leading-[32px] font-mona-sans">
            Get Interview-Ready with AI-Powered Practice & Feedback.
          </h2>
          <p className="text-lg font-medium text-light-100 leading-[24px] font-mona-sans">
            Practice real interview questions & get instant feedback.
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/start-interview">Create an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="Robot-Dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2 className="font-semibold text-[28px] leading-[32px] font-mona-sans">
          Your Past Interviews
        </h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview, index) => (
            <InterviewCard
              key={`${index}~${interview.createdAt}`}
              {...interview}
            />
          ))}
          {/* <p>You haven&apos;t taken any interviews yet.</p> */}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-6">
        <h2 className="font-semibold text-[28px] leading-[32px] font-mona-sans">
          Pick Your Interview
        </h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview, index) => (
            <InterviewCard
              key={`${index}~${interview.createdAt}`}
              {...interview}
            />
          ))} 
        </div>
      </section>
    </>
  );
};

export default Page;
