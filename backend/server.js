import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import "dotenv/config"
import productRoute from "./routes/productRoutes.js"
import { sql } from "./config/db.js"
import { aj } from "./lib/arkJet.js"
import path from "path"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()


app.use(express.json())
app.use(cors())
app.use(helmet(
  {contentSecurityPolicy:false}
))
app.use(morgan("dev"))
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // specifies that each request consumes 1 token
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot access denied" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    }
    // check for spoofed bots
    if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
    res.status(403).json({ error: "Spoofed bot detected" });
    return;
    }

    next()
    } catch (error) {
    console.log("Arcjet error", error);
    next(error);
    }
});


app.use("/api/products",productRoute)

if(process.env.NODE_ENV === "production"){
  
  app.use(express.static(path.join(__dirname, "..", "frontend", "dist")))
  app.get((req,res)=>{
    res.sendFile(path.resolve(__dirname, "..", "frontend", "dist", "index.html"))
  })
}

async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error initDB", error);
  }
}
initDB().then(()=>{
    
    app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
    })
}
)


