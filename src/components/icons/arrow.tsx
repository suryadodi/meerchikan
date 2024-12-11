import React from 'react';

interface ArrowProps {
    className: string; // Use className instead of class
}

const Arrow: React.FC<ArrowProps> = ({ className }) => {
    return (
        <div className={className}>
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.4475 0.262838L10.6395 7.94738C10.4692 8.11592 10.2392 8.21045 9.99957 8.21045C9.75993 8.21045 9.52996 8.11592 9.3596 7.94738L1.55164 0.264504C1.38022 0.0960544 1.1495 0.00166633 0.909171 0.00166631C0.668837 0.00166629 0.438119 0.0960543 0.266702 0.264504C0.18229 0.346794 0.115207 0.445148 0.0694035 0.553769C0.0235985 0.662391 8.06118e-07 0.779083 7.95812e-07 0.896967C7.85507e-07 1.01485 0.0235985 1.13154 0.0694035 1.24016C0.115207 1.34878 0.18229 1.44714 0.266701 1.52943L8.073 9.2123C8.58718 9.71715 9.27898 10 9.99957 10C10.7202 10 11.412 9.71715 11.9261 9.2123L19.7324 1.52943C19.8171 1.44711 19.8844 1.34866 19.9304 1.23988C19.9763 1.13111 20 1.01422 20 0.896134C20 0.778049 19.9763 0.661164 19.9304 0.552388C19.8844 0.443613 19.8171 0.345155 19.7324 0.262838C19.561 0.0943889 19.3303 8.95128e-07 19.09 8.74117e-07C18.8496 8.53107e-07 18.6189 0.0943888 18.4475 0.262838Z" fill="black" />
            </svg>
        </div>
    );
};

export default Arrow;
