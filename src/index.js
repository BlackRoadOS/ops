
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.js
var index_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (path.startsWith("/api/")) return handleAPI(path, request, env);
    return new Response(renderApp(), {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
};
async function handleAPI(path, request, env) {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
  if (path === "/api/fleet") return new Response(JSON.stringify(await getFleetStatus()), { headers });
  if (path === "/api/domains") return new Response(JSON.stringify(await getDomainHealth()), { headers });
  if (path === "/api/workers") return new Response(JSON.stringify(await getWorkerStats(env)), { headers });
  if (path === "/api/kpis") return new Response(JSON.stringify(getKPIs()), { headers });
  return new Response(JSON.stringify({ error: "not found" }), { status: 404, headers });
}
__name(handleAPI, "handleAPI");
function getKPIs() {
  return {
    fleet: { total: 7, online: 5, offline: 2, names: ["Alice", "Aria", "Lucidia", "Cecilia", "Gematria", "Anastasia"], offlineNames: ["Octavia"] },
    workers: 496,
    domains: 20,
    d1Databases: 8,
    products: { total: 92, live: 26, building: 37, planned: 29 },
    repos: { enterprise: 2443, orgs: 34 },
    todos: { total: 2448, projects: 118 },
    codex: { solutions: 714, patterns: 56 },
    stripe: { balance: 0, products: 5, mode: "test" },
    memory: { entries: 4736 },
    updated: (/* @__PURE__ */ new Date()).toISOString()
  };
}
__name(getKPIs, "getKPIs");
async function getFleetStatus() {
  const nodes = [
    { name: "Alice", ip: "192.168.4.49", role: "Gateway + Pi-hole + PostgreSQL + Qdrant", hw: "Pi 400 4GB", storage: "16GB SD", status: "online", user: "blackroad" },
    { name: "Cecilia", ip: "192.168.4.105", role: "AI (Hailo-8 26 TOPS) + Ollama + MinIO + PostgreSQL", hw: "Pi 5 8GB", storage: "466GB NVMe + 238GB SD", status: "online", user: "blackroad" },
    { name: "Aria", ip: "192.168.4.98", role: "Portainer + Docker + Ollama", hw: "Pi 5 8GB", storage: "30GB SD (96% full)", status: "online", user: "blackroad" },
    { name: "Lucidia", ip: "192.168.4.38", role: "GitHub Runner + 530 web apps + Ollama + Docker", hw: "Pi 5 8GB", storage: "238GB SD", status: "online", user: "blackroad" },
    { name: "Octavia", ip: "?.?.?.?", role: "Gitea + 1TB NVMe + Hailo-8 + Docker Swarm", hw: "Pi 5 8GB", storage: "128GB SD + 1TB NVMe", status: "offline", user: "pi", note: "Last seen 2026-03-21. Full /24 scan negative." },
    { name: "Gematria", ip: "159.65.43.12", role: "Caddy TLS edge (151 domains) + Ollama + NATS", hw: "DO 4vCPU 8GB", storage: "80GB (43GB used)", status: "online", user: "root" },
    { name: "Anastasia", ip: "174.138.44.45", role: "WireGuard hub + Headscale + Nginx", hw: "DO 1vCPU 1GB", storage: "25GB (94% full!)", status: "online", user: "root" }
  ];
  return { nodes, updated: (/* @__PURE__ */ new Date()).toISOString() };
}
__name(getFleetStatus, "getFleetStatus");
async function getDomainHealth() {
  const domains = [
    "blackroad.io",
    "blackroad.ai",
    "blackroad.inc",
    "blackroad.me",
    "blackroad.network",
    "blackroad.systems",
    "blackroad.company",
    "blackroadai.com",
    "blackroadqi.com",
    "blackroadinc.us",
    "blackroadquantum.com",
    "blackroadquantum.net",
    "blackroadquantum.info",
    "blackroadquantum.shop",
    "blackroadquantum.store",
    "blackboxprogramming.io",
    "lucidia.earth",
    "lucidia.studio",
    "lucidiaqi.com",
    "roadchain.io",
    "roadcoin.io"
  ];
  const subdomains = [
    "app",
    "chat",
    "search",
    "auth",
    "status",
    "tutor",
    "social",
    "canvas",
    "cadence",
    "roadcode",
    "video",
    "live",
    "game",
    "book",
    "work",
    "radio",
    "pay",
    "roadtrip"
  ].map((s) => `${s}.blackroad.io`);
  return { domains, subdomains, updated: (/* @__PURE__ */ new Date()).toISOString() };
}
__name(getDomainHealth, "getDomainHealth");
async function getWorkerStats(env) {
  return {
    total: 496,
    categories: {
      "Agent personas": 18,
      "Product apps": 26,
      "Domain sites": 21,
      "Dashboards": 12,
      "Pipeline workers": 10,
      "Monitor workers": 9,
      "Integration workers": 14,
      "Fleet workers": 9,
      "AI workers": 12,
      "Auth/Billing": 16,
      "Analytics": 8,
      "Infrastructure": 341
    },
    updated: (/* @__PURE__ */ new Date()).toISOString()
  };
}
__name(getWorkerStats, "getWorkerStats");
function renderApp() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BlackRoad Ops</title>
<style>
  :root {
    --bg: #0a0a0a;
    --surface: #141414;
    --surface2: #1a1a1a;
    --border: #2a2a2a;
    --text: #e0e0e0;
    --text2: #888;
    --pink: #FF1D6C;
    --amber: #F5A623;
    --blue: #2979FF;
    --violet: #9C27B0;
    --green: #4CAF50;
    --red: #f44336;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: var(--bg); color: var(--text); font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace; font-size: 13px; line-height: 1.5; }
  a { color: var(--text); text-decoration: none; }

  /* Layout */
  .shell { display: flex; height: 100vh; }
  .sidebar { width: 220px; background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; flex-shrink: 0; }
  .sidebar-logo { padding: 20px 16px; border-bottom: 1px solid var(--border); }
  .sidebar-logo h1 { font-size: 14px; font-weight: 600; letter-spacing: 1px; }
  .sidebar-logo span { color: var(--text2); font-size: 11px; display: block; margin-top: 2px; }
  .nav { flex: 1; padding: 8px 0; overflow-y: auto; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 8px 16px; cursor: pointer; transition: background 0.15s; }
  .nav-item:hover { background: var(--surface2); }
  .nav-item.active { background: var(--surface2); border-left: 2px solid var(--pink); }
  .nav-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .nav-label { font-size: 12px; }
  .nav-badge { margin-left: auto; font-size: 10px; color: var(--text2); background: var(--bg); padding: 1px 6px; border-radius: 8px; }
  .main { flex: 1; overflow-y: auto; padding: 24px; }
  .main h2 { font-size: 16px; font-weight: 600; margin-bottom: 16px; }

  /* Cards */
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin-bottom: 24px; }
  .card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 16px; }
  .card-label { font-size: 11px; color: var(--text2); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .card-value { font-size: 24px; font-weight: 700; }
  .card-sub { font-size: 11px; color: var(--text2); margin-top: 2px; }

  /* Tables */
  .table-wrap { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; margin-bottom: 24px; }
  .table-title { padding: 12px 16px; font-size: 13px; font-weight: 600; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; padding: 8px 16px; font-size: 11px; color: var(--text2); text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid var(--border); font-weight: 500; }
  td { padding: 8px 16px; border-bottom: 1px solid var(--border); font-size: 12px; }
  tr:last-child td { border-bottom: none; }
  tr:hover { background: var(--surface2); }

  /* Status indicators */
  .status { display: inline-flex; align-items: center; gap: 6px; }
  .dot { width: 6px; height: 6px; border-radius: 50%; }
  .dot-green { background: var(--green); box-shadow: 0 0 6px var(--green); }
  .dot-red { background: var(--red); box-shadow: 0 0 6px var(--red); }
  .dot-amber { background: var(--amber); box-shadow: 0 0 6px var(--amber); }

  /* Priority bars */
  .priority-bar { height: 6px; border-radius: 3px; background: var(--border); overflow: hidden; margin-top: 6px; }
  .priority-fill { height: 100%; border-radius: 3px; transition: width 0.3s; }

  /* Sections */
  .section { margin-bottom: 32px; }
  .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .section-header h3 { font-size: 14px; font-weight: 600; }

  /* Domain grid */
  .domain-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px; }
  .domain-chip { background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 8px 12px; font-size: 11px; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: border-color 0.15s; }
  .domain-chip:hover { border-color: var(--pink); }
  .domain-chip a { color: var(--text); }

  /* Todo items */
  .todo-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 16px; border-bottom: 1px solid var(--border); }
  .todo-item:last-child { border-bottom: none; }
  .todo-check { width: 14px; height: 14px; border: 1px solid var(--border); border-radius: 3px; flex-shrink: 0; margin-top: 2px; cursor: pointer; }
  .todo-check.done { background: var(--green); border-color: var(--green); }
  .todo-text { font-size: 12px; flex: 1; }
  .todo-tag { font-size: 10px; padding: 1px 6px; border-radius: 4px; background: var(--bg); color: var(--text2); }

  /* Live check */
  .live-btn { background: var(--surface2); border: 1px solid var(--border); color: var(--text); padding: 4px 12px; border-radius: 4px; font-size: 11px; cursor: pointer; font-family: inherit; }
  .live-btn:hover { border-color: var(--pink); }
  .checking { color: var(--amber); }
  .result-ok { color: var(--green); }
  .result-fail { color: var(--red); }

  /* Responsive */
  @media (max-width: 768px) {
    .shell { flex-direction: column; }
    .sidebar { width: 100%; height: auto; flex-direction: row; overflow-x: auto; }
    .sidebar-logo { display: none; }
    .nav { display: flex; padding: 0; }
    .nav-item { white-space: nowrap; padding: 12px 16px; }
    .nav-item.active { border-left: none; border-bottom: 2px solid var(--pink); }
    .grid { grid-template-columns: repeat(2, 1fr); }
  }
