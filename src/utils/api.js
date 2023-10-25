import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
    params: {
        maxResults: 48,
    },
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    },
};

export const fetchFromAPI = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    console.log(data)
    return data;
};



export const getVideoComments = async (videoId) => {
    try {
        // 동영상의 댓글 가져오기 위한 엔드포인트와 매개변수 설정
        const endpoint = 'commentThreads';
        const params = {
            part: 'snippet',
            videoId: videoId, // 동영상 ID
            maxResults: 10, // 가져올 댓글의 최대 수 (설정한대로 조정 가능)
        };

        // fetchFromAPI 함수를 사용하여 데이터 가져오기
        const response = await fetchFromAPI(endpoint, params);

        if (response && response.items) {
            // 댓글 정보 추출
            const comments = response.items.map(item => item.snippet.topLevelComment.snippet.textDisplay);
            return comments;
        } else {
            // 데이터가 없는 경우 빈 배열 반환
            return [];
        }
    } catch (error) {
        console.error('댓글을 가져오는 중 오류 발생:', error);
        throw error;
    }
};
