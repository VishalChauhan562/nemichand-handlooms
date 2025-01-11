import React from "react";
import { Search, Filter } from "lucide-react";
import { debounce } from "lodash";
import { useAppSelector } from "../../store/hooks";

interface ProductToolbarProps {
  isCategoryNeeded? : boolean;
  onSearch: (query: string) => void;
  onCategoryFilter?: (category: string) => void;
}

export const ProductToolbar: React.FC<ProductToolbarProps> = ({
  onSearch,
  onCategoryFilter,
  isCategoryNeeded
}) => {
  const debouncedSearch = debounce((value: string) => onSearch(value), 300);
  const { categories } = useAppSelector((state) => state.category);

  return (
    <>
      <div className="search-box">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>

      {isCategoryNeeded && <div className="filter-box">
        <Filter size={20} />
        <select onChange={(e) => onCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>}
    </>
  );
};
