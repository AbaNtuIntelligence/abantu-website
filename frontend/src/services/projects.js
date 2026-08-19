import { apiFetch } from "./api";

export async function getProjects(params = "") {
  return apiFetch(`/projects/${params ? `?${params}` : ""}`);
}

export async function getProject(slug) {
  return apiFetch(`/projects/${encodeURIComponent(slug)}/`);
}