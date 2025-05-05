// app/api/upload-image/route.ts
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    // Récupérer les données du formulaire (FormData)
    const formData = await request.formData();
    const file = formData.get("file");
    const projectName = formData.get("projectName");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Fichier non fourni" }, { status: 400 });
    }

    // Créer un nom de fichier unique
    const folderPath = `ardeche web 07/${projectName}`;
    const filename = `${folderPath}/${Date.now()}-${(file as File).name}`;
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    // Upload du fichier via Vercel Blob
    const result = await put(filename, file, { access: "public", token });

    // Retourner l'URL publique du fichier uploadé
    return NextResponse.json({ url: result.url }, { status: 200 });
  } catch (error) {
    console.error("Erreur d'upload :", error);
    return NextResponse.json({ error: "Échec de l'upload" }, { status: 500 });
  }
}
