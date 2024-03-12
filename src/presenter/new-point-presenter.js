import CreatingFormView from '../view/form/creating-form-view';
import { render, remove, RenderPosition } from '../framework/render';
import { UserAction, UpdateType, defaultPoint } from '../const';

export default class NewPointPresenter {
  #pointsContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #editingFormComponent = null;
  #newPointButtonComponent = null;
  #isCreating = null;

  constructor({pointsContainer, destinationsModel, offersModel, onDataChange, onModeChange, newPointButtonComponent}) {
    this.#pointsContainer = pointsContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#newPointButtonComponent = newPointButtonComponent;
  }

  init() {
    this.#isCreating = true;
    if (this.#editingFormComponent !== null) {
      return;
    }

    this.#editingFormComponent = new CreatingFormView({
      point: defaultPoint,
      pointDestination: defaultPoint.destination,
      offersModel: this.#offersModel,
      destinations: this.#destinationsModel.destinations,
      onRollupClick: this.destroy,
      onDeleteClick: this.destroy,
      onSubmitClick: this.#pointSubmitHandler,
    });
    document.addEventListener('keydown', this.#escKeyDownHandler);

    render(this.#editingFormComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
  }

  destroy = () => {
    this.#isCreating = false;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#newPointButtonComponent.enable();

    if (this.#editingFormComponent === null) {
      return;
    }

    remove(this.#editingFormComponent);
    this.#editingFormComponent = null;
  };

  setSaving() {
    this.#editingFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#editingFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editingFormComponent.shake(resetFormState);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #pointSubmitHandler = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
      {id: crypto.randomUUID(), ...point},
    );
  };

  isCreating() {
    return this.#isCreating;
  }
}
