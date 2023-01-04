
{/*
 <p data-controller="base--collapse" data-base--collapse-out-value="{{ item.reponse }}" data-action="click->base--collapse#click" style="cursor:pointer;">
    {{ item.reponse|raw|striptags|u.truncate(30, '...') }}
    <span>
        <i class="text-muted">Cliquez pour lire la réponse</i>
    </span>
</p> 
*/}
import { Controller } from '@hotwired/stimulus';
const Typesense = require('typesense')


const typesense = new Typesense.Client({
    nodes: [
        {
            host: 'typesense.picbleu.fr',
            port: '443',
            protocol: 'https'
        }
    ],
    apiKey: 'PPkTPEfTsxtR44'
})
export default class extends Controller {
    static targets = ["box", "list", "recherche"]
    connect() {
        this.rechercheTarget.addEventListener('keyup', this.search.bind(this))
    }

    async search() {
        let searchResults = []
        searchResults = await typesense.collections('articles').documents().search({
            q: this.rechercheTarget.value,
            query_by: 'titre,texte'
        })
        this.listTarget.innerHTML = ''
        for (let i = 0; i < searchResults.hits.length; i++) {
            const element = searchResults.hits[i]['document'];
            this.listTarget.innerHTML += `<li class="list-group-item p-0 "><a href="/les-articles/${element.slug}" class="text-secondary">${element.titre}</a></li>`
        }

        this.boxTarget.classList.replace('d-none', 'd-block')
    }


}
