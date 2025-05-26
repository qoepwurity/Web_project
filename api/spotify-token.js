import axios from 'axios';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const clientId = bfca6b033ec14f9eadfc18db5aa5d582;
  const clientSecret = process.env.VITE_OPEN_SPOTIFY_CLIENT_SECRET;

  console.log('🔑 Spotify Client ID:', clientId);
  console.log('🔑 Spotify Client Secret:', clientSecret);

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('❌ Spotify 토큰 요청 실패:', error.response?.data || error.message);
    res.status(500).json({ error: '토큰 요청 실패' });
  }
}
