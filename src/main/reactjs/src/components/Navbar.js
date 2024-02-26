import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        
            
        <main id="challengemain">   
          
        <div className="exercise-container" style={{position:'absolute',bottom:'40%' }} >
            <div class="container">
                <div class="product1">
                <div class="effect-1"></div>
                <div class="effect-2"></div>
                <div class="content">
                    <div class="exercise"></div>
                </div>
                <span class="title1" style={{color:'#fff'}}>Squat</span>
                </div>
                <div class="product2">
                <div class="effect-1"></div>
                <div class="effect-2"></div>
                <div class="content">
                    <div class="sleep"></div>
                </div>
                <span class="title2" style={{color:'#fff'}}>Sit-UP</span>
                </div>
                <div class="product3">
                <div class="effect-1"></div>
                <div class="effect-2"></div>
                <div class="content">
                    <div class="meditation"></div>
                </div>
                <span class="title3" style={{color:'#fff'}}>Push-UP</span>
                </div>
            </div>

             {/* <p>
                <Link to={"/situp"}>situp</Link>
            </p>
            <p>
                <Link to={"/pushup"}>pushup</Link>
            </p>  */}
        </div>
        
        <div style={{ display: 'flex' }}>
        <div className='exercise-container'
                style={{ width: '40%', position:'absolute',bottom:'10%',left:'5%'}}> 
            <div class="container" style={{position:'absolute',bottom:'10%',left:'10%'}}>
                <Link to="/running" >
                <div class="product1" >
                <div class="effect-1"></div>
                <div class="effect-2"></div>
                <div class="content">
                    <div class="exercise"></div>
                </div>
                <span class="title3" style={{left:'2%',color:'#fff'}} >
                    Running
                </span>
                
                </div>
                </Link>
            </div>   
        {/* <button className='primaryButton-inset'>
                <Link to="/running">Running</Link>
        </button> */}
        </div>

        
    
        <div className='exercise-container' style={{ width: '40%', position: 'absolute', bottom: '10%', left: '55%' }}>
            {/* 내용을 추가하세요 */}
        </div>


    </div>


        </main>
        

            /* <button className='primaryCard'>
                <Link to="/running">Running</Link>
            </button>
         
            <button className='primaryCard'>
                <Link to="/challengemain">challenge</Link>
        </button> */
           
            
        
    );
};

export default Navbar;