export default class DestinationsModel {
  #destinations = null;
  #apiService = null;

  constructor(apiService) {
    this.#destinations = [];
    this.#apiService = apiService;
  }

  async init() {
    this.#destinations = await this.#apiService.getDestinations();
  }

  get() {
    return this.#destinations;
  }

  get destinations() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations.
      find((destination) => destination.id === id);
  }
}
