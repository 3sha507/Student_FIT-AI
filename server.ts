import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("fitness.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    profile JSON,
    current_plan JSON,
    progress JSON
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/user/:id", (req, res) => {
    const { id } = req.params;
    const { profile, current_plan, progress } = req.body;
    
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO users (id, profile, current_plan, progress)
      VALUES (?, ?, ?, ?)
    `);
    
    stmt.run(
      id, 
      JSON.stringify(profile || {}), 
      JSON.stringify(current_plan || {}), 
      JSON.stringify(progress || [])
    );
    
    res.json({ success: true });
  });

  app.get("/api/user/:id", (req, res) => {
    const { id } = req.params;
    const row = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as any;
    
    if (row) {
      res.json({
        id: row.id,
        profile: JSON.parse(row.profile),
        current_plan: JSON.parse(row.current_plan),
        progress: JSON.parse(row.progress)
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
