import { Component } from '@angular/core';
import { MapPickerComponent } from './components/map-picker/map-picker.component';

@Component({
  selector: 'app-root',
  imports: [MapPickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ClientApp';
}
