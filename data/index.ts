export type Navbar = {
  id: number;
  name: string;
  url: string;
  value: string;
}

export const navbars: Navbar[] = [
  {
    id: 1,
    name: "Movies",
    url: "/movie",
    value: "movie"
  },
  {
    id: 2,
    name: "Tv",
    url: "/tv",
    value: "tv"
  },
  {
    id: 3,
    name: "People",
    url: "/people",
    value: "people"
  },
]