import {createElement} from '../../render.js';
import { createPointTemplite } from './point-template.js';

export default class PointView {
  constructor(point, pointDestination, pointOffers) {
    this.point = point;
    this.pointDestination = pointDestination;
    this.pointOffers = pointOffers;
  }

  getTemplate() {
    return createPointTemplite(this.point, this.pointDestination, this.pointOffers);
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
