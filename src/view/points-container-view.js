import {createElement} from '../render';

function createPointsContainerTemplate() {
  return `<ul class="trip-events__list">
</ul>`;
}

export default class PointsContainerView { // points-container
  getTemplate() {
    return createPointsContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
