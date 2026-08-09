import { z } from "zod";

const nomeSchema = z
  .string()
  .trim()
  .min(2, "Informe o nome completo.")
  .max(120, "Nome muito longo.");

const telefoneSchema = z
  .string()
  .trim()
  .min(8, "Informe um telefone válido.")
  .max(20, "Telefone muito longo.")
  .regex(/^[0-9()+\-\s]+$/, "Use apenas números e símbolos de telefone.");

export const rsvpSchema = z.object({
  name: nomeSchema,
  phone: telefoneSchema,
  attending: z.boolean(),
  companions: z.coerce.number().int().min(0).max(5),
  companionNames: z.string().trim().max(300).optional(),
  dietaryNotes: z.string().trim().max(300).optional(),
  note: z.string().trim().max(500).optional(),
  privacyConsent: z.boolean().refine((v) => v === true, {
    message: "É preciso autorizar o uso dos dados.",
  }),
});
export type RsvpInput = z.infer<typeof rsvpSchema>;

export const recadoSchema = z.object({
  name: nomeSchema,
  body: z
    .string()
    .trim()
    .min(2, "Escreva uma mensagem.")
    .max(500, "Máximo de 500 caracteres."),
});
export type RecadoInput = z.infer<typeof recadoSchema>;

export const checkoutSchema = z.object({
  giftId: z.string().uuid(),
  quantity: z.coerce.number().int().min(1).max(10),
  buyerName: nomeSchema,
  buyerEmail: z.union([z.string().trim().email(), z.literal("")]).optional(),
  message: z.string().trim().max(300).optional(),
  showName: z.boolean(),
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;
