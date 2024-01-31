import {updateItem} from '../utils/common.js';
export default class PointsModel {
  #points = null;
  constructor(points) {
    this.#points = points;
  }

  get() {
    return this.#points;
  }

  update(point){
    updateItem(this.#points, point);
  }

}
