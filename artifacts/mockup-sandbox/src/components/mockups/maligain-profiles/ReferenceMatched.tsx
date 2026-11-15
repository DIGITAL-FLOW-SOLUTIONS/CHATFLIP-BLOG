import "./_group.css";
import "./_reference-matched.css";
import { MessageSquare, MoreVertical, Share2 } from "lucide-react";

const profiles = [
  { name: "Alira Kone", age: 34, country: "SENEGAL", flag: "🇸🇳", image: "maligain-alira-kone.jpg", typing: true },
  { name: "Tavian Marek", age: 41, country: "CROATIA", flag: "🇭🇷", image: "maligain-tavian-marek.jpg", typing: true },
  { name: "Sora Min", age: 30, country: "JAPAN", flag: "🇯🇵", image: "maligain-sora-min.jpg", typing: true },
  { name: "Devin Adebayo", age: 38, country: "NIGERIA", flag: "🇳🇬", image: "maligain-devin-adebayo.jpg", typing: false },
  { name: "Maelle Rovira", age: 36, country: "SPAIN", flag: "🇪🇸", image: "maligain-maelle-rovira.jpg", typing: true },
  { name: "Oren Kimani", age: 43, country: "TANZANIA", flag: "🇹🇿", image: "maligain-oren-kimani.jpg", typing: false },
  { name: "Amara Idrissi", age: 32, country: "MOROCCO", flag: "🇲🇦", image: "maligain-amara-idrissi.jpg", typing: true },
  { name: "Enzo Mabaso", age: 39, country: "SOUTH AFRICA", flag: "🇿🇦", image: "maligain-enzo-mabaso.jpg", typing: false },
  { name: "Liora Haddad", age: 35, country: "LEBANON", flag: "🇱🇧", image: "maligain-liora-haddad.jpg", typing: true },
  { name: "Rohan Nwosu", age: 42, country: "INDIA", flag: "🇮🇳", image: "maligain-rohan-nwosu.jpg", typing: false },
];

function ProfileRow({ profile }: { profile: (typeof profiles)[number] }) {
  return (
    <article className="maligain-profile">
      <div className="maligain-avatar">
        <img src={`/__mockup/images/${profile.image}`} alt={`Portrait of ${profile.name}`} />
        <i aria-label="Online" />
      </div>
      <div className="maligain-profile-info">
        <h2>{profile.name}</h2>
        <span className="maligain-age">{profile.age}y</span>
        <p><span>{profile.flag}</span>{profile.country}</p>
      </div>
      <div className="maligain-profile-actions">
        <span className={`maligain-status ${profile.typing ? "is-typing" : ""}`}>
          {profile.typing ? <><i /><i /><i /> TYPING...</> : <><i /> LOOKING TO TALK</>}
        </span>
        <div className="maligain-buttons">
          <button type="button" className="maligain-book">Book Chat</button>
          <button type="button" className="maligain-message" aria-label={`Message ${profile.name}`}><MessageSquare size={18} /></button>
        </div>
      </div>
    </article>
  );
}

export function ReferenceMatched() {
  return (
    <main className="maligain-profile-preview">
      <header className="maligain-preview-top">
        <div className="maligain-brand-mark">M</div>
        <div className="maligain-brand-copy"><strong>MALIGAIN</strong><span>maligain.net</span></div>
        <button type="button" aria-label="Share MALIGAIN"><Share2 size={20} /></button>
        <button type="button" aria-label="More options"><MoreVertical size={22} /></button>
      </header>
      <section className="maligain-profile-list" aria-label="Live foreigners online">
        <h1 className="sr-only">Live foreigners online</h1>
        {profiles.map(profile => <ProfileRow key={profile.name} profile={profile} />)}
      </section>
    </main>
  );
}
