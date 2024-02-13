import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { createFormTemplate } from './editing-form-template.js';

export default class EditingFormView extends AbstractStatefulView {
  #point = null;
  #pointDestination = null;
  #offersModel = null;
  #arrayDestinationsModel = null;
  #rollupClickHandler = null;
  #onSubmitClick = null;

  constructor({point, pointDestination, offersModel, arrayDestinationsModel, onRollupClick, onSubmitClick}){
    super();
    this._setState(EditingFormView.parsePointToState({point}));
    this.#pointDestination = pointDestination;
    this.#offersModel = offersModel;
    this.#arrayDestinationsModel = arrayDestinationsModel;
    this.#rollupClickHandler = onRollupClick;
    this.#onSubmitClick = onSubmitClick;

    this._restoreHandlers();
  }

  get template(){
    return createFormTemplate({
      state: this._state,
      pointDestination: this.#pointDestination,
      offersModel: this.#offersModel,
      arrayDestinationsModel: this.#arrayDestinationsModel,
    });
  }

  reset(point) {
    this.updateElement({point});
  }

  _restoreHandlers = () => {
    this.element.querySelector('.event__input--destination').addEventListener('change',this.#destinationChangeHandler);//
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupButtonClickHandler);//
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#pointSubmitHandler);
    this.element.querySelector('.event__input--price').addEventListener('change',this.#priceChangeHandler);//
    this.element.querySelector('.event__type-group').addEventListener('change',this.#typeChangeHandler);//
    this.element.querySelector('.event__available-offers').addEventListener('change',this.#offersChangeHandler);//
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      point: {
        ...this._state.point,
        type:evt.target.value,
        offers: [],
      }
    });
  };

  #offersChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      point: {
        ...this._state.point,
        offers:checkedBoxes.map((element) => element.dataset.offerId)
      }
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedDistination = this.#arrayDestinationsModel.find((elem) => elem.name === evt.target.value);
    const selectedDistinationId = (selectedDistination) ? selectedDistination.id : null;
    if (selectedDistination === undefined) {
      return;
    }
    this.updateElement({
      point: {
        ...this._state.point,
        destination:selectedDistinationId,
      }
    });
  };

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#rollupClickHandler();
  };

  #pointSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmitClick(EditingFormView.parseStateToPoint(this._state));
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice:Number(evt.target.value)
      }
    });
  };

  static parsePointToState({point}) {
    return {point};
  }

  static parseStateToPoint(state) {
    return state.point;
  }

}
