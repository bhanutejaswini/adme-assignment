const Pagination = ({ currentPage, onPrevious, onNext }) => {
  //   console.log(allPages);

  return (
    <div className="text-center mt-3 pagination">
      <button disabled={currentPage === 1} onClick={onPrevious}>
        &lt;
      </button>
      <span>Page {currentPage}</span>
      <button onClick={onNext}> &gt;</button>
    </div>
  );
};

export default Pagination;
