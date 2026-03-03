import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "quran.json");
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const surahs = jsonData.data.surahs.map((surah) => ({
      id: surah.number,
      name: surah.name,
      totalAyahs: surah.ayahs.length,
    }));

    res.status(200).json(surahs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
