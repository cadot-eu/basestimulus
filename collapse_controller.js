//permet sur un click de changer l'html de l'élément
//
// exemple
{/*
 <p data-controller="base--collapse" data-base--collapse-out-value="{{ item.reponse }}" data-action="click->base--collapse#click" style="cursor:pointer;">
    {{ item.reponse|raw|striptags|u.truncate(30, '...') }}
    <span>
        <i class="text-muted">Cliquez pour lire la réponse</i>
    </span>
</p> 
*/}
import { Controller } from '@hotwired/stimulus';
export default class extends Controller {
    static values = {
        out: String,
    }
    connect() {
    }

    click() {
        this.element.innerHTML = this.outValue;
    }


}
