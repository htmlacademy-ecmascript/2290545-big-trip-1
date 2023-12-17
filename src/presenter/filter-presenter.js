import FilterView from '../view/filters-view';
import { generateFilters } from '../mock/filter-mock.js';
import { render } from '../framework/render.js';

export default class FilterPresenter {
  #container = null;
  #pointsModel = null;
  #filters = [];

  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;

    this.#filters = generateFilters(this.#pointsModel.get());
  }

  init() {
    render(new FilterView(this.#filters), this.#container);
  }
}
