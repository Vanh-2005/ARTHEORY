import React, { useRef, useEffect, useState, useCallback } from 'react';

import './MusicPlayer.css';

function formatTime(sec) {
    if (isNaN(sec) || sec === Infinity) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function MusicPlayer() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [seekingTime, setSeekingTime] = useState(0);
    const progressBarRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = 0.5;

        const updateTime = () => {
            if (!isSeeking) setCurrentTime(audio.currentTime);
        };
        const setAudioDuration = () => {
            if (!isNaN(audio.duration) && audio.duration > 0) {
                setDuration(audio.duration);
            }
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', setAudioDuration);
        audio.addEventListener('durationchange', setAudioDuration);

        // Gọi luôn khi component mount (trường hợp audio đã sẵn sàng)
        setAudioDuration();

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', setAudioDuration);
            audio.removeEventListener('durationchange', setAudioDuration);
        };
    }, [isSeeking]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(() => {});
        }
        setIsPlaying(!isPlaying);
    };

    const toggleSidebar = () => {
        if (!isSidebarOpen) {
            setIsSidebarOpen(true);
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(() => {});
            }
        } else {
            setIsSidebarOpen(false);
        }
    };

    // Seek logic
    const getSeekTime = (e) => {
        const bar = progressBarRef.current;
        if (!bar) return 0;
        const rect = bar.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        let percent = (clientX - rect.left) / rect.width;
        percent = Math.max(0, Math.min(1, percent));
        return percent * duration;
    };

    const handleProgressClick = (e) => {
        const seekTime = getSeekTime(e);
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const seek = useCallback((e) => {
        e.preventDefault();
        const seekTime = getSeekTime(e);
        setSeekingTime(seekTime);
    }, [duration]);

    const stopSeek = useCallback(() => {
        setIsSeeking(false);
        audioRef.current.currentTime = seekingTime;
        setCurrentTime(seekingTime);
        window.removeEventListener('mousemove', seek);
        window.removeEventListener('mouseup', stopSeek);
        window.removeEventListener('touchmove', seek);
        window.removeEventListener('touchend', stopSeek);
    }, [seekingTime, seek]);

    const startSeek = (e) => {
        setIsSeeking(true);
        seek(e);
        window.addEventListener('mousemove', seek);
        window.addEventListener('mouseup', stopSeek);
        window.addEventListener('touchmove', seek, { passive: false });
        window.addEventListener('touchend', stopSeek);
    };

    const skipBackward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
        }
    };

    const skipForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 5);
        }
    };

    return (
        <>
            {/* Nút mở sidebar - chỉ hiện khi đóng */}
            {!isSidebarOpen && (
                <div
                    className="sidebar-toggle big"
                    onClick={toggleSidebar}
                >
                    <i className="bi bi-music-note-list"></i>
                </div>
            )}

            {/* Sidebar */}
            <div className={`music-player-sidebar apple-style ${isSidebarOpen ? 'open' : ''}`}>
                {/* Nút đóng sidebar - nhỏ, không có title */}
                {isSidebarOpen && (
                    <div
                        className="sidebar-toggle big"
                        onClick={toggleSidebar}
                    >
                        <i className="bi bi-chevron-left"></i>
                    </div>
                )}
                <div className="player-content">
                    <audio
                        ref={audioRef}
                        src="assets/audio/bring-it-on.mp3"
                        loop
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    />
                    <div className="album-art">
                        <img src="assets/img/theme/aov.jpg" alt="Album Art" />
                        {isPlaying && <div className="playing-indicator"></div>}
                    </div>
                    <div className="song-info">
                        <h4 className="gradient-text">AOV Theme</h4>
                        <p>P. Diddy ft. Biggie</p>
                    </div>
                    <div
                        className="progress-bar-container"
                        ref={progressBarRef}
                        onClick={handleProgressClick}
                        onMouseDown={startSeek}
                        onTouchStart={startSeek}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="progress-bar-bg">
                            <div
                                className="progress-bar-fg"
                                style={{
                                    width: duration
                                        ? `${((isSeeking ? seekingTime : currentTime) / duration) * 100}%`
                                        : '0%',
                                }}
                            ></div>
                        </div>
                        <div className="progress-time">
                            <span>{formatTime(isSeeking ? seekingTime : currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>
                    <div className="controls">
                        <button className="skip-btn" onClick={skipBackward}>
                            <i className="bi bi-skip-backward-fill"></i>
                        </button>
                        <button className="play-btn" onClick={togglePlayPause}>
                            <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
                        </button>
                        <button className="skip-btn" onClick={skipForward}>
                            <i className="bi bi-skip-forward-fill"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay khi mở sidebar */}
            {isSidebarOpen && (
                <div
                    className="music-player-overlay"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </>
    );
}

export default MusicPlayer;
