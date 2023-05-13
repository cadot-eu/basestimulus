/* A Stimulus controller that is used to debounce the input of a form and send the form if is modified. */
import { Controller } from '@hotwired/stimulus'
import { async } from 'regenerator-runtime'

let that = null;
let timer = 0; //debunces
export default class extends Controller {

    connect() {
        that = this.element;
        this.element.addEventListener('input', function (e) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                //on récupère les données de l'api
                fetchAsync().then(data => {

                    console.log(data);
                    //on ajoute un select après l'input s'il existe pas sinon on modifie l'existant
                    let options = '<option value="">Choisir une adresse</option>';
                    data.features.forEach(element => {
                        options += '<option value="' + element.properties.label + '">' + element.properties.label + '</option>';
                    });
                    if (that.nextElementSibling == null) {
                        that.insertAdjacentHTML('afterend', '<select class="form-select" aria-label="adresse autocomplete" id="adresse_autocomplete">' + options + '</select>');
                        //on ajoute un event listener sur le select
                        that.nextElementSibling.addEventListener('change', function (e) {
                            that.value = this.value;
                            this.remove();
                        });
                    }
                    else {
                        that.nextElementSibling.innerHTML = options;
                    }
                    that.nextElementSibling.focus();
                })
            }, 500);

        })
    }

}

async function fetchAsync() {
    let response = await fetch('https://api-adresse.data.gouv.fr/search/?q=' + that.value + '&autocomplete=1')
    let data = await response.json();
    return data;
}