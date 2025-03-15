import { Controller } from '@hotwired/stimulus';
//Exemple d'utilisation sur un bouton
// <button data-controller="base--form" data-base--form-url-value="/mon-lien">Mon lien</button>
// Exemple d'utilisation sur un input
// <input data-controller="base--form" data-base--form-url-value="/mon-lien" data-base--form-action-value="input">

export default class extends Controller {
  static values = {
    url: String,
    action: { type: String, default: "click" },
    query: { type: String }
  };

  connect() {
    this.element.addEventListener(this.actionValue, this.visit.bind(this));
    //on met le focus sur l'input
    this.element.focus();
    //on le met à la fin de la valeur
    this.element.setSelectionRange(this.element.value.length, this.element.value.length);
  }

  disconnect() {
    this.element.removeEventListener(this.actionValue, this.visit.bind(this));
  }

  visit() {
    if (this.urlValue) {
      Turbo.visit(this.urlValue + '?' + this.queryValue + this.element.value);
    }
  }
}
