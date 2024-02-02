import React, { useState } from "react";

import { Container as MapDiv, useNavermaps, NaverMap, Polyline } from 'react-naver-maps'

function RunningMap({path, initialLocation}) {

    return (
        <MapDiv
            style={{
                width: '100%',
                height: '200px',
            }}
        >
            <RunningMapComponent path={path} initialLocation={initialLocation} />      
        </MapDiv>   
    )
 
}

function RunningMapComponent({path, initialLocation}) {
    const naverMap = useNavermaps(null)
    const polylinePath = path.map(loc => new window.naver.maps.LatLng(loc.latitude, loc.longitude));
    const [map, setMap] = useState(null)

    return (
            <NaverMap
                defaultCenter={ 
                    new naverMap.LatLng(initialLocation.latitude, initialLocation.longitude)
                }
                ref={setMap}
            > 
                <Polyline
                    path={polylinePath}
                    strokeColor="#5347AA"
                    onPathChanged={ (it) => {
                        if (it.length > 0 && map) {
                            map.setCenter(it.getAt(it.length -1))
                        }
                    }}
                    
                >
                    
                </Polyline>

            </NaverMap>
    )
}

export default RunningMap;