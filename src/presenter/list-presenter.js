import {render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EditingFormView from '../view/form/editing-form-view.js';
import PointsContainerView from '../view/points-container-view.js';
import PointView from '../view/point/point-viewt.js';
import {replace} from '../framework/render.js';
import PointListEmptyView from '../view/point-list-empty-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';

export default class ListPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #sortComponent = new SortView();
  #pointListEmptyComponent = new PointListEmptyView();
  #pointsContainerComponent = #pointsContainerView();

  #listPoints = [];
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
    #handlePointChange = () => {};
    #handleModeChange = () => {};
  }

  #renderPoint = (point) => {

    const pointPresenter = new PointPresenter({
      pointsContainer: this.#pointsContainerComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
};
