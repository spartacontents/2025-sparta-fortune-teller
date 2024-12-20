import { useState } from 'react';

function Input({ onSend, disabled }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', margin: '30px 0' }}>
      <input
        disabled={disabled}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="ここに入力してください"
        style={{ flex: 1, padding: '15px', borderRadius: '40px', border: '1px solid #ccc', fontSize: '18px' }}
      />
      <button
        type="submit"
        disabled={disabled}
        style={{
          padding: '15px',
          borderRadius: '40px',
          border: 'none',
          width: '100px', // 버튼 너비를 고정
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: "18px"
        }}
      >
        入力
    </button>
    </form>
  );
}

export default Input;
