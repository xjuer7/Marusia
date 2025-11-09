import './style.scss'

const genreImagesUrl: Record<string, string> = {
    "action": '/img/action.webp',
    "adventure": '/img/adventure.webp',
    "history": '/img/history.webp',
    "horror": '/img/horror.webp',
    "scifi": '/img/scifi.webp',
    "stand-up": '/img/stand-up.webp',
    "fantasy": '/img/fantasy.webp',
    "drama": '/img/drama.webp',
    "mystery": '/img/mystery.webp',
    "family": '/img/family.webp',
    "comedy": '/img/comedy.webp',
    "romance": '/img/romance.webp',
    "music": '/img/music.webp',
    "crime": '/img/crime.webp',
    "tv-movie": '/img/tv-movie.webp',
    "documentary": '/img/documentary.webp',
    "thriller": '/img/thriller.webp',
    "western": '/img/western.webp',
    "animation": '/img/animation.webp',
    "war": '/img/war.webp',
}

export const GenreItems = ({ title }: {title: string}) => {
    const imageUrl = genreImagesUrl[title as keyof typeof genreImagesUrl]

    return (
        <div className="card">
            <img src={imageUrl} alt="постер" className="card_img"/>
            <p className="card_title">{title}</p>
        </div>
    )
}