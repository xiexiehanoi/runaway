import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container as MapDiv, NaverMap, Polyline } from 'react-naver-maps'

const Mypage = () => {
    // 위치 데이터 상태 관리
    const [path, setPath] = useState([]);

    const BASE_URI = process.env.REACT_APP_BASE_URI;

    useEffect(()=>{
        //서버에서 위치 데이터 가져오기
        axios({
            method: 'get',
            url: `${BASE_URI}/api/profile/map/path`,
            responseType: 'stream'
          })
            .then(function (res) {
              console.log(res.data);
            });

    },[])




    return (
        <div>
            <MapDiv
                style={{
                    height: 200,
                }}
            >
                <NaverMap>
                    
                    <Polyline
                        //path={}
                    >
                    </Polyline>
                </NaverMap>
            </MapDiv>
        </div>
    );
};

export default Mypage;