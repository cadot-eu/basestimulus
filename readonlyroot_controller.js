
import { Controller } from '@hotwired/stimulus'
export default class extends Controller {
    /* -------------------------------------------------------------------------- */
    /*                              variable and uses                             */
    /* -------------------------------------------------------------------------- */
    static values = {
        code: String
    }



    connect() {
        if (this.codeValue != 'm@cadot.eu') {
            //on transforme le input en label
            let divparent = document.createElement('div')
            divparent.classList.add('mb-3', 'row', 'mt-n3')
            divparent.innerHTML = '<div class="offset-2 col-sm-10"><div class="form-text text-muted">' + this.element.value + '</div></div>';
            this.element.parentNode.parentNode.replaceWith(divparent)

        }
        this.element.parentNode.parentNode.classList.remove('d-none');
        this.element.parentNode.parentNode.classList.add('mb-3');
        this.element.parentNode.parentNode.classList.add('text-warning');
    }


}