import dayjs from 'dayjs';

export const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE:'future',
  PRESENT:'present',
  PAST:'past',
};

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};
export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};


export const defaultPoint = {
  type: 'flight',
  dateFrom: dayjs().toISOString(),
  dateTo: null,
  destination: null,
  basePrice: 0,
  isFavorite: false,
  offers: [],
};

export const defaultDestination = {
  id: 'default',
  description: '',
  name: '',
  pictures: []
};

export const DESTINATIONS_ITEMS_LENGTH = 3;
