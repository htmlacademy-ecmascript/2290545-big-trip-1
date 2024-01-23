import {render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EditingFormView from '../view/form/editing-form-view.js';
import PointsContainerView from '../view/points-container-view.js';
import PointView from '../view/point/point-viewt.js';
import {replace} from '../framework/render.js';
import PointListEmptyView from '../view/point-list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';

export default class ListPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #sortComponent = new SortView();
  #pointListEmptyComponent = new PointListEmptyView();
  #pointsContainerComponent = new PointsContainerView();

  #listPoints = [];
  #pointPresenters = new Map();

  constructor ({container, pointsModel, destinationsModel, offersModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    render(new SortView(), tripEventsContainer);
    render(this.pointsContainerView, tripEventsContainer);

    if (this.#pointsModel.get().length) {

      render(this.pointsContainerView, tripEventsContainer);

      const points = this.#pointsModel.get();
      for (let i = 0; i < points.length; i++) {
        this.#renderPoint(points[i]);
      }

    }else{
      render(new PointListEmptyView(), tripEventsContainer);
    }
  }

  #renderPoint = (point) => {

    const pointPresenter = new PointPresenter({
      pointsContainer: this.#pointsContainerComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
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
  };

}
