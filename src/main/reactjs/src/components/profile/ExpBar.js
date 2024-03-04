import React from 'react';
import '../../CSS/ExpBar.css';
import challengerIcon from './Img/챌린저.png';
import silverIcon from './Img/실버 (1).png';
import goldIcon from './Img/골드.png';
import platinumIcon from './Img/플래티넘.png';
import bronzeIcon from './Img/브론즈.png';
import unrankIcon from './Img/언랭크 (1).png';


const ExpBar = ({ level, exp,min,max }) => {
    const barWidth = Math.round(((exp - min) / (max - min)) * 100) + '%';
    
    // const backgroundColor = level === '신입' ? '#808080' :
    //                         level === 'Bronze' ? '#CD7F32' :
    //                         level === 'Silver' ? '#dbe2e8' :
    //                         level === 'Gold' ? '#ecc81a' :
    //                         level === 'Platinum' ? '#3ED4BE' :
    //                         level === 'Challenger' ? '#FFFFFF' : '';
    
    const nextStep = level ==='신입'?bronzeIcon:
                     level ==='Bronze'? silverIcon:
                     level === 'Silver'? goldIcon:
                     level === 'Gold'?platinumIcon: challengerIcon;

    const previousStep = level ==='신입'?unrankIcon:
                     level ==='Bronze'? bronzeIcon:
                     level === 'Silver'? silverIcon:
                     level === 'Gold'?goldIcon: platinumIcon;

    return (
        <div>
            <div style={{display:'flex'}}>

                <div className='previousLevel' style={{marginRight:'3%'}}>
                    <img src={previousStep} alt='previousLevel' style={{width:'50px',height:'50px'}}/>
                </div>

                <div className="progressbar" style={{marginTop:'5%'}} >
                    <div className='bar' style={{ width: barWidth }}>
                        <span style={{marginLeft:'50%'}}>{barWidth}</span>
                    </div>
                </div>

                <div className='nextLevel' style={{marginLeft:'3%'}}>
                    <img src={nextStep} alt='nextLevel' style={{width:'50px',height:'50px'}}/>
                </div>

                
            </div>
            
            
        </div>
    );
};

export default ExpBar;
