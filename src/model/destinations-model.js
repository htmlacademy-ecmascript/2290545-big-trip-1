export default class DestinationsModel {
  constructor(destinations) {
    this.destinations = destinations;
  }

  get() {
    return this.destinations;
  }

  getById(id) {
    return this.destinations.
      find((destination) => destination.id === id);
  }
}
