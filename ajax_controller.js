//stimulus qui renvoie de l'html donné par une url par ajax.

import { Controller } from '@hotwired/stimulus';
export default class extends Controller {
    /* -------------------------------------------------------------------------- */
    /*                              variable and use                              */
    /* -------------------------------------------------------------------------- */
    static values = {
        url: String,
        target: String
    }
    /* -------------------------------------------------------------------------- */
    /*                                    code                                    */
    /* -------------------------------------------------------------------------- */
    connect() {
        this.seek()
    }
    search(event) {

    }
    startRefreshing() {
        setInterval(() => {
            this.seek()
        }, 5000)
    }

    async seek() {
        //on récupère la reponse
        const response = await fetch(`${this.urlValue}/`)
        //on modifie le div
        document.querySelector(this.targetValue).value = await response.text()
    }
}
