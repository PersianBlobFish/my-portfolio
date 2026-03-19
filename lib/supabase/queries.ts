import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string | null;
};

const fallbackImageUrls = [
  "https://xssymohznqhhhkbwtomu.supabase.co/storage/v1/object/sign/image/project/project-1.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMGFhMmVhMi04YjdkLTQyMDktYTZlYS1iOWE1YzE2OTQyY2UiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZS9wcm9qZWN0L3Byb2plY3QtMS53ZWJwIiwiaWF0IjoxNzczNDAyMzkzLCJleHAiOjE4MDQ5MzgzOTN9.v2HJjUwxpZvFPz451K3Zl_EU7ZZB0hPfebwlHTPmII8",
  "https://xssymohznqhhhkbwtomu.supabase.co/storage/v1/object/sign/image/project/project-2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMGFhMmVhMi04YjdkLTQyMDktYTZlYS1iOWE1YzE2OTQyY2UiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZS9wcm9qZWN0L3Byb2plY3QtMi53ZWJwIiwiaWF0IjoxNzczNDAyNDAyLCJleHAiOjE4MDQ5Mzg0MDJ9.y5GuiZq3S6B0RZKMYBOJCnANMEsBnALrz5Xvcr3pZYo",
];

const fallbackProjectUrls = [
  "https://example.com/project-1",
  "https://example.com/project-2",
  "https://example.com/project-3",
  null,
  null,
];

const fallbackProjects: PortfolioProject[] = Array.from(
  { length: 5 },
  (_, index) => ({
    id: `fallback-${index + 1}`,
    title: `Featured Project ${index + 1}`,
    description:
      "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: fallbackImageUrls[index] ?? "/placeholder.jpg",
    href: fallbackProjectUrls[index] ?? null,
  }),
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

    return (data as SupabaseProjectRow[]).map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description ?? "No description provided yet.",
      imageUrl: project.image_url || "/placeholder.jpg",
      href: project.project_url,
    }));
  } catch {
    return fallbackProjects;
  }
}
