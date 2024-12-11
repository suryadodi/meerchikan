import React from 'react';

interface ArrowProps {
    className: string; 
}

const RightArrow: React.FC<ArrowProps> = ({ className }) => {
    return (
        <svg width="40" className={className} height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="19.5" fill="white" stroke="#343434"/>
        <path d="M24.7372 11.5525L17.0526 19.3605C16.8841 19.5308 16.7896 19.7608 16.7896 20.0004C16.7896 20.2401 16.8841 20.47 17.0526 20.6404L24.7355 28.4484C24.9039 28.6198 24.9983 28.8505 24.9983 29.0908C24.9983 29.3312 24.9039 29.5619 24.7355 29.7333C24.6532 29.8177 24.5549 29.8848 24.4462 29.9306C24.3376 29.9764 24.2209 30 24.103 30C23.9851 30 23.8685 29.9764 23.7598 29.9306C23.6512 29.8848 23.5529 29.8177 23.4706 29.7333L15.7877 21.927C15.2828 21.4128 15 20.721 15 20.0004C15 19.2798 15.2828 18.588 15.7877 18.0739L23.4706 10.2676C23.5529 10.1829 23.6513 10.1156 23.7601 10.0696C23.8689 10.0237 23.9858 10 24.1039 10C24.222 10 24.3388 10.0237 24.4476 10.0696C24.5564 10.1156 24.6548 10.1829 24.7372 10.2676C24.9056 10.439 25 10.6697 25 10.91C25 11.1504 24.9056 11.3811 24.7372 11.5525Z" fill="#343434"/>
        </svg>
    );
};

export default RightArrow;
