//stimulus qui renvoie de l'html donné par une url par ajax.

/*
{# on récupère l'url de l'ajax #}
<form {{ stimulus_controller('ajax',{'ajaxUrl':path('app_img')} ) }}> 
 {# on appel la fonction search si modif de l'input #}
<input name="q" data-action="ajax#search" type="search" >
{# on met un div pour le retour #}
<div data-ajax-target="retourAjax"></div>
</form> 
*/
import { useDebounce } from 'stimulus-use'
import { Controller } from '@hotwired/stimulus';
export default class extends Controller {
    //temps pour la fonction seek
    static debounces = [
        'click',
        {
            name: 'seek',
            wait: 500
        }
    ]
    /* -------------------------------------------------------------------------- */
    /*                              variable and use                              */
    /* -------------------------------------------------------------------------- */
    static targets = ['retourAjax'] //  div of destination <div data-ajax-target="retourAjax"></div>
    static values = {               //  url of ajax
        ajaxUrl: String,
    }
    /* -------------------------------------------------------------------------- */
    /*                                    code                                    */
    /* -------------------------------------------------------------------------- */
    connect() {
        useDebounce(this, { wait: 100 })
    }
    //fonction lancé par le stimuli
    search(event) {
        this.seek(event.currentTarget.value)
    }
    //la fonction async qui a le debounce séparé pour debounce
    async seek(query) {
        //on récupère la reponse
        const response = await fetch(`${this.ajaxUrlValue}/` + query)
        //on modifie le div
        this.retourAjaxTarget.innerHTML = await response.text()
    }
}
