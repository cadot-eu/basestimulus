// stimulus pour ajouter une class automatiquement quand l'élément apparait
//possibilité d'ajouter une loopValue à true pour enlever la class quand l'élément disparait

import { Controller } from '@hotwired/stimulus'
import { useHover } from 'stimulus-use'
export default class extends Controller {
    /* -------------------------------------------------------------------------- */
    /*                              variable and uses                             */
    /* -------------------------------------------------------------------------- */
    static values = {
        class: String,  // class add when the element appear
        id: String,
        loop: String,
        inverse: Boolean,
        hidethis: Boolean    // true for remove the class if element disappear
    }

    options = {
        threshold: 0, // default
    }

    connect() {
        useHover(this, { element: this.element })
    }

    mouseEnter() {
        if (this.inverseValue)
            document.getElementById(this.idValue).classList.remove(this.classValue)
        else
            document.getElementById(this.idValue).classList.add(this.classValue)
        if (this.hidethisValue)
            this.element.style.display = "none";
    }

    mouseLeave() {
        if (this.inverseValue)
            document.getElementById(this.idValue).classList.add(this.classValue)
        else
            if (this.loopValue == "true") document.getElementById(this.idValue).classList.remove(this.classValue)
        if (this.hidethisValue)
            this.element.style.display = "block";
    }
}