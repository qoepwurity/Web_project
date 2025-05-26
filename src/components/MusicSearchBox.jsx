// import React, { useState } from 'react';

// export default function MusicSearchBox({ onSelect }) {
//     const [query, setQuery] = useState('');
//     const [results, setResults] = useState([]);

//     const handleSearch = async () => {
//         const res = await fetch(`https://web-project-sand-psi.vercel.app/api/spotify-search?q=${encodeURIComponent(query)}`);
//         const data = await res.json();
//         setResults(data);
//     };


//     return (
//         <div style={{ marginTop: '1rem' }}>
//             <input
//                 type="text"
//                 placeholder="노래 제목을 검색하세요"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', width: '80%' }}
//             />
//             <button type="button" onClick={handleSearch} style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem', borderRadius: '6px' }}>
//                 검색
//             </button>
//             <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
//                 {results.map((track, idx) => (
//                     <li key={idx} style={{ marginBottom: '1rem', cursor: 'pointer' }} onClick={() => onSelect(track)}>
//                         <img src={track.image} alt={track.name} width={50} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
//                         <strong>{track.name}</strong> - {track.artist}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// src/components/MusicSearchBox.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function MusicSearchBox({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`https://web-project-sand-psi.vercel.app/api/spotify-search?q=${encodeURIComponent(query)}`);
      setResults(res.data);
    } catch (err) {
      console.error('음악 검색 실패:', err);
      setError('음악 검색에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <input
        type="text"
        placeholder="노래 제목을 검색하세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: '0.5rem',
          borderRadius: '6px',
          border: '1px solid #ccc',
          width: '80%'
        }}
      />
      <button
        type="button"
        onClick={handleSearch}
        style={{
          marginLeft: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '6px'
        }}
      >
        검색
      </button>

      {loading && <p style={{ marginTop: '1rem' }}>🔍 검색 중...</p>}
      {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
        {results.map((track, idx) => (
          <li
            key={idx}
            style={{ marginBottom: '1rem', cursor: 'pointer' }}
            onClick={() => onSelect(track)}
          >
            <img
              src={track.image}
              alt={track.name}
              width={50}
              style={{ verticalAlign: 'middle', marginRight: '0.5rem' }}
            />
            <strong>{track.name}</strong> - {track.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}

