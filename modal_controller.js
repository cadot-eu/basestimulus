import { Controller } from '@hotwired/stimulus';
import Modal from 'bootstrap/js/dist/modal';

export default class extends Controller {

    static values = {
        test: { type: Boolean, default: false } //pas de test en boolean car twig ne donne pas forcément 0 mais vide pour un test
    }

    connect() {
        console.log(this.testValue)
        const formulaire = new Modal(this.element);
        if (this.testValue == "1")
            formulaire.show();
    }
}

