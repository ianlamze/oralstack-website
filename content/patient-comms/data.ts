import type { Template, Thread } from "./types";

// 4 sample WhatsApp threads. Hafiz (the demo target) sits at the top —
// most recent + unread, with an unanswered "can we move it?" message.

export const initialThreads: Thread[] = [
  {
    id: "th1",
    patientName: "Demo patient 101",
    patientPhone: "+65 9XXX XXXX",
    procedure: "Hygiene · recall",
    unread: true,
    lastTime: "14:08",
    messages: [
      {
        id: "m1",
        from: "clinic",
        body: "Hi Demo patient 101, your six-month hygiene visit is due this week. We have a slot Wed 27 Apr at 11:00 — shall I confirm? — Sample Dental Clinic",
        time: "09:30",
        fromTemplate: "recall_hygiene_due",
      },
      {
        id: "m2",
        from: "patient",
        body: "Hi! Can we move it to 3pm instead? Coming from work",
        time: "14:08",
      },
    ],
  },
  {
    id: "th2",
    patientName: "Demo patient 102",
    patientPhone: "+65 9XXX XXXX",
    procedure: "Polish & scale",
    unread: false,
    lastTime: "11:42",
    messages: [
      {
        id: "m1",
        from: "clinic",
        body: "Hi Demo patient 102, confirming your polish & scale on Mon 28 Apr at 10:00 with Provider A. Reply YES to confirm. — Sample Dental Clinic",
        time: "11:30",
        fromTemplate: "confirm_appointment",
      },
      { id: "m2", from: "patient", body: "Yes, see you Monday!", time: "11:42" },
    ],
  },
  {
    id: "th3",
    patientName: "Demo patient 103",
    patientPhone: "+65 9XXX XXXX",
    procedure: "RCT · post-op",
    unread: false,
    lastTime: "Yesterday",
    messages: [
      {
        id: "m1",
        from: "clinic",
        body: "Hi Demo patient 103, hope you're doing well after your RCT yesterday. Mild discomfort for 24-48h is normal. Avoid hard food on tooth 36 until your crown visit. Pain >7/10 or swelling — reply here. — Sample Dental Clinic",
        time: "Yesterday",
        fromTemplate: "post_op_care",
      },
      {
        id: "m2",
        from: "patient",
        body: "Thanks doc, all good. See you for the crown next week.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "th4",
    patientName: "Demo patient 107",
    patientPhone: "+65 9XXX XXXX",
    procedure: "Implant follow-up",
    unread: false,
    lastTime: "2 days ago",
    messages: [
      {
        id: "m1",
        from: "clinic",
        body: "Hi Demo patient 107, your implant 3-month review is due. Shall I book Tue 6 May at 14:00 with Provider B? — Sample Dental Clinic",
        time: "2 days ago",
        fromTemplate: "implant_review",
      },
      {
        id: "m2",
        from: "patient",
        body: "Yes please, that works. Thanks!",
        time: "2 days ago",
      },
      {
        id: "m3",
        from: "clinic",
        body: "Confirmed for Tue 6 May at 14:00. We'll send a reminder the day before. — Sample Dental Clinic",
        time: "2 days ago",
        fromTemplate: "confirm_appointment",
      },
    ],
  },
];

export const templates: Template[] = [
  {
    id: "confirm_appointment",
    label: "Confirm appointment",
    body: "Hi {name}, confirming your {procedure} on {date} at {time} with {provider}. Reply YES to confirm. — Sample Dental Clinic",
    hasDatePlaceholder: true,
  },
  {
    id: "offer_reschedule",
    label: "Offer reschedule slots",
    body: "Hi {name}, no problem — here are 3 slots that match: Wed 27 Apr 15:00 · Thu 28 Apr 14:30 · Fri 29 Apr 16:00. Reply with the one that works. — Sample Dental Clinic",
  },
  {
    id: "recall_hygiene_due",
    label: "Recall — hygiene due",
    body: "Hi {name}, your six-month hygiene visit is due this week. Shall we book {procedure} with {provider}? — Sample Dental Clinic",
  },
  {
    id: "post_op_care",
    label: "Post-op care reminder",
    body: "Hi {name}, hope you're recovering well after {procedure}. Mild discomfort for 24-48h is normal. Pain >7/10 or swelling — reply here. — Sample Dental Clinic",
  },
  {
    id: "thank_you_visit",
    label: "Thank you for your visit",
    body: "Hi {name}, thanks for visiting today. If you have a moment, a Google review really helps a small Singapore clinic like ours: example.invalid/review — Sample Dental Clinic",
  },
];
