import dayjs from 'dayjs';

export function sortPointsByDay(pointA, pointB) {
  return dayjs(pointA.dateFrom) - dayjs(pointB.dateFrom);
}

export function getCheckedOffers(checkedOffersId, pointOffers) {
  return checkedOffersId.map((IdOffer) => pointOffers.find((offer) => offer.id === IdOffer));
}
