import type { Metadata } from "next";
import { api } from "@/lib/api";
import type { JobPosting } from "@/lib/api";
import { generateJobSlug } from "@/lib/utils";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { ProcessSection } from "@/components/home/process-section";
import { BenefitsSection } from "@/components/home/benefits-section";
import { FeaturedJobsSection } from "@/components/home/featured-jobs-section";

export const metadata: Metadata = {
  title: "TechLeet - Leading Technology Company in Vietnam",
  description: "Join TechLeet and build the future of technology. We create breakthrough tech products that change how the world works.",
  keywords: ["TechLeet", "technology", "careers", "jobs", "Vietnam", "software development"],
  openGraph: {
    title: "TechLeet - Leading Technology Company in Vietnam",
    description: "Join TechLeet and build the future of technology. We create breakthrough tech products that change how the world works.",
    type: "website",
  },
};

export default async function Home() {
  // Fetch featured jobs
  let featuredJobs: JobPosting[] = [];
  try {
    const jobs = await api.getJobPostings({ 
      status: 'published', 
    });
    featuredJobs = jobs.slice(0, 3).map(job => ({
      ...job,
      slug: job.slug || generateJobSlug(job.title, job.jobPostingId)
    }));
  } catch (error) {
    console.error('Error fetching featured jobs:', error);
    // Continue with empty array if fetch fails
  }

  return (
    <div>
      <HeroSection />
      <StatsSection />
      <ProcessSection />
      <BenefitsSection />
      <FeaturedJobsSection jobs={featuredJobs} />
    </div>
  );
}
