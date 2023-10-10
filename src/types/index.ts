export interface IQRCode {
  status: number;
  message: string;
  result: string;
}

export interface IMovieList {
  status: number;
  message: string;
  result: IMovie[];
}

export interface IMovie {
  id: number;
  title: string;
  year: string;
  image: string;
}
