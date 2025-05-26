import axios from 'axios';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: '검색어(q)가 필요합니다.' });
  }

  try {
    const tokenRes = await axios.get(`${process.env.OPEN_NEXT_PUBLIC_BASE_URL}/api/spotify-token`);
    const access_token = tokenRes.data.access_token;

    const searchRes = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const items = searchRes.data.tracks.items;

    const results = items.map((track) => ({
      name: track.name,
      artist: track.artists[0]?.name || 'Unknown',
      image: track.album.images[1]?.url || '',
    }));

    res.status(200).json(results);
  } catch (err) {
    console.error('❌ Spotify 검색 오류:', err.response?.data || err.message);
    res.status(500).json({ error: 'Spotify 검색 실패' });
  }
}
