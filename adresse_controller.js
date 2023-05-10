/* A Stimulus controller that is used to debounce the input of a form and send the form if is modified. */
import { Controller } from '@hotwired/stimulus'
import { async } from 'regenerator-runtime'

let that = null;
let timer = 0; //debunces
let ville;
let codepostal;
export default class extends Controller {
    static values = {
        codepostal: String,
        ville: String,
    }
    connect() {
        that = this.element;
        codepostal = this.codepostalValue;
        ville = this.villeValue;
        console.log(ville)
        this.element.addEventListener('input', function (e) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                let data = fetchAsync();
                console.log(data);
            }, 1000);

        })
    }

}

async function fetchAsync() {
    let response = await fetch('https://nominatim.openstreetmap.org/search?postalcode=' + document.getElementById(codepostal).value + '&street=' + that.value + '&format=json&limit=1')
    console.log('https://nominatim.openstreetmap.org/search?postalcode=' + document.getElementById(codepostal).value + '&street=' + that.value + '&format=json&limit=1')
    let data = await response.json();
    return data;
}