import React from 'react';
import { useNavigate } from "react-router-dom";
import {useRecoilState} from "recoil";
import {LoginAtom} from "../../global/LoginAtom";
import Swal from "sweetalert2";

const Logout = () => {
  const [isLogin, setIsLogin] = useRecoilState(LoginAtom);
  const navi = useNavigate();
  const handleLogoutButtonClick = () => {
    const token = window.localStorage.removeItem("token");
    Swal.fire({
      icon: "success",
      title: '로그아웃 되었습니다.',
      confirmButtonText: "OK",
      allowOutsideClick: false,
      customClass: {
        confirmButton: 'sa2-confirm-button-class',
        title: 'sa2-title-class',
        icon: 'sa2-icon-class',
        popup: 'sa2-popup-class',
        container: 'sa2-container-class'
      }
    }).then(result => {
      if (result.isConfirmed) {
        setIsLogin(token);
        navi("/login");
      }
    });
  };

  return (
    <div>
      <button className='btn primaryButton-outset'
              style={{margin: "10% 25%", width: '55%'}}
              onClick={handleLogoutButtonClick}>
                <span
                  style={{
                    color: '#f5f5f5',
                    fontWeight: '500',
                    fontSize: '1em'
                  }}
                >로그아웃</span>
      </button>
    </div>
  );
};

export default Logout;