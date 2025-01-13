import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/slices/productSlice";
import { addToCart } from "../../store/slices/cartSlice";
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/Pagination";
import { ProductSection } from "./ProductSection";
import { ProductHeader } from "./ProductHeader";
import { ProductFilters } from "./ProductFilters";
import "./ProductList.scss";

// Keep the useDebounce hook as is...
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const btnFilterRef = useRef(false);
  const { categories } = useAppSelector((state) => state.category);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchParams, setSearchParams] = useSearchParams();
  const [showApplyButton, setShowApplyButton] = useState(false);

  const [filters, setFilters] = useState({
    category: Number(searchParams.get("category")) || null,
    minPrice: Number(searchParams.get("minPrice")) || 0,
    maxPrice: Number(searchParams.get("maxPrice")) || 10000,
    rating: Number(searchParams.get("rating")) || null,
    sort: "price",
    order: "ASC",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
  });

  const debouncedFilters = useDebounce(filters, 300);

  useEffect(() => {
    const params = new URLSearchParams();

    console.log("params======>", params);

    if (filters.category) params.set("category", filters.category.toString());
    if (filters.minPrice > 0)
      params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice < 10000)
      params.set("maxPrice", filters.maxPrice.toString());
    if (filters.rating) params.set("rating", filters.rating.toString());
    if (filters.sort !== "featured") params.set("sort", filters.sort);
    if (filters.order) params.set("order", filters.order);
    if (filters.page > 1) params.set("page", filters.page.toString());
    if (filters.limit !== 10) params.set("limit", filters.limit.toString());
    if (view !== "grid") params.set("view", view);
    setSearchParams(params);
  }, [filters, view, setSearchParams]);

  useEffect(() => {
    if (
      JSON.stringify({
        ...filters,
        page: undefined, // Exclude page from comparison
      }) !==
      JSON.stringify({
        ...debouncedFilters,
        page: undefined, // Exclude page from comparison
      })
    ) {
      setShowApplyButton(true);
    }
  }, [
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters.rating,
    filters.order,
  ]);

  // Memoize handlers
  const handleSearch = useCallback(() => {
    // Search implementation
  }, []);

  const handleSortChange = useCallback((sort: string) => {
    if (sort === "price_low_to_high") {
      setFilters((prev) => ({
        ...prev,
        order: "ASC",
        page: 1,
      }));
      return;
    }
    setFilters((prev) => ({
      ...prev,
      order: "DESC",
      page: 1,
    }));
  }, []);

  const handleCategoryChange = useCallback((categoryId: number) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === categoryId ? null : categoryId,
      page: 1,
    }));
  }, []);

  const handlePriceChange = useCallback((min: number, max: number) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
      page: 1,
    }));
  }, []);

  const handleRatingChange = useCallback((rating: number) => {
    setFilters((prev) => ({
      ...prev,
      rating: prev.rating === rating ? null : rating,
      page: 1,
    }));
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      setFilters((prev) => ({ ...prev, page }));
      const queryParams = new URLSearchParams(searchParams);
      queryParams.set("page", page.toString());
      dispatch(fetchProducts(queryParams.toString()));
    },
    [dispatch, searchParams]
  );

  const handleAddToCart = useCallback(
    (id: number) => {
      dispatch(addToCart({ product_id: id, quantity: 1 }));
    },
    [dispatch]
  );

  const setViewCallback = useCallback((newView: "grid" | "list") => {
    setView(newView);
  }, []);

  // Memoize computed values
  const headerProps = useMemo(
    () => ({
      view,
      setView: setViewCallback,
      onSearch: handleSearch,
      onSort: handleSortChange,
      currentSort:
        filters.order === "ASC" ? "price_low_to_high" : "price_high_to_low",
    }),
    [view, setViewCallback, handleSearch, handleSortChange, filters.order]
  );

  const applyFilterHandler = useCallback(() => {
    const queryParams = new URLSearchParams(searchParams).toString();
    dispatch(fetchProducts(queryParams));
    setShowApplyButton(false);
  }, [dispatch, searchParams]);

  const filterProps = useMemo(
    () => ({
      categories,
      filters,
      onCategoryChange: handleCategoryChange,
      onPriceChange: handlePriceChange,
      onRatingChange: handleRatingChange,
      onApplyFilters: applyFilterHandler,
      showApplyButton,
    }),
    [
      categories,
      filters,
      handleCategoryChange,
      handlePriceChange,
      handleRatingChange,
      applyFilterHandler,
      showApplyButton,
    ]
  );

  const productSectionProps = useMemo(
    () => ({
      view,
      onAddToCart: handleAddToCart,
    }),
    [view, handleAddToCart]
  );

  return (
    <div className="product-list">
      <ProductHeader {...headerProps} />
      <div className="product-list__content">
        <ProductFilters {...filterProps} />
        <ProductSection {...productSectionProps} />
      </div>
      <Pagination
        currentPage={filters.page}
        limit={filters.limit}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;
