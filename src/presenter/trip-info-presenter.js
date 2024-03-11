import TripInfoView from '../view/trip-info-view.js';
import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { sortPointsByDay, getCheckedOffers } from '../utils/trip-info-utils';
import { DESTINATIONS_ITEMS_LENGTH } from '../const';
import dayjs from 'dayjs';

export default class TripInfoPresenter {
  #tripMainEventsContainer = null;
  #offersModel = null;
  #destinationsModel = null;
  #pointsModel = null;
  #tripInfoComponent = null;
  #sortedPoints = null;

  constructor({ tripMainEventsContainer, offersModel, destinationsModel, pointsModel }) {
    this.#tripMainEventsContainer = tripMainEventsContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
  }

  init() {
    const prevTripInfoComponent = this.#tripInfoComponent;

    if (this.#pointsModel.get() && this.#pointsModel.get().length !== 0) {
      this.#sortedPoints = this.#pointsModel.get().sort(sortPointsByDay);

      this.#tripInfoComponent = new TripInfoView({
        isEmpty: false,
        title: this.#getTripTitle(this.#pointsModel.get(), this.#destinationsModel.get()),
        duration: this.#getTripDuration(this.#pointsModel.get()),
        cost: this.#getTripCost()
      });

      if (prevTripInfoComponent === null) {
        render(this.#tripInfoComponent, this.#tripMainEventsContainer, RenderPosition.AFTERBEGIN);
        return;
      }

      replace(this.#tripInfoComponent, prevTripInfoComponent);
      remove(prevTripInfoComponent);
    } else {
      this.#tripInfoComponent = new TripInfoView({ isEmpty: true });
      render(this.#tripInfoComponent, this.#tripMainEventsContainer, RenderPosition.AFTERBEGIN);
      remove(prevTripInfoComponent);
    }
  }

  #getTripTitle() {
    const destinationNames = this.#pointsModel.get().sort(sortPointsByDay)
      .map((point) => this.#destinationsModel.get().find((destination) => destination.id === point.destination).name);

    return destinationNames.length <= DESTINATIONS_ITEMS_LENGTH ? destinationNames.join('&nbsp;&mdash;&nbsp;') : `${destinationNames.at(0)}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${destinationNames.at(-1)}`;
  }

  #getTripDuration() {
    const sortedPoints = this.#pointsModel.get().sort(sortPointsByDay);
    return (sortedPoints.length > 0) ? `${dayjs(sortedPoints.at(0).dateFrom).format('DD MMM')}&nbsp;&mdash;&nbsp;${dayjs(sortedPoints.at(-1).dateTo).format('DD MMM')}` : '';
  }

  #getTripCost() {
    let offers = null;
    let price = 0;
    let offersPrice = 0;

    this.#sortedPoints.forEach((point) => {
      offers = getCheckedOffers(point.offers, this.#offersModel.getByType(point.type));

      offers.forEach((offer) => {
        offersPrice += offer.price;
      });

      price += point.basePrice;
    });

    price += offersPrice;

    return price.toString();
  }

  #modelEventHandler = () => {
    this.init();
  };
}

