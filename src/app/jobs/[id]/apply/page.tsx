import { mockApi, mockDepartments, mockHeadquarters } from "@/data/mock-jobs";
import type { JobPosting } from "@/lib/api";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JobApplicationForm } from "./job-application-form";

interface JobApplicationPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: JobApplicationPageProps): Promise<Metadata> {
  const slug = params.id;

  try {
    const job = await mockApi.getJobPostingBySlug(slug);

    if (!job) {
      return {
        title: "Job Application | TechLeet Careers",
        description: "Apply for a position at TechLeet.",
      };
    }

    const locationName = mockHeadquarters.find(h => h.headquarterId === job.headquarterId)?.city || "Hồ Chí Minh";

    return {
      title: `Apply for ${job.title} | TechLeet Careers`,
      description: `Apply for the ${job.title} position at TechLeet in ${locationName}. Join our team and build the future of technology.`,
      keywords: [
        "apply",
        job.title,
        "TechLeet",
        "careers",
        "job application",
        locationName,
        "employment",
      ],
      openGraph: {
        title: `Apply for ${job.title} | TechLeet Careers`,
        description: `Apply for the ${job.title} position at TechLeet in ${locationName}. Join our team and build the future of technology.`,
        type: "website",
      },
    };
  } catch (error) {
    return {
      title: "Job Application | TechLeet Careers",
      description: "Apply for a position at TechLeet.",
    };
  }
}

export default async function JobApplicationPage({ params }: JobApplicationPageProps) {
  const slug = params.id;

  let job: JobPosting | null = null;

  try {
    job = await mockApi.getJobPostingBySlug(slug);

    if (!job) {
      notFound();
    }
  } catch (err) {
    console.error('Error fetching job:', err);
    notFound();
  }

  return <JobApplicationForm job={job} />;
}
