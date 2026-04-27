/**
 * Single source of truth for contact channels — used by /contact, the article
 * sticky bar, the footer, and anywhere else that needs to point users at an
 * email, WhatsApp, or phone number.
 *
 * Update the WhatsApp number here once a dedicated business line is set up.
 */
export const contactChannels = {
  whatsappNumber: "6597217472", // E.164 without leading +
  whatsappDisplay: "+65 9721 7472",
  email: "hello@oralstack.com",
} as const;

export function whatsappLink(prefilledMessage = "Hi, I'd like to learn more about Oralstack."): string {
  const text = encodeURIComponent(prefilledMessage);
  return `https://wa.me/${contactChannels.whatsappNumber}?text=${text}`;
}

export function mailtoLink(subject = "Oralstack enquiry", body = ""): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  return `mailto:${contactChannels.email}?${params.toString()}`;
}
