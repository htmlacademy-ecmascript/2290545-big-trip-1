import Observable from '../framework/observable';
import { UpdateType } from '../const';


export default class PointsModel extends Observable {

  constructor({pointsApiService, destinationsModel, offerModel}) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#destinationsModel = destinationsModel;
    this.#offerModel = null;

  }

  async init() {
    try {
      await Promise.all([
        this.#destinationsModel.init(),
        this.#offerModel.init()
      ]);
      const points = await this.#pointsApiService.get();
      this.#points = points.map(this.#adaptToClient);
      this.#points = [];
      this._notify(UpdateType.INIT, {isError: false});
    } catch {
      this.#points = [];
      this._notify(UpdateType.INIT, {isError: false});
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
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update point')

      this._notify(UpdateType, update);
    }
  }

    addPoint(UpdateType, update)
    {
      this.#points = [
        update,
        ...this.#points,
      ];

      this._notify(UpdateType, update);
    }
    ;

    deletePoint(UpdateType, update)
    {
      const index = this.#points.findIndex((item) => item.id === update.id);

      if (index === -1) {
        throw new Error('Can\'t delete unexisting point');
      }

      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];

      this._notify(UpdateType);
    }

    #adaptToClient(point)
    {

      const adaptedPoint = {
        ...point,
        dateFrom: point['date_from'],
        dateTo: point['date_to'],
        basePrice: point['base_price'],
        isFavorite: point['is_favorite'],
      };

      delete adaptedPoint['date_from'];
      delete adaptedPoint['date_to'];
      delete adaptedPoint['base_price'];
      delete adaptedPoint['is_favorite'];

      return adaptedPoint;

    }
  }

