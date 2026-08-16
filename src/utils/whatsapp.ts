import { SITE } from '@/constants/site';

export interface WhatsAppContactDetails {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Builds the wa.me deep link for a plain chat (no prefilled text).
 * Used by the floating WhatsApp button.
 */
export function getWhatsAppChatUrl(): string {
  return `https://wa.me/${SITE.contact.whatsapp}`;
}

/**
 * Builds the wa.me deep link prefilled with the submitted contact form
 * details, URL-encoded as required by the WhatsApp click-to-chat API.
 */
export function getWhatsAppContactUrl(details: WhatsAppContactDetails): string {
  const message = [
    'Hello JobVeda,',
    '',
    'I would like to contact you.',
    '',
    `Name: ${details.name}`,
    `Email: ${details.email}`,
    details.phone ? `Phone: ${details.phone}` : undefined,
    `Subject: ${details.subject}`,
    `Message: ${details.message}`,
  ]
    .filter((line) => line !== undefined)
    .join('\n');

  return `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
