import React, {useEffect, useState} from "react";

import { Container as MapDiv, useNavermaps, NaverMap, Polyline } from 'react-naver-maps'

function RunningMap({path, initialLocation}) {

    return (
        <MapDiv
            style={{
                width: '100%',
                height: '350px',
            }}
        >
            <RunningMapComponent path={path} initialLocation={initialLocation} />      
        </MapDiv>   
    )
 
}

function RunningMapComponent({path, initialLocation}) {
    useNavermaps(null)

    const polylinePath = path.length > 0 ? path.map(loc => new window.naver.maps.LatLng(loc.latitude, loc.longitude)) : [];
    const [map, setMap] = useState(null)

    useEffect(() => {
        if (map && initialLocation && 'latitude' in initialLocation && 'longitude' in initialLocation) {
            map.setCenter(new window.naver.maps.LatLng(initialLocation.latitude, initialLocation.longitude))
        }
    }, [initialLocation]);


    return (
            <NaverMap
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