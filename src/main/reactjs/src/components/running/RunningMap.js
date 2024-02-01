import React from "react";

import { NaverMap, Polyline, useNavermaps } from "react-naver-maps";
import { Container as MapDiv } from 'react-naver-maps'

function RunningMap({path}) {
    const naverMap = useNavermaps()
    const polylinePath = path.map(loc => new window.naver.maps.LatLng(loc.latitude, loc.longitude));

    return (
        <MapDiv
            style={{
                width: '100%',
                height: '600px',
            }}
        >
            <NaverMap
                defaultCenter={ 
                    new naverMap.LatLng(37.359924641705476, 127.1148204803467)
                }
            > 
                <Polyline
                    path={polylinePath}
                    strokeColor="#5347AA"
                >
                    
                </Polyline>

            </NaverMap>
        </MapDiv>     
    )
}

export default RunningMap;