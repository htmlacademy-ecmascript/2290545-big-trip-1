import {render} from '../framework/render.js';
import FilterView, {filtersContainer} from '../view/filters-view.js';
import SortView, {tripEventsContainer} from '../view/sort-view.js';
import EditingFormView from '../view/form/editing-form-view.js';
import PointsContainerView from '../view/points-container-view.js';
import PointView from '../view/point/point-viewt.js';
import {replace} from '../framework/render.js';

export default class ListPresenter {
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  pointsContainerView = new PointsContainerView();

  constructor ({pointsModel, destinationsModel, offersModel}) {
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    render(new FilterView(), filtersContainer);
    render(new SortView(), tripEventsContainer);
    render(this.pointsContainerView, tripEventsContainer);

    for (let i = 0; i < this.#pointsModel.points.length; i++) {
      this.#renderPoint(this.#pointsModel.points[i]);
    }
  }

  #renderPoint(point) {

    const pointComponent = new PointView({
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onEditClick: pointEditClickHandler,
    });
    const editingFormComponent = new EditingFormView({
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      arrayDestinationsModel: this.#destinationsModel.destinations,
      onRollupClick: rollupButtonClickHandler,
      onSubmitClick: pointSubmitHandler,
    });

    function escKeyDownHandler (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    }

    function replacePointToForm () {
      replace(editingFormComponent, pointComponent);
    }
    function replaceFormToPoint () {
      replace(pointComponent, editingFormComponent);
    }

    function pointEditClickHandler () {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    }
    function rollupButtonClickHandler () {
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    }
    function pointSubmitHandler () {
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(pointComponent, this.pointsContainerView.element);
  }

}
