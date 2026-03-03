import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const { surah } = req.query;

    if (!surah) {
      return res.status(400).json({ error: "Surah number required" });
    }

    const filePath = path.join(process.cwd(), "data", "quran.json");
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const selectedSurah = jsonData.data.surahs.find(
      (s) => s.number === parseInt(surah)
    );

    if (!selectedSurah) {
      return res.status(404).json({ error: "Surah not found" });
    }

    const ayahs = selectedSurah.ayahs.map((ayah) => ({
      number: ayah.number,
      text: ayah.text,
    }));

    res.status(200).json({
      surah: selectedSurah.name,
      totalAyahs: ayahs.length,
      ayahs: ayahs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
