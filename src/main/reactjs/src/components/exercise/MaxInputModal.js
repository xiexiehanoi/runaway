import React, { useState } from 'react';
import './codepen.css';

const Modal = ({ onClose, onSave }) => {
  const [inputValue, setInputValue] = useState('');

  const modalStyle = {
    position: 'absolute',
    zIndex: '9999',
    width: '90%',
    height: 'auto', 
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)', 
    display: 'block',
    backgroundColor: '#333', 
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    color: '#fff', 
  }

  const modalBackgroundStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '9998',
  };

  const inputStyle = {
    width: '80%',
    padding: '10px', 
    margin: '10px 0', 
    border: 'none', 
    borderRadius: '5px',
    boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.3)',
    background: '#303234',
    color: '#fff', 
    outline: 'none', 
  }

  const buttonStyle = {
    flex: 1,
    padding: '10px 20px',
    margin: '10px 5px',
    border: 'none',
    borderRadius: '5px', 
    background: '#444',
    color: '#fff', 
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
    transition: 'transform 0.1s, boxShadow 0.1s',
    position: 'relative',
    width:'100px',
  };

  const modalContentStyle = {
    width: '100%',
    backgroundColor: '#303234',
    position: 'relative',
    height: 'auto',
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center', 
    boxShadow: '-9px -9px 16px rgba(73, 73, 73, 0.40), 9px 9px 16px rgba(0, 0, 0, 0.40)',
  }

  const modalTextStyle = {
    fontSize:' 1.4em',
    marginTop:'15px',
    position:'relative',
    width:'80%',
    opacity:'0.8',
  }

  const buttonContainerStyle = {
    display: 'flex', 
    justifyContent: 'space-between', 
  };

  return (
    <>
      <div style={modalBackgroundStyle}></div>
      <div className="modal" style={modalStyle}>
        <div className="modal-content" style={modalContentStyle}>
          <h2 style={modalTextStyle}>이번 세트에 수행할 운동 횟수를 입력해주세요</h2>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={inputStyle}
          />
          <div style={buttonContainerStyle}>
            <button onClick={() => onSave(parseInt(inputValue, 10))} style={buttonStyle} className='modalButton'>저장</button>
            <button onClick={onClose} style={buttonStyle} className='modalButton'>닫기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
