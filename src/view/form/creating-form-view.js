import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { createNewPointTemplate } from './creating-form-template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class CreatingFormView extends AbstractStatefulView {
  #pointDestination = null;
  #offersModel = null;
  #arrayDestinationsModel = null;
  #deleteClickHandler = null;
  #onSubmitClick = null;
  #datePickerFrom = null;
  #datePickerTo = null;

  constructor({point, pointDestination, offersModel, arrayDestinationsModel, onDeleteClick, onSubmitClick}){
    super();
    this._setState(CreatingFormView.parsePointToState({point}));
    this.#pointDestination = pointDestination;
    this.#offersModel = offersModel;
    this.#arrayDestinationsModel = arrayDestinationsModel;
    this.#deleteClickHandler = onDeleteClick;
    this.#onSubmitClick = onSubmitClick;
    this._restoreHandlers();
  }

  get template(){
    return createNewPointTemplate({
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
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#pointSubmitHandler);
    this.element.querySelector('.event__input--price').addEventListener('change',this.#priceChangeHandler);
    this.element.querySelector('.event__type-group').addEventListener('change',this.#typeChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change',this.#offersChangeHandler);

    this.#setDatepicker();
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

    this.updateElement({
      point: {
        ...this._state.point,
        destination: selectedDistinationId ?? '',
      }
    });
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#deleteClickHandler(CreatingFormView.parseStateToPoint(this._state));
  };

  #pointSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmitClick(CreatingFormView.parseStateToPoint(this._state));
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

  static parsePointToState(point) {
    point = {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
    return point;
  }

  static parseStateToPoint(state) {
    delete state.isDisabled;
    delete state.isSaving;
    delete state.isDeleting;
    return state.point;
  }
}
