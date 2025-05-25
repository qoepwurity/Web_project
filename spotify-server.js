import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import getSpotifyToken from './vercel/api/spotify-token.js';
import searchSpotify from './vercel/api/spotify-search.js';

dotenv.config();
const app = express();
const PORT = 3001;

app.use(cors());

app.get('/token', async (req, res) => {
  try {
    const token = await getSpotifyToken();
    res.json(token);
  } catch (err) {
    console.error('[토큰 오류]', err);
    res.status(500).json({ error: 'Spotify 토큰 발급 실패' });
  }
});

app.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: '검색어가 없습니다.' });

  try {
    const token = await getSpotifyToken();
    const results = await searchSpotify(token.access_token, q);
    res.json(results);
  } catch (err) {
    console.error('[검색 오류]', err);
    res.status(500).json({ error: '노래 검색 실패' });
  }
});

app.listen(PORT, () => {
  console.log(`🎵 Spotify 서버 실행 중: http://localhost:${PORT}`);
});
