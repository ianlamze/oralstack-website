export type MessageSender = "clinic" | "patient";

export type Message = {
  id: string;
  from: MessageSender;
  body: string;
  time: string; // HH:MM
  /** Templated messages flag — clinic-side only. Audit trail context. */
  fromTemplate?: string;
};

export type Thread = {
  id: string;
  patientName: string;
  patientPhone: string;
  procedure: string;
  unread?: boolean;
  lastTime: string;
  messages: Message[];
};

export type Template = {
  id: string;
  label: string;
  body: string;
  /** When picked, the date placeholder fills with a synthetic date. */
  hasDatePlaceholder?: boolean;
};
