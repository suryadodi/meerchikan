import React, { useEffect, useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListSubheader,
  Skeleton,
  Radio,
} from "@mui/material";
import { ExpandLess, ExpandMore, TryRounded } from "@mui/icons-material";
import CardProduct from "@/components/cards/card";
import Checkbox from "@mui/material/Checkbox";
import { green } from "@mui/material/colors";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { AppDispatch } from "@/services/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/reducers";
import {
  categoryProductRequestAction,
  subCategoryProductRequestAction,
  productRequestAction,
  sellerPageRequestAction,
  setPageAction,
} from "@/services/action/productAction";
import { subCategoryRequestAction } from "@/services/action/subCategoryAction";
import { categoryRequestAction } from "@/services/action/productAction";
import { sellerRequestAction } from "@/services/action/sellerAction";
import {
  sortLowRequestAction,
  sortRequestAction,
} from "@/services/action/productAction";
import {
  categoryIdAction,
  initialCartRequest,
} from "@/services/action/cartAction";
import { useAuth } from "@/auth-provider";
import { useRouter } from "next/router";
import { featureRequestAction } from "@/services/action/featureAction";
import { trendingRequestAction } from "@/services/action/trendingAction";

const Products: React.FC<any> = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [showCategory, setShowCategory] = useState(true);
  const [hiddenItems, setHiddenItems] = useState<any>([]);
  const [showFilter, setShowFilter] = useState(true);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const [select, setSelect] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [option, setOption] = useState("");
  const [selectOption, setSelectOption] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState(true);
  const { user } = useAuth();
  const [activeIndex, setActiveIndex] = useState(null);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { features } = useSelector((state: RootState) => state.feature);
  const {
    products,
    categoryProduct,
    subCategoryProduct,
    currentPage,
    totalPages,
    itemsPerPage,
    categorys,
    error,
    sellersPage,
    sorts,
  } = useSelector((state: RootState) => state.product);
  const { categoryId } = useSelector((state: RootState) => state.cart);
  const { trending } = useSelector((state: RootState) => state.trending);
  const { sellers } = useSelector((state: RootState) => state.seller);

  const { subCategorys } = useSelector((state: RootState) => state.subCategory);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState<
    string | null
  >(null);
  useEffect(() => {
    dispatch(featureRequestAction(user?.id)); // Dispatch action to fetch banners
    dispatch(trendingRequestAction(user?.id));
  }, [dispatch, user]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    dispatch(categoryRequestAction({}));
    dispatch(subCategoryRequestAction({}));
    const isUUID = (id: any) =>
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      );
    if (categoryId && isUUID(categoryId)) {
      // setSelectedSubCategory();
      setOption("");
      setSelectOption(true);
      setSelect(true);
      dispatch(
        categoryProductRequestAction(categoryId, 1, itemsPerPage, user?.id)
      );
      dispatch(setPageAction(1));
      dispatch(featureRequestAction(user?.id));
      dispatch(trendingRequestAction(user?.id));
      setSelectedCategoryOption(categoryId);
      setSelectedCategory(categoryId);
    } else if (typeof categoryId === "string") {
      setOption("");
      setSelectedCategoryOption(null);
      setSelectedCategory(null);
      handleOptionClick(categoryId);
      dispatch(categoryIdAction(null));
    } else {
      dispatch(productRequestAction(currentPage, itemsPerPage, user?.id));
    }
  }, [dispatch, categoryId, user]);

  const handleCancelClickCategory = () => {
    setShowCategory(false);
  };

  const handleClick = (category: string) => {
    setOpenCategory((prev) => (prev === category ? null : category));
    setSelectedSubCategory(null); // Reset subcategory selection when clicking a category
  };

  const handleCancelClickFilter = () => {
    setShowFilter(false);
  };

  const handleClearAll = () => {
    setSelectedCheckboxes([]);
  };

  const handleCheckboxChange = (item: string) => {
    setSelectedCheckboxes((prev: any) =>
      prev.includes(item)
        ? prev.filter((checkbox: any) => checkbox !== item)
        : [...prev, item]
    );
  };

  const toggleItemVisibility = (index: number) => {
    setHiddenItems((prev: any) =>
      prev.includes(index)
        ? prev.filter((i: any) => i !== index)
        : [...prev, index]
    );
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPageAction(value));
    fetchProducts(value);
  };

  const fetchProducts = (page: number) => {
    if (selectedSubCategory) {
      dispatch(
        subCategoryProductRequestAction(
          selectedSubCategory,
          page,
          itemsPerPage,
          user?.id
        )
      );
    } else if (selectedCategory) {
      dispatch(
        categoryProductRequestAction(
          selectedCategory,
          page,
          itemsPerPage,
          user?.id
        )
      );
    } else if (option) {
      if (option === "Best Seller") {
        dispatch(sellerRequestAction(user?.id));
      } else if (option === "Price (High to Low)") {
        dispatch(sortRequestAction(option, page, itemsPerPage));
      } else if (option === "Price (Low to High)") {
        dispatch(sortLowRequestAction(option, page, itemsPerPage));
      } else if (option === "Price (Low to High)") {
        dispatch(sortLowRequestAction(option, page, itemsPerPage));
      } else if (option === "Feature Products") {
        dispatch(featureRequestAction(user?.id));
      } else if (option === "Trending Products") {
        dispatch(trendingRequestAction(user?.id));
      }
    } else {
      dispatch(productRequestAction(page, itemsPerPage, user?.id));
    }
  };

  const handleCategorySelect = (ide: string) => {
    // setActiveIndex(null)

    setOption("");
    dispatch(categoryProductRequestAction(ide, 1, itemsPerPage, user?.id));
    dispatch(setPageAction(1));
    setSelectedCategory(ide);
    console.log(ide, "ide");

    setSelectedSubCategory(null);
    setSelectOption(true);
    setSelect(true);
    setSelectedCategoryOption(null);
  };

  const handleSubCategorySelect = (subCategoryId: string) => {
    dispatch(
      subCategoryProductRequestAction(subCategoryId, 1, itemsPerPage, user?.id)
    );
    dispatch(setPageAction(1));
    setSelectedSubCategory(subCategoryId);
    setSelectOption(true);
    setSelect(true);
  };

  const handleOptionClick = (option: string) => {
    // setActiveIndex(index);
    setOption(option);
    setSelect(false);
    setSelectOption(false);
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    if (option === "Best Seller") {
      dispatch(sellerRequestAction(user?.id));
      setSelectedValue(false);
      setSelectOption(false);
    } else if (option === "Price (High to Low)") {
      dispatch(sortRequestAction(option, 1, itemsPerPage));
      setSelectedValue(false);
      setSelectOption(false);
    } else if (option === "Price (Low to High)") {
      dispatch(sortLowRequestAction(option, 1, itemsPerPage));
      setSelectedValue(false);
      setSelectOption(false);
    } else if (option === "Feature Products") {
      dispatch(featureRequestAction(user?.id));
      setSelectedValue(true);
      setSelectOption(false);
    } else if (option === "Trending Products") {
      dispatch(trendingRequestAction(user?.id));
      setSelectedValue(true);
      setSelectOption(false);
    }
    dispatch(setPageAction(1));
  };

  const filteredProducts = select
    ? selectedSubCategory
      ? subCategoryProduct
      : categoryProduct
    : products;

  const selectedValues =
    option === "Best Seller"
      ? sellers
      : option === "Feature Products"
      ? features
      : option === "Trending Products"
      ? trending
      : sorts;

  const finalProducts = selectOption ? filteredProducts : selectedValues;

  const filterTitles = ["Best Seller", "Trending Products", "Feature Products"];

  return (
    <>
      <div className="container">
        <div className="product-page">
          <div className="grocery">
            <div className="grocery_item">
              <p
                className="grocery_options"
                onClick={() => handleOptionClick("Sort by")}
              >
                Sort by:
              </p>
              <p
                className={`grocery_option ${
                  option === "Price (Low to High)" ? "active" : ""
                }`}
                onClick={() => handleOptionClick("Price (Low to High)")}
              >
                Price (Low to High)
              </p>
              <p
                className={`grocery_option ${
                  option === "Price (High to Low)" ? "active" : ""
                }`}
                onClick={() => handleOptionClick("Price (High to Low)")}
              >
                Price (High to Low)
              </p>
            </div>
          </div>

          <div className="grocery_category">
            <div className="categories">
              <div>
                {showCategory && (
                  <div className="category">
                    <div className="category_title">
                      <div className="category_body">
                        {/* <div>
                        <img src="/images/vector.jpg" className="category-cancel" onClick={handleCancelClickCategory} />
                      </div> */}
                        <h3 className="category-content">Categories</h3>
                      </div>
                      {loading ? (
                        <div>
                          <Skeleton
                            variant="rectangular"
                            width={320}
                            height={20}
                          />
                          {[...Array(6)].map((_, index) => (
                            <div key={index}>
                              <Skeleton
                                variant="rectangular"
                                width={320}
                                height={30}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        categorys?.map((category: any, index: any) => (
                          <div key={category.id}>
                            <List
                              sx={{ width: "100%", maxWidth: 392 }}
                              component="nav"
                              aria-labelledby="nested-list-subheader"
                              subheader={
                                <ListSubheader
                                  component="div"
                                  id="nested-list-subheader"
                                />
                              }
                            >
                              <ListItemButton
                                onClick={() => handleClick(index.toString())}
                              >
                                <ListItemText
                                  className={`category-dropdown ${
                                    selectedCategory === category.id ||
                                    selectedCategoryOption === category.id
                                      ? "selected"
                                      : ""
                                  }`}
                                  primary={category.category}
                                  onClick={() =>
                                    handleCategorySelect(category.id)
                                  }
                                />
                                {/* {openCategory === index.toString() ? <ExpandLess /> : <ExpandMore />} */}
                              </ListItemButton>
                              <Collapse
                                in={openCategory === index.toString()}
                                timeout="auto"
                                unmountOnExit
                              >
                                <List component="div" disablePadding>
                                  {subCategorys.map(
                                    (subCategory: any, itemIndex: number) => {
                                      if (
                                        category.id === subCategory.category
                                      ) {
                                        return (
                                          <ListItemButton
                                            style={{
                                              paddingLeft: "8px", // Adjust padding-left as needed
                                            }}
                                            key={subCategory.id}
                                            onClick={() =>
                                              handleSubCategorySelect(
                                                subCategory.id
                                              )
                                            }
                                            className={
                                              selectedSubCategory ===
                                              subCategory.id
                                                ? "selectedSub"
                                                : ""
                                            }
                                            sx={{
                                              py: 0.1, // Adjust vertical padding
                                              px: 0.1, // Adjust horizontal padding
                                            }}
                                          >
                                            <Radio
                                              checked={
                                                selectedSubCategory ===
                                                subCategory.id
                                              }
                                              onChange={() =>
                                                handleSubCategorySelect(
                                                  subCategory.id
                                                )
                                              }
                                              value={subCategory.id}
                                              name="subcategory"
                                              inputProps={{
                                                "aria-label":
                                                  subCategory.sub_name,
                                              }}
                                              sx={{
                                                "& .MuiSvgIcon-root": {
                                                  fontSize: 10, // Adjust size if needed
                                                },
                                              }}
                                            />
                                            <ListItemText
                                              className="category-menu"
                                              primary={subCategory.sub_name}
                                            />
                                          </ListItemButton>
                                        );
                                      }
                                      return null;
                                    }
                                  )}
                                </List>
                              </Collapse>
                              {index !== categorys.length - 1 && (
                                <hr className="category-line" />
                              )}
                            </List>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="grocery-filter">
                {showFilter && (
                  <div className="filter">
                    <div className="filter-head">
                      {/* <img src='/images/vector.jpg' className='filter-cancel' onClick={handleCancelClickFilter} /> */}
                      <div className="category-body">
                        <h3 className="category-content">Filters</h3>
                        {/* <p className='filter-clear' onClick={handleClearAll}>CLEAR ALL</p> */}
                      </div>
                    </div>

                    <div className="grocery">
                      {filterTitles.map((title, index) => (
                        <div key={index} className="grocery-item">
                          <p
                            className={`grocery-text ${
                              option === title ? "active" : ""
                            }`}
                            onClick={(e) => handleOptionClick(title)}
                          >
                            {title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="card-container">
              {loading ? (
                Array.from(new Array(10)).map((_, index) => (
                  <div className="category_item" key={index}>
                    <Skeleton variant="rectangular" width={320} height={375} />
                  </div>
                ))
              ) : (
                <>
                  {finalProducts?.map((product: any, index: any) => (
                    <div className="product-cards">
                      <CardProduct key={product.id} item={product} />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="card.pagination">
            <Stack spacing={1}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
              />
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
