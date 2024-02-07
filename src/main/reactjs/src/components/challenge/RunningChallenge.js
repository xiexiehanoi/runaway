import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RunningChallengeRowItem from './RunningChallengeRowItem';

const RunningChallenge = () => {
    const [runningList,setRunningList]=useState([]);

    const list2=()=>{
        axios.get("/challenge/running/list")
        .then(res=>{
            console.log(res);
            setRunningList(res.data);
        })
    }

    useEffect(()=>{
        console.log("useEffect");
        list2();
    },[]);


    return (
         <div>
            <h5>총 {runningList.length}개의 러닝 챌린지에 도전하세요!</h5>
            <table className='table table-bordered' style={{width:'500px'}}>
                <tbody>
                    {
                        runningList.map((rowData,idx)=>
                            <RunningChallengeRowItem key={idx} row={rowData} idx={idx}/>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default RunningChallenge;