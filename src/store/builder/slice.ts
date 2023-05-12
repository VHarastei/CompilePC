import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Part,
  Assembly,
  Builder,
  CategoryName,
  SelectedFilter,
  CompatibleFilter,
  Comparison,
} from '../../../types/index';
import {
  emptyComparisonState,
  emptyState,
  ProductCategories,
} from '../../common/constants';
import getCompatibleFilterValues from '../../utils/getCompatibleFilterValues';

export interface BuilderState {
  builders: Builder[];
  openedBuilder: CategoryName | null;
  assembly: Assembly;
  compatibleFilters: CompatibleFilter;
  comparison: Comparison;
}

const builders: Builder[] = Object.values(ProductCategories).map(
  (category) => ({
    ...category,
    filter: {},
  }),
);

const initialState: BuilderState = {
  builders,
  openedBuilder: null,
  assembly: emptyState,
  compatibleFilters: emptyState,
  comparison: emptyComparisonState,
};

export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    openBuilder: (state, action: PayloadAction<CategoryName>) => {
      if (state.openedBuilder === action.payload) {
        state.openedBuilder = null;
        return;
      }
      state.openedBuilder = action.payload;
    },
    setFilter: (
      state,
      action: PayloadAction<{ category: CategoryName; filter: SelectedFilter }>,
    ) => {
      const { category, filter } = action.payload;
      state.builders = state.builders.map((builder) =>
        builder.categoryName === category ? { ...builder, filter } : builder,
      );
    },
    addAssemblyPart: (
      state,
      action: PayloadAction<{ part: Part; category: CategoryName }>,
    ) => {
      state.assembly = {
        ...state.assembly,
        [action.payload.category]: action.payload.part,
      };

      const filterValues = getCompatibleFilterValues(
        action.payload.category,
        action.payload.part,
      );

      state.compatibleFilters = {
        ...state.compatibleFilters,
        [action.payload.category]: { ...filterValues },
      };
    },
    removeAssemblyPart: (state, action: PayloadAction<CategoryName>) => {
      state.assembly = {
        ...state.assembly,
        [action.payload]: null,
      };

      delete state.compatibleFilters[action.payload];
    },
    eraseAssembly: (state) => {
      state.assembly = emptyState;
      state.openedBuilder = null;
      state.compatibleFilters = emptyState;
    },
    addComparisonItem: (
      state,
      action: PayloadAction<{ part: Part; category: CategoryName }>,
    ) => {
      state.comparison = {
        ...state.comparison,
        [action.payload.category]: [
          ...state.comparison[action.payload.category],
          action.payload.part,
        ],
      };
    },
    removeComparisonItem: (
      state,
      action: PayloadAction<{ part: Part; category: CategoryName }>,
    ) => {
      const { category, part } = action.payload;
      const parts: Part[] = state.comparison[category];
      state.comparison = {
        ...state.comparison,
        [category]: [
          ...(parts.filter(
            (product: Part) => product.id !== part.id,
          ) as typeof parts),
        ],
      };
    },
  },
});

export const {
  openBuilder,
  setFilter,
  addAssemblyPart,
  removeAssemblyPart,
  eraseAssembly,
  addComparisonItem,
  removeComparisonItem,
} = builderSlice.actions;

export default builderSlice.reducer;
