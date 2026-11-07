
import { useState } from "react";
import "./App.css";

function App() {
  const [active, setActive] = useState("Dashboard");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const scanMessage = () => {
    if (!message.trim()) {
      alert("Please enter a message first!");
      return;
    }

    const words = [
      "urgent", "winner", "prize", "lottery",
      "bank", "password", "otp", "verify",
      "click here", "free money", "claim",
      "suspended", "send money", "pin",
      "refund", "limited time"
    ];

    const found = words.filter(word =>
      message.toLowerCase().includes(word)
    );

    const risk = Math.min(95, 5 + found.length * 18);

    const scan = {
      id: Date.now(),
      message,
      risk,
      found,
      status: risk > 5 ? "Potential Scam" : "No obvious scam signs",
      date: new Date().toLocaleString()
    };

    setResult(scan);
    setHistory(old => [scan, ...old]);
  };

  const stats = [
    {
      title: "High-risk Events",
      value: history.filter(x => x.risk > 5).length,
      total: history.length,
      percent: history.length
        ? Math.round(history.filter(x => x.risk > 5).length / history.length * 100)
        : 0,
      icon: "⚠",
      color: "purple"
    },
    {
      title: "Risky Activities",
      value: history.filter(x => x.risk > 50).length,
      total: history.length,
      percent: history.length
        ? Math.round(history.filter(x => x.risk > 50).length / history.length * 100)
        : 0,
      icon: "▤",
      color: "blue"
    },
    {
      title: "High-risk Messages",
      value: history.filter(x => x.risk > 50).length,
      total: history.length,
      percent: history.length
        ? Math.round(history.filter(x => x.risk > 50).length / history.length * 100)
        : 0,
      icon: "♙",
      color: "pink"
    },
    {
      title: "Messages Scanned",
      value: history.length,
      total: history.length,
      percent: history.length ? 100 : 0,
      icon: "▣",
      color: "magenta"
    }
  ];

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-symbol">✣</span>
          <span>SCAMGUARD</span>
        </div>

        <div className="side-search">
          <span>⌕</span>
          <input placeholder="Search..." />
        </div>

        <p className="side-heading">MENU</p>

        {[
          ["Dashboard", "⌂"],
          ["Message Scanner", "⌕"],
          ["Scan History", "▤"]
        ].map(([name, icon]) => (
          <button
            key={name}
            onClick={() => setActive(name)}
            className={`side-link ${active === name ? "active" : ""}`}
          >
            <span>{icon}</span>
            {name}
          </button>
        ))}

        <p className="side-heading manage-heading">MANAGE</p>

        {[
          ["Threat Detection", "♧"],
          ["Security Reports", "▧"],
          ["Settings", "⚙"]
        ].map(([name, icon]) => (
          <button
            key={name}
            onClick={() => setActive(name)}
            className={`side-link ${active === name ? "active" : ""}`}
          >
            <span>{icon}</span>
            {name}
          </button>
        ))}

        <div className="pro-card">
          <div className="pro-icon">✦</div>
          <h3>ScamGuard Pro</h3>
          <p>Stay protected with intelligent digital security.</p>
          <button onClick={() => setActive("Settings")}>
            Explore Features →
          </button>
        </div>

        <div className="sidebar-bottom">
          <span className="online-dot"></span>
          Security System Online
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="main-area">

        {/* TOPBAR */}
        <div className="topbar">
          <div className="top-search">
            <span>⌕</span>
            <input placeholder="Search your dashboard..." />
          </div>

          <div className="top-actions">
            <button title="Notifications">♧</button>
            <button title="Messages">▤</button>
            <button title="Refresh" onClick={() => {
              setResult(null);
              setMessage("");
            }}>⟳</button>

            <div className="profile">
              <div className="avatar">S</div>
              <span>Administrator</span>
              <span>⌄</span>
            </div>
          </div>
        </div>

        {/* PAGE HEADER */}
        <div className="page-heading">
          <div>
            <p className="eyebrow">SECURITY WORKSPACE</p>
            <h1>{active}</h1>
            <p>Monitor, analyze and protect your digital environment.</p>
          </div>

          <div className="date-label">
            <span>●</span> System Active
          </div>
        </div>

        {/* DASHBOARD */}
        {active === "Dashboard" && (
          <>
            <section className="stats-grid">
              {stats.map(stat => (
                <div className={`gradient-card ${stat.color}`} key={stat.title}>
                  <div className="card-top">
                    <span className="card-icon">{stat.icon}</span>
                    <span className="card-menu">⋮</span>
                  </div>

                  <p>{stat.title}</p>

                  <div className="card-bottom">
                    <div>
                      <h2>{String(stat.value).padStart(2, "0")}</h2>
                      <small>of {stat.total} total</small>
                    </div>

                    <div className="mini-circle">
                      {stat.percent}%
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <section className="dashboard-grid">

              {/* CHART */}
              <div className="dark-panel chart-panel">
                <div className="panel-title">
                  <div>
                    <h2>Security Activity</h2>
                    <p>Message scanning overview</p>
                  </div>
                  <span className="chart-badge">LIVE OVERVIEW</span>
                </div>

                <div className="chart-stats">
                  <div>
                    <small>Total Scans</small>
                    <h2>{history.length}</h2>
                  </div>
                  <div>
                    <small>Potential Scams</small>
                    <h2>{history.filter(x => x.risk > 5).length}</h2>
                  </div>
                </div>

                <div className="chart">
                  <div className="chart-y">
                    <span>100</span>
                    <span>75</span>
                    <span>50</span>
                    <span>25</span>
                    <span>0</span>
                  </div>

                  <svg viewBox="0 0 700 230" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="areaBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#348dff" stopOpacity=".6"/>
                        <stop offset="100%" stopColor="#348dff" stopOpacity=".02"/>
                      </linearGradient>
                      <linearGradient id="areaPink" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#be35f5" stopOpacity=".5"/>
                        <stop offset="100%" stopColor="#be35f5" stopOpacity=".02"/>
                      </linearGradient>
                    </defs>

                    {[20, 65, 110, 155, 200].map(y => (
                      <line key={y} x1="0" y1={y} x2="700" y2={y}
                        stroke="#42416d" strokeDasharray="5 7"/>
                    ))}

                    <path
                      d="M0 150 C80 75 130 65 200 105 S320 190 400 115 S550 45 700 80 L700 220 L0 220 Z"
                      fill="url(#areaBlue)"
                    />
                    <path
                      d="M0 120 C90 170 130 175 220 105 S360 35 450 85 S600 170 700 30 L700 220 L0 220 Z"
                      fill="url(#areaPink)"
                    />
                    <path
                      d="M0 150 C80 75 130 65 200 105 S320 190 400 115 S550 45 700 80"
                      fill="none" stroke="#37b9ff" strokeWidth="3"
                    />
                    <path
                      d="M0 120 C90 170 130 175 220 105 S360 35 450 85 S600 170 700 30"
                      fill="none" stroke="#c44bff" strokeWidth="3"
                    />
                  </svg>
                </div>

                <div className="chart-months">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>

              {/* SECURITY PANEL */}
              <div className="dark-panel environment-panel">
                <div className="panel-title">
                  <div>
                    <h2>Security Center</h2>
                    <p>Protection overview</p>
                  </div>
                  <span>⋮</span>
                </div>

                {[
                  ["✉", "Message Scanner", "Analyze suspicious messages"],
                  ["◈", "Threat Detection", "Identify possible scam patterns"],
                  ["▣", "Scan History", "Review previous scan reports"],
                  ["♧", "Security Reports", "View detection statistics"]
                ].map(([icon, title, description]) => (
                  <div className="security-item" key={title}
                    onClick={() => setActive(
                      title === "Message Scanner" ? title :
                      title === "Scan History" ? title : "Security Reports"
                    )}>
                    <span className="security-item-icon">{icon}</span>
                    <div>
                      <h4>{title}</h4>
                      <p>{description}</p>
                    </div>
                    <span className="arrow">›</span>
                  </div>
                ))}
              </div>
            </section>

            {/* BOTTOM SECTION */}
            <section className="bottom-grid">

              <div className="dark-panel scanner-mini">
                <div className="panel-title">
                  <div>
                    <h2>Quick Message Scanner</h2>
                    <p>Analyze a suspicious message</p>
                  </div>
                  <span>✦</span>
                </div>

                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Paste your suspicious SMS, email or WhatsApp message..."
                />

                <button className="scan-button" onClick={scanMessage}>
                  ✨ Analyze Message
                </button>
              </div>

              <div className="dark-panel recent-panel">
                <div className="panel-title">
                  <div>
                    <h2>Recent Activity</h2>
                    <p>Your latest scan results</p>
                  </div>
                  <button className="view-all" onClick={() => setActive("Scan History")}>
                    View all →
                  </button>
                </div>

                {history.length === 0 ? (
                  <div className="no-activity">
                    <span>◉</span>
                    <p>No activity yet. Start your first scan.</p>
                  </div>
                ) : history.slice(0, 4).map(item => (
                  <div className="recent-item" key={item.id}>
                    <span>{item.risk > 5 ? "⚠" : "✓"}</span>
                    <div>
                      <h4>{item.status}</h4>
                      <p>{item.message.slice(0, 35)}...</p>
                    </div>
                    <strong>{item.risk}%</strong>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* MESSAGE SCANNER */}
        {active === "Message Scanner" && (
          <section className="dark-panel full-panel">
            <h2>AI Message Scanner</h2>
            <p>Paste a message to check for potential scam indicators.</p>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Enter your message here..."
            />
            <button className="scan-button" onClick={scanMessage}>
              ✨ Analyze Message
            </button>

            {result && (
              <div className="scan-result">
                <h3>{result.status}</h3>
                <h2>{result.risk}% Risk Score</h2>
                <p>Detected indicators: {result.found.join(", ") || "None"}</p>
                <small>Keyword-based prototype. Not a trained AI prediction.</small>
              </div>
            )}
          </section>
        )}

        {/* HISTORY */}
        {active === "Scan History" && (
          <section className="dark-panel full-panel">
            <h2>Scan History</h2>
            <p>Review previously analyzed messages.</p>

            {history.length === 0 ? (
              <p className="no-activity">No scans performed yet.</p>
            ) : history.map(item => (
              <div className="history-row" key={item.id}>
                <div>
                  <h4>{item.status}</h4>
                  <p>{item.message}</p>
                  <small>{item.date}</small>
                </div>
                <strong>{item.risk}%</strong>
              </div>
            ))}
          </section>
        )}

        {active === "Threat Detection" && (
          <section className="dark-panel full-panel">
            <h2>Threat Detection</h2>
            <p>Potential threats identified by your current scanner.</p>
            <h1 className="big-number">
              {history.filter(x => x.risk > 5).length}
            </h1>
            <p>Potential scam indicators flagged.</p>
          </section>
        )}

        {active === "Security Reports" && (
          <section className="dark-panel full-panel">
            <h2>Security Reports</h2>
            <p>Summary of your scanning activity.</p>
            <div className="report-numbers">
              <div><small>Total scans</small><h2>{history.length}</h2></div>
              <div><small>Potential scams</small><h2>{history.filter(x => x.risk > 5).length}</h2></div>
              <div><small>Low-risk results</small><h2>{history.filter(x => x.risk <= 5).length}</h2></div>
            </div>
          </section>
        )}

        {active === "Settings" && (
          <section className="dark-panel full-panel">
            <h2>Settings</h2>
            <p>ScamGuard AI prototype settings.</p>
            <div className="security-item">
              <span>🛡️</span>
              <div>
                <h4>Security monitoring</h4>
                <p>Keyword-based scanning is currently enabled.</p>
              </div>
            </div>
          </section>
        )}

        <footer className="footer">
          <span>SCAMGUARD AI © 2026</span>
          <span>Intelligent Digital Protection</span>
        </footer>

      </main>
    </div>
  );
}

export default App;

