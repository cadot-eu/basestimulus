import { Controller } from '@hotwired/stimulus'


export default class extends Controller {

    connect() {
        //on prend le premier div enfant de l'élément
        let loader = this.element.firstElementChild;
        loader.style.display = "block";
        document.addEventListener("turbo:load", function () {
            loader.style.display = "none";
        });


    }
}