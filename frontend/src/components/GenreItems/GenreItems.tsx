import './style.scss'

const genreImagesUrl: Record<string, string> = {
    "боевик": '/img/action.webp',
    "анимэ": '/img/anime.webp',
    "история": '/img/history.webp',
    "фэнтези": '/img/fantasy.webp',
    "драма": '/img/drama.webp',
    "для взрослых": '/img/mystery.webp',
    "семейный": '/img/family.webp',
    "комедия": '/img/comedy.webp',
    "мелодрама": '/img/romance.webp',
    "детектив": '/img/thriller.webp',
    "мультфильмы": '/img/animation.webp',
    "военный": '/img/war.webp',
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