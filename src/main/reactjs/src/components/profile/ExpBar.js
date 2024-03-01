import React from 'react';
import '../../CSS/ExpBar.css';

const ExpBar = ({ level, exp,min,max }) => {
    const barWidth = ((exp - min) / (max - min)) * 100 + '%';

    const backgroundColor = level === '신입' ? '#808080' :
                            level === 'Bronze' ? '#CD7F32' :
                            level === 'Silver' ? '#dbe2e8' :
                            level === 'Gold' ? '#ecc81a' :
                            level === 'Platinum' ? '#3ED4BE' :
                            level === 'Challenger' ? '#FFFFFF' : '';
    
    const nextStep = level ==='신입'?'Bronze':
                     level ==='Bronze'?'Silver':
                     level === 'Silver'?'Gold':
                     level === 'Gold'?'Platinum':'Challenger';

    return (
        <div>
            
                <div className="progressbar" >
                    <div className='bar' style={{ width: barWidth ,background: backgroundColor}}>
                        
                    </div>
                </div>

                <div className='nextLevel'>
                    {nextStep}까지{barWidth}
                </div>
            
            
        </div>
    );
};

export default ExpBar;
