import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/api';
import ReactPlayer from 'react-player';

import { CiChat1 } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { CiRead } from "react-icons/ci";

const Video = () => {
    const { videoId } = useParams();
    const [videoDetail, setVideoDetail] = useState(null);
    const [comments, setComments] = useState([]);
    

    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${videoId}`)
            .then((data) => {
                setVideoDetail(data.items[0]);
                console.log(data);
            });
             // Fetch video comments
            fetchComments(videoId);
    }, [videoId]);

    const fetchComments = (videoId) => {
        // Use the YouTube Data API to fetch comments for the video
        // Replace 'YOUR_API_KEY' with your actual YouTube Data API key
        const apiKey = 'https://youtube-v31.p.rapidapi.com';
        fetchFromAPI(`commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`)
            .then((data) => {
                setComments(data.items);
            });
    };


    return (
        <section id='videoViewPage'>
            {videoDetail && (
                <div className="video__view">
                    <div className="video__play">
                        <ReactPlayer
                            playing={true}
                            url={`https://www.youtube.com/watch?v=${videoId}`}
                            width='100%'
                            height='100%'
                            style={{position: 'absolute', top:0, left: 0}}
                        />
                    </div>
                    <div className='video__info'>
                        <h2 className='video__title'>
                            {videoDetail.snippet.title}
                        </h2>
                        <div className='video__channel'>
                            <div className='id'>
                                <Link to={`/channel/${videoDetail.snippet.channelId}`}>{videoDetail.snippet.channelTitle}</Link>
                            </div>
                            <div className='count'>
                                <span className='view'><CiChat1 />{videoDetail.statistics.viewCount}</span>
                                <span className='like'><CiStar />{videoDetail.statistics.likeCount}</span>
                                <span className='comment'><CiRead />{videoDetail.statistics.commentCount}</span>
                            </div>
                        </div>
                    </div>
                    <div className='desc__channel'>
                        {videoDetail.snippet.description}
                    </div>
                            
                    {/* Comment section */}
                    <div className="video__comment">
                        <h3>댓글</h3>
                        <ul>
                            {comments.map((comment, index) => (
                                <li key={index}>
                                    <div className="comment__author">{comment.snippet.topLevelComment.snippet.authorDisplayName}</div>
                                    <div className="comment__text">{comment.snippet.topLevelComment.snippet.textDisplay}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Video