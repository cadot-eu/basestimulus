import { Controller } from '@hotwired/stimulus';
import Modal from 'bootstrap'

export default class extends Controller {

  static values = {
    test: { type: Boolean, default: false } //pas de test en boolean car twig ne donne pas forcément 0 mais vide pour un test
  }

  connect() {
    document.querySelectorAll('.modal-backdrop').forEach(element => {
      element.remove()
      document.querySelector('body').style = 'overflow:auto;padding-right:0;'
    });
    const formulaire = new Modal(this.element);
    if (this.testValue == true) {
      formulaire.show();
    }

  }
}

