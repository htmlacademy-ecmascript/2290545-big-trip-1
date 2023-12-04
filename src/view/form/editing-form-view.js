import { createElement } from '../../render.js';
import { createFormTemplate } from './editing-form-template.js';

export default class EditingFormView{
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #arrayDestinationsModel = null;

  constructor(point, pointDestination, pointOffers, arrayDestinationsModel){
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#arrayDestinationsModel = arrayDestinationsModel;
  }

  getTemplate(){
    return createFormTemplate(
      this.#point,
      this.#pointDestination,
      this.#pointOffers,
      this.#arrayDestinationsModel,
    );

  }

  getElement(){
    if(!this.element){
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}
