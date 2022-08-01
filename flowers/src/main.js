import movies from "../data/movies.json";
import { drawBarchart, updateBarchartNew, updateBarchartOld } from "./barchart";
import { drawFlowers, topGenres, updateFlowers } from "./flowers";

// Barchart
const svg = drawBarchart([10, 20, 30, 40, 50], 600, 400);
setTimeout(
  () => updateBarchartNew([11, 40, 3, 89, 65, 20, 18, 14, 10, 18, 88, 44], svg),
  1000
);

// Flowers
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input[type=checkbox]");

updateFlowers(movies, 1200, 3200);

inputs.forEach((input) => {
  input.addEventListener("change", () => {
    const formData = new FormData(form);
    const genreFilter = formData.getAll("genres");
    const ratedFilter = formData.getAll("rated");
    const filteredData = movies.filter(
      (movie) =>
        (genreFilter.includes(movie.genres[0]) ||
          (genreFilter.includes("Other") &&
            !topGenres.includes(movie.genres[0]))) &&
        ratedFilter.includes(movie.rated)
    );
    console.log(genreFilter);
    updateFlowers(filteredData, 1200, 3200);
  });
});
