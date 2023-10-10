import React from "react";

interface IProps {
  id: number;
  title: string;
  year: string;
  image: string;
}
function MovieCard({ id, title, year, image }: IProps) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-8 mr-8">
      <img className="rounded-t-lg" src={image} alt="" />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {year}, SQR_{id}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
