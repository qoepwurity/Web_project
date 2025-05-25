export default async function handler(req, res) {
  const { q } = req.query;

  const tokenRes = await fetch(`${process.env.VITE_NEXT_PUBLIC_BASE_URL}/api/spotify-token`);
  const { access_token } = await tokenRes.json();

  const searchRes = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=5`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  const searchData = await searchRes.json();

  const tracks = searchData.tracks?.items.map(track => ({
    name: track.name,
    artist: track.artists[0]?.name,
    album: track.album.name,
    url: track.external_urls.spotify
  }));

  res.status(200).json(tracks);
}
