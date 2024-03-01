import PointView from '../view/point/point-viewt';
import EditingFormView from '../view/form/editing-form-view';
import { render, replace, remove, RenderPosition } from '../framework/render';
import { UserAction, UpdateType, defaultPoint } from '../const';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const newEvent = document.querySelector('.trip-main__event-add-btn');

export default class NewPointPresenter {
  #pointsContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #editingFormComponent = null;
  #newEventButtonElement = null;

  // #mode = Mode.DEFAULT;

  constructor({pointsContainer, destinationsModel, offersModel, onDataChange, onModeChange}) {
    this.#pointsContainer = pointsContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#newEventButtonElement = document.querySelector('.trip-main__event-add-btn');
  }

  init() {
    const prevPointComponent = this.#pointComponent;
    const prevEditingFormComponent = this.#editingFormComponent;

    if (this.#editingFormComponent !== null) {
      return;
    }

    this.#editingFormComponent = new EditingFormView({
      point: defaultPoint,
      pointDestination: defaultPoint.destination,
      offersModel: this.#offersModel,
      arrayDestinationsModel: this.#destinationsModel.destinations,
      onRollupClick: this.destroy,
      onDeleteClick: this.destroy,
      onSubmitClick: this.#pointSubmitHandler,
    });

    render(this.#editingFormComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
  }

  destroy = () => {
    if (this.#editingFormComponent === null) {
      return;
    }

    remove(this.#editingFormComponent);
    this.#editingFormComponent = null;
    this.#newEventButtonElement.removeAttribute('disabled');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #pointSubmitHandler = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: crypto.randomUUID(), ...point},
    );
    this.destroy();
  };

}


