import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string | null;
};

type ProjectContentOverride = {
  title?: string;
  description?: string;
};

// Fallback images live in /public so no storage tokens end up in the repo.
const fallbackImageUrls = [
  "/project-1.webp",
  "/placeholder.jpg",
  "/project-3.webp",
];

const fallbackProjectUrls = [
  "https://example.com/project-1",
  "https://example.com/project-2",
  "https://chromewebstore.google.com/detail/wow-extension/okdaiedanminfdpekdmoegkenfegpbam",
];

function getProjectContentOverride(index: number): ProjectContentOverride {
  const projectNumber = index + 1;
  const title = process.env[`PROJECT_CARD_${projectNumber}_TITLE`]?.trim();
  const description =
    process.env[`PROJECT_CARD_${projectNumber}_DESCRIPTION`]?.trim();

  return {
    title: title || undefined,
    description: description || undefined,
  };
}

// Built per call (not at module load) so PROJECT_CARD_* env changes apply
// without a server restart.
function getFallbackProjects(): PortfolioProject[] {
  return Array.from({ length: 3 }, (_, index) => {
    const contentOverride = getProjectContentOverride(index);

    return {
      id: `fallback-${index + 1}`,
      title: contentOverride.title ?? `Featured Project ${index + 1}`,
      description:
        contentOverride.description ??
        "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: fallbackImageUrls[index] ?? "/placeholder.jpg",
      href: fallbackProjectUrls[index] ?? null,
    };
  });
}

type SupabaseProjectRow = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  project_url: string | null;
};

export async function getPortfolioProjects() {
  if (!hasSupabaseEnv()) {
    return getFallbackProjects();
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("id, title, description, image_url, project_url")
      .order("display_order", { ascending: true })
      .limit(8);

    if (error || !data?.length) {
      return getFallbackProjects();
    }

    return (data as SupabaseProjectRow[]).map((project, index) => {
      const contentOverride = getProjectContentOverride(index);

      return {
        id: project.id,
        title: contentOverride.title ?? project.title,
        description:
          contentOverride.description ??
          project.description ??
          "No description provided yet.",
        imageUrl: project.image_url || "/placeholder.jpg",
        href: project.project_url,
      };
    });
  } catch {
    return getFallbackProjects();
  }
}
