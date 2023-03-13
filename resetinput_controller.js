//vide l'input
//data-controller="base--resetinput"
import { Controller } from '@hotwired/stimulus'
export default class extends Controller {

    connect() {
        let span = document.createElement('span');
        span.title = "cliquer pour effacer le contenu";
        span.style.color = "red";
        span.style.marginLeft = "-20px";
        span.style.position = "absolute";


        span.innerHTML = '<i class="bi bi-x-square"></i>';
        this.element.parentNode.prepend(span);
        let input = this.element.parentNode.querySelector('input');
        span.addEventListener("click", function () {
            input.value = "";

        });
    }
    disconnect() {

    }
}

