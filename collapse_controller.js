//stimulus qui renvoie de l'html donné par une url par ajax.

import { Controller } from '@hotwired/stimulus';
export default class extends Controller {
    static values = {
        out: String,
    }
    connect() {
    }

    click() {
        this.element.innerHTML = this.outValue;
        this.element.value = "toto"
        console.log('click')
    }


}
