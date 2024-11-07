import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmRmODQ4NjU2NGE0YmQ4NTJhMGEzMjczZDVmZDFlOCIsIm5iZiI6MTcyOTI1NTAxMy44MDE4MzIsInN1YiI6IjY3MDY5Yjk4YTg4NjE0ZDZiMDhiMDBkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9fHx0v11t-h96EpEg9Yt3-k7MMd8X9fJJBJtfDqVM4Y'
      }
})

export default instance;