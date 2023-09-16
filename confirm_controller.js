//controller de confimation d'action
import { Controller } from '@hotwired/stimulus'
import Swal from 'sweetalert2'

export default class extends Controller {
    static values = {
        action: { default: '', type: String },
    }

    connect() {
        //ajoyt d'un événement
        let element = this.element;
        this.element.addEventListener('click', (e) => {
            //suppression des autre addeventlistener pour éviter interférence exemple tooltip
            this.element.removeEventListener('click', this.click)
            e.preventDefault();
            Swal.fire({
                icon: 'warning',
                title: 'Confirmation',
                html: 'Êtes-vous sûr de vouloir ' + this.actionValue + '?',
                toast: true,
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    //si on a un href ou un data href on va sur ce lien
                    if (element.getAttribute('href') || element.getAttribute('data-href')) {
                        window.location.href = element.getAttribute('href') || element.getAttribute('data-href')
                    }
                    else {
                        //on transforme le nom en input hidden pour garder la valeur envoyer
                        let input = document.createElement('input')
                        input.setAttribute('type', 'hidden')
                        input.setAttribute('name', element.name)
                        input.setAttribute('value', element.value)
                        this.element.parentNode.insertBefore(input, element)
                        element.form.requestSubmit();
                    }
                }
            })
        })
    }
}

