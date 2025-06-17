
import React from 'react';

export const SkeletonLoader = () => {
    return (
        <div className="skeleton-wrapper">
            <div className="skeleton-header"></div>
            <div className="skeleton-content">
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
            </div>
        </div>
    );
}