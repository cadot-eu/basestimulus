import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static values = {
        limit: { type: Number, default: 10 },
        destination: String,
        proprietes: String,
        longitude: String,
        latitude: String,
    };

    connect() {
        this.select = document.createElement('select');
        this.select.classList.add('form-select');
        this.select.setAttribute('aria-label', 'adresse autocomplete');
        this.select.hidden = true;
        this.element.insertAdjacentElement('afterend', this.select);

        this.error = document.createElement('div');
        this.error.classList.add('invalid-feedback');
        this.element.insertAdjacentElement('afterend', this.error);

        this.limit = this.limitValue;
        this.destination = this.destinationValue ? document.getElementById(this.destinationValue) : this.element;
        this.proprietes = this.proprietesValue ? document.getElementById(this.proprietesValue) : null;
        this.longitude = this.longitudeValue ? document.getElementById(this.longitudeValue) : null;
        this.latitude = this.latitudeValue ? document.getElementById(this.latitudeValue) : null;

        this.element.addEventListener('input', (input) => {
            input.target.classList.remove('is-ok');
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.fetchData()
                    .then((data) => {
                        if (data.code === 400) {
                            switch (data.message) {
                                case 'q must contain between 3 and 200 chars and start with a number or a letter':
                                    this.errorMessage = 'Le champ doit contenir entre 3 et 200 caractères et commencer par un chiffre ou une lettre';
                                    break;
                            }
                            this.showError(this.errorMessage);
                            this.select.hidden = true;
                            input.target.classList.add('is-invalid');
                            input.target.classList.remove('is-valid');
                            return;
                        }
                        input.target.classList.remove('is-invalid');
                        if (data.features.length > 0) {
                            let options = '<option value="">Choisir une adresse</option>';
                            data.features.forEach((element, index) => {
                                options += `<option value="${index}">${element.properties.label}</option>`;
                            });

                            if (this.select.hidden) {
                                this.select.innerHTML = options;
                                this.select.addEventListener('change', (e) => {
                                    this.element.value = data.features[e.target.value].properties.label;
                                    this.select.hidden = true;
                                    if (this.destination) this.destination.value = input.target.value;
                                    if (this.proprietes) this.proprietes.value = JSON.stringify(data.features[e.target.value].properties);
                                    if (this.longitude) this.longitude.value = data.features[e.target.value].geometry.coordinates[0];
                                    if (this.latitude) this.latitude.value = data.features[e.target.value].geometry.coordinates[1];
                                });
                            } else {
                                this.select.innerHTML = options;
                            }
                            this.select.hidden = false;
                        }
                    });
            }, 500);
        });
    }

    async fetchData() {
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${this.element.value}&autocomplete=1&limit=${this.limit}`);
        const data = await response.json();
        return data;
    }

    showError(message) {
        this.error.innerHTML = message;
    }
}
