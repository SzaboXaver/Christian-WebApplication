import { createClient } from "@supabase/supabase-js";
import express from "express";
import cors from "cors";
import axios from "axios";
import fs from "fs";

const geo = JSON.parse(fs.readFileSync("./churches.geojson", "utf8"));
console.log("Betöltött elemek:", geo.features.length);

const app = express();
const port = 3000;

const supabase = createClient(
  "#",
  "#",
);

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.post("/registration", async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({
      message: "Minden mező kitöltése kötelező!",
    });
  }

  const object = await supabase.auth.signUp({
    email,
    password,
  });

  if (object.error) {
    return res.status(400).json({
      message: object.error.message,
    });
  }

  if (!object.data.user) {
    return res.status(400).json({
      message: "A felhasználó létrehozása nem sikerült.",
    });
  }

  const userId = object.data.user?.id;
  const { error } = await supabase.from("user_profile").insert({
    profile_id: userId,
    user_name: userName,
  });

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  res.status(201).json({
    message: "Sikeres regisztráció!",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Minden mező kitöltése kötelező!",
    });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({
      message: error.message,
    });
  }

  if (!data.user) {
    return res.status(401).json({
      message: "A felhasználó nincs bejelentkezve.",
    });
  }

  const userId = data.user.id;

  const { data: userData, error: profileError } = await supabase
    .from("user_profile")
    .select()
    .eq("profile_id", userId);

  if (profileError) {
    return res.status(500).json({
      message: "Lekérési hiba: " + profileError.message,
    });
  }

  return res.status(200).json({
    message: "Sikeres belépés",
    user_data: userData,
  });
});

app.get("/api/churches", async (req, res) => {
  const { denomation, city } = req.query;
  const cleanCity = city.trim();
  const safeCity = cleanCity.replace(/["\\]/g, "\\$&");
  console.log(safeCity);

  const churches = geo.features
    .map((f) => {
      if (f.geometry?.type !== "Point") return null;
      const [lon, lat] = f.geometry.coordinates;
      const p = f.properties; //templom adatai
      if (p.name == null) return null;
      // város: kis- és nagybetűre ne legyen érzékeny
      if (p["addr:city"]?.toLowerCase() !== safeCity.toLowerCase()) return null;

      // felekezet: csak akkor szűrünk, ha meg van adva
      if (denomation === "christian") {
        if (p.religion !== "christian") return null;
      } else if (denomation) {
        if (!p.denomination?.includes(denomation)) return null;
      }
      return {
        lat,
        lon,
        name: p.name,
        denomation: p.denomation,
        religion: p.religion,
      };
    })
    .filter(Boolean);

  /*const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    for(const church of churches) {
      const street = church.street;
      const houseNumber = church.houseNumber;
      const lat = church.lat;
      const lon = church.lon;
      if(street && houseNumber) continue;
      try {
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/reverse",
          {
            params: {
              "format": "json",
              "lat": lat,
              "lon": lon,
              "zoom": 18,
              "addressdetails": 1,
            },
            headers: {
              "User-Agent": "Christian_WebApplication",
            }
          }
        );
        church.street = response.data.address?.road;
        church.houseNumber = response.data.address?.house_number;
      } catch (error) {console.log(error.response?.status, error.message)}
      await sleep(1100);
    }*/
  res.json(churches);
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
