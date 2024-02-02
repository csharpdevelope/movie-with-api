const getImagePath = (imagePath?: string, fullsize?: boolean) => {
  return imagePath ? 
    `http://image.tmdb.org/t/p/${fullsize ? "original": "w500"}/${imagePath}`
    : "https://demofree.sirv.com/nope-not-here.jpg";
}

export default getImagePath;