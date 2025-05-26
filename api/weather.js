// import axios from 'axios';

// export default async function handler(req, res) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   const apiKey = process.env.OPEN_WEATHER_API_KEY;
//   const city = 'Seoul';
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;

//   try {
//     const response = await axios.get(url);
//     const data = response.data;

//     res.status(200).json({
//       city,
//       weather: data.weather?.[0]?.description || '정보 없음',
//       temperature: data.main?.temp,
//     });
//   } catch (error) {
//     console.error('날씨 API 에러:', error);
//     res.status(500).json({ error: '날씨 정보를 가져오는 데 실패했습니다.' });
//   }
// }


import axios from 'axios';

export default async function handler(req, res) {
  const city = req.query.city || 'Seoul';
  const apiKey = process.env.OPEN_WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;

  try {
    const response = await axios.get(url);
    const description = response.data.weather?.[0]?.description || '정보 없음';

    let emoji = '🌤️';
    if (description.includes('맑음')) emoji = '☀️';
    else if (description.includes('구름')) emoji = '☁️';
    else if (description.includes('비')) emoji = '🌧️';
    else if (description.includes('눈')) emoji = '❄️';
    else if (description.includes('안개')) emoji = '🌫️';

    res.status(200).json({ weather: description, emoji });
  } catch (error) {
    console.error('날씨 API 에러:', error);
    res.status(500).json({ error: '날씨 정보를 가져오는 데 실패했습니다.' });
  }
}
