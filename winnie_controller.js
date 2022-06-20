import { Controller } from '@hotwired/stimulus';
import Modal from 'bootstrap/js/dist/modal';

export default class extends Controller {


    connect() {
        this.element.style = 'color:white';

    }
}

