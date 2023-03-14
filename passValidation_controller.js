//permet en cliquant sur ce bouton de supprimer les required des inputs du form
//idéal pour un captcha
//data-controller="base--passValidation"

import { Controller } from '@hotwired/stimulus'
export default class extends Controller {

    connect() {
        let bouton = this.element;
        bouton.addEventListener("click", function () {
            //boucle sur les elements du form
            let elements = bouton.form.elements;
            for (let i = 0; i < elements.length; i++) {
                //on supprime le required
                elements[i].removeAttribute("required");
            }


        });
    }
    disconnect() {

    }
}

