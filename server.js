import express from "express";
import cors from "cors";
import pkg from "@supabase/supabase-js";

const { createClient } = pkg;

const app = express();
app.use(cors());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // 🔐 IMPORTANT (not anon key)
);

// ✅ PAGINATION + FILTER API
app.get("/data", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from("submissions1").select("*", { count: "exact" });

    // 🔍 Filters
    if (req.query.country) {
      query = query.eq("Country", req.query.country);
    }

    if (req.query.search) {
      query = query.ilike("Company_Name", `%${req.query.search}%`);
    }

    // 📅 Date filter
    if (req.query.fromDate) {
      query = query.gte("Date", req.query.fromDate);
    }
    if (req.query.toDate) {
      query = query.lte("Date", req.query.toDate);
    }

    // 📊 Sorting
    const sortCol = req.query.sortCol || "id";
    const sortDir = req.query.sortDir || "asc";

    query = query.order(sortCol, { ascending: sortDir === "asc" });

    const { data, error, count } = await query.range(from, to);

    if (error) throw error;

    res.json({
      data,
      total: count,
      page,
      limit
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ EXPORT API (BIG DATA SAFE)
app.get("/export", async (req, res) => {
  let all = [];
  let from = 0;
  const batch = 2000;

  while (true) {
    const { data, error } = await supabase
      .from("submissions1")
      .select("*")
      .range(from, from + batch - 1);

    if (error) return res.status(500).send(error.message);
    if (!data.length) break;

    all = all.concat(data);
    from += batch;
  }

  res.json(all);
});

app.listen(3000, () => console.log("🚀 Server running"));