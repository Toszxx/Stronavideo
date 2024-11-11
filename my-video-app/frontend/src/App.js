import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import "./App.css";

const App = () => {
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Fetch videos from backend
        const fetchVideos = async () => {
            const response = await axios.get("http://localhost:5000/api/videos");
            setVideos(response.data);
        };
        fetchVideos();

        // WebSocket setup
        const ws = new WebSocket("ws://localhost:5000");
        setSocket(ws);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "PLAY_VIDEO") {
                setCurrentVideo(data.video);
            }
        };

        return () => ws.close();
    }, []);

    const handlePlayVideo = (video) => {
        setCurrentVideo(video);
        socket.send(JSON.stringify({ type: "PLAY_VIDEO", video }));
    };

    return (
        <div className="App">
            <h1>Video Synchronization App</h1>
            <div className="video-list">
                {videos.map((video) => (
                    <div key={video._id} onClick={() => handlePlayVideo(video)}>
                        <h3>{video.title}</h3>
                    </div>
                ))}
            </div>
            {currentVideo && (
                <ReactPlayer url={currentVideo.url} playing controls />
            )}
        </div>
    );
};

export default App;
