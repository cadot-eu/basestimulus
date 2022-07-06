//stimulus qui permet quand l'élément apparait de lancer un form request pour append le résultats dans la page


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