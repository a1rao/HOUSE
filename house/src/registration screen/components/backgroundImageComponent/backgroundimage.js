import React from 'react';
import './backgroundimage.css';

class BackGroundImage extends React.Component {
    render() {

        return (
            <div className="backgroundImageContainer">
                <img src="https://i.ibb.co/FBPJSQG/painted-ladies-blur.png" alt="It is blurry" className="backgroundImage"/>
            </div>
        );
    }
}

export default BackGroundImage;