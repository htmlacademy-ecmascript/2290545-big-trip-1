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
    }
  }

  async addPoint(updateType, update) {
    try {
      const newPoint = await this.#pointsApiService.addPoint(update);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}

