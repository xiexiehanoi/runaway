import React from 'react';
import '../../CSS/ExpBar.css';
import challengerIcon from './Img/challenger_icon.jpg';
import silverIcon from './Img/silver_icon 1.png';
import goldIcon from './Img/gold_icon 1.png';
import platinumIcon from './Img/platinum_icon 1.png';
import bronzeIcon from './Img/bronze_icon 1.png';
import unrankIcon from './Img/unrank_icon 1.png';

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

                <div className='previousLevel' style={{marginRight:'5%'}}>
                    <img src={previousStep} alt='previousLevel' style={{width:'50px',height:'50px'}}/>
                </div>

                <div className="progressbar" style={{marginTop:'5%'}} >
                    <div className='bar' style={{ width: barWidth }}>
                        <span style={{marginLeft:'90%'}}>{barWidth}</span>
                    </div>
                </div>

                <div className='nextLevel' style={{marginLeft:'5%'}}>
                    <img src={nextStep} alt='nextLevel' style={{width:'50px',height:'50px'}}/>
                </div>

                
            </div>
            
            
        </div>
    );
};

export default ExpBar;
