import { CAL_BOOKING_URL, PHONE_NUMBER_DISPLAY } from "@/lib/constants";

export const copy = {
  brand: {
    name: "Callline",
    legalEntity: "TEKMADEV Innovations Inc.",
    location: "Hamilton, Ontario",
    serviceArea: "Available across the GTA and beyond.",
  },

  topbar: {
    pricing: "Pricing",
    tryNow: "Try now",
  },

  hero: {
    line1: "Every missed call",
    line2Pre: "is a ",
    line2Italic: "job",
    line2Post: "",
    line3: "you just lost.",
    subhead:
      "Callline is an AI receptionist that answers every call you can’t, books the job into your calendar, and texts the lead to you in under 60 seconds. Built for home service businesses across Ontario.",
    primaryCta: {
      label: `Call our AI now → ${PHONE_NUMBER_DISPLAY}`,
      hint: "Call it like a real customer would. The AI will book you a live demo at the end.",
    },
    secondaryCta: {
      label: "Or book manually",
      url: CAL_BOOKING_URL,
    },
  },

  wow: {
    phases: [
      {
        sideText: "Tuesday, 2:47 PM. You’re under a sink.",
        screen: { kind: "idle" as const },
      },
      {
        sideText: "Their water heater is leaking. They need someone tonight.",
        screen: {
          kind: "missed-call" as const,
          name: "Sarah K.",
          subtitle: "Mobile · Hamilton, ON",
          tag: "Missed call",
        },
      },
      {
        sideText: "Callline answered in 0.4 seconds.",
        screen: {
          kind: "transcript" as const,
          bubbles: [
            {
              who: "callline" as const,
              text: "Hi, I’m Callline, calling on behalf of Hamilton Home Services. I can book you for tonight at 7pm. Does that work?",
            },
            {
              who: "customer" as const,
              text: "Yes please. The leak is getting worse.",
            },
          ],
        },
      },
      {
        sideText: "Booked. Without you touching your phone.",
        screen: {
          kind: "calendar" as const,
          name: "Sarah K.",
          job: "Water heater repair",
          when: "Tonight, 7:00 PM",
          status: "Confirmed",
        },
      },
      {
        sideText: "While you finish the job in front of you.",
        screen: {
          kind: "stack" as const,
          items: [
            { name: "Sarah K.", job: "Water heater repair", when: "Tonight, 7:00 PM" },
            { name: "Marco D.", job: "Drain clog (kitchen)", when: "Wed, 9:30 AM" },
            { name: "Priya R.", job: "Furnace tune-up", when: "Thu, 1:00 PM" },
          ],
        },
      },
    ],
  },

  numbers: {
    intro: "The math nobody runs.",
    stats: [
      {
        value: 27,
        format: "percent" as const,
        label:
          "of inbound calls go unanswered at the average home service business.",
      },
      {
        value: 85,
        format: "percent" as const,
        label:
          "of callers who don’t reach you never call back. They call the next name on the list.",
      },
      {
        value: 126000,
        format: "dollar" as const,
        label:
          "is what the average small business loses per year to unanswered calls.",
      },
      {
        value: 0.4,
        format: "seconds" as const,
        label: "is Callline’s average answer time. About a quarter of a ring.",
      },
    ],
  },

  howItWorks: {
    heading: "How a missed call becomes a booked job.",
    steps: [
      {
        kicker: "01 / The call comes in",
        title: "You don’t pick up after 2 rings. Callline does.",
        body: "It already knows your services, your hours, your pricing, and which questions to ask. Your customer never hears a voicemail beep.",
      },
      {
        kicker: "02 / Callline books the job",
        title: "It checks your calendar in real time.",
        body: "Real slots, your address, your service area. It confirms the booking, repeats the time back, and texts the customer a confirmation before hanging up.",
      },
      {
        kicker: "03 / You get the lead",
        title: "An SMS lands on your phone the moment the call ends.",
        body: "Full transcript. Customer details. The job, the address, the time. You finish what you’re doing and walk into the next one already booked.",
      },
    ],
  },

  liveCta: {
    heading: "Don’t read about it. Call it.",
    body: "Callline is on the line right now. Call from your own phone, pretend to be a homeowner with a leaking pipe. The AI will qualify you, book you, and text you a confirmation within 60 seconds.",
    button: `Call ${PHONE_NUMBER_DISPLAY} →`,
    note: "Available 24/7. This is the actual product.",
  },

  pricing: {
    intro: "Three ways in. Same outcome. Pick what feels right.",
    plans: [
      {
        id: "guarantee",
        name: "The guarantee",
        price: "$1,997",
        priceSuffix: "setup",
        recurring: "$497 / month",
        body: "Pay once to set it up. We learn your business, your services, your hours, your scripts. If you don’t book at least 5 jobs through Callline in your first 30 days, the next month is on us.",
        cta: "Start with this →",
        plan: "guarantee",
      },
      {
        id: "open",
        name: "Month to month",
        price: "$0",
        priceSuffix: "setup",
        recurring: "$797 / month",
        body: "No setup fee. No commitment. Cancel any time, no clawbacks. The simplest way to keep a 24/7 receptionist on staff without the staff.",
        cta: "Start with this →",
        plan: "open",
      },
      {
        id: "pilot",
        name: "Free 14-day pilot",
        price: "Free",
        priceSuffix: "for 14 days",
        recurring: "Then $597 / month",
        body: "Run Callline live on your business line for two weeks. If it earns its keep, you keep it. If it doesn’t, walk away and owe nothing.",
        cta: "Start with this →",
        plan: "pilot",
      },
    ],
  },

  faq: {
    heading: "Questions, answered.",
    items: [
      {
        q: "How is this different from voicemail?",
        a: "Voicemail catches the call and loses the lead. Callline answers the call, qualifies the customer, books the job into your calendar, and texts you the details. The customer hears a calm professional voice, not a beep.",
      },
      {
        q: "Does it sound like a robot?",
        a: "No. It uses a natural voice with normal pacing and natural pauses. Most callers don’t realize they’re speaking to AI. The few who do tend to compliment how well it handled the call.",
      },
      {
        q: "What if the customer wants a real person?",
        a: "If a caller asks for a human, Callline can warm-transfer to your phone, or take a detailed message and text it to you with priority flagged. You set the rule.",
      },
      {
        q: "What if I already have a receptionist?",
        a: "Callline runs alongside them. It picks up after hours, on weekends, and when your line is busy. Your receptionist keeps the calls they handle today; Callline catches the rest.",
      },
      {
        q: "How does it know my services?",
        a: "We onboard your business in about an hour. Services, pricing bands, hours, service area, the questions you always ask. Update any of it any time. Changes are live in minutes.",
      },
      {
        q: "What if I miss the SMS?",
        a: "The booking is already in your calendar. The SMS is for awareness, not action. You can also have a daily summary, a Slack webhook, or an email digest. Whatever fits your workflow.",
      },
      {
        q: "Can I review the calls?",
        a: "Yes. Every call is recorded, transcribed, and searchable. You can rate calls, flag bad answers, and Callline gets sharper week over week.",
      },
      {
        q: "What if it books a time I’m not available?",
        a: "It can’t. Callline reads your live calendar and only offers slots you have open. Block a window in your calendar and Callline stops offering it instantly.",
      },
    ],
  },

  footer: {
    wordmark: "Callline",
    legal: "A product of TEKMADEV Innovations Inc.",
    year: "© 2026",
    location: "Built in Hamilton, Ontario. Available across the GTA and beyond.",
    contactEmail: "hello@callline.ai",
    credit: "Designed, engineered, and maintained by TEKMADEV.",
  },
} as const;

export type Copy = typeof copy;
