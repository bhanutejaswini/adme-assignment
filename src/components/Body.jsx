import { useState, useEffect } from "react";
import axios from "axios";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import ImageCard from "./ImageCard";
import Pagination from "./Pagination";

const Body = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchImages = async (page) => {
    console.log(page);
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=100`
      );
      setImages([...images, ...response.data]);
      console.log(response.headers);
    } catch (error) {
      console.error(error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    fetchImages(currentPage);
  }, [currentPage]);

  return (
    <>
      <img className="header-img" src="/assets/header.png" alt="Header Image" />
      {hasError && <h3>Error fetching images. Please try again later.</h3>}
      {isLoading && <h3>Loading images...</h3>}

      <div className="pictures-container">
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            350: 1,
            1100: 2,
          }}
        >
          <Masonry>
            {images.map((image, index) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      {!isLoading && (
        <Pagination
          currentPage={currentPage}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </>
  );
};

export default Body;
