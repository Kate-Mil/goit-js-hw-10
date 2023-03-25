
export default function fetchCountries(){
    return fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,population,languages')
    .then(response => {
        console.log(response);
      if (!response.ok) {
        console.log("Error",response.status);
        throw new Error(response.status);
      }
      return response.json();
    });
    }