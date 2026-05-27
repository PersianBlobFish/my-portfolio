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

const fallbackImageUrls = [
  "https://xssymohznqhhhkbwtomu.supabase.co/storage/v1/object/sign/image/project/project-1.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMGFhMmVhMi04YjdkLTQyMDktYTZlYS1iOWE1YzE2OTQyY2UiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZS9wcm9qZWN0L3Byb2plY3QtMS53ZWJwIiwiaWF0IjoxNzczNDAyMzkzLCJleHAiOjE4MDQ5MzgzOTN9.v2HJjUwxpZvFPz451K3Zl_EU7ZZB0hPfebwlHTPmII8",
  "https://xssymohznqhhhkbwtomu.supabase.co/storage/v1/object/sign/image/project/project-2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMGFhMmVhMi04YjdkLTQyMDktYTZlYS1iOWE1YzE2OTQyY2UiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZS9wcm9qZWN0L3Byb2plY3QtMi53ZWJwIiwiaWF0IjoxNzc1NDk4NzE5LCJleHAiOjIxNTM5MzA3MTl9.KNtyDckupEoz0hlyfw91oz2NgWdH2bhd4heOodtwwuE",
  "https://xssymohznqhhhkbwtomu.supabase.co/storage/v1/object/sign/image/project/project-3.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMGFhMmVhMi04YjdkLTQyMDktYTZlYS1iOWE1YzE2OTQyY2UiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZS9wcm9qZWN0L3Byb2plY3QtMy53ZWJwIiwiaWF0IjoxNzc5OTA5MDUyLCJleHAiOjE4MTE0NDUwNTJ9.gZoG4q99zow-Etk6tTdRLAal8hkwwXR9Xphd1yaiQNk",
  "https://xssymohznqhhhkbwtomu.supabase.co/storage/v1/object/sign/image/project/project-2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMGFhMmVhMi04YjdkLTQyMDktYTZlYS1iOWE1YzE2OTQyY2UiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZS9wcm9qZWN0L3Byb2plY3QtMi53ZWJwIiwiaWF0IjoxNzczNDAyNDAyLCJleHAiOjE4MDQ5Mzg0MDJ9.y5GuiZq3S6B0RZKMYBOJCnANMEsBnALrz5Xvcr3pZYo",
];

const fallbackProjectUrls = [
  "https://example.com/project-1",
  "https://example.com/project-2",
  "https://chromewebstore.google.com/detail/wow-extension/okdaiedanminfdpekdmoegkenfegpbam",
  null,
  null,
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

const fallbackProjects: PortfolioProject[] = Array.from(
  { length: 3 },
  (_, index) => {
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
  },
);

type SupabaseProjectRow = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  project_url: string | null;
};

export async function getPortfolioProjects() {
  if (!hasSupabaseEnv()) {
    return fallbackProjects;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("id, title, description, image_url, project_url")
      .order("display_order", { ascending: true })
      .limit(8);

    if (error || !data?.length) {
      return fallbackProjects;
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
    return fallbackProjects;
  }
}
