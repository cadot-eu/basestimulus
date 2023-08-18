import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
	static values = {
		limit: { type: Number, default: 10 },
		destination: String,
		proprietes: String,
		longitude: String,
		latitude: String,
	}

	connect() {
		this.select = document.createElement('select')
		this.select.classList.add('form-select')
		this.select.setAttribute('aria-label', 'adresse autocomplete')
		this.select.hidden = true
		this.element.insertAdjacentElement('afterend', this.select)

		this.error = document.createElement('div')
		this.error.classList.add('invalid-feedback')
		this.element.insertAdjacentElement('afterend', this.error)

		this.entity = this.element.name.split('[')[0]
		this.limit = this.limitValue
		this.destination = this.destinationValue
			? document.getElementById(this.destinationValue)
			: this.element
		this.proprietes = document.getElementById(
			this.entity + '_' + this.proprietesValue
		)
		this.longitude = document.getElementById(
			this.entity + '_' + this.longitudeValue
		)
		this.latitude = document.getElementById(
			this.entity + '_' + this.latitudeValue
		)
		this.element.addEventListener('keyup', (input) => {
			input.target.classList.remove('is-ok')
			clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				this.fetchData().then((data) => {
					if (data.code === 400) {
						switch (data.message) {
							case 'q must contain between 3 and 200 chars and start with a number or a letter':
								this.errorMessage =
									'Le champ doit contenir entre 3 et 200 caractères et commencer par un chiffre ou une lettre'
								break
						}
						this.showError(this.errorMessage)
						this.select.hidden = true
						input.target.classList.add('is-invalid')
						input.target.classList.remove('is-valid')
						return
					}
					input.target.classList.remove('is-invalid')
					if (data.features.length > 0) {
						this.select.innerHTML =
							'<option value="">Choisir une adresse</option>'
						data.features.forEach((element) => {
							let option = document.createElement('option')
							option.textContent = element.properties.label
							option.dataset.feature = JSON.stringify(element)
							this.select.appendChild(option)
						})

						if (this.select.hidden) {
							this.select.addEventListener('change', (e) => {
								const selectedFeature = JSON.parse(
									e.target.options[e.target.selectedIndex].dataset
										.feature
								)
								this.element.value = selectedFeature.properties.label
								this.select.hidden = true
								if (this.destination)
									this.destination.value = input.target.value
								if (this.proprietes)
									this.proprietes.value = JSON.stringify(
										selectedFeature.properties
									)
								if (this.longitude)
									this.longitude.value =
										selectedFeature.geometry.coordinates[0]
								if (this.latitude)
									this.latitude.value =
										selectedFeature.geometry.coordinates[1]
							})
						}
						this.select.hidden = false
					}
				})
			}, 500)
		})
	}

	async fetchData() {
		const response = await fetch(
			`https://api-adresse.data.gouv.fr/search/?q=${this.element.value}&autocomplete=1&limit=${this.limit}`
		)
		const data = await response.json()
		return data
	}

	showError(message) {
		this.error.innerHTML = message
	}
}
