type PaginationProps = {
  currentPage: number;
  totalPages?: number | null;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // If totalPages is not a valid number or only 1 page, return nothing
  if (typeof totalPages !== "number" || totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-6 gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 bg-white text-black border border-black dark:bg-transparent dark:text-white dark:border-white rounded-full transition-transform duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-full transition-transform duration-300 ${
            page === currentPage
              ? "bg-black text-white scale-110 dark:bg-white dark:text-black"
              : "bg-white text-black border border-black dark:bg-transparent dark:text-white dark:border-white hover:scale-110"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 bg-white text-black border border-black dark:bg-transparent dark:text-white dark:border-white rounded-full transition-transform duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
