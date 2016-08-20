import React from 'react';

export default {
    leftArrow(width=17) {
        return (
            <svg width={width} viewBox="0 0 15 17" version="1.1">
                <g stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
                    <polygon fill="#000000" transform="translate(7.210526, 8.500000) rotate(-90.000000) translate(-7.210526, -8.500000) " points="15.7105263 15.7105263 -1.28947368 15.7105263 7.21052632 1.28947368"></polygon>
                </g>
            </svg>
        )
    },
    rightArrow(width=17) {
        return (
            <svg width={width} viewBox="0 0 15 17" version="1.1">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
                    <polygon fill="#000000" transform="translate(7.210526, 8.500000) rotate(-270.000000) translate(-7.210526, -8.500000) " points="15.7105263 15.7105263 -1.28947368 15.7105263 7.21052632 1.28947368"></polygon>
                </g>
            </svg>
        )
    }
}