import {render} from '../render';
import FilterView, {filtersContainer} from '../view/filters-view.js';
import SortView, {tripEventsContainer} from '../view/sort-view.js';
import EditingFormView from '../view/editing-form-view.js';
import PointsContainerView from '../view/points-container-view.js';
import TripEventsItemView from '../view/point-view.js';

export default class ListPresenter {
  pointsContainerView = new PointsContainerView();

  init() {
    render(new FilterView(), filtersContainer);
    render(new SortView(), tripEventsContainer);
    render(new EditingFormView(), tripEventsContainer);
    render(this.pointsContainerView, tripEventsContainer);
    for (let i = 0; i < 3; i++) {
      render(new TripEventsItemView(), this.pointsContainerView.getElement());
    }
  }
}
