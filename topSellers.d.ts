//? This file contains the types for top sellers

interface Author {
  name: string;
  isFollowing: boolean;
  image: string
}

export interface Root {
  data: Data
  status: number
  statusText: string
}

export interface Data {
  results: Result[];
  info: Info;
}

export interface Result {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  phone: string;
  cell: string;
  id: Id;
  picture: Picture;
  nat: string;
}

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Id {
  name: string;
  value: string;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}