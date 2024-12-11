// reducers/subCategoryReducer.ts
import { SubCategoryActionTypes, subCategoryFailure, subCategoryRequest, subCategorySuccess } from "../action/subCategoryAction";

interface SubCategoryState {
  subCategorys: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SubCategoryState = {
  subCategorys: [],
  loading: false,
  error: null,
};

const subCategoryReducer = (state = initialState, action: SubCategoryActionTypes): SubCategoryState => {
  switch (action.type) {
    case subCategoryRequest:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case subCategorySuccess:
      return {
        ...state,
        loading: false,
        subCategorys: action.payload,
      };
    case subCategoryFailure:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default subCategoryReducer;
