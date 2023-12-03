export default class PointsModel {
  #points = null;
  constructor(points) {
    this.#points = points;
  }

  get() {
    return this.#points;
  }

}
