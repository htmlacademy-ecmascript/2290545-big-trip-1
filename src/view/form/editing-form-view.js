import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { createEditFormTemplate } from './editing-form-template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class EditingFormView extends AbstractStatefulView {
  #point = null;
  #pointDestination = null;
  #offersModel = null;
  #arrayDestinationsModel = null;
  #rollupClickHandler = null;
  #onSubmitClick = null;
  #deleteClickHandler = null;
  #datePickerFrom = null;
  #datePickerTo = null;

  constructor({point, pointDestination, offersModel, arrayDestinationsModel, onRollupClick, onDeleteClick, onSubmitClick}){
    super();
    this._setState(EditingFormView.parsePointToState({point}));
    this.#pointDestination = pointDestination;
    this.#offersModel = offersModel;
    this.#arrayDestinationsModel = arrayDestinationsModel;
    this.#rollupClickHandler = onRollupClick;
    this.#onSubmitClick = onSubmitClick;
    this.#deleteClickHandler = onDeleteClick;

    this._restoreHandlers();
  }

  get template(){
    return createEditFormTemplate({
      state: this._state,
      pointDestination: this.#pointDestination,
      offersModel: this.#offersModel,
      arrayDestinationsModel: this.#arrayDestinationsModel,
    });
  }

  removeElement() {
    super.removeElement();

    if (this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }

    if (this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }
  }

  reset(point) {
    this.updateElement({point});
  }

  _restoreHandlers = () => {
    this.element.querySelector('.event__input--destination').addEventListener('change',this.#destinationChangeHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupButtonClickHandler);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#pointSubmitHandler);
    this.element.querySelector('.event__input--price').addEventListener('change',this.#priceChangeHandler);//
    this.element.querySelector('.event__input--price').addEventListener('change',this.#priceChangeHandler);
    this.element.querySelector('.event__type-group').addEventListener('change',this.#typeChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change',this.#offersChangeHandler);
    this.#setDatepicker();
    this.element.querySelector('.event__reset-btn').addEventListener('click',this.#formDeleteClickHandler);
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

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#deleteClickHandler(EditingFormView.parseStateToPoint(this._state));
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

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      point: {
        ...this._state.point,
        dateFrom: userDate
      }
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      point: {
        ...this._state.point,
        dateTo: userDate
      }
    });
  };

  #setDatepicker() {
    const dateFromInput = this.element.querySelector('#event-start-time-1');
    const dateToInput = this.element.querySelector('#event-end-time-1');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime:true,
      locale:{
        firstDayOfWeek:1,
      },
      'time_24hr':true,
    };
    this.#datePickerFrom = flatpickr(dateFromInput, {
      ...commonConfig,
      defaultDate:this._state.point.dateFrom,
      maxDate: this._state.point.dateTo,
      onChange: this.#dateFromChangeHandler,
    });

    this.#datePickerTo = flatpickr(dateToInput, {
      ...commonConfig,
      defaultDate:this._state.point.dateTo,
      minDate: this._state.point.dateFrom,
      onChange: this.#dateToChangeHandler,
    });
  }

  static parsePointToState({point}) {
    return {point};
  }

  static parseStateToPoint(state) {
    return state.point;
  }

}
