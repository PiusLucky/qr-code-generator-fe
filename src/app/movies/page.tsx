"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import { apiClient } from "@/api";
import apiResources from "@/api/resources";
import { IMovie, IMovieList } from "@/types";
import { useSearchParams } from "next/navigation";

function Movies() {
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  const [loading, setLoading] = useState(true);
  const queryParams = useSearchParams();
  const movieIds = queryParams.get("ids");

  useEffect(() => {
    async function fetch() {
      const movieIdsWithoutBrackets = movieIds?.slice(1, -1);
      if (movieIdsWithoutBrackets) {
        try {
          const { result } = await apiClient.get<IMovieList>(
            apiResources.movies,
            `/byIds/${movieIdsWithoutBrackets}`
          );
          setMovies(result);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
    }

    fetch();
  }, []);

  return (
    <div className="mt-16">
      <div className="flex justify-center font-bold text-3xl mb-8">
        Smart QR <span className="text-[#27d17fe6] pl-2">Movies</span>
      </div>

      <div className="p-8">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {movies?.map((movie) => (
              <MovieCard
                id={movie.id}
                title={movie.title}
                year={movie.year}
                image={movie.image}
                key={movie.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Movies;
