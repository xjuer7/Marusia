export type Movies = Movie[];
export type Person = {
  "id": number,
  "photo"?: string,
  "name": string,
  "enName"?: string,
  "description"?: string,
  "profession"?: string,
  "enProfession"?: string,
}

export type SimilarMovie = {
  "id": number,
  "name"?: string,
  "enName"?: string,
  "alternativeName"?: string,
  "type"?: string,
  "poster"?: {
    "url": string,
    "previewUrl": string
  },
  "rating": {
    "kp": number,
    "imdb": number,
    "tmdb": number,
    "filmCritics": number,
    "russianFilmCritics": number,
    "await": number
  },
  "year": number
}

export const GENRES = ['для взрослых', 'мультфильмы', 'анимэ', 'фэнтези', 'комедия', 'мелодрама', 'детектив', 'боевик', 'военный', 'история', 'семейный',  'драма' ]

export type Genres = (typeof GENRES)[number]

type GenresMovie = {name: Genres}
type CountriesMovie = {name: string}

export interface Movie {
  "id": number,
  "externalId"?: {
    "kpHD"?: string,
    "imdb"?: string,
    "tmdb"?: number
  },
  "name"?: string,
  "alternativeName"?: string,
  "enName"?: string,
  "names"?: [
    {
      "name": string,
      "language"?: string,
      "type"?: string
    }
  ],
  "type"?: string,
  "typeNumber"?: number,
  "year"?: number,
  "description"?: string,
  "shortDescription"?: string,
  "slogan"?: string,
  "status"?: string,
  "facts"?: [
    {
      "value": string,
      "type"?: string,
      "spoiler"?: boolean
    }
  ],
  "rating": {
    "kp"?: number,
    "imdb": number,
    "tmdb": number,
    "filmCritics"?: number,
    "russianFilmCritics"?: number,
    "await"?: number
  },
  "votes": {
    "kp"?: number,
    "imdb"?: number,
    "tmdb"?: number,
    "filmCritics"?: number,
    "russianFilmCritics"?: number,
    "await"?: number
  },
  "movieLength"?: number,
  "ratingMpaa"?: string,
  "ageRating"?: string,
  "logo"?: {
    "url" ?: string
  },
  "poster": {
    "url"?: string,
    "previewUrl"?: string
  },
  "backdrop"?: {
    "url"?: string,
    "previewUrl"?: string
  },
  "videos"?: {
    "trailers": [
      {
        "url"?: string,
        "name"?: string,
        "site"?: string,
        "size"?: number,
        "type"?: string
      }
    ]
  },
  "genres": GenresMovie[],
  "countries": CountriesMovie[],
  "persons"?: Person[],
  "reviewInfo"?: object,
  "seasonsInfo"?: object[],
  "budget"?: {
    "value": number,
    "currency": string
  },
  "fees"?: object,
  "premiere"?: {
    "country": string,
    "world": string,
    "russia"?: string,
    "digital"?: string,
    "cinema"?: string,
    "bluray"?: string,
    "dvd"?: string
  },
  "similarMovies"?: SimilarMovie[],
  "sequelsAndPrequels"?: SimilarMovie[],
  "watchability"?: object,
  "releaseYears"?: object[],
  "top10"?: number,
  "top250"?: number,
  "ticketsOnSale"?: boolean,
  "totalSeriesLength"?: number,
  "seriesLength"?: number,
  "isSeries"?: boolean,
  "audience"?: object[],
  "lists"?: string[],
  "networks"?: object,
  "updatedAt"?:string,
  "createdAt"?:string
}







