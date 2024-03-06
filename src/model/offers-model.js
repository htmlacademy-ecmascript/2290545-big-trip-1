export default class OffersModel {
  #offers = null;
  #apiService = null;

  constructor(apiService) {
    this.#offers = [];
    this.#apiService = apiService;
  }

  async init() {
    this.#offers = await this.#apiService.getOffers();
  }

  get() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.
      find((offer) => offer.type === type).offers;
  }
}
