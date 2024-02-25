import ListPresenter from './presenter/list-presenter.js';

import { mockOffers } from './mock/offers-mock.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import { mockPoints } from './mock/points-mock.js';
import FilterModel from './model/filter-model.js';

const tripEventsContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel(mockDestinations);
const offersModel = new OffersModel(mockOffers);
const pointsModel = new PointsModel(mockPoints);

const filterPresenter = new FilterPresenter({
  container: filterContainer,
  filterModel,
  pointsModel
});

filterPresenter.init();

const listPresenter = new ListPresenter({
  container: tripEventsContainer,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel
});

listPresenter.init();