</style>
</head>
<body>
<div class="shell">
  <div class="sidebar">
    <div class="sidebar-logo">
      <h1>BLACKROAD OPS</h1>
      <span>BlackRoad OS, Inc.</span>
    </div>
    <div class="nav" id="nav">
      <div class="nav-item active" data-page="dashboard">
        <div class="nav-dot" style="background:var(--pink)"></div>
        <span class="nav-label">Dashboard</span>
      </div>
      <div class="nav-item" data-page="fleet">
        <div class="nav-dot" style="background:var(--green)"></div>
        <span class="nav-label">Fleet</span>
        <span class="nav-badge">7</span>
      </div>
      <div class="nav-item" data-page="products">
        <div class="nav-dot" style="background:var(--amber)"></div>
        <span class="nav-label">Products</span>
        <span class="nav-badge">92</span>
      </div>
      <div class="nav-item" data-page="todos">
        <div class="nav-dot" style="background:var(--blue)"></div>
        <span class="nav-label">Todos</span>
        <span class="nav-badge">2,448</span>
      </div>
      <div class="nav-item" data-page="domains">
        <div class="nav-dot" style="background:var(--violet)"></div>
        <span class="nav-label">Domains</span>
        <span class="nav-badge">20</span>
      </div>
      <div class="nav-item" data-page="workers">
        <div class="nav-dot" style="background:var(--pink)"></div>
        <span class="nav-label">Workers</span>
        <span class="nav-badge">496</span>
      </div>
      <div class="nav-item" data-page="repos">
        <div class="nav-dot" style="background:var(--green)"></div>
        <span class="nav-label">Repos</span>
        <span class="nav-badge">2,443</span>
      </div>
      <div class="nav-item" data-page="finance">
        <div class="nav-dot" style="background:var(--amber)"></div>
        <span class="nav-label">Finance</span>
      </div>
      <div class="nav-item" data-page="memory">
        <div class="nav-dot" style="background:var(--blue)"></div>
        <span class="nav-label">Memory</span>
        <span class="nav-badge">4,736</span>
      </div>
    </div>
  </div>
  <div class="main" id="main"></div>
