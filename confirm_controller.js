//controller de confimation d'action
import { Controller } from '@hotwired/stimulus'
import Swal from 'sweetalert2'

export default class extends Controller {
    static values = {
        action: { default: '', type: String },
    }

    connect() {
        //ajoyt d'un événement
        this.element.addEventListener('click', (e) => {
            e.preventDefault();
            Swal.fire({
                icon: 'warning',
                title: 'Confirmation',
                html: 'Êtes-vous sûr de vouloir ' + this.actionValue + '?',
                toast: true,
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.element.form.requestSubmit();
                }
            })
        })
    }
}

