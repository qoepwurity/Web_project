import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './QnaPage.css';

export default function Qna() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('qnaList');
    if (stored) setQuestions(JSON.parse(stored));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQna = {
      id: Date.now(),
      name: name || '익명',
      question
    };
    const updated = [...questions, newQna];
    setQuestions(updated);
    localStorage.setItem('qnaList', JSON.stringify(updated));
    setName('');
    setQuestion('');
  };

  return (
    <div className="qna-container">
      <div className="qna-card">
        <div className="title-row">
          <button onClick={() => navigate('/')} className="back-button"><FiArrowLeft size={20} /></button>
          <h2>❓ QnA 게시판</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="닉네임 (선택)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="문의 내용을 입력하세요"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <button type="submit">✉️ 문의하기</button>
        </form>
        <div className="qna-list">
          {questions.length === 0 ? (
            <p className="qna-empty">아직 작성된 QnA가 없습니다.</p>
          ) : (
            questions.map((q) => (
              <div key={q.id} className="qna-item">
                <p className="qna-name">👤 {q.name}</p>
                <p className="qna-content">{q.question}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}