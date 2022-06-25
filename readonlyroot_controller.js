
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
            this.element.setAttribute('readonly', true)
        }
    }


}