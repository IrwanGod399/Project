export type Genre = "Action" | "Drama" | "Comedy" | "Sci-Fi" | "Horror" | "Romance" | "Thriller" | "Animation" | "Fantasy";

export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: Genre[];
  rating: number;
  director: string;
  synopsis: string;
  poster: string;
  runtime: number;
  cast: string[];
}

export interface WatchlistEntry {
  movieId: number;
  status: "want-to-watch" | "watching" | "watched";
  addedAt: string;
  userRating?: number;
  notes?: string;
}

export const MOVIES: Movie[] = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    rating: 8.8,
    director: "Christopher Nolan",
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "🎬",
    runtime: 148,
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: ["Drama"],
    rating: 9.3,
    director: "Frank Darabont",
    synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster: "🎭",
    runtime: 142,
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Drama", "Thriller"],
    rating: 9.0,
    director: "Christopher Nolan",
    synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster: "🦇",
    runtime: 152,
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
  },
  {
    id: 4,
    title: "Spirited Away",
    year: 2001,
    genre: ["Animation", "Fantasy"],
    rating: 8.6,
    director: "Hayao Miyazaki",
    synopsis: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.",
    poster: "🌊",
    runtime: 125,
    cast: ["Daveigh Chase", "Suzanne Pleshette", "Miyu Irino", "Rumi Hiiragi"],
  },
  {
    id: 5,
    title: "Parasite",
    year: 2019,
    genre: ["Drama", "Thriller"],
    rating: 8.5,
    director: "Bong Joon-ho",
    synopsis: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    poster: "🪱",
    runtime: 132,
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
  },
  {
    id: 6,
    title: "Interstellar",
    year: 2014,
    genre: ["Sci-Fi", "Drama"],
    rating: 8.7,
    director: "Christopher Nolan",
    synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "🚀",
    runtime: 169,
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
  },
  {
    id: 7,
    title: "The Godfather",
    year: 1972,
    genre: ["Drama", "Thriller"],
    rating: 9.2,
    director: "Francis Ford Coppola",
    synopsis: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster: "🌹",
    runtime: 175,
    cast: ["Marlon Brando", "Al Pacino", "James Caan", "Robert Duvall"],
  },
  {
    id: 8,
    title: "Get Out",
    year: 2017,
    genre: ["Horror", "Thriller"],
    rating: 7.7,
    director: "Jordan Peele",
    synopsis: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
    poster: "👁️",
    runtime: 104,
    cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford", "Catherine Keener"],
  },
  {
    id: 9,
    title: "Amélie",
    year: 2001,
    genre: ["Romance", "Comedy"],
    rating: 8.3,
    director: "Jean-Pierre Jeunet",
    synopsis: "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.",
    poster: "🍒",
    runtime: 122,
    cast: ["Audrey Tautou", "Mathieu Kassovitz", "Rufus", "Lorella Cravotta"],
  },
  {
    id: 10,
    title: "Everything Everywhere All at Once",
    year: 2022,
    genre: ["Action", "Comedy", "Sci-Fi"],
    rating: 7.8,
    director: "Daniel Kwan, Daniel Scheinert",
    synopsis: "An aging Chinese immigrant is swept up in an insane adventure in which she alone can save existence by exploring other universes connecting with the lives she could have led.",
    poster: "🥟",
    runtime: 139,
    cast: ["Michelle Yeoh", "Ke Huy Quan", "Jamie Lee Curtis", "Stephanie Hsu"],
  },
  {
    id: 11,
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
    genre: ["Drama", "Romance", "Sci-Fi"],
    rating: 8.3,
    director: "Michel Gondry",
    synopsis: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
    poster: "🧠",
    runtime: 108,
    cast: ["Jim Carrey", "Kate Winslet", "Tom Wilkinson", "Kirsten Dunst"],
  },
  {
    id: 12,
    title: "Mad Max: Fury Road",
    year: 2015,
    genre: ["Action", "Sci-Fi"],
    rating: 8.1,
    director: "George Miller",
    synopsis: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
    poster: "🔥",
    runtime: 120,
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult", "Hugh Keays-Byrne"],
  },
];

export const ALL_GENRES: Genre[] = [
  "Action", "Drama", "Comedy", "Sci-Fi", "Horror", "Romance", "Thriller", "Animation", "Fantasy"
];
