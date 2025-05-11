import nodemailer from "nodemailer";
import { createTransporter } from "./mail.config";

/**
 * Fonction utilitaire pour envoyer un email.
 * @param email Destinataire
 * @param subject Sujet de l'email
 * @param html Contenu HTML
 */
export async function sendMail({
  email,
  subject,
  html,
  from,
}: {
  email: string;
  subject: string;
  html: string;
  from?: string;
}) {
  // Initialiser le transporter si pas déjà fait
  try {
    const transporter = createTransporter();
    console.log(transporter);

    const mailOptions = {
      from: process.env.EMAIL_USER, // Valeur par défaut
      to: email,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);

    transporter.close();
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email", error);
  }
}
