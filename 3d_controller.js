import { Controller } from '@hotwired/stimulus'
import "@egjs/view360/css/view360.min.css";
import View360, { EquirectProjection,ControlBar,LoadingSpinner } from "@egjs/view360";

export default class extends Controller {
  static values = {
    url: String,
    video: Boolean
  }

  connect() {
    const url=this.urlValue
    const video=this.videoValue
    // You can use the CSS Selector that selects the container element as shown below (#viewer)
// Or you can use HTMLElement directly. (document.getElementById("viewer"))
const viewer = new View360(this.element, {
    disableContextMenu: false,
    plugins: [new ControlBar(),new LoadingSpinner()],
    // It uses Equirectangular projection
    projection: new EquirectProjection({
      // Image URL to your 360 panorama image/video
      src: url ,
      // It's false, as it's gonna display image not video here
      video: video
    })
  });
  }
}
