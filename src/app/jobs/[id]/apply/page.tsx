import { api, ApiError } from "@/lib/api";
import type { JobPosting } from "@/lib/api";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JobApplicationForm } from "./job-application-form";
import { extractJobIdFromSlug, generateJobSlug } from "@/lib/utils";

interface JobApplicationPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: JobApplicationPageProps): Promise<Metadata> {
  const { id } = await params;
  const slug = id;

  try {
    const jobId = extractJobIdFromSlug(slug);
    if (!jobId) {
      return {
        title: "Job Application | TechLeet Careers",
        description: "Apply for a position at TechLeet.",
      };
    }

    const job = await api.getJobPosting(jobId);

    if (!job) {
      return {
        title: "Job Application | TechLeet Careers",
        description: "Apply for a position at TechLeet.",
      };
    }

    let locationName = "Hồ Chí Minh";
    try {
      const headquarters = await api.getHeadquarters().catch(() => []);
      locationName = headquarters.find((h: any) => h.headquarterId === job.headquarterId)?.city || locationName;
    } catch {
      // Use default
    }

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
    console.error('Error fetching job:', error);
    return {
      title: "Job Application | TechLeet Careers",
      description: "Apply for a position at TechLeet.",
    };
  }
}

export default async function JobApplicationPage({ params }: JobApplicationPageProps) {
  const { id } = await params;
  const slug = id;

  let job: JobPosting | null = null;

  try {
    const jobId = extractJobIdFromSlug(slug);
    if (!jobId) {
      notFound();
    }

    job = await api.getJobPosting(jobId);

    if (!job) {
      notFound();
    }

    // Ensure job has slug
    job = {
      ...job,
      slug: job.slug || generateJobSlug(job.title, job.jobPostingId)
    };
  } catch (err) {
    console.error('Error fetching job:', err);
    notFound();
  }

  return <JobApplicationForm job={job} />;
}
