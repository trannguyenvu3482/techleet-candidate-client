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
    
    // Filter expired jobs matching logic in /jobs page
    const activeJobs = jobs.filter(job => {
      if (!job.applicationDeadline) return true;
      const deadline = new Date(job.applicationDeadline);
      const now = new Date();
      // Reset time to compare dates only, or allow until end of deadline day
      deadline.setHours(23, 59, 59, 999);
      return deadline >= now;
    });

    featuredJobs = activeJobs.slice(0, 3).map(job => ({
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
