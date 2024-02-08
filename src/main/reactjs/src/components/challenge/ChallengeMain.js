import React from 'react';
import { Link } from 'react-router-dom';

const ChallengeMain = () => {
    return (
        <div>
            mychallenge
            <p>
                <Link to="/exercisechallenge">맨몸운동 챌린지</Link>
            </p>
            <p>
                <Link to="/runningchallenge">러닝 챌린지</Link>
            </p>
            내 챌린지 목록
        </div>
        
    );
};

export default ChallengeMain;