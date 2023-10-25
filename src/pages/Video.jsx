	import React, { useEffect, useState } from 'react';
	import { Link, useParams } from 'react-router-dom';
	import ReactPlayer from 'react-player';
	import { AiOutlineEye } from 'react-icons/ai';
	import { FcLike } from 'react-icons/fc';
	import { AiOutlineComment } from 'react-icons/ai';
	import { fetchFromAPI } from '../utils/api';

	const Video = () => {
	const { videoId } = useParams();
	const [videoDetail, setVideoDetail] = useState(null);
	const [comments, setComments] = useState([]);
	const [loadingComments, setLoadingComments] = useState(true);

	const getVideoComments = async (videoId) => {
		try {
			const endpoint = 'commentThreads';
			const params = {
			part: 'snippet',
			videoId: videoId,
			maxResults: 10,
			};

			const response = await fetchFromAPI(endpoint, params);

			if (response.items && response.items.length > 0) {
			// 댓글 정보 추출
			const comments = response.items.map(item => item.snippet.topLevelComment.snippet.textDisplay);
			return comments;
			} else {
				return []; // 댓글이 없으면 빈 배열 반환
		}
		} catch (error) {
			console.error('댓글을 가져오는 중 오류 발생:', error);
			throw error;
		}
	};

	useEffect(() => {
		fetchFromAPI(`videos?part=snippet,statistics&id=${videoId}`)
		.then((data) => {
			setVideoDetail(data.items[0]);
		});

		getVideoComments(videoId)
		.then((commentsData) => {
			if (Array.isArray(commentsData)) {
			setComments(commentsData);
			} else {
			setComments([]); // 댓글 데이터가 없거나 문제가 있을 경우 빈 배열로 설정
			}
			setLoadingComments(false);
		});
	}, [videoId]);

	return (
		<section id='videoViewPage'>
		{videoDetail && (
			<div className='video__view'>
			<div className='video__play'>
				<ReactPlayer
					playing={true}
					url={`https://www.youtube.com/watch?v=${videoId}`}
					width='100%'
					height='100%'
					style={{ position: 'absolute', top: '0%', left: '0' }}
				/>
			</div>
			<div className='video__info'>
				<h2 className='video__title'>{videoDetail.snippet.title}</h2>
				<div className='video__channel'>
				<div className='id'>
					<Link to={`/channel/${videoDetail.snippet.channelId}`}>
						{videoDetail.snippet.channelTitle}
					</Link>
				</div>
				<div className='count'>
					<span className='view'>
						<AiOutlineEye />
						{videoDetail.statistics.viewCount}
					</span>
					<span className='like'>
						<FcLike />
						{videoDetail.statistics.likeCount}
					</span>
					<span className='comment'>
						<AiOutlineComment />
						{videoDetail.statistics.commentCount}
					</span>
				</div>
				</div>
				<div className='video__desc'>{videoDetail.snippet.description}</div>
			</div>
			</div>
		)}

			<div className='video__comments'>
				<h3>댓글</h3>
				{loadingComments ? (
				<p>Loading comments...</p>
				) : (
				<ul>
					{comments.map((comment, index) => (
					<li key={index}>{comment}</li>
					))}
				</ul>
				)}
			</div>
		</section>
	);
	};

	export default Video;