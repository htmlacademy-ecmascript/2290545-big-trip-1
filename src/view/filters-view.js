import AbstractView from '../framework/view/abstract-view';
import { capitalize } from '../utils/point-utils.js';

function createFilterItemTemplite(filter, currentFilterType){
  return `<div class="trip-filters__filter">
  <input
  id="filter-${filter.type}"
  class="trip-filters__filter-input  visually-hidden"
  type="radio"
  name="trip-filter"
  value="${filter.type}"
  ${(filter.hasPoints) ? '' : 'disabled'}
  ${filter.type === currentFilterType ? 'checked' : ''}
  >
  <label class="trip-filters__filter-label"
  for="filter-${filter.type}">${capitalize(filter.type)}</label>
  </div>
  `;
}

function createFilterTemplate(filterItems){

  const filterItemsTemplite = filterItems
    .map((filter) => createFilterItemTemplite(filter)).join('');

  return(
    `<form class="trip-filters" action="#" method="get">
        ${filterItemsTemplite}
        <button class="visually-hidden" type="submit">Accept filter</button>
        </form>`
  );
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}){
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
