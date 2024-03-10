import AbstractView from '../framework/view/abstract-view';

function createTripInfoTemplate({ isEmpty, title, duration, cost }) {
  if (isEmpty) {
    return '<div></div>';
  }

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>
        <p class="trip-info__dates">${duration}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`
  );
}

export default class TripInfoView extends AbstractView {
  #isEmpty = null;
  #title = null;
  #duration = null;
  #cost = null;

  constructor({isEmpty, title = '', duration = '', cost = ''}) {
    super();

    this.#isEmpty = isEmpty;
    this.#title = title;
    this.#duration = duration;
    this.#cost = cost;
  }

  get template() {
    return createTripInfoTemplate({
      isEmpty: this.#isEmpty,
      title: this.#title,
      duration: this.#duration,
      cost: this.#cost
    });
  }
}
