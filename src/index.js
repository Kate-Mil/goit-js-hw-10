import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries'

const DEBOUNCE_DELAY = 300;

const refs = {
    input : document.querySelector('#search-box'),
    list : document.querySelector('.country-list'),
    info: document.querySelector('.country-info')
}


refs.input.addEventListener('input', debounce(onClickResearch, DEBOUNCE_DELAY));


function onClickResearch(e) {
    const searchName = e.target.value.toLowerCase().trim();
    
    if (searchName === ''){
        cleanMarckupCArds();
    } else {
        fetchCountries(searchName)
        .then(renderCountryCard)
        .catch(onFetchError);
        }
    }


function renderCountryCard(country){
cleanMarckupCArds();

    if(Number(country.length)>=10){
        Notify.info('Too many matches found. Please enter a more specific name.');
    } 
    else if (Number(country.length)>=2 & Number(country.length)<10){
    const markup = country.map(item =>
        `<li class="item">
        <img src="${item.flags.svg}" width="24" height="14"></img>
        <h2>${item.name.official}</2>
        </li>`)
    .join('');
    refs.list.innerHTML = markup;
    } 
    else if (Number(country.length) === 1) {
    const markup = country.map(({ flags, name }) =>
        `<li class="item">
        <img src="${flags.svg}" width="24" height="14"></img>
        <h2>${name.official}</2>
        </li>`)
    .join('');
    refs.list.innerHTML = markup;

    const markupAddInfo = country.map(({ capital, population, languages }) =>
        `<p><span>Capital: </span>${capital}</p>
        <p><span>Population: </span>${population}</p>
        <p><span>Languages: </span>${Object.values(languages)}</p>`)
    .join('');
    refs.info.innerHTML = markupAddInfo;
    } 
}

function onFetchError () {
    Notify.failure('Oops, there is no country with that name');
    cleanMarckupCArds();
}

function cleanMarckupCArds(){
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';
}