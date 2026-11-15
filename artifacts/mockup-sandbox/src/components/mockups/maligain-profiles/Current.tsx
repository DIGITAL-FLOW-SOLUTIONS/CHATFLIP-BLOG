import "./_group.css";

const currentPeople = [
  { name: "Margaret W.", age: 58, country: "USA", flag: "🇺🇸", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=85" },
  { name: "Robert H.", age: 62, country: "UK", flag: "🇬🇧", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=85" },
  { name: "Helga S.", age: 55, country: "GERMANY", flag: "🇩🇪", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=180&q=85" },
  { name: "James M.", age: 60, country: "CANADA", flag: "🇨🇦", photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=180&q=85" },
  { name: "Karen P.", age: 51, country: "AUSTRALIA", flag: "🇦🇺", photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=180&q=85" },
  { name: "Lars E.", age: 60, country: "SWEDEN", flag: "🇸🇪", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=180&q=85" },
  { name: "Mina R.", age: 57, country: "FRANCE", flag: "🇫🇷", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=180&q=85" },
  { name: "Peter K.", age: 64, country: "NORWAY", flag: "🇳🇴", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=180&q=85" },
  { name: "Nadia T.", age: 54, country: "ITALY", flag: "🇮🇹", photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=180&q=85" },
  { name: "Sofia J.", age: 59, country: "IRELAND", flag: "🇮🇪", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=180&q=85" },
];

function CurrentProfile({ person, index }: { person: (typeof currentPeople)[number]; index: number }) {
  return (
    <article className="current-card">
      <div className="current-card-head">
        <div className="current-photo"><img src={person.photo} alt="" /><i /></div>
        <div>
          <h3 className="current-name">{person.name}<span className="current-age">{person.age}y</span></h3>
          <p className="current-country">{person.flag} &nbsp;{person.country}</p>
        </div>
      </div>
      <div className="current-meta">
        <span>{index % 2 === 0 ? "● LOOKING TO TALK" : "••• TYPING..."}</span>
        <b>ACTIVE NOW</b>
      </div>
      <div className="current-actions"><button>CHAT NOW</button><button aria-label={`Message ${person.name}`}>▢</button></div>
    </article>
  );
}

export function Current() {
  return (
    <main className="current-profiles">
      <div className="current-container">
        <header className="current-heading">
          <div><h2><i /> LIVE FOREIGNERS ONLINE</h2><p>TAP ANY PROFILE TO START A PAID CHAT NOW</p></div>
        </header>
        <div className="current-grid">
          {currentPeople.slice(0, 6).map((person, index) => <CurrentProfile key={person.name} person={person} index={index} />)}
          <aside className="current-support"><strong>JOIN TRAINING CHANNEL</strong><p>Get training, updates &amp; connect with other earners.</p></aside>
          {currentPeople.slice(6).map((person, index) => <CurrentProfile key={person.name} person={person} index={index + 6} />)}
        </div>
      </div>
    </main>
  );
}
