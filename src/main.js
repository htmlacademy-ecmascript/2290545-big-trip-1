import ListPresenter from './presenter/list-presenter.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import {render} from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsApiService from './points-api-service.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';

const AUTHORIZATION = 'Basic ap696lolololol';
const END_POINT = 'https://20.objects.htmlacademy.pro/big-trip';
const tripEventsContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripMainEventsContainer = document.querySelector('.trip-main');
const filterModel = new FilterModel();
const apiService = new PointsApiService(END_POINT, AUTHORIZATION);
const destinationsModel = new DestinationsModel(apiService);
const offersModel = new OffersModel(apiService);
const siteHeaderElement = document.querySelector('.trip-main');
const pointsModel = new PointsModel({
  destinationsModel,
  offersModel,
  pointsApiService: apiService
});

new TripInfoPresenter({
  tripMainEventsContainer: tripMainEventsContainer,
  offersModel,
  destinationsModel,
  pointsModel,
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewTaskButtonClick
});
render(newPointButtonComponent, siteHeaderElement);

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
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
  newPointButtonComponent
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewTaskButtonClick() {
  listPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

listPresenter.init();
pointsModel.init();
