import React from "react";

import { NaverMap, Polyline, useNavermaps } from "react-naver-maps";
import { Container as MapDiv } from 'react-naver-maps'

function RunningMap({path}) {
    const naverMap = useNavermaps()

    return (
        <MapDiv
            style={{
                width: '100%',
                height: '600px',
            }}
        >
            <NaverMap> 
                <Polyline
                    path={path}
                >
                    
                </Polyline>

            </NaverMap>
        </MapDiv>     
    )
}

export default RunningMap;