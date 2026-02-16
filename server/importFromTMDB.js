require("dotenv").config();
const fetch = require("node-fetch"); // if not installed: npm i node-fetch@2
const connectDB = require("./config/db");
const Movie = require("./models/Movie");

const TMDB_KEY = process.env.TMDB_KEY;

const run = async () => {
  if (!TMDB_KEY) {
    console.error("Set TMDB_KEY in .env");
    process.exit(1);
  }

  await connectDB();

  // const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_KEY}&language=en-US&page=1`;
  // const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&language=en-US&region=IN&with_original_language=hi&sort_by=popularity.desc&page=1`;
  // const url=`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&region=IN&language=en-US`
  const url=`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}
&region=IN
&with_original_language=hi
&with_release_type=3
&sort_by=release_date.desc
&page=1`  

  const res = await fetch(url);
  const data = await res.json();

  for (const item of data.results) {
    const found = await Movie.findOne({ tmdbId: item.id });
    if (found) {
      console.log("Already exists:", item.title);
      continue;
    }
    const posterUrl = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "";
    await Movie.create({
      tmdbId: item.id,
      title: item.title,
      description: item.overview,
      language: item.original_language,
      posterUrl,
      isActive: true,
    });
    console.log("Saved:", item.title);
  }

  console.log("Done");
  process.exit(0);
};

run();
