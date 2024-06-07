import React from 'react';
import './Hero.css';
import heroImage1 from '../assets/image1.webp';
import heroImage2 from '../assets/image2.webp';
import heroImage3 from '../assets/image3.webp';
import heroImage4 from '../assets/image4.webp';

const Hero = () => {
    return (
        <div className="hero-container">
            <div className="hero-content">
                <h1>Hundreds of books to share</h1>
                <p>Give your students an impact in their life</p>
            </div>
            <div className="hero-images">
                <img src={heroImage1} alt="Hero 1" className="hero-image-1" />
                <img src={heroImage2} alt="Hero 2" className="hero-image-2" />
                <img src={heroImage3} alt="Hero 3" className="hero-image-3" />
                <img src={heroImage4} alt="Hero 4" className="hero-image-4" />
            </div>
        </div>
    );
}

export default Hero;
