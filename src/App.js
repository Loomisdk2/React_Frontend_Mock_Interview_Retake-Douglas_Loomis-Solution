import React, { useEffect, useState } from "react";
import AlbumDetail from "./AlbumDetail";

function App() {
  const [albums, setAlbums] = useState([]);
  const [images, setImages] = useState([]);
  const [expandedAlbum, setExpandedAlbum] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums?userId=1")
      .then((response) => response.json())
      .then(setAlbums)
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Fetch comments
  const showPhotos = (albumId) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
      .then((response) => response.json())
      .then((photos) => {
        const first10Photos = photos.slice(0, 10);
        setImages(first10Photos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Click handler
  const handleClick = (albumId) => {
    if (expandedAlbum === albumId) {
      // collapse
      setImages([]);
      setExpandedAlbums(null);
    } else {
      // expand
      setExpandedAlbum(albumId);
      showPhotos(albumId);
    }
  };

  return (
    <div className="App">
      <h1>Albums</h1>
      <ul>
        {albums.map((album) => (
          <li>
            <p onClick={() => handleClick(album.id)}>{album.title}</p>
            {expandedAlbum === album.id && (
              <div>
                <h3>Photos</h3>
                <ul>
                  {images.map((image) => (
                    <li>
                      <p>{image.title}</p>
                      <img src={image.thumbnailUrl} alt={image.title} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;