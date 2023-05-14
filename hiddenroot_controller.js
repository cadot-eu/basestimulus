
import { Controller } from '@hotwired/stimulus'
export default class extends Controller {
    /* -------------------------------------------------------------------------- */
    /*                              variable and uses                             */
    /* -------------------------------------------------------------------------- */
    static values = {
        code: String
    }

    connect() {
        //on recherche tous les éléments qui ont le type hidden pour trandformer tous les champs hiddenroot
        document.querySelectorAll('[data-base--hiddenroot-code-value]').forEach(element => {
            if (element.getAttribute("data-base--hiddenroot-code-value") == 'm@cadot.eu') {
                element.setAttribute('type', 'text')
                element.parentNode.parentNode.classList.remove('d-none')
            }

        });
    }


}