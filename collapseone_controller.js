//quand on clique sur un collapse, on ferme les autres
//   data-controller="base--collapse"
import { Controller } from '@hotwired/stimulus';
export default class extends Controller {
    connect() {
        this.element.addEventListener('click', this.click.bind(this))
    }
    click() {
        //on bloucle sur tous les collapses
        document.querySelectorAll('.collapse').forEach(e => {
            if (e != this.element)
                e.classList.remove('show')

        })
    }
}


