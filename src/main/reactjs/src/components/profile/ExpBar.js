import React from 'react';
import '../../CSS/ExpBar.css';

const ExpBar = ({ level, exp,min,max }) => {
    const barWidth = (exp/70001) * 100 + '%';

    const backgroundColor = level === '신입' ? '#808080' :
                            level === 'Bronze' ? '#CD7F32' :
                            level === 'Silver' ? '#dbe2e8' :
                            level === 'Gold' ? '#ecc81a' :
                            level === 'Platinum' ? '#3ED4BE' :
                            level === 'Challenger' ? '#FFFFFF' : '';

    return (
        <div>
            
                <div className="progressbar" >
                    <div className='bar' style={{ width: barWidth ,background: backgroundColor}}>
                        {/* <span style={{position: 'absolute', left: '10%'}}>{min}</span>
                        <span style={{ position: 'absolute', right: '10%'}}>{max}</span> */}
                    </div>
                </div>
            
            
        </div>
    );
};

export default ExpBar;
