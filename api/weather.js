export default async function handler(req, res) {
  const apiKey = process.env.VITE_WEATHER_API_KEY;
  const city = 'Seoul';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('API 응답 오류');
    const data = await response.json();

    const weather = data.weather?.[0]?.description || '정보 없음';
    const temp = data.main?.temp || null;

    res.status(200).json({
      city,
      weather,
      temperature: temp
    });
  } catch (err) {
    console.error('날씨 API 에러:', err);
    res.status(500).json({ error: '날씨 정보를 가져오는 데 실패했습니다.' });
  }
}
