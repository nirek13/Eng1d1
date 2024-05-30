import React, { useState, useEffect, useRef } from 'react';
import '../styles.css';

const EyeFollow = () => {
    const [mousePosition, setMousePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const eyeRefs = [useRef(null), useRef(null)];
    const corneaRefs = [useRef(null), useRef(null)];

    const updateMousePosition = (event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
    };

    useEffect(() => {
        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    const calculatePosition = (element) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 1;
        const angle = Math.atan2(mousePosition.y - centerY, mousePosition.x - centerX);
        const maxDistance = rect.width / 8;

        const x = maxDistance * Math.cos(angle);
        const y = maxDistance * Math.sin(angle);

        return { x, y };
    };

    return (
        <div className="eye-container">
            <div className="message">BIG BROTHER IS WATCHING YOU</div>
            <div className="eyes">
                {eyeRefs.map((eyeRef, i) => (
                    <div key={i} className="eye" ref={eyeRef}>
                        <div
                            className="cornea"
                            ref={corneaRefs[i]}
                            style={
                                corneaRefs[i].current
                                    ? {
                                        transform: `translate(${calculatePosition(corneaRefs[i].current).x}px, ${calculatePosition(corneaRefs[i].current).y}px)`,
                                    }
                                    : {}
                            }
                        >
                            <div
                                className="outer-pupil"
                                style={
                                    eyeRef.current
                                        ? {
                                            transform: `translate(${calculatePosition(eyeRef.current).x}px, ${calculatePosition(eyeRef.current).y}px)`,
                                        }
                                        : {}
                                }
                            >
                                <div className="pupil"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EyeFollow;