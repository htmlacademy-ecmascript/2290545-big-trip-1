import AbstractView from '../framework/view/abstract-view';
import { capitalize } from '../utils/point-utils.js';
export const filtersContainer = document.querySelector('.trip-controls__filters');

function createFilterItemTemplite(filter){
  return `<div class="trip-filters__filter">
  <input
  id="filter-${filter.type}"
  class="trip-filters__filter-input  visually-hidden"
  type="radio"
  name="trip-filter"
  value="${filter.type}"
  ${(filter.hasPoints) ? '' : 'disabled'}
  >
  <label class="trip-filters__filter-label"
  for="filter-${filter.type}">${capitalize(filter.type)}</label>
  </div>
  `;
}

function createFilterTemplate(filterItems){

  const filterItemsTemplite = filterItems
    .map((filter) => createFilterItemTemplite(filter)).join('');
  //.map((filter, index) => createFilterItemTemplite(filter, index === 0)).join('');
  return(
    `<form class="trip-filters" action="#" method="get">
        ${filterItemsTemplite}
        <button class="visually-hidden" type="submit">Accept filter</button>
        </form>`
  );
}

export default class FilterView extends AbstractView {
  #filters = null;

  constructor({filters}){
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
