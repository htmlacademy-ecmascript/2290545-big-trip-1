import AbstractView from '../../framework/view/abstract-view';
import { createPointTemplite } from './point-template.js';

export default class PointView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #pointEditClick = null;

  constructor({point, pointDestination, pointOffers, onEditClick}) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#pointEditClick = onEditClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#pointEditClickHandler);
  }

  get template() {
    return createPointTemplite({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffers: this.#pointOffers
    });
  }

  #pointEditClickHandler = (evt) => {
    evt.preventDefault();
    this.#pointEditClick();
  };
}
