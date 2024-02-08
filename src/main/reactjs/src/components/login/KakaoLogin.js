import React from 'react';

const KakaoLogin = () => {
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;


    return (
        <>
            <a href={KAKAO_AUTH_URI}>
                <button className='btn-social-login' style={{ backgroundColor: '#FFEB00' }}><i className="xi-2x xi-kakaotalk text-dark"></i></button>
            </a>
        </>
    );
};

export default KakaoLogin;