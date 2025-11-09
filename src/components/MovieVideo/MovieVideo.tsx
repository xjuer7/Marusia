
import ReactPlayer from 'react-player'
import { Loader } from '../Loader/Loader.tsx'
import './style.scss'

const MovieVideo = ({videoSrc, onClick}: {videoSrc:string, onClick: () => void}) => {
    return (
        <div className='movie-video__overlay'>
            <div className='movie-video__wrapper'>
                <ReactPlayer src={videoSrc} className='movie-video__content' fallback={<Loader />}/>
                <button onClick={onClick} className='movie-video__btn'></button>
            </div>
        </div>
    )
}

export default MovieVideo