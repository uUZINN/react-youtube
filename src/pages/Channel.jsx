import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/api';
import { BsPersonPlusFill } from "react-icons/bs";
import { PiVideoFill } from "react-icons/pi";
import { AiOutlineEye } from "react-icons/ai";
import VideoSearch from '../components/video/VideoSearch';

const Channel = () => {
    const { channelId } = useParams();
    const [channelDetail, setChannelDetail] = useState();
    const [channelVideos, setChannelVideos] = useState([]);
    // const [videos, setVideos] = useState([]);

    
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await fetchFromAPI(`channels?part=snippet&id=${channelId}`);
                setChannelDetail(data.items[0]);

                const videosData = await fetchFromAPI(`search?channelId=${channelId}&part=snippet&order=date`);
                setChannelVideos(videosData.items);
                console.log(videosData)

            } catch(error){
                console.log("Error fetching data", error);
            }
        }

        fetchResults();
    }, [channelId])

    return (
        <section id='channel'>
            {channelDetail && (
                <div className='channel__inner'>
                    <div className='channel__header' style={{ backgroundImage: `url(${channelDetail.brandingSettings.image.bannerExternalUrl})` }}>
                        <div className='circle'>
                            <img src={channelDetail.snippet.thumbnails.high.url} alt={channelDetail.snippet.title} />
                        </div>
                    </div>
                    <div className="channel__info">
                        <h3 className='title'>{channelDetail.snippet.title}</h3>
                        <div className='info'>
                            <span><BsPersonPlusFill />{channelDetail.statistics.subscriberCount}</span>
                            <span><PiVideoFill />{channelDetail.statistics.videoCount}</span>
                            <span><AiOutlineEye />{channelDetail.statistics.viewCount}</span>
                        </div>
                        <p className='desc'>{channelDetail.snippet.description}</p>
                    </div>
                    <div className="channel__video video__inner">
                        <VideoSearch videos={channelVideos} />
                    </div>
                    
                    <div className="channel__more"></div>
                    
                </div>
                
            )} 
        </section>
    )
}

export default Channel