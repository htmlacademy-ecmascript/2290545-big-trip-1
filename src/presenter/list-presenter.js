import {render} from '../render.js';
import FilterView, {filtersContainer} from '../view/filters-view.js';
import SortView, {tripEventsContainer} from '../view/sort-view.js';
import EditingFormView from '../view/form/editing-form-view.js';
import PointsContainerView from '../view/points-container-view.js';
import PointView from '../view/point/point-viewt.js';


export default class ListPresenter {

  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #pointsContainerView = new PointsContainerView();

  constructor ({pointsModel, destinationsModel, offersModel}) {
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    const points = this.#pointsModel.get();
    render(new FilterView(), filtersContainer);
    render(new SortView(), tripEventsContainer);
    render(new EditingFormView(
      points,
      this.#destinationsModel.getById(points[4].destination),
      this.#offersModel.getByType(points[4].type),
      this.#destinationsModel.get()),
    tripEventsContainer);

    render(this.#pointsContainerView, tripEventsContainer);

    for (let i = 0; i < points.length; i++) {

      render(new PointView(
        points[i],
        this.#destinationsModel.getById(points[i].destination),
        this.#offersModel.getByType(points[i].type),
      ),
      this.#pointsContainerView.getElement());
    }
  }
}

