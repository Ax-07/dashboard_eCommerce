// @/src/mock/ticket.mock.ts

import { TicketInput } from "../lib/validators/ticket.zod";

export const mockTickets: TicketInput[] = [
  {
    id: "ticket_aaa123bbb456ccc789",
    userId: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    subject: "Problème de livraison",
    status: "open",
    createdAt: new Date("2025-05-02T11:10:00Z"),
    updatedAt: new Date("2025-05-03T08:30:00Z"),
    messages: [
      {
        from: "user",
        content: "Mon colis n'est toujours pas arrivé.",
        timestamp: new Date("2025-05-02T11:10:00Z"),
      },
      {
        from: "support",
        content: "Bonjour, nous vérifions le suivi et revenons vers vous.",
        timestamp: new Date("2025-05-02T12:00:00Z"),
      },
    ],
  },
  {
    id: "ticket_ddd987eee654fff321",
    userId: "f0e1d2c3-b4a5-6978-8a9b-0c1d2e3f4a5b",
    subject: "Demande de retour",
    status: "closed",
    createdAt: new Date("2025-05-07T09:00:00Z"),
    updatedAt: new Date("2025-05-09T10:15:00Z"),
    messages: [
      {
        from: "user",
        content: "Je souhaite retourner le baume reçu.",
        timestamp: new Date("2025-05-07T09:00:00Z"),
      },
      {
        from: "support",
        content: "Retour validé, étiquette de retour envoyée.",
        timestamp: new Date("2025-05-08T14:20:00Z"),
      },
    ],
  },
];
