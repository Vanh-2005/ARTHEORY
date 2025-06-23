import React, { useRef, useEffect, useState } from 'react';

import './MusicPlayer.css';

function formatTime(sec) {
    if (isNaN(sec)) return '0:00';
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
    const [seekingTime, setSeekingTime] = useState(0); // <-- Thêm dòng này

    // Thêm ref cho progress bar
    const progressBarRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = 0.5;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const setAudioDuration = () => setDuration(audio.duration);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', setAudioDuration);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', setAudioDuration);
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }, []);

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
            // Chỉ play nếu chưa từng play
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(() => {});
            }
        } else {
            setIsSidebarOpen(false);
            // KHÔNG pause audio, nhạc vẫn chạy
        }
    };

    const handleProgressClick = (e) => {
        const bar = e.target;
        const rect = bar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const seekTime = percent * duration;
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
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

    // Hàm xử lý khi bắt đầu kéo
    const startSeek = (e) => {
        setIsSeeking(true);
        seek(e);
        window.addEventListener('mousemove', seek);
        window.addEventListener('mouseup', stopSeek);
        window.addEventListener('touchmove', seek, { passive: false });
        window.addEventListener('touchend', stopSeek);
    };

    // Hàm xử lý khi kéo/thả
    const seek = (e) => {
        let clientX;
        if (e.touches) {
            clientX = e.touches[0].clientX;
        } else {
            clientX = e.clientX;
        }
        const bar = progressBarRef.current;
        if (!bar) return;
        const rect = bar.getBoundingClientRect();
        let percent = (clientX - rect.left) / rect.width;
        percent = Math.max(0, Math.min(1, percent));
        const seekTime = percent * duration;
        setSeekingTime(seekTime);
        if (isSeeking) {
            // Chỉ cập nhật giao diện, chưa tua nhạc
        } else {
            audioRef.current.currentTime = seekTime;
            setCurrentTime(seekTime);
        }
    };

    // Hàm kết thúc kéo
    const stopSeek = () => {
        setIsSeeking(false);
        if (typeof seekingTime === 'number' && !isNaN(seekingTime)) {
            audioRef.current.currentTime = seekingTime;
            setCurrentTime(seekingTime);
        }
        window.removeEventListener('mousemove', seek);
        window.removeEventListener('mouseup', stopSeek);
        window.removeEventListener('touchmove', seek);
        window.removeEventListener('touchend', stopSeek);
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
    onMouseDown={e => {
        setIsSeeking(true);
        seek(e);
        window.addEventListener('mousemove', seek);
        window.addEventListener('mouseup', stopSeek);
    }}
    onTouchStart={e => {
        setIsSeeking(true);
        seek(e);
        window.addEventListener('touchmove', seek, { passive: false });
        window.addEventListener('touchend', stopSeek);
    }}
    style={{ cursor: 'pointer' }}
>
    <div className="progress-bar-bg">
        <div
            className="progress-bar-fg"
            style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
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
