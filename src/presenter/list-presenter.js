import { render, remove } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointsContainerView from '../view/points-container-view.js';
import PointListEmptyView from '../view/point-list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import { getPointsPriceDifference, getPointsTimeDifference } from '../utils/point-utils.js';
import { filter } from '../utils/filter-utils.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/loading-view.js';

export default class ListPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;
  #sortComponent = null;
  #pointListEmptyComponent = null;
  #pointsContainerComponent = new PointsContainerView();
  #newPointPresenter = null;
  #loadingComponent = new LoadingView();

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  constructor ({container, pointsModel, destinationsModel, offersModel, filterModel, onNewPointDestroy}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointsContainer: this.#pointsContainerComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,

    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(getPointsPriceDifference);
      case SortType.TIME:
        return filteredPoints.sort(getPointsTimeDifference);

    }

    return filteredPoints;
  }


  init() {
    this.#isCreating = true;
    this.#renderBoard();
  }

  isCreating() {
    return this.#isCreating;
  }

  createPoint() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsContainer: this.#pointsContainerComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:

        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:

        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:

        this.#clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;

    }
  };

  #clearBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    remove(this.#sortComponent);


    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }

    if (this.#pointListEmptyComponent) {
      remove(this.#pointListEmptyComponent);
    }

    if (this.#pointListEmptyComponent) {
      remove(this.#pointListEmptyComponent);
    }

  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#container);

  }

  #renderBoard() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if (this.points.length || this.#newPointPresenter.isCreating()) {
      createPoint() {
        this.#currentSortType = SortType.DEFAULT;
        this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
        this.#creatinNewPoint = true;
        this.#clearBoard();
        this.#newPointPresenter.init();
        this.#renderBoard();
      }
    } else {
      this.#renderPointListEmpty();
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container);
  }

  #renderPointListEmpty() {
    this.#pointListEmptyComponent = new PointListEmptyView({
      filterType: this.#filterType
    });

    render(this.#pointListEmptyComponent, this.#container);
  }

  #renderPointsContainer() {
    render(this.#pointsContainerComponent, this.#container);
  }

  #renderPoints() {
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i]);
    }
  }


}
