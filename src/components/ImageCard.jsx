const ImageCard = ({ image }) => {
  return (
    <img
      src={image.download_url}
      alt={image.author}
      className="picture"
      onError={(event) => {
        event.target.style.display = "none";
      }}
    />
  );
};

export default ImageCard;
