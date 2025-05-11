/**
 * 
 * @param resetUrl 
 * @returns Un objet contenant le sujet et le contenu HTML de l'email de réinitialisation de mot de passe
 * @example 
 * const { subject, html } = resetPasswordTemplate("https://example.com/reset-password?token=123456")
 */
export const resetPasswordTemplate = (resetUrl: string) => {
  const subject = "Réinitialisation de votre mot de passe";
  const html = `    
      <p>Bonjour,</p>
      <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur ce lien pour créer un nouveau mot de passe :</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
      <p>Ce lien expirera dans 1 heure.</p>
      return () 
      `;
  return { subject, html };
};

export const contactTemplate = (values: {
  firstname: string;
  lastname: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const subject = `Nouveau message de ${values.firstname} ${values.lastname}`;
  const html = `
        <p>Nouveau message de ${values.firstname} ${values.lastname} (${values.email})</p>
        <p><strong>Sujet :</strong> ${values.subject}</p>
        <p><strong>Message :</strong></p>
        <p>${values.message}</p>
    `;
  return { subject, html };
};
