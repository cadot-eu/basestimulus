// stimulus pour ajouter une class automatiquement quand l'élément apparait
//possibilité d'ajouter une loopValue à true pour enlever la class quand l'élément disparait

import { Controller } from '@hotwired/stimulus'
import { useIntersection } from 'stimulus-use'
export default class extends Controller {
    /* -------------------------------------------------------------------------- */
    /*                              variable and uses                             */
    /* -------------------------------------------------------------------------- */

    options = {
        threshold: 0, // default
    }

    connect() {
        useIntersection(this, this.options)
    }

    appear(entry) {

        this.element.form.requestSubmit()
    }

    disappear(entry) {
    }
}