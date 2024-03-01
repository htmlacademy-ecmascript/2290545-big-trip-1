import{formatSrtingToDateTime, capitalize } from '../../utils/point-utils.js';
import { TYPES, defaultDestination } from '../../const.js';

function showType(types, activeType) {
  return types.map((item) => (` <div class="event__type-item">
  <input ${activeType === item ? 'checked' : ''} id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio"
  name="event-type" value="${item}" >
  <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1">${capitalize(item)}</label>
</div>`)).join('');
}

function showOffers(offersByType, selectedOffers) {
  return offersByType.map((item) => (`<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" data-offer-id="${item.id}" id="event-offer-${item.id}" type="checkbox" name="event-offer-seats"
  ${selectedOffers.find((elem) => elem === item.id) ? 'checked' : ''}>
  <label class="event__offer-label" for="event-offer-${item.id}">
    <span class="event__offer-title">${item.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${item.price}</span>
  </label>
</div>`)).join('');
}

function showPhotos(photos){
  return photos.map((item) => (`<img class="event__photo" src=${item.src} alt="${item.description}">`)).join('');
}

function destinationList(items) {
  return items.map((item) => `<option value="${item.name}"></option>`).join('');
}

export function createEditFormTemplate({state, offersModel, arrayDestinationsModel, pointDestination}){// pointDestination
  const {point} = state;
  const {basePrice, type, dateFrom, dateTo, offers} = point;
  const currentDestination = arrayDestinationsModel.find((item) => item.id === point.destination);
  const {description, pictures, name} = currentDestination ?? defaultDestination;
  
  return `<form class="event event--edit" action="#" method="post">
 <header class="event__header">
   <div class="event__type-wrapper">
     <label class="event__type  event__type-btn"
     for="event-type-toggle-1">
       <span class="visually-hidden">Choose event type</span>
       <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
     </label>
     <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

     <div class="event__type-list">
       <fieldset class="event__type-group">
         <legend class="visually-hidden">Event type</legend>

          ${showType(TYPES, type)}

       </fieldset>
     </div>
   </div>

   <div class="event__field-group  event__field-group--destination">
     <label class="event__label  event__type-output" for="event-destination-1">${type}</label>
     <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
     placeholder="Chamonix" value="${name}" list="destination-list-1">
     <datalist id="destination-list-1">

       ${destinationList(arrayDestinationsModel)}

     </datalist>
   </div>

   <div class="event__field-group  event__field-group--time">
     <label class="visually-hidden" for="event-start-time-1">From</label>
     <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
     value="${formatSrtingToDateTime(dateFrom)}">
     &mdash;
     <label class="visually-hidden" for="event-end-time-1">To</label>
     <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
     value="${formatSrtingToDateTime(dateTo)}">
   </div>

   <div class="event__field-group  event__field-group--price">
     <label class="event__label" for="event-price-1">
       <span class="visually-hidden">Price</span>
       &euro;
     </label>
     <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
   </div>

   <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
   <button class="event__reset-btn" type="reset">Delete</button>
   <button class="event__rollup-btn" type="button">
     <span class="visually-hidden">Open event</span>
 </header>

 <section class="event__details">

 <section class="event__section  event__section--offers">
 <h3 class="event__section-title  event__section-title--offers">Offers</h3>

 <div class="event__available-offers">
 ${showOffers(offersModel.getByType(type), offers)}
 </div>
</section>

 <section class="event__section  event__section--destination">
   <h3 class="event__section-title  event__section-title--destination">Destination</h3>
   <p class="event__destination-description">${description}</p>

   <div class="event__photos-container">
     <div class="event__photos-tape">
       ${showPhotos(pictures)}
     </div>
   </div>

 </section>
</section>

</form>`;
}
