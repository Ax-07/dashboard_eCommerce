// @/src/lib/database/vercel-blob/vercel-blob.action.ts

/**
 * Uploader une image vers un service de stockage (ex: Vercel Blob).
 * @param files Les fichiers image à uploader.
 * @returns Les URLs publique des image uploadées.
 */
export async function uploadImageAction(
  files: File[] | FileList | null,
  projectName: string
): Promise<string[]> {
  console.log("uploadImageAction", files, projectName);
  try {
    let picturesUrls: string[] = [];
    if (files && files.length > 0) {
      picturesUrls = await Promise.all(
        Array.from(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("projectName", projectName);

          const response = await fetch("/api/upload-image", {
            method: "POST",
            body: data,
          });
          const result = await response.json();
          if (!response.ok) {
            throw new Error(
              result.message || "Erreur lors de l'upload de l'image"
            );
          }
          return result.url;
        })
      );
    }
    return picturesUrls;
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image:", error);
    throw error;
  }
}

export async function deleteImageAction(
  fileUrl: string,
  projectName: string
): Promise<void> {
  try {
    // Déterminez l'URL de base de l'application depuis une variable d'environnement ou un fallback.
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/delete-image`;

    const response = await fetch(apiUrl, {
      method: "DELETE",
      body: JSON.stringify({ fileUrl, projectName }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'image");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image:", error);
    throw error;
  }
}