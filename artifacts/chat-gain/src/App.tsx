import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  MessageSquare,
  Moon,
  Sun,
  X,
} from "lucide-react";
import {
  formatUsdEquivalent,
  USD_RATE_NOTE,
  type CurrencyAmount,
} from "./lib/currency";
import solarPumpImage from "./assets/investments/solar-water-pump.jpeg";
import pressureWasherImage from "./assets/investments/pressure-washer.jpeg";
import powerStationImage from "./assets/investments/power-station.jpeg";
import solarKitImage from "./assets/investments/solar-home-kit.jpeg";

type Person = {
  id: number;
  name: string;
  age: number;
  country: string;
  flag: string;
  photo?: string;
  greeting: string;
};

type ChatPresence = "looking" | "typing" | "message";

type InvestmentPlan = {
  id: number;
  name: string;
  image: string;
  deposit: CurrencyAmount;
  dailyProfit: CurrencyAmount;
  totalDays: string;
  totalProfit: CurrencyAmount;
};

const people: Person[] = [
  {
    id: 1,
    name: "Alira Kone",
    age: 34,
    country: "SENEGAL",
    flag: "🇸🇳",
    photo: "/profiles/alira-kone.jpg",
    greeting: "Hey there! 👋",
  },
  {
    id: 2,
    name: "Tavian Marek",
    age: 41,
    country: "CROATIA",
    flag: "🇭🇷",
    photo: "/profiles/tavian-marek.jpg",
    greeting: "Bok! 😊",
  },
  {
    id: 3,
    name: "Sora Min",
    age: 30,
    country: "JAPAN",
    flag: "🇯🇵",
    photo: "/profiles/sora-min.jpg",
    greeting: "Hello! ✨",
  },
  {
    id: 4,
    name: "Devin Adebayo",
    age: 38,
    country: "NIGERIA",
    flag: "🇳🇬",
    photo: "/profiles/devin-adebayo.jpg",
    greeting: "How far? 😄",
  },
  {
    id: 5,
    name: "Maelle Rovira",
    age: 36,
    country: "SPAIN",
    flag: "🇪🇸",
    photo: "/profiles/maelle-rovira.jpg",
    greeting: "Hola, friend! 🌞",
  },
  {
    id: 6,
    name: "Oren Kimani",
    age: 43,
    country: "TANZANIA",
    flag: "🇹🇿",
    photo: "/profiles/oren-kimani.jpg",
    greeting: "Karibu! 🌍",
  },
  {
    id: 7,
    name: "Amara Idrissi",
    age: 32,
    country: "MOROCCO",
    flag: "🇲🇦",
    photo: "/profiles/amara-idrissi.jpg",
    greeting: "Salam! 💬",
  },
  {
    id: 8,
    name: "Enzo Mabaso",
    age: 39,
    country: "SOUTH AFRICA",
    flag: "🇿🇦",
    photo: "/profiles/enzo-mabaso.jpg",
    greeting: "Howzit! 👋",
  },
  {
    id: 9,
    name: "Liora Haddad",
    age: 35,
    country: "LEBANON",
    flag: "🇱🇧",
    photo: "/profiles/liora-haddad.jpg",
    greeting: "Ahlan! 😊",
  },
  {
    id: 10,
    name: "Rohan Nwosu",
    age: 42,
    country: "INDIA",
    flag: "🇮🇳",
    photo: "/profiles/rohan-nwosu.jpg",
    greeting: "Namaste! 🙌",
  },
  {
    id: 11,
    name: "Maya Oliveira",
    age: 31,
    country: "BRAZIL",
    flag: "🇧🇷",
    photo: "/profiles/profile-maya-oliveira.jpg",
    greeting: "Oi! 😊",
  },
  {
    id: 12,
    name: "Luka Petrovic",
    age: 37,
    country: "SERBIA",
    flag: "🇷🇸",
    photo: "/profiles/profile-luka-petrovic.jpg",
    greeting: "Zdravo! 👋",
  },
  {
    id: 13,
    name: "Nia Mensah",
    age: 29,
    country: "GHANA",
    flag: "🇬🇭",
    photo: "/profiles/profile-nia-mensah.jpg",
    greeting: "Akwaaba! 😊",
  },
  {
    id: 14,
    name: "Lucia Fernandez",
    age: 33,
    country: "ARGENTINA",
    flag: "🇦🇷",
    photo: "/profiles/profile-lucia-fernandez.jpg",
    greeting: "¡Hola! ☀️",
  },
  {
    id: 15,
    name: "Rafael Costa",
    age: 35,
    country: "PORTUGAL",
    flag: "🇵🇹",
    photo: "/profiles/profile-rafael-costa.jpg",
    greeting: "Olá! 🌞",
  },
  {
    id: 16,
    name: "Mei Tan",
    age: 28,
    country: "SINGAPORE",
    flag: "🇸🇬",
    photo: "/profiles/profile-mei-tan.jpg",
    greeting: "Hello! ✨",
  },
  {
    id: 17,
    name: "Leila Haddad",
    age: 34,
    country: "JORDAN",
    flag: "🇯🇴",
    photo: "/profiles/profile-leila-haddad.jpg",
    greeting: "Marhaba! 😊",
  },
  {
    id: 18,
    name: "Kwame Boateng",
    age: 40,
    country: "GHANA",
    flag: "🇬🇭",
    photo: "/profiles/profile-kwame-boateng.jpg",
    greeting: "Hey there! 👋",
  },
  {
    id: 19,
    name: "Hana Novak",
    age: 30,
    country: "CZECHIA",
    flag: "🇨🇿",
    photo: "/profiles/profile-hana-novak.jpg",
    greeting: "Ahoj! 😊",
  },
  {
    id: 20,
    name: "Mateo Garcia",
    age: 36,
    country: "COLOMBIA",
    flag: "🇨🇴",
    photo: "/profiles/profile-mateo-garcia.jpg",
    greeting: "¡Buenas! 👋",
  },
  {
    id: 21,
    name: "Aisha Hassan",
    age: 32,
    country: "EGYPT",
    flag: "🇪🇬",
    photo: "/profiles/profile-aisha-hassan.jpg",
    greeting: "Ahlan! 🌸",
  },
  {
    id: 22,
    name: "Daniel Pereira",
    age: 39,
    country: "BRAZIL",
    flag: "🇧🇷",
    photo: "/profiles/profile-daniel-pereira.jpg",
    greeting: "Tudo bem? 😊",
  },
  {
    id: 23,
    name: "Sofia Rossi",
    age: 29,
    country: "ITALY",
    flag: "🇮🇹",
    photo: "/profiles/profile-sofia-rossi.jpg",
    greeting: "Ciao! ☀️",
  },
  {
    id: 24,
    name: "Noor Rahman",
    age: 31,
    country: "BANGLADESH",
    flag: "🇧🇩",
    photo: "/profiles/profile-noor-rahman.jpg",
    greeting: "Hello! 🌿",
  },
  {
    id: 25,
    name: "Ethan Walsh",
    age: 42,
    country: "IRELAND",
    flag: "🇮🇪",
    photo: "/profiles/profile-ethan-walsh.jpg",
    greeting: "How are you? ☘️",
  },
  {
    id: 26,
    name: "Fatima Zahra",
    age: 34,
    country: "ALGERIA",
    flag: "🇩🇿",
    photo: "/profiles/profile-fatima-zahra.jpg",
    greeting: "Salam! 😊",
  },
  {
    id: 27,
    name: "Carlos Santos",
    age: 38,
    country: "MEXICO",
    flag: "🇲🇽",
    photo: "/profiles/profile-carlos-santos.jpg",
    greeting: "¡Qué tal! 👋",
  },
  {
    id: 28,
    name: "Priya Nair",
    age: 33,
    country: "INDIA",
    flag: "🇮🇳",
    photo: "/profiles/profile-priya-nair.jpg",
    greeting: "Namaste! 🙌",
  },
  {
    id: 29,
    name: "Sara Lind",
    age: 28,
    country: "SWEDEN",
    flag: "🇸🇪",
    photo: "/profiles/profile-sara-lind.jpg",
    greeting: "Hej! 😊",
  },
  {
    id: 30,
    name: "Malik Thompson",
    age: 41,
    country: "CANADA",
    flag: "🇨🇦",
    photo: "/profiles/profile-malik-thompson.jpg",
    greeting: "Hey there! 👋",
  },
];

function getProfileInitials(person: Person) {
  return person.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

function getProfileInitialsClass(person: Person) {
  const colorIndex = ((person.id - 11) % 5) + 1;
  return `profile-initials profile-initials-${colorIndex}`;
}

const payouts: {
  name: string;
  amount: CurrencyAmount;
  time: string;
}[] = [
  { name: "LINDA W.", amount: { value: 25_000, currency: "UGX" }, time: "6m ago" },
  { name: "NAOMI S.", amount: { value: 72_000, currency: "UGX" }, time: "30s ago" },
  { name: "NAOMI S.", amount: { value: 105_000, currency: "UGX" }, time: "just now" },
  { name: "CYNTHIA R.", amount: { value: 72_000, currency: "UGX" }, time: "just now" },
  { name: "SARAH M.", amount: { value: 55_000, currency: "UGX" }, time: "30s ago" },
  { name: "LINDA W.", amount: { value: 210_000, currency: "UGX" }, time: "5m ago" },
  { name: "SARAH M.", amount: { value: 110_000, currency: "UGX" }, time: "just now" },
];

type WithdrawalMessage = {
  name: string;
  initials: string;
  amount: CurrencyAmount;
  method: string;
  tone: string;
};

const withdrawalMessages: WithdrawalMessage[] = [
  { name: "Kelvin T.", initials: "KT", amount: { value: 120_000, currency: "UGX" }, method: "Mobile Money", tone: "orange" },
  { name: "Amina W.", initials: "AW", amount: { value: 85_000, currency: "UGX" }, method: "Mobile Money", tone: "teal" },
  { name: "Brian K.", initials: "BK", amount: { value: 15_200, currency: "KES" }, method: "Airtel Money", tone: "blue" },
  { name: "Joy N.", initials: "JN", amount: { value: 67_500, currency: "UGX" }, method: "Mobile Money", tone: "red" },
  { name: "Mercy A.", initials: "MA", amount: { value: 210_000, currency: "UGX" }, method: "Mobile Money", tone: "green" },
  { name: "Dennis O.", initials: "DO", amount: { value: 98_000, currency: "UGX" }, method: "Airtel Money", tone: "orange" },
  { name: "Faith M.", initials: "FM", amount: { value: 18_400, currency: "KES" }, method: "M-Pesa", tone: "pink" },
  { name: "Samuel R.", initials: "SR", amount: { value: 72_000, currency: "UGX" }, method: "Mobile Money", tone: "blue" },
  { name: "Lydia W.", initials: "LW", amount: { value: 136_000, currency: "UGX" }, method: "Mobile Money", tone: "teal" },
  { name: "Collins J.", initials: "CJ", amount: { value: 250_000, currency: "UGX" }, method: "Mobile Money", tone: "red" },
  { name: "Esther K.", initials: "EK", amount: { value: 11_500, currency: "KES" }, method: "Airtel Money", tone: "green" },
  { name: "Peter M.", initials: "PM", amount: { value: 168_000, currency: "UGX" }, method: "Mobile Money", tone: "orange" },
  { name: "Naomi S.", initials: "NS", amount: { value: 100_000, currency: "UGX" }, method: "Mobile Money", tone: "pink" },
  { name: "Victor O.", initials: "VO", amount: { value: 19_250, currency: "KES" }, method: "M-Pesa", tone: "blue" },
  { name: "Hannah L.", initials: "HL", amount: { value: 59_000, currency: "UGX" }, method: "Airtel Money", tone: "teal" },
  { name: "George W.", initials: "GW", amount: { value: 143_000, currency: "UGX" }, method: "Mobile Money", tone: "red" },
  { name: "Ruth C.", initials: "RC", amount: { value: 221_000, currency: "UGX" }, method: "Mobile Money", tone: "green" },
  { name: "Allan P.", initials: "AP", amount: { value: 9_250, currency: "KES" }, method: "M-Pesa", tone: "orange" },
];

const investmentPlans: InvestmentPlan[] = [
  {
    id: 1,
    name: "SOLAR WATER PUMP",
    image: solarPumpImage,
    deposit: { value: 20_000, currency: "UGX" },
    dailyProfit: { value: 5_500, currency: "UGX" },
    totalDays: "100",
    totalProfit: { value: 550_000, currency: "UGX" },
  },
  {
    id: 2,
    name: "POWER WASHER",
    image: pressureWasherImage,
    deposit: { value: 38_000, currency: "UGX" },
    dailyProfit: { value: 8_000, currency: "UGX" },
    totalDays: "120",
    totalProfit: { value: 960_000, currency: "UGX" },
  },
  {
    id: 3,
    name: "PORTABLE POWER STATION",
    image: powerStationImage,
    deposit: { value: 80_000, currency: "UGX" },
    dailyProfit: { value: 16_000, currency: "UGX" },
    totalDays: "120",
    totalProfit: { value: 1_920_000, currency: "UGX" },
  },
  {
    id: 4,
    name: "SOLAR HOME KIT",
    image: solarKitImage,
    deposit: { value: 150_000, currency: "UGX" },
    dailyProfit: { value: 45_000, currency: "UGX" },
    totalDays: "60",
    totalProfit: { value: 2_700_000, currency: "UGX" },
  },
];

const faqs = [
  [
    "WHAT IS MALIGAIN CHAT?",
    "MALIGAIN CHAT helps you earn by chatting with foreigners. Choose the conversations you enjoy, spend time with people around the world, and get paid for your approved chat time.",
  ],
  [
    "HOW DO I EARN MONEY?",
    "Browse the live room, choose a shared interest, and tap Start paid chat. You can meet people from other countries while earning from the time you spend talking.",
  ],
  [
    "IS THERE A REGISTRATION FEE?",
    "No. Creating your profile and joining is free. Once you are approved, you can earn when foreigners book and complete chats with you.",
  ],
  [
    "HOW DO I GET PAID?",
    "Payouts are processed through mobile money and other verified gateways. You can track the time you spend and your earnings inside the platform.",
  ],
  [
    "IS MALIGAIN CHAT LEGITIMATE?",
    "You stay in control at every step. Use our report tools, protect your personal information, and leave any conversation that does not feel right.",
  ],
  [
    "WHEN CAN I WITHDRAW MY EARNINGS?",
    "Create your profile, choose your languages and topics, set when you are available, and start accepting paid chats with foreigners who want to connect.",
  ],
];

function scrollToId(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const redirectLink = import.meta.env.REDIRECT_LINK;
const supportLink = import.meta.env.SUPPORT_LINK;

function redirectToRegistration() {
  if (!redirectLink) {
    console.error("REDIRECT_LINK is missing from the Vite environment.");
    return;
  }

  window.location.assign(redirectLink);
}

function openSupportChat() {
  if (!supportLink) {
    console.error("SUPPORT_LINK is missing from the Vite environment.");
    return;
  }

  window.location.assign(supportLink);
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll<HTMLElement>(".reveal")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function RegisterButton({ className = "" }: { className?: string }) {
  return (
    <button
      className={`reference-button ${className}`}
      type="button"
      onClick={redirectToRegistration}
      data-testid="button-register"
    >
      {"REGISTER NOW"} <ArrowRight size={14} />
    </button>
  );
}

function Header({
  dark,
  onTheme,
  swahili,
  onLanguage,
}: {
  dark: boolean;
  onTheme: () => void;
  swahili: boolean;
  onLanguage: () => void;
}) {
  return (
    <header>
      <nav className="reference-nav">
        <div className="reference-nav-inner">
          <button
            className="reference-brand"
            type="button"
            onClick={() => scrollToId("top")}
            data-testid="button-brand"
          >
            <span className="reference-mark">c</span>
            <strong>CHAT FLIP</strong>
          </button>
          <div className="reference-links">
            <a href="#top">HOME</a>
            <a href="#voices">EARNINGS</a>
            <a href="#investments">INVESTMENTS</a>
            <a href="#how-it-works">GUIDE</a>
          </div>
          <div className="reference-actions">
            <button
              className="language-button"
              type="button"
              onClick={onLanguage}
              data-testid="button-language"
            >
              {swahili ? "EN" : "SW"}
            </button>
            <button
              className="round-button"
              type="button"
              onClick={onTheme}
              aria-label="Toggle dark mode"
              data-testid="button-theme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <RegisterButton />
          </div>
        </div>
      </nav>
      <div className="payout-strip" aria-label="Recent payout activity">
        <div className="payout-track">
          {[...payouts, ...payouts].map((payout, index) => (
            <span key={`${payout.name}-${index}`}>
              {payout.name} {formatUsdEquivalent(payout.amount)} ({payout.time})
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

function WithdrawalFeed() {
  const [message, setMessage] = useState<WithdrawalMessage | null>(null);
  const [visible, setVisible] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    let showTimer: number;
    let hideTimer: number;
    let nextTimer: number;

    const showNext = () => {
      setMessage(withdrawalMessages[indexRef.current]);
      setVisible(true);
      hideTimer = window.setTimeout(() => {
        setVisible(false);
        nextTimer = window.setTimeout(() => {
          indexRef.current = (indexRef.current + 1) % withdrawalMessages.length;
          showNext();
        }, 1900);
      }, 5600);
    };

    showTimer = window.setTimeout(showNext, 2200);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      window.clearTimeout(nextTimer);
    };
  }, []);

  if (!message) return null;

  return (
    <aside
      className={`withdrawal-feed ${visible ? "is-visible" : ""}`}
      aria-live="polite"
      aria-label="Recent withdrawals"
    >
      <div className={`withdrawal-avatar withdrawal-avatar-${message.tone}`}>
        {message.initials}
      </div>
      <div className="withdrawal-copy">
        <strong>{message.name}</strong>
        <span>
          Withdrew <b>{formatUsdEquivalent(message.amount)}</b> via
          <br />
          {message.method}
        </span>
      </div>
      <span className="withdrawal-check" aria-hidden="true">✓</span>
    </aside>
  );
}

function Hero() {
  return (
    <section className="reference-hero" id="top">
      <div className="hero-shape hero-shape-one" />
      <div className="hero-shape hero-shape-two" />
      <div className="reference-container hero-content reveal">
        <h1>
          MALIGAIN CHAT
          <br />
          <span> Chat Online.</span>
        </h1>
        <p>
          MALIGAIN CHAT lets you earn by chatting with foreigners who want to
          connect, practice, and share a little time. Turn your conversation
          skills into flexible income.
        </p>
        <div className="hero-buttons">
          <button
            className="reference-button"
            type="button"
            onClick={redirectToRegistration}
            data-testid="button-hero-chat"
          >
            CHAT NOW
          </button>
          <RegisterButton />
        </div>
      </div>
    </section>
  );
}

function ProfileModal({
  person,
  onClose,
}: {
  person: Person;
  onClose: () => void;
}) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        className="chat-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-modal-title"
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close profile"
        >
          <X size={17} />
        </button>
        {person.photo ? (
          <img src={person.photo} alt="" />
        ) : (
          <span
            className={`${getProfileInitialsClass(person)} profile-modal-initials`}
            aria-hidden="true"
          >
            {getProfileInitials(person)}
          </span>
        )}
        <span className="modal-kicker">ACTIVE NOW · {person.country}</span>
        <h2 id="chat-modal-title">Start a chat with {person.name}</h2>
        <p>
          {person.name} is ready to talk. Start a friendly conversation and make
          the time count.
        </p>
        <button
          className="reference-button"
          type="button"
          onClick={redirectToRegistration}
          data-testid="button-modal-chat"
        >
          CHAT NOW <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

function PersonCard({
  person,
  onSelect,
  presence,
}: {
  person: Person;
  onSelect: (person: Person) => void;
  presence: ChatPresence;
}) {
  const isTyping = presence === "typing";
  const isMessage = presence === "message";

  return (
    <article className="reference-person-card reveal">
      <div className="profile-image-wrap">
        {person.photo ? (
          <img src={person.photo} alt={`Portrait of ${person.name}`} />
        ) : (
          <span
            className={getProfileInitialsClass(person)}
            aria-hidden="true"
          >
            {getProfileInitials(person)}
          </span>
        )}
        <i aria-label="Online" />
      </div>
      <div className="profile-name">
        <h3>{person.name}</h3>
        <small>{person.age}y</small>
        <p>
          <span className="profile-flag">{person.flag}</span>
          <span>{person.country}</span>
        </p>
      </div>
      <div className="profile-actions-column">
        <div className="profile-meta">
          <span
            className={
              isTyping ? "typing-status" : isMessage ? "greeting-status" : ""
            }
            aria-label={
              isTyping
                ? `${person.name} is typing`
                : isMessage
                  ? `${person.name} says ${person.greeting}`
                  : "Looking to talk"
            }
            title={isMessage ? person.greeting : undefined}
          >
            {isTyping ? (
              <>
                <i aria-hidden="true" />
                <i aria-hidden="true" />
                <i aria-hidden="true" /> typing...
              </>
            ) : isMessage ? (
              person.greeting
            ) : (
              <>
                <i aria-hidden="true" /> Looking to talk
              </>
            )}
          </span>
        </div>
        <div className="profile-actions">
          <button
            className="card-chat"
            type="button"
            onClick={redirectToRegistration}
            data-testid={`button-chat-${person.id}`}
          >
            Book Chat
          </button>
          <button
            className="icon-chat"
            type="button"
            aria-label={`Message ${person.name}`}
            onClick={() => onSelect(person)}
          >
            <MessageSquare size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

function Voices() {
  const [selected, setSelected] = useState<Person | null>(null);
  const [presenceById, setPresenceById] = useState<
    Partial<Record<number, ChatPresence>>
  >({});
  useEffect(() => {
    let cycleTimer: number;
    let messageTimer: number;
    let resetTimer: number;

    const setPresence = (personIds: number[], presence: ChatPresence) => {
      setPresenceById((current) => {
        const next = { ...current };
        personIds.forEach((id) => {
          next[id] = presence;
        });
        return next;
      });
    };

    const showNextTyping = () => {
      const typingCount = 4 + Math.floor(Math.random() * 2);
      const activeIds = [...people]
        .sort(() => Math.random() - 0.5)
        .slice(0, typingCount)
        .map((person) => person.id);

      setPresence(activeIds, "typing");

      messageTimer = window.setTimeout(() => {
        setPresence(activeIds, "message");
        resetTimer = window.setTimeout(() => {
          setPresence(activeIds, "looking");
          cycleTimer = window.setTimeout(
            showNextTyping,
            1800 + Math.random() * 2400,
          );
        }, 2400);
      }, 1200);
    };

    cycleTimer = window.setTimeout(
      showNextTyping,
      3200 + Math.random() * 4800,
    );

    return () => {
      window.clearTimeout(cycleTimer);
      window.clearTimeout(messageTimer);
      window.clearTimeout(resetTimer);
    };
  }, []);
  return (
    <section className="voices-reference" id="voices">
      <div className="reference-container">
        <div className="live-heading reveal">
          <div>
            <h2>
              <i /> LIVE FOREIGNERS ONLINE
            </h2>
            <p>TAP ANY PROFILE TO START A PAID CHAT NOW</p>
          </div>
        </div>
        <div className="reference-grid">
          {people
            .map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              presence={presenceById[person.id] ?? "looking"}
              onSelect={setSelected}
            />
            ))}
          <SupportCard />
        </div>
        <button
          className="more-button reveal"
          type="button"
          onClick={() => scrollToId("join")}
          data-testid="button-more-chats"
        >
          SHOW MORE <ArrowRight size={14} />
        </button>
      </div>
      {selected && (
        <ProfileModal person={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function InvestmentCard({ plan }: { plan: InvestmentPlan }) {
  return (
    <article className="investment-card reveal">
      <div className="investment-image-wrap">
        <img src={plan.image} alt={plan.name} />
      </div>
      <div className="investment-card-content">
        <div className="investment-card-heading">
          <div>
            <span className="investment-kicker">
              PRODUCT PLAN {String(plan.id).padStart(2, "0")}
            </span>
            <h3>{plan.name}</h3>
          </div>
          <span className="investment-status">
            <i /> AVAILABLE
          </span>
        </div>
        <div className="investment-details">
          <div>
            <span>DEPOSIT</span>
            <strong>{formatUsdEquivalent(plan.deposit)}</strong>
          </div>
          <div>
            <span>DAILY PROFIT</span>
            <strong className="profit-value">
              {formatUsdEquivalent(plan.dailyProfit)}
            </strong>
          </div>
          <div>
            <span>TOTAL DAYS</span>
            <strong>{plan.totalDays}</strong>
          </div>
          <div>
            <span>TOTAL PROFIT</span>
            <strong className="profit-value">
              {formatUsdEquivalent(plan.totalProfit)}
            </strong>
          </div>
        </div>
        <button
          className="investment-action"
          type="button"
          onClick={redirectToRegistration}
          data-testid={`button-invest-${plan.id}`}
        >
          CHOOSE PLAN <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}

function Investments() {
  return (
    <section className="investments-reference" id="investments">
      <div className="reference-container">
        <div className="investment-heading reveal">
          <div>
            <span className="section-label">BUILD A BRIGHTER TOMORROW</span>
            <h2>
              SMART <span>PRODUCT PLANS</span>
            </h2>
            <p>
              Back practical energy tools that make everyday work easier. Pick a
              product, start small, and grow with a clear plan.
            </p>
            <p className="currency-rate-note">{USD_RATE_NOTE}</p>
          </div>
          <span className="investment-note">REAL PRODUCTS · REAL IMPACT</span>
        </div>
        <div className="investment-grid">
          {investmentPlans.map((plan) => (
            <InvestmentCard key={plan.id} plan={plan} />
          ))}
        </div>
        <div className="investment-actions reveal">
          <button
            className="investment-secondary"
            type="button"
            onClick={redirectToRegistration}
            data-testid="button-invest-chat"
          >
            ASK A QUESTION
          </button>
          <button
            className="reference-button investment-primary"
            type="button"
            onClick={redirectToRegistration}
            data-testid="button-invest-now"
          >
            START A PLAN <ArrowRight size={14} />
          </button>
          <RegisterButton className="investment-register" />
          <button
            className="investment-secondary investment-join"
            type="button"
            onClick={redirectToRegistration}
            data-testid="button-invest-join"
          >
            SEE ALL OPTIONS
          </button>
        </div>
      </div>
    </section>
  );
}

function SupportCard() {
  return (
    <article className="support-card reveal">
      <span>CHAT SUPPORT</span>
      <h3>JOIN TRAINING CHANNEL</h3>
      <p>Get training, updates &amp; connect with other earners.</p>
      <button
        type="button"
        onClick={openSupportChat}
        data-testid="button-support"
      >
        OPEN SUPPORT CHAT
      </button>
    </article>
  );
}

function Metrics() {
  return (
    <section className="metrics-reference">
      <div className="reference-container metrics-row">
        <div>
          <strong>80,443</strong>
          <span>PAID CHATS</span>
        </div>
        <div>
          <strong>{formatUsdEquivalent({ value: 1_285_368, currency: "UGX" })}</strong>
          <span>TOTAL PAID OUT</span>
        </div>
        <div className="metric-highlight">
          <strong>1,782</strong>
          <span>ACTIVE HOSTS</span>
        </div>
        <div>
          <strong>
            4.9<em>★</em>
          </strong>
          <span>AVERAGE RATING</span>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const features = [
    [
      "MEANINGFUL CONVERSATIONS",
      "Enter relaxed one-to-one chats with people abroad who want a friendly voice, a fresh perspective, or a chance to practice.",
    ],
    [
      "TURN TIME INTO INCOME",
      "Build your earning rhythm around the hours that suit you. Every approved session turns your attention and time into progress.",
    ],
    [
      "A WORLDWIDE COMMUNITY",
      "Meet curious people from different cultures, exchange stories, and create genuine connections from wherever you are.",
    ],
    [
      "COMFORTABLE BOUNDARIES",
      "Keep conversations respectful and on your terms with clear community rules, reporting tools, and control over your availability.",
    ],
  ];
  return (
    <section className="features-reference" id="how-it-works">
      <div className="reference-container">
        <div className="section-title centered reveal">
          <h2>
            HOW IT <span>WORKS</span>
          </h2>
          <p>
            Discover conversations that fit your interests, show up when it
            works for you, and make every positive interaction count.
          </p>
        </div>
        <div className="features-layout">
          <div className="feature-intro reveal">
              <span>YOUR TIME, YOUR TERMS</span>
            <h3>
                Turn real
              <br />
                <em>connection</em>
              <br />
                into value.
            </h3>
            <RegisterButton />
          </div>
          <div className="feature-cards">
            {features.map(([title, copy], index) => (
              <article className="feature-card reveal" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Join() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) setSubmitted(true);
  };
  return (
    <section className="join-reference" id="join">
      <div className="reference-container">
        <div className="join-panel reveal">
          <div>
            <span className="section-label">YOUR NEXT CHAPTER STARTS HERE</span>
            <h2>
              HOW TO <span>JOIN</span>
            </h2>
            <p>
              Getting started is simple. Create your space, tell us what you
              enjoy talking about, and open the door to flexible online
              earnings.
            </p>
          </div>
          <div className="join-steps">
            <b>
              <i>1</i> Build your account
            </b>
            <b>
              <i>2</i> Set your interests
            </b>
            <b>
              <i>3</i> Meet and earn
            </b>
          </div>
          <div className="join-buttons">
            <RegisterButton />
            <button
              className="reference-button button-green"
              type="button"
              onClick={redirectToRegistration}
              data-testid="button-join-chat"
            >
              START EARNING
            </button>
          </div>
        </div>
        <form className="join-email reveal" onSubmit={submit}>
          <label htmlFor="join-email-input">
            Get practical earning tips and fresh conversation opportunities
          </label>
          <div>
            <input
              id="join-email-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <button type="submit" aria-label="Join the earning tips list">
              <ArrowRight size={16} />
            </button>
          </div>
          {submitted && (
            <p className="form-success">
              <Check size={14} /> You are on the list.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Stories() {
  const stories = [
    [
      "ALICE · UK",
      "“I joined to meet people outside my everyday circle. Now my evening conversations help me cover a few important monthly expenses too.”",
    ],
    [
      "DANIEL · MEXICO",
      "“The best part is the variety. I can encourage someone through a tough day, learn about another culture, and earn from time I already had.”",
    ],
    [
      "MARIE · FRANCE",
      "“I began with a few open hours each week. The routine grew naturally, and the extra income has given me more breathing room.”",
    ],
  ];
  return (
    <section className="stories-reference" id="stories">
      <div className="reference-container">
        <div className="section-title centered reveal">
          <h2>
            SUCCESS <span>STORIES</span>
          </h2>
          <p>
            From first introductions to regular conversations, hosts are
            building confidence, community, and flexible income one chat at a
            time.
          </p>
        </div>
        <div className="story-grid">
          {stories.map(([name, quote], index) => (
            <article className="story-card reveal" key={name}>
              <div className={`story-photo story-photo-${index}`} />
              <b>{name}</b>
              <span>✓ VERIFIED HOST</span>
              <p>{quote}</p>
              <small>
                {formatUsdEquivalent({
                  value: [8_400, 12_500, 6_800][index],
                  currency: "UGX",
                })}{" "}
                PAYOUT
              </small>
            </article>
          ))}
        </div>
        <RegisterButton />
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq-reference" id="faq">
      <div className="reference-container faq-layout">
        <div className="section-title reveal">
          <h2>
            FREQUENTLY <span>ASKED</span>
          </h2>
          <p>
            Learn how paid chats work, how you earn, and how we keep
            conversations safe.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div
              className={`faq-item reveal ${open === index ? "open" : ""}`}
              key={question}
            >
              <button
                type="button"
                onClick={() => setOpen(open === index ? -1 : index)}
                aria-expanded={open === index}
                data-testid={`button-faq-${index}`}
              >
                <span>{question}</span>
                <ChevronDown size={15} />
              </button>
              {open === index && <p>{answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="reference-footer">
      <div className="reference-container footer-layout">
        <div className="footer-brand">
          <button
            className="reference-brand"
            type="button"
            onClick={() => scrollToId("top")}
          >
            <span className="reference-mark">c</span>
            <strong>CHAT FLIP</strong>
          </button>
          <p>
            Meet people, share perspective,
            <br />
            and make your online time matter.
          </p>
          <span>● A COMMUNITY BUILT AROUND CONNECTION</span>
        </div>
        <div className="footer-cta">
          <span>READY WHEN YOU ARE</span>
          <h2>
            Your next
            <br />
            <em>conversation</em>
            <br />
            starts here.
          </h2>
          <RegisterButton />
        </div>
      </div>
      <div className="reference-container footer-bottom">
        <span>© 2026 CHAT FLIP</span>
        <div>
          <a href="#top">BACK TO TOP</a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [dark, setDark] = useState(false);
  const [swahili, setSwahili] = useState(false);
  useReveal();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <div className="site-reference">
      <Header
        dark={dark}
        onTheme={() => setDark((value) => !value)}
        swahili={swahili}
        onLanguage={() => setSwahili((value) => !value)}
      />
      <WithdrawalFeed />
      <main>
        <Hero />
        <Voices />
        <Investments />
        <Metrics />
        <HowItWorks />
        <Join />
        <Stories />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
