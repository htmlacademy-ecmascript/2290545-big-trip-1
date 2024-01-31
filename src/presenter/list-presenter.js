import {render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointsContainerView from '../view/points-container-view.js';
import PointListEmptyView from '../view/point-list-empty-view.js';
import PointPresenter from './point-presenter.js';

export default class ListPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #sortComponent = new SortView();
  #pointListEmptyComponent = new PointListEmptyView();
  #pointsContainerView = new PointsContainerView();

  #pointPresenters = new Map();

  constructor ({container, pointsModel, destinationsModel, offersModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    render(new SortView(), this.#container);
    render(this.#pointsContainerView, this.#container);

    if (this.#pointsModel.get().length) {

      render(this.#pointsContainerView, this.#container);

      const points = this.#pointsModel.get();
      for (let i = 0; i < points.length; i++) {
        this.#renderPoint(points[i]);
      }

    }else{
      render(new PointListEmptyView(), this.#container);
    }
  }

  #handlePointChange = (point) => {
    this.#pointsModel.update(point);
    this.#pointPresenters.get(point.id).init(point);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint = (point) => {

    const pointPresenter = new PointPresenter({
      pointsContainer: this.#pointsContainerView.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };
}
