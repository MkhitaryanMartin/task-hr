import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import Spinner from '../spinner';

const VideoPlayer = ({ children, videoUrl = "", id, pllay }) => {
    const videoRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let timeoutId;
        const video = videoRef.current;

        if (video && videoUrl && pllay) {
            setIsLoading(true);

            timeoutId = setTimeout(() => {
                setIsLoading(false);
                video.src = videoUrl;
                video.load();
                video.play().catch((error) => console.error('Video playback failed:', error));
            }, 2000);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            setIsLoading(false);
        };
    }, [videoUrl, id]);

    return (
        <div className="video-background">
            <video ref={videoRef} autoPlay loop muted playsInline>
                <source src={videoUrl} type="video/mp4" />
            </video>
            <div className="content">
                {isLoading && <div className='spinner'><Spinner /></div>}
                {children}
            </div>
        </div>
    );
};

export default VideoPlayer;
