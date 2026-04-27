export type ShowcaseSlide = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
};

export const showcaseSlides: ShowcaseSlide[] = [
  {
    id: "recall",
    eyebrow: "Recall queue",
    title: "Recall stops slipping through the cracks.",
    body: "Patients due for a visit surface three weeks before due, sorted by recall age. One click sends a templated WhatsApp; the row updates the moment they reply.",
  },
  {
    id: "messaging",
    eyebrow: "Patient messaging",
    title: "WhatsApp Business, attached to the patient.",
    body: "Templated outreach, reply-aware threads, and every message saved against the patient record. No personal phones, no copy-paste from sticky notes.",
  },
  {
    id: "imaging",
    eyebrow: "Clinical imaging",
    title: "DICOM sits inside the chart.",
    body: "Bitewing, periapical, panoramic — open the image without leaving the patient. Pan, zoom, measure between contact points; annotations save back to the visit.",
  },
  {
    id: "analytics",
    eyebrow: "Operations",
    title: "Chair-by-chair utilisation, week-on-week.",
    body: "See where the day actually went: which chair sat empty, which provider ran late, which day of the week is worth opening earlier.",
  },
];
