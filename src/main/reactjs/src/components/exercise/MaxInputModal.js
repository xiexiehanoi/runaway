import React, { useState } from 'react';

const Modal = ({ onClose, onSave }) => {
  const [inputValue, setInputValue] = useState('');

  const modalStyle = {
    position :'absolute',
    zIndex : '9999',
    width :'80%',
    height :'50%',
    top : '15%',
    left : '10%',
    display : 'block',
  }

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content">
        <h2>이번 세트에 수행할 운동 횟수를 입력해주세요</h2>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={() => onSave(parseInt(inputValue, 10))}>저장</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default Modal;