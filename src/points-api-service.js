import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class PointsApiService extends ApiService {

  async getDestinations() {
    const response = await this._load({url: 'destinations'});
    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async getOffers() {
    const response = await this._load({url: 'offers'});
    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async getPoints() {
    const response = await this._load({url: 'points'});
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse.map((point) => this.#adaptToClient(point));
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return this.#adaptToClient(parsedResponse);
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite']
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];
    return adaptedPoint;
  }

  #adaptToServer(point) {
    const adaptedPoint = {...point,
      'date_from': point.dateFrom,
      'date_to': point.dateTo,
      'base_price': point.basePrice,
      'is_favorite': point.isFavorite,
    };

    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.basePrice;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}

