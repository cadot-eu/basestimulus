import { Controller } from '@hotwired/stimulus';

export default class extends Controller {

  static values = {
    classe: String,
    query: { type: String, default: 'div' },
    reset: { type: Boolean, default: false }
  }
  connect() {
    //si on a reset on supprime les class de parent
    if (this.resetValue) {
      this.element.closest(this.queryValue).classList = '';
    }
    //on retrouve le parent avec le query par closest et on lui ajoute la class
    this.element.closest(this.queryValue).classList = this.classeValue;
  }

}