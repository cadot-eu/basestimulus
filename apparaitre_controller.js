// stimulus pour ajouter une class automatiquement quand l'élément apparait
//possibilité d'ajouter une loopValue à true pour enlever la class quand l'élément disparait

import { Controller } from '@hotwired/stimulus'
export default class extends Controller {
    /* -------------------------------------------------------------------------- */
    /*                              variable and uses                             */
    /* -------------------------------------------------------------------------- */
    static values = {
        class: String,  // class add when the element appear
        loop: String    // true for remove the class if element disappear
    }

    options = {
        threshold: 0, // default
    }

    async connect() {
        let { useIntersection } = await import('stimulus-use');
        useIntersection(this, this.options)
    }

    appear(entry) {
        this.element.classList.add(this.classValue)
    }

    disappear(entry) {
        if (this.loopValue == "true") this.element.classList.remove(this.classValue)
    }
}