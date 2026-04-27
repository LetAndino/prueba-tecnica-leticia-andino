interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
                                                          currentPage,
                                                          totalPages,
                                                          onPageChange,
                                                      }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center gap-2 mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
            >
                ← Anterior
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded ${
                        currentPage === page
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
            >
                Siguiente →
            </button>
        </div>
    );
};