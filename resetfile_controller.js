//affiche l'ancienne valeur du champ file et ajoute un bouton pour supprimer le fichier
import { Controller } from '@hotwired/stimulus'
import { doc } from 'prettier';
export default class extends Controller {

    /* -------------------------------------------------------------------------- */
    /*                                  variable                                  */
    /* -------------------------------------------------------------------------- */
    static values = {
        nom: String
    }
    etat = false;
    hidden = null;
    connect() {
        if (this.element.querySelector('span.croix_supprimmer') == null) {//pour éviter problème hotwire
            let hidden = document.createElement('input');
            hidden.type = 'hidden';
            hidden.value = "à retirer";
            hidden.name = this.nomValue;

            let span = document.createElement('span');
            span.classList.add('croix_supprimmer');
            span.title = "cliquer pour supprimer le fichier"
            span.style.color = "red";
            span.style.paddingRight = ".5rem";
            span.innerHTML = '<i class="bi bi-x-square"></i>';
            //on vérifie que span n'existe pas deja

            this.element.prepend(span);


            span.addEventListener("click", function () {
                if (!this.etat) {
                    this.parentElement.style.background = " linear-gradient(to bottom, white calc(50% - 1px), #ff000070 calc(50% - 1px) calc(50% + 1px), white calc(50% + 1px)";
                    this.append(hidden);
                    this.etat = true;
                }
                else {
                    this.etat = false;
                    this.parentElement.style.background = "none";
                    let el = document.getElementsByName(hidden.name)[0];
                    el.parentNode.removeChild(el)
                }

            });
        }
    }
    disconnect() {

    }
}

