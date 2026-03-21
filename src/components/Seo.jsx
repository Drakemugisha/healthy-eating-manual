import { useEffect } from "react";
import logoImage from "../assets/4E270FD6-30E8-4EE3-AE2B-B89C2AEA0665.png";

const DEFAULT_TITLE = "The Healthy Eating Manual";
const DEFAULT_DESCRIPTION =
  "Build practical eating habits with simple nutrition guidance, tools, and resources from The Healthy Eating Manual.";
const DEFAULT_SITE_URL = "https://healthyeatingmanual.site";

function normalizeUrl(url) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${DEFAULT_SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

function upsertMeta(selector, attrs) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    document.head.appendChild(tag);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    tag.setAttribute(key, value);
  });
}

function upsertLink(selector, attrs) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("link");
    document.head.appendChild(tag);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    tag.setAttribute(key, value);
  });
}

export default function Seo({ title, description, image, url }) {
  useEffect(() => {
    const finalTitle = title || DEFAULT_TITLE;
    const finalDescription = description || DEFAULT_DESCRIPTION;
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "/";
    const finalUrl = normalizeUrl(url || currentPath);
    const finalImage = normalizeUrl(image || logoImage);

    document.title = finalTitle;
    upsertMeta('meta[name="description"]', {
      name: "description",
      content: finalDescription,
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: finalTitle,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: finalDescription,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: finalImage,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: finalUrl,
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });

    upsertLink('link[rel="icon"]', {
      rel: "icon",
      type: "image/png",
      href: finalImage,
    });
    upsertLink('link[rel="canonical"]', {
      rel: "canonical",
      href: finalUrl,
    });
  }, [title, description, image, url]);

  return null;
}
