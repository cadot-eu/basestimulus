/**
    * adresse
    * attr:{"data-base--adresse-limit-value":15}
    * attr:{"data-base--adresse-destination-value":"bien_adresseduselect"}
    */

import { Controller } from '@hotwired/stimulus'

let that = null;
let timer = 0; //debunces
let limit;
let message;
let error;
let select;
let destination; //contient l'élément où on veut afficher si une adresse a été choisie dans le select
export default class extends Controller {

    static values = {
        limit: { type: Number, default: 10 },
        destination: String

    }
    connect() {
        if (this.destinationValue != null) {
            destination = document.getElementById(this.destinationValue);
        }
        else {
            destination = this.element;
        }
        limit = this.limitValue;
        that = this.element;
        //create error
        error = document.createElement('div');
        error.classList.add('invalid-feedback');

        that.insertAdjacentElement('afterend', error);
        //create select
        select = document.createElement('select');
        select.classList.add('form-select');
        select.setAttribute('aria-label', 'adresse autocomplete');
        select.hidden = true;
        that.insertAdjacentElement('afterend', select);

        //on ajoute un event listener sur l'input
        this.element.addEventListener('input', function (input) {
            input.target.classList.remove('is-ok');
            clearTimeout(timer);
            timer = setTimeout(function () {
                //on récupère les données de l'api
                fetchAsync()
                    .then(data => {

                        //si on a une erreur on l'affiche
                        if (data.code == 400) {
                            switch (data.message) {
                                case "q must contain between 3 and 200 chars and start with a number or a letter":
                                    message = "Le champ doit contenir entre 3 et 200 caractères et commencer par un chiffre ou une lettre";
                                    break;
                            }
                            error.innerHTML = message;
                            select.hidden = true;
                            input.target.classList.add('is-invalid');
                            input.target.classList.remove('is-valid');
                            return;
                        }
                        input.target.classList.remove('is-invalid');
                        //si on a pas de résultat on affiche un message
                        if (data.features.length > 0) {
                            let options = '<option value="">Choisir une adresse</option>';
                            data.features.forEach(element => {
                                options += '<option value="' + element.properties.label + '">' + element.properties.label + '</option>';
                            });
                            //on ajoute les options et on affiche le select
                            if (select.hidden == true) {
                                select.innerHTML = options;
                                //on ajoute un event listener sur le select
                                select.addEventListener('change', function (e) {
                                    that.value = this.value;
                                    select.hidden = true;
                                    destination.value = input.target.value;
                                });
                            }
                            else { //si le select est déjà affiché on change juste les options
                                select.innerHTML = options;
                            }
                            select.hidden = false;
                        }
                    }
                    )
            }, 500);

        })
    }

}

async function fetchAsync() {
    let response = await fetch('https://api-adresse.data.gouv.fr/search/?q=' + that.value + '&autocomplete=1&limit=' + limit)
    let data = await response.json();
    return data;
}