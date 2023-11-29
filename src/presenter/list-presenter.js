import {render} from '../render.js';
import FilterView, {filtersContainer} from '../view/filters-view.js';
import SortView, {tripEventsContainer} from '../view/sort-view.js';
import EditingFormView from '../view/form/editing-form-view.js';
import PointsContainerView from '../view/points-container-view.js';
import PointView from '../view/point/point-viewt.js';


export default class ListPresenter {
  pointsContainerView = new PointsContainerView();

  constructor ({pointsModel, destinationsModel, offersModel}) {
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    render(new FilterView(), filtersContainer);
    render(new SortView(), tripEventsContainer);
    render(new EditingFormView(
      this.pointsModel.points[4],
      this.destinationsModel.getById(this.pointsModel.points[4].destination),
      this.offersModel.getByType(this.pointsModel.points[4].type),
      this.destinationsModel.destinations),
    tripEventsContainer);

    render(this.pointsContainerView, tripEventsContainer);
    for (let i = 0; i < 3; i++) {
      render(new TripEventsItemView(), this.pointsContainerView.getElement());

    for (let i = 0; i < this.pointsModel.points.length; i++) {

      render(new PointView(
        this.pointsModel.points[i],
        this.destinationsModel.getById(this.pointsModel.points[i].destination),
        this.offersModel.getByType(this.pointsModel.points[i].type),
      ),
      this.pointsContainerView.getElement());
    }
  }
