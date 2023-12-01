export default class PointsModel {
  constructor(points) {
    this.#points = points;
  }

  get() {
    return this.#points;
  }

}
