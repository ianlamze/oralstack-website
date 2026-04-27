type Workflow = {
  slug: string;
  eyebrow: string;
  title: string;
};

export const workflows: Workflow[] = [
  {
    slug: "front-desk",
    eyebrow: "Front desk",
    title: "Schedule that responds in three seconds.",
  },
  {
    slug: "billing",
    eyebrow: "Billing & discharge",
    title: "The bill is ready before the patient stands up.",
  },
  {
    slug: "charting",
    eyebrow: "Charting & case notes",
    title: "Chart the tooth, not the form.",
  },
  {
    slug: "imaging",
    eyebrow: "Clinical imaging",
    title: "DICOM in the chart, sensor in the room.",
  },
];
