import AbstractView from '../framework/view/abstract-view';

function createPointsContainerTemplate() {
  return `<ul class="trip-events__list">
</ul>`;
}

export default class PointsContainerView extends AbstractView {
  get template() {
    return createPointsContainerTemplate();
  }
}
