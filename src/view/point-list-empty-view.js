import AbstractView from '../framework/view/abstract-view';

function createPointListEmptyTemplate() {
  return('<p class="trip-events__msg">Click New Event to create your first point</p>'
  );
}
export default class PointListEmptyView extends AbstractView {
  get template() {
    return createPointListEmptyTemplate();
  }
}
