// app/api/delete-image/route.ts
import { NextResponse } from "next/server";
import { del } from "@vercel/blob";

export async function DELETE (request: Request) {
  try {
    const { fileUrl, projectName } = await request.json();
    if (!fileUrl || !projectName) {
      return NextResponse.json({ error: "URL de fichier ou nom de projet manquant" }, { status: 400 });
    }

    // Extraire le nom du fichier à partir de l'URL
    const filename = fileUrl.split("/").pop() || "";

    // Supprimer le fichier via Vercel Blob
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    await del(`ardeche web 07/${projectName}/${filename}`, { token });

    return NextResponse.json({ message: "Fichier supprimé avec succès" }, { status: 200 });
  } catch (error) {
    console.error("Erreur de suppression :", error);
    return NextResponse.json({ error: "Échec de la suppression" }, { status: 500 });
  }
}