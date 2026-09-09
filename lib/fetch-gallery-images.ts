import fs from "fs"
import path from "path"

const IMAGE_EXTENSIONS = new Set([".webp", ".jpg", ".jpeg", ".png", ".gif"])

/** Encode each path segment so spaces/parentheses work in production URLs. */
export function encodePublicImagePath(src: string): string {
  return (
    "/" +
    src
      .split("/")
      .filter(Boolean)
      .map(encodeURIComponent)
      .join("/")
  )
}

function naturalSort(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
}

function readImagesFromPublicDir(relativeDir: string): string[] {
  const dir = path.join(process.cwd(), "public", relativeDir)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort(naturalSort)
    .map((file) => `/${relativeDir}/${file}`)
}

export type GalleryFolderImages = {
  desktop: string[]
  mobile: string[]
}

function uniquePaths(paths: string[]): string[] {
  return [...new Set(paths)]
}

/** Gallery list from public/desktop_view and public/mobile_display. */
export async function fetchGalleryImages(): Promise<GalleryFolderImages> {
  return {
    desktop: uniquePaths(
      [
        ...readImagesFromPublicDir("desktop_view"),
        ...readImagesFromPublicDir("desktop-background"),
      ].map(encodePublicImagePath),
    ),
    mobile: uniquePaths(
      [
        ...readImagesFromPublicDir("mobile_display"),
        ...readImagesFromPublicDir("mobile-background"),
      ].map(encodePublicImagePath),
    ),
  }
}