</div>

<script>
const state = {
  fleet: null,
  domains: null,
  kpis: null,
  domainChecks: {},
};

// Navigation
document.getElementById('nav').addEventListener('click', e => {
  const item = e.target.closest('.nav-item');
  if (!item) return;
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  item.classList.add('active');
  renderPage(item.dataset.page);
});

async function fetchJSON(url) {
  const r = await fetch(url);
  return r.json();
}

async function init() {
  state.kpis = await fetchJSON('/api/kpis');
  state.fleet = await fetchJSON('/api/fleet');
  state.domains = await fetchJSON('/api/domains');
  state.workers = await fetchJSON('/api/workers');
  renderPage('dashboard');
}

function renderPage(page) {
  const main = document.getElementById('main');
  const pages = {
    dashboard: renderDashboard,
    fleet: renderFleet,
    products: renderProducts,
    todos: renderTodos,
    domains: renderDomains,
    workers: renderWorkers,
    repos: renderRepos,
    finance: renderFinance,
    memory: renderMemory,
  };
  main.innerHTML = (pages[page] || renderDashboard)();
  if (page === 'domains') attachDomainChecks();
}

function renderDashboard() {
  const k = state.kpis;
  return \`
    <h2>Dashboard</h2>
    <div class="grid">
      <div class="card">
        <div class="card-label">Fleet Nodes</div>
        <div class="card-value">\${k.fleet.online}<span style="color:var(--text2);font-size:14px">/\${k.fleet.total}</span></div>
        <div class="card-sub">\${k.fleet.offlineNames.join(', ')} offline</div>
      </div>
      <div class="card">
        <div class="card-label">CF Workers</div>
        <div class="card-value">\${k.workers}</div>
        <div class="card-sub">Deployed</div>
      </div>
      <div class="card">
        <div class="card-label">Products</div>
        <div class="card-value">\${k.products.live}<span style="color:var(--text2);font-size:14px">/\${k.products.total}</span></div>
        <div class="card-sub">\${k.products.building} building, \${k.products.planned} planned</div>
      </div>
      <div class="card">
        <div class="card-label">Domains</div>
        <div class="card-value">\${k.domains}</div>
        <div class="card-sub">Root custom domains</div>
      </div>
      <div class="card">
        <div class="card-label">Repos</div>
        <div class="card-value">\${k.repos.enterprise.toLocaleString()}</div>
        <div class="card-sub">\${k.repos.orgs} orgs</div>
      </div>
      <div class="card">
        <div class="card-label">Todos</div>
        <div class="card-value">\${k.todos.total.toLocaleString()}</div>
        <div class="card-sub">\${k.todos.projects} projects</div>
      </div>
      <div class="card">
        <div class="card-label">Codex Solutions</div>
        <div class="card-value">\${k.codex.solutions}</div>
        <div class="card-sub">\${k.codex.patterns} patterns</div>
      </div>
      <div class="card">
        <div class="card-label">Memory Entries</div>
        <div class="card-value">\${k.memory.entries.toLocaleString()}</div>
        <div class="card-sub">Journal chain</div>
      </div>
      <div class="card">
        <div class="card-label">Stripe</div>
        <div class="card-value">$\${k.stripe.balance}</div>
        <div class="card-sub">\${k.stripe.products} products (\${k.stripe.mode})</div>
      </div>
      <div class="card">
        <div class="card-label">D1 Databases</div>
        <div class="card-value">\${k.d1Databases}</div>
        <div class="card-sub">Cloudflare D1</div>
      </div>
    </div>

    <div class="section">
      <div class="section-header"><h3>Priority Stack</h3></div>
      \${renderPriorityStack()}
    </div>

    <div class="section">
      <div class="section-header"><h3>Fleet Status</h3></div>
      \${renderFleetTable()}
    </div>
  \`;
}

function renderPriorityStack() {
  const priorities = [
    { id: 'P0', name: 'First Real User', progress: 31, done: 36, total: 119, color: 'var(--red)' },
    { id: 'P1', name: 'Fix Products', progress: 18, done: 29, total: 171, color: 'var(--pink)' },
    { id: 'P2', name: 'SEO/Discoverability', progress: 52, done: 50, total: 99, color: 'var(--amber)' },
    { id: 'P3', name: 'Infra Maintenance', progress: 7, done: 8, total: 101, color: 'var(--blue)' },
    { id: 'P4', name: 'Truth/Credibility', progress: 18, done: 11, total: 64, color: 'var(--violet)' },
    { id: 'P5', name: 'OpenClaw', progress: 0, done: 0, total: 53, color: 'var(--text2)' },
    { id: 'P6', name: 'Amundson Math', progress: 0, done: 0, total: 52, color: 'var(--text2)' },
    { id: 'P7', name: 'Operator Tooling', progress: 0, done: 0, total: 72, color: 'var(--text2)' },
    { id: 'P8', name: 'Revenue', progress: 0, done: 0, total: 51, color: 'var(--text2)' },
    { id: 'P9', name: 'Org Architecture', progress: 1, done: 2, total: 192, color: 'var(--text2)' },
  ];
  return \`<div class="table-wrap"><table>
    <tr><th>Priority</th><th>Project</th><th>Progress</th><th>Done</th><th></th></tr>
    \${priorities.map(p => \`<tr>
      <td><strong>\${p.id}</strong></td>
      <td>\${p.name}</td>
      <td>\${p.done}/\${p.total}</td>
      <td style="width:40%">
        <div style="display:flex;align-items:center;gap:8px;">
          <div class="priority-bar" style="flex:1"><div class="priority-fill" style="width:\${p.progress}%;background:\${p.color}"></div></div>
          <span style="font-size:11px;color:var(--text2)">\${p.progress}%</span>
        </div>
      </td>
    </tr>\`).join('')}
  </table></div>\`;
}

function renderFleetTable() {
  if (!state.fleet) return '<div>Loading...</div>';
  return \`<div class="table-wrap"><table>
    <tr><th>Node</th><th>IP</th><th>Role</th><th>Hardware</th><th>Storage</th><th>Status</th></tr>
    \${state.fleet.nodes.map(n => \`<tr>
      <td><strong>\${n.name}</strong></td>
      <td style="font-size:11px">\${n.ip}</td>
      <td style="font-size:11px;max-width:250px;overflow:hidden;text-overflow:ellipsis">\${n.role}</td>
      <td style="font-size:11px">\${n.hw}</td>
      <td style="font-size:11px">\${n.storage}</td>
      <td><span class="status"><span class="dot \${n.status === 'online' ? 'dot-green' : 'dot-red'}"></span>\${n.status}</span></td>
    </tr>\`).join('')}
  </table></div>\`;
}

function renderFleet() {
  return \`<h2>Fleet Management</h2>\${renderFleetTable()}
  <div class="section">
    <div class="section-header"><h3>WireGuard Mesh</h3></div>
    <div class="table-wrap"><table>
      <tr><th>Peer</th><th>WG IP</th><th>Endpoint</th><th>Status</th></tr>
      <tr><td>Anastasia (hub)</td><td>—</td><td>174.138.44.45:51820</td><td><span class="status"><span class="dot dot-green"></span>Hub</span></td></tr>
      <tr><td>Alice</td><td>10.8.0.6</td><td>74.43.5.135:39593</td><td><span class="status"><span class="dot dot-green"></span>Active</span></td></tr>
      <tr><td>Cecilia</td><td>10.8.0.3</td><td>74.43.5.135:1031</td><td><span class="status"><span class="dot dot-green"></span>Active</span></td></tr>
      <tr><td>Octavia</td><td>10.8.0.4</td><td>—</td><td><span class="status"><span class="dot dot-red"></span>Offline</span></td></tr>
      <tr><td>Aria</td><td>10.8.0.7</td><td>74.43.5.135:1033</td><td><span class="status"><span class="dot dot-green"></span>Active</span></td></tr>
      <tr><td>Gematria</td><td>10.8.0.8</td><td>159.65.43.12:37637</td><td><span class="status"><span class="dot dot-amber"></span>WG only</span></td></tr>
    </table></div>
  </div>
  <div class="section">
    <div class="section-header"><h3>Tailscale</h3></div>
    <div class="table-wrap"><table>
      <tr><th>Node</th><th>Tailscale IP</th><th>OS</th><th>Status</th></tr>
      <tr><td>Alexandria (Mac)</td><td>100.117.200.23</td><td>macOS</td><td><span class="status"><span class="dot dot-green"></span>Online</span></td></tr>
      <tr><td>Gematria</td><td>100.108.132.8</td><td>Linux</td><td><span class="status"><span class="dot dot-green"></span>Online</span></td></tr>
      <tr><td>Anastasia</td><td>100.94.33.37</td><td>Linux</td><td><span class="status"><span class="dot dot-green"></span>Online</span></td></tr>
      <tr><td>iPhone</td><td>100.77.186.122</td><td>iOS</td><td><span class="status"><span class="dot dot-green"></span>Online</span></td></tr>
      <tr><td>Alice</td><td>100.77.210.18</td><td>Linux</td><td><span class="status"><span class="dot dot-red"></span>Offline 8d</span></td></tr>
      <tr><td>Octavia</td><td>100.83.149.86</td><td>Linux</td><td><span class="status"><span class="dot dot-red"></span>Offline 8d</span></td></tr>
      <tr><td>Lucidia</td><td>100.66.235.47</td><td>Linux</td><td><span class="status"><span class="dot dot-red"></span>Offline 3d</span></td></tr>
      <tr><td>Cecilia</td><td>100.72.180.98</td><td>Linux</td><td><span class="status"><span class="dot dot-red"></span>Offline 35d</span></td></tr>
      <tr><td>Aria</td><td>100.109.14.17</td><td>Linux</td><td><span class="status"><span class="dot dot-red"></span>Offline 35d</span></td></tr>
    </table></div>
  </div>\`;
}

function renderProducts() {
  const live = [
    { name: 'Search', url: 'search.blackroad.io', desc: 'AI-powered search across BlackRoad' },
    { name: 'Chat', url: 'chat.blackroad.io', desc: 'Multi-agent sovereign chat (D1-backed)' },
    { name: 'RoundTrip', url: 'roadtrip.blackroad.io', desc: '109 agents, 8 channels, D1 persistence' },
    { name: 'Auth', url: 'auth.blackroad.io', desc: 'JWT signup/signin, user management' },
    { name: 'Tutor', url: 'tutor.blackroad.io', desc: 'AI homework solver with Stripe paywall' },
    { name: 'App', url: 'app.blackroad.io', desc: 'Browser-based OS desktop dashboard' },
    { name: 'Status', url: 'status.blackroad.io', desc: 'Fleet and service health monitoring' },
    { name: 'Canvas', url: 'canvas.blackroad.io', desc: 'Creative tools and drawing' },
    { name: 'Cadence', url: 'cadence.blackroad.io', desc: 'Music and audio production' },
    { name: 'RoadCode', url: 'roadcode.blackroad.io', desc: 'Code editor and deployment' },
    { name: 'Video', url: 'video.blackroad.io', desc: 'Video streaming and hosting' },
    { name: 'Live', url: 'live.blackroad.io', desc: 'Live streaming platform' },
    { name: 'Game', url: 'game.blackroad.io', desc: 'Browser games and metaverse' },
    { name: 'Social', url: 'social.blackroad.io', desc: 'Social networking (BackRoad)' },
    { name: 'Book', url: 'book.blackroad.io', desc: 'Publishing and reading' },
    { name: 'Work', url: 'work.blackroad.io', desc: 'Project management' },
    { name: 'Radio', url: 'radio.blackroad.io', desc: 'Audio streaming' },
    { name: 'Pay', url: 'pay.blackroad.io', desc: 'Payments (RoadPay + Stripe)' },
  ];
  return \`<h2>Products</h2>
    <div class="grid">
      <div class="card"><div class="card-label">Live</div><div class="card-value" style="color:var(--green)">26</div></div>
      <div class="card"><div class="card-label">Building</div><div class="card-value" style="color:var(--amber)">37</div></div>
      <div class="card"><div class="card-label">Planned</div><div class="card-value" style="color:var(--text2)">29</div></div>
      <div class="card"><div class="card-label">Total</div><div class="card-value">92</div></div>
    </div>
    <div class="table-wrap">
      <div class="table-title">Live Products <button class="live-btn" onclick="checkAllProducts()">Check All</button></div>
      <table>
        <tr><th>Product</th><th>URL</th><th>Description</th><th>Status</th></tr>
        \${live.map(p => \`<tr>
          <td><strong>\${p.name}</strong></td>
          <td><a href="https://\${p.url}" target="_blank" style="color:var(--blue)">\${p.url}</a></td>
          <td style="font-size:11px">\${p.desc}</td>
          <td id="prod-\${p.name}"><span class="status"><span class="dot dot-amber"></span>—</span></td>
        </tr>\`).join('')}
      </table>
    </div>\`;
}

function renderTodos() {
  const priorities = [
    { id: 'P0', name: 'First Real User', progress: 31, done: 36, total: 119, color: 'var(--red)', key: 'Get first real external user' },
    { id: 'P1', name: 'Fix Products', progress: 18, done: 29, total: 171, color: 'var(--pink)', key: 'Fix chat/search/roundtrip/auth end-to-end' },
    { id: 'P2', name: 'SEO/Discoverability', progress: 52, done: 50, total: 99, color: 'var(--amber)', key: 'GitHub topics, Google indexing, Bing' },
    { id: 'P3', name: 'Infra Maintenance', progress: 7, done: 8, total: 101, color: 'var(--blue)', key: 'Fleet health, backups, monitoring' },
    { id: 'P4', name: 'Truth/Credibility', progress: 18, done: 11, total: 64, color: 'var(--violet)', key: 'Fix inflated claims, add /legal /privacy' },
    { id: 'P5', name: 'OpenClaw', progress: 0, done: 0, total: 53, color: 'var(--text2)', key: 'Personal AI assistant on all channels' },
    { id: 'P6', name: 'Amundson Math', progress: 0, done: 0, total: 52, color: 'var(--text2)', key: 'Publish paper, OEIS, arXiv' },
    { id: 'P7', name: 'Operator Tooling', progress: 0, done: 0, total: 72, color: 'var(--text2)', key: 'br CLI commands for everything' },
    { id: 'P8', name: 'Revenue', progress: 0, done: 0, total: 51, color: 'var(--text2)', key: 'Stripe live, pricing, first dollar' },
    { id: 'P9', name: 'Org Architecture', progress: 1, done: 2, total: 192, color: 'var(--text2)', key: 'Wire 34 orgs, clean 2443 repos' },
  ];
  const totalDone = priorities.reduce((s, p) => s + p.done, 0);
  const totalAll = priorities.reduce((s, p) => s + p.total, 0);
  const overallPct = Math.round(totalDone / totalAll * 100);

  return \`<h2>Todos &amp; Projects</h2>
    <div class="grid">
      <div class="card"><div class="card-label">Total Todos</div><div class="card-value">2,448</div></div>
      <div class="card"><div class="card-label">Projects</div><div class="card-value">118</div></div>
      <div class="card"><div class="card-label">Priority Done</div><div class="card-value">\${totalDone}/\${totalAll}</div><div class="card-sub">\${overallPct}% complete</div></div>
      <div class="card"><div class="card-label">Urgent</div><div class="card-value" style="color:var(--red)">Form 1120</div><div class="card-sub">Due Apr 15, 2026</div></div>
    </div>
    <div class="table-wrap">
      <div class="table-title">Priority Stack</div>
      <table>
        <tr><th>ID</th><th>Project</th><th>Focus</th><th>Progress</th><th></th></tr>
        \${priorities.map(p => \`<tr>
          <td><strong style="color:\${p.color}">\${p.id}</strong></td>
          <td><strong>\${p.name}</strong></td>
          <td style="font-size:11px;color:var(--text2)">\${p.key}</td>
          <td>\${p.done}/\${p.total}</td>
          <td style="width:30%">
            <div style="display:flex;align-items:center;gap:8px;">
              <div class="priority-bar" style="flex:1"><div class="priority-fill" style="width:\${p.progress}%;background:\${p.color}"></div></div>
              <span style="font-size:11px;color:var(--text2)">\${p.progress}%</span>
            </div>
          </td>
        </tr>\`).join('')}
      </table>
    </div>
    <div class="table-wrap">
      <div class="table-title">Other Active Projects (108 more)</div>
      <table>
        <tr><th>Project</th><th>Progress</th><th>Cadence</th></tr>
        <tr><td>first-revenue</td><td>66% (4/6)</td><td>Forever</td></tr>
        <tr><td>roadwork-education</td><td>66% (4/6)</td><td>Forever</td></tr>
        <tr><td>security-hardening</td><td>72% (8/11)</td><td>Weekly</td></tr>
        <tr><td>web-presence-audit</td><td>67% (21/31)</td><td>Monthly</td></tr>
        <tr><td>product-shipping</td><td>63% (7/11)</td><td>Forever</td></tr>
        <tr><td>community</td><td>55% (5/9)</td><td>Forever</td></tr>
        <tr><td>testing</td><td>55% (11/20)</td><td>Forever</td></tr>
        <tr><td>browser-os</td><td>50% (3/6)</td><td>Forever</td></tr>
        <tr><td>fleet-hardware</td><td>50% (6/12)</td><td>Monthly</td></tr>
        <tr><td>data-backups</td><td>57% (4/7)</td><td>Weekly</td></tr>
      </table>
    </div>\`;
}

function renderDomains() {
  if (!state.domains) return '<h2>Domains</h2><div>Loading...</div>';
  return \`<h2>Domains</h2>
    <div class="grid">
      <div class="card"><div class="card-label">Root Domains</div><div class="card-value">\${state.domains.domains.length}</div></div>
      <div class="card"><div class="card-label">Subdomains</div><div class="card-value">\${state.domains.subdomains.length}</div></div>
      <div class="card"><div class="card-label">Total</div><div class="card-value">\${state.domains.domains.length + state.domains.subdomains.length}</div></div>
    </div>
    <div class="section">
      <div class="section-header"><h3>Root Domains</h3><button class="live-btn" onclick="checkAllDomains('root')">Check All</button></div>
      <div class="domain-grid">
        \${state.domains.domains.map(d => \`<div class="domain-chip" data-domain="\${d}">
          <span class="dot dot-amber" id="dot-\${d.replace(/\./g,'-')}"></span>
          <a href="https://\${d}" target="_blank">\${d}</a>
          <span id="status-\${d.replace(/\./g,'-')}" style="margin-left:auto;font-size:10px;color:var(--text2)">—</span>
        </div>\`).join('')}
      </div>
    </div>
    <div class="section" style="margin-top:24px">
      <div class="section-header"><h3>Product Subdomains</h3><button class="live-btn" onclick="checkAllDomains('sub')">Check All</button></div>
      <div class="domain-grid">
        \${state.domains.subdomains.map(d => \`<div class="domain-chip" data-domain="\${d}">
          <span class="dot dot-amber" id="dot-\${d.replace(/\./g,'-')}"></span>
          <a href="https://\${d}" target="_blank">\${d}</a>
          <span id="status-\${d.replace(/\./g,'-')}" style="margin-left:auto;font-size:10px;color:var(--text2)">—</span>
        </div>\`).join('')}
      </div>
    </div>\`;
}

function renderWorkers() {
  const w = state.workers;
  const cats = Object.entries(w.categories).sort((a,b) => b[1] - a[1]);
  return \`<h2>Cloudflare Workers</h2>
    <div class="grid">
      <div class="card"><div class="card-label">Total Workers</div><div class="card-value">\${w.total}</div></div>
      <div class="card"><div class="card-label">Categories</div><div class="card-value">\${cats.length}</div></div>
      <div class="card"><div class="card-label">Account</div><div class="card-value" style="font-size:14px">BlackRoad</div><div class="card-sub">amundsonalexa@gmail.com</div></div>
    </div>
    <div class="table-wrap">
      <div class="table-title">Workers by Category</div>
      <table>
        <tr><th>Category</th><th>Count</th><th></th></tr>
        \${cats.map(([name, count]) => \`<tr>
          <td>\${name}</td>
          <td>\${count}</td>
          <td style="width:50%">
            <div class="priority-bar"><div class="priority-fill" style="width:\${Math.round(count/w.total*100)}%;background:var(--pink)"></div></div>
          </td>
        </tr>\`).join('')}
      </table>
    </div>\`;
}

function renderRepos() {
  return \`<h2>GitHub Repos</h2>
    <div class="grid">
      <div class="card"><div class="card-label">Enterprise</div><div class="card-value" style="font-size:14px">blackroad-os</div><div class="card-sub">github.com/enterprises/blackroad-os</div></div>
      <div class="card"><div class="card-label">Total Repos</div><div class="card-value">2,443</div></div>
      <div class="card"><div class="card-label">Orgs</div><div class="card-value">34</div></div>
      <div class="card"><div class="card-label">Seats</div><div class="card-value">1,000</div></div>
    </div>
    <div class="table-wrap">
      <div class="table-title">Key Organizations</div>
      <table>
        <tr><th>Org</th><th>Role</th><th>Repos</th></tr>
        <tr><td><strong>BlackRoad-OS-Inc</strong></td><td>Parent corporation — all IP lives here</td><td>213</td></tr>
        <tr><td><strong>BlackRoadOS</strong></td><td>Public-facing product org</td><td>1</td></tr>
        <tr><td><strong>BlackRoad-OS</strong></td><td>Legacy org (mass repos)</td><td>1,271</td></tr>
        <tr><td><strong>BlackRoad-AI</strong></td><td>AI vertical</td><td>~50</td></tr>
        <tr><td><strong>BlackRoad-Labs</strong></td><td>Research</td><td>~30</td></tr>
        <tr><td><strong>Blackbox-Enterprises</strong></td><td>Enterprise tools</td><td>~40</td></tr>
        <tr><td><strong>blackboxprogramming</strong></td><td>Personal (Alexa)</td><td>21</td></tr>
        <tr><td colspan="2" style="color:var(--text2)">+ 27 more sub-orgs</td><td></td></tr>
      </table>
    </div>
    <div class="table-wrap">
      <div class="table-title">Enterprise Config</div>
      <table>
        <tr><th>Setting</th><th>Value</th></tr>
        <tr><td>Billing</td><td>$21/mo seat + $1 budgets on 7 products</td></tr>
        <tr><td>SHA Pinning</td><td><span class="status"><span class="dot dot-green"></span>Enabled</span></td></tr>
        <tr><td>Rulesets</td><td>5 (branch protect, tag protect, sensitive files, agent config)</td></tr>
        <tr><td>.github repos</td><td>34 standardized (SECURITY/COC/CONTRIBUTING/CODEOWNERS)</td></tr>
        <tr><td>Self-hosted Runners</td><td>4 (octavia-pi, lucidia-pi [arm64], gematria, anastasia [x64])</td></tr>
      </table>
    </div>\`;
}

function renderFinance() {
  return \`<h2>Finance</h2>
    <div class="grid">
      <div class="card"><div class="card-label">Stripe Balance</div><div class="card-value">$0</div><div class="card-sub">Test mode</div></div>
      <div class="card"><div class="card-label">MRR</div><div class="card-value">$0</div><div class="card-sub">Pre-revenue</div></div>
      <div class="card"><div class="card-label">Monthly Costs</div><div class="card-value">~$33</div><div class="card-sub">DO $12 + domains + GH</div></div>
      <div class="card"><div class="card-label">Runway</div><div class="card-value" style="color:var(--amber)">Bootstrap</div><div class="card-sub">Self-funded</div></div>
    </div>
    <div class="table-wrap">
      <div class="table-title">Stripe Products</div>
      <table>
        <tr><th>Product</th><th>ID</th><th>Status</th><th>Mode</th></tr>
        <tr><td>BlackRoad Sovereign</td><td style="font-size:10px">prod_U77DVy8YSo3nvT</td><td><span class="status"><span class="dot dot-green"></span>Active</span></td><td>Test</td></tr>
        <tr><td>Homework Solution</td><td style="font-size:10px">—</td><td><span class="status"><span class="dot dot-green"></span>Active</span></td><td>Test</td></tr>
      </table>
    </div>
    <div class="table-wrap">
      <div class="table-title">Monthly Costs Breakdown</div>
      <table>
        <tr><th>Item</th><th>Cost</th><th>Notes</th></tr>
        <tr><td>DigitalOcean (2 droplets)</td><td>$12/mo</td><td>Gematria 4vCPU + Anastasia 1vCPU</td></tr>
        <tr><td>GitHub Enterprise</td><td>$21/mo</td><td>1 seat</td></tr>
        <tr><td>Cloudflare</td><td>$0</td><td>Free plan (Workers, D1, R2, Pages)</td></tr>
        <tr><td>Domains (~20)</td><td>~$15/mo</td><td>Amortized annual renewal</td></tr>
        <tr><td>Electricity (5 Pis)</td><td>~$5/mo</td><td>Estimated</td></tr>
        <tr><td><strong>Total</strong></td><td><strong>~$53/mo</strong></td><td></td></tr>
      </table>
    </div>
    <div class="table-wrap">
      <div class="table-title">Corporate Entity</div>
      <table>
        <tr><th>Field</th><th>Value</th></tr>
        <tr><td>Legal Name</td><td>BlackRoad OS, Inc.</td></tr>
        <tr><td>Formation</td><td>November 17, 2025 — Delaware C-Corp (Stripe Atlas)</td></tr>
        <tr><td>EIN</td><td>41-2663817</td></tr>
        <tr><td>File #</td><td>10405914</td></tr>
        <tr><td>Registered Agent</td><td>Legalinc Corporate Services Inc.</td></tr>
        <tr><td>Stock</td><td>10M shares Common authorized ($0.00001 par)</td></tr>
        <tr><td>83(b) Election</td><td>Filed</td></tr>
        <tr><td style="color:var(--red)">Form 1120 Due</td><td style="color:var(--red)"><strong>April 15, 2026</strong></td></tr>
      </table>
    </div>\`;
}

function renderMemory() {
  return \`<h2>Memory System</h2>
    <div class="grid">
      <div class="card"><div class="card-label">Journal Entries</div><div class="card-value">4,736</div></div>
      <div class="card"><div class="card-label">Codex Solutions</div><div class="card-value">714</div></div>
      <div class="card"><div class="card-label">Patterns</div><div class="card-value">56</div></div>
      <div class="card"><div class="card-label">Ledger Size</div><div class="card-value">37MB</div></div>
    </div>
    <div class="table-wrap">
      <div class="table-title">Memory Scripts</div>
      <table>
        <tr><th>Script</th><th>Purpose</th></tr>
        <tr><td>memory-system.sh</td><td>Core journal + chain</td></tr>
        <tr><td>memory-codex.sh</td><td>Solutions &amp; patterns database (714 solutions)</td></tr>
        <tr><td>memory-infinite-todos.sh</td><td>Long-running projects (118 projects, 2,448 todos)</td></tr>
        <tr><td>memory-task-marketplace.sh</td><td>Claimable tasks (SQLite)</td></tr>
        <tr><td>memory-til-broadcast.sh</td><td>Today-I-Learned broadcasts</td></tr>
        <tr><td>memory-indexer.sh</td><td>FTS5 search + knowledge graph</td></tr>
        <tr><td>memory-security.sh</td><td>Agent identity + audit</td></tr>
        <tr><td>memory-collaboration.sh</td><td>Claude-to-Claude collab + messaging</td></tr>
        <tr><td>memory-products.sh</td><td>Product registry (92 products)</td></tr>
      </table>
    </div>
    <div class="table-wrap">
      <div class="table-title">Active Collab Sessions</div>
      <table>
        <tr><th>Session</th><th>Last Activity</th></tr>
        <tr><td>collab-20260328-165759-28815</td><td>Product fixes, fleet benchmarks, auth integration</td></tr>
        <tr><td>collab-20260328-231613-19344</td><td>Recent session</td></tr>
        <tr><td>collab-20260328-231657-81165</td><td>Recent session</td></tr>
        <tr><td>collab-20260328-231807-20807</td><td>Current session</td></tr>
      </table>
    </div>
    <div class="table-wrap">
      <div class="table-title">Top Codex Patterns</div>
      <table>
        <tr><th>Pattern</th><th>Confidence</th></tr>
        <tr><td>Pre-work Conflict Check</td><td>98%</td></tr>
        <tr><td>Repository Enhancement Workflow</td><td>95%</td></tr>
        <tr><td>Fleet Health Check Workflow</td><td>95%</td></tr>
        <tr><td>Cron Job Hardening</td><td>95%</td></tr>
        <tr><td>Cloudflare Deploy Pattern</td><td>95%</td></tr>
      </table>
    </div>\`;
}

// Live domain checking
function attachDomainChecks() {
  document.querySelectorAll('.domain-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const domain = chip.dataset.domain;
      checkDomain(domain);
    });
  });
}

async function checkDomain(domain) {
  const key = domain.replace(/\./g, '-');
  const dot = document.getElementById('dot-' + key);
  const status = document.getElementById('status-' + key);
  if (!dot || !status) return;
  status.textContent = '...';
  status.className = 'checking';
  try {
    const r = await fetch('https://' + domain, { mode: 'no-cors', signal: AbortSignal.timeout(5000) });
    dot.className = 'dot dot-green';
    status.textContent = 'OK';
    status.className = 'result-ok';
  } catch (e) {
    dot.className = 'dot dot-red';
    status.textContent = 'ERR';
    status.className = 'result-fail';
  }
}

async function checkAllDomains(type) {
  const domains = type === 'root' ? state.domains.domains : state.domains.subdomains;
  for (const d of domains) {
    checkDomain(d); // fire in parallel
  }
}

async function checkAllProducts() {
  const products = ['Search','Chat','RoundTrip','Auth','Tutor','App','Status','Canvas','Cadence','RoadCode','Video','Live','Game','Social','Book','Work','Radio','Pay'];
  const urls = {
    Search:'search.blackroad.io', Chat:'chat.blackroad.io', RoundTrip:'roadtrip.blackroad.io',
    Auth:'auth.blackroad.io', Tutor:'tutor.blackroad.io', App:'app.blackroad.io',
    Status:'status.blackroad.io', Canvas:'canvas.blackroad.io', Cadence:'cadence.blackroad.io',
    RoadCode:'roadcode.blackroad.io', Video:'video.blackroad.io', Live:'live.blackroad.io',
    Game:'game.blackroad.io', Social:'social.blackroad.io', Book:'book.blackroad.io',
    Work:'work.blackroad.io', Radio:'radio.blackroad.io', Pay:'pay.blackroad.io',
  };
  for (const name of products) {
    const el = document.getElementById('prod-' + name);
    if (!el) continue;
    el.innerHTML = '<span class="checking">...</span>';
    try {
      await fetch('https://' + urls[name], { mode: 'no-cors', signal: AbortSignal.timeout(5000) });
      el.innerHTML = '<span class="status"><span class="dot dot-green"></span>OK</span>';
    } catch {
      el.innerHTML = '<span class="status"><span class="dot dot-red"></span>ERR</span>';
    }
  }
}

init();
<\/script>
</body>
</html>`;
}
__name(renderApp, "renderApp");
export {
  index_default as default
};
//# sourceMappingURL=index.js.map

