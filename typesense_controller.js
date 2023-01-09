
import { Controller } from '@hotwired/stimulus';
const Typesense = require('typesense')



export default class extends Controller {
    static targets = ["box", "list", "recherche"]
    static values = { host: String, api: String, port: String, protocol: String }
    typesense = new Typesense.Client({
        nodes: [
            {
                host: this.hostValue,
                port: this.portValue,
                protocol: this.protocolValue
            }
        ],
        apiKey: this.apiValue
    })
    connect() {
        this.rechercheTarget.addEventListener('keyup', this.search.bind(this))
    }

    async search() {
        let searchResults = []
        searchResults = await this.typesense.collections('articles').documents().search({
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
