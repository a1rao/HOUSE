import React from 'react';
import './RegBackground.css';

class BackGroundImage extends React.Component {
    render() {

        return (
            <div className="backgroundImageContainer">
                <img src="https://i.ibb.co/FBPJSQG/painted-ladies-blur.png" alt="Background image" className="backgroundImage"/>
            </div>
        );
    }
}

export default BackGroundImage;