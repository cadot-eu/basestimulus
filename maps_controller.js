import { Controller } from '@hotwired/stimulus'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import houseIcon from 'bootstrap-icons/icons/house.svg';
import centreIcon from 'bootstrap-icons/icons/geo-alt.svg';

export default class extends Controller {
  static values = {
    datas: Array,
    centre: {type: Array, default: [48.8534, 2.3488]},
    zoom: {type: Number, default: 10}
  }

  connect() {
    this.renderMap()
  }

  renderMap() {
    const mapElement = this.element
    const map = L.map(mapElement).setView(this.centreValue , this.zoomValue); // Remplacez les coordonnées par celles de votre choix

//on ajoute un marqueur pour la localisation de l'utilisateur

    L.circle(this.centreValue, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.1,
        radius: 10000
    }).addTo(map);
    //on ajoute un marqueur pour la localisation de l'utilisateur
    const marker = L.marker(this.centreValue).addTo(map);
    const icon = L.icon({
        iconUrl: centreIcon,
        iconSize: [25, 41], // Ajustez la taille de l'icone selon vos besoins
        iconAnchor: [12, 41], // Ajustez l'ancre de l'icone selon vos besoins
    });
    marker.setIcon(icon);
    marker.bindTooltip("Vous êtes ici");

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    const data = this.datasValue
    for (let i = 0; i < data.length; i++) {
      const marker = L.marker([data[i].lat, data[i].lon]).addTo(map);
      const icon = L.icon({
        iconUrl: houseIcon,
        iconSize: [25, 41], // Ajustez la taille de l'icone selon vos besoins
        iconAnchor: [12, 41], // Ajustez l'ancre de l'icone selon vos besoins
      });

      marker.setIcon(icon);
      marker.bindTooltip('<u>Cliquez pour aller sur la fiche</u><br>'+data[i].description);
      marker.on('click', function() {
        window.location.href = `https://immo.localhost/recherche/${data[i].id}`;
      });
    }
  }
}
