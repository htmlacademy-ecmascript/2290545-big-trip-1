import Observable from '../framework/observable';
import { UpdateType } from '../const';


export default class PointsModel extends Observable {
  #pointsApiService = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];

  constructor({pointsApiService, destinationsModel, offersModel}) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

  }

  async init() {
    try {
      await Promise.all([
        this.#destinationsModel.init(),
        this.#offersModel.init()
      ]);
      this.#points = await this.#pointsApiService.getPoints();

      this._notify(UpdateType.INIT, {isError: false});
    } catch (e) {
      console.log(e);
      this.#points = [];
      this._notify(UpdateType.INIT, {isError: true});
    }
  }


  get() {
    return this.#points;
  }

  get points() {
    return this.#points;
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }
    try {
      const updatedPoint = await this.#pointsApiService.updatePoint(update);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch (err) {
      console.error(err);
      throw new Error('Can\'t update point');

      // this._notify(UpdateType, update);
    }
  }

  addPoint(UpdateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(UpdateType, update);
  }


  deletePoint(updateType, update) {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  // #adaptToClient(point) {
  //   const adaptedPoint = {
  //     ...point,
  //     dateFrom: point['date_from'],
  //     dateTo: point['date_to'],
  //     basePrice: point['base_price'],
  //     isFavorite: point['is_favorite'],
  //   };

  //   delete adaptedPoint['date_from'];
  //   delete adaptedPoint['date_to'];
  //   delete adaptedPoint['base_price'];
  //   delete adaptedPoint['is_favorite'];

  //   return adaptedPoint;
  // }
}

