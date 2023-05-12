import { createSelector } from '@reduxjs/toolkit';
import {
  SelectedFilter,
  Assembly,
  Builder,
  CategoryName,
  Part,
  CompatibleFilter,
  Comparison,
} from '../../../types/index';
import { RootState } from '../index';

type Selector<S> = (state: RootState) => S;

const selectOpenedBuilder = (state: RootState): CategoryName | null =>
  state.openedBuilder;

const selectBuilders = (state: RootState): Builder[] => state.builders;

const selectBuilder = (
  category: CategoryName | null,
): Selector<Builder | null> =>
  createSelector(
    selectBuilders,
    (builders: Builder[]) =>
      builders.find(({ categoryName }) => categoryName === category) || null,
  );

const selectAssembly = (state: RootState): Assembly => state.assembly;

const selectComparison = (state: RootState): Comparison => state.comparison;

const selectComparisonParts = (category: CategoryName): Selector<Part[]> =>
  createSelector(
    selectComparison,
    (comparison: Comparison) => comparison[category],
  );

const selectCompatibleFilters = (state: RootState): CompatibleFilter =>
  state.compatibleFilters;

const selectAssemblyPart = (category: CategoryName): Selector<Part | null> =>
  createSelector(selectAssembly, (assembly: Assembly) => assembly[category]);

const selectFilter = (
  category: CategoryName | null,
): Selector<SelectedFilter | null> =>
  createSelector(selectBuilder(category), (builder) => builder?.filter || null);

export {
  selectOpenedBuilder,
  selectBuilders,
  selectAssembly,
  selectAssemblyPart,
  selectBuilder,
  selectFilter,
  selectCompatibleFilters,
  selectComparisonParts,
};
