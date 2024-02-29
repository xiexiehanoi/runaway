import React from 'react';
import naverLogin from '../../image/Naver_login.png';


const NaverLogin = () => {
    const REST_API_KEY = process.env.REACT_APP_NAVER_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
    const NAVER_AUTH_URI = `https://nid.naver.com/oauth2.0/authorize?client_id=${REST_API_KEY}&state=RUNAWAY&redirect_uri=${REDIRECT_URI}&response_type=code`;


    return (
        <>
            <a href={NAVER_AUTH_URI}>
                <button className='btn-social-login'>
                    {/* <button className='btn-social-login' style={{ backgroundColor: '#1FC700' }}> */}
                    {/* <i className="xi-2x xi-naver"></i> */}
                    <img alt='kakaotalk' src={naverLogin}
                        style={{ width: '26px' }} />
                </button>
                {/* &nbsp;&nbsp; */}
            </a>
        </>
    );
};

export default NaverLogin;