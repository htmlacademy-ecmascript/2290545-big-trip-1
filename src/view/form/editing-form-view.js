import AbstractView from '../../framework/view/abstract-view.js';
import { createFormTemplate } from './editing-form-template.js';

export default class EditingFormView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #arrayDestinationsModel = null;
  #rollupClickHandler = null;
  #onSubmitClick = null;

  constructor({point, pointDestination, pointOffers, arrayDestinationsModel, onRollupClick, onSubmitClick}) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#arrayDestinationsModel = arrayDestinationsModel;
    this.#rollupClickHandler = onRollupClick;
    this.#onSubmitClick = onSubmitClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupButtonClickHandler);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#pointSubmitHandler);
  }


  get template() {
    return createFormTemplate({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffers: this.#pointOffers,
      arrayDestinationsModel: this.#arrayDestinationsModel,
    });
  }
  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#rollupClickHandler();
  };

  #pointSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmitClick();
  };
}
