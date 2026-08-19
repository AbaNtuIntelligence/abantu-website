import { apiFetch } from "./api";

export async function getArticles(params = "") {
  return apiFetch(`/blog/${params ? `?${params}` : ""}`);
}

export async function getArticle(slug) {
  return apiFetch(`/blog/${encodeURIComponent(slug)}/`);
}