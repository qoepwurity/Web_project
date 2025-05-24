export default async function handler(req, res) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  const city = 'Seoul'; // 기본 도시는 서울로 설정
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const weather = data.weather?.[0]?.description || '알 수 없음';
    const temp = data.main?.temp;

    res.status(200).json({
      city,
      weather,
      temperature: temp,
    });
  } catch (error) {
    res.status(500).json({ error: '날씨 정보를 가져오는 데 실패했습니다.' });
  }
}
