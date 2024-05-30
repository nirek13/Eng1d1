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

    const calculatePosition = (containerElement, targetElement) => {
        const containerRect = containerElement.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        console.log("containerRect: ", containerRect);
        console.log("targetRect: ", targetRect);
        const centerX = containerRect.left + containerRect.width / 2;
        const centerY = containerRect.top + containerRect.height / 2;
        const angle = Math.atan2(targetRect.top + targetRect.height / 2 - centerY, targetRect.left + targetRect.width / 2 - centerX);
        const maxDistance = Math.min(containerRect.width / 4, containerRect.height / 4);

        const x = maxDistance * Math.cos(angle);
        const y = maxDistance * Math.sin(angle);

        console.log("x: ", x);
        console.log("y: ", y);

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
                                        transform: `translate(${calculatePosition(eyeRefs[i].current, corneaRefs[i].current).x}px, ${calculatePosition(eyeRefs[i].current, corneaRefs[i].current).y}px)`,
                                    }
                                    : {}
                            }
                        >
                            <div
                                className="outer-pupil"
                                style={
                                    eyeRef.current
                                        ? {
                                            transform: `translate(${calculatePosition(corneaRefs[i].current, eyeRef.current).x}px, ${calculatePosition(corneaRefs[i].current, eyeRef.current).y}px)`,
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
