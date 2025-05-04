import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-picker.component.html',
  styleUrls: ['./map-picker.component.css'],
})
export class MapPickerComponent implements AfterViewInit {
  weatherJson: string | null = null;

  private map!: L.Map;
  private marker?: L.Marker;

  ngAfterViewInit(): void {
    const defaultIcon = L.icon({
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    
    L.Marker.prototype.options.icon = defaultIcon;

    this.map = L.map('map', {
      attributionControl: false
    }).setView([47.0, 28.8], 7);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // без attribution здесь, зададим ниже вручную
    }).addTo(this.map);
    
    L.control
      .attribution({ prefix: false }) // отключает "Leaflet"
      .addTo(this.map)
      .addAttribution('© OpenStreetMap contributors');

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
    
      // Удаляем старый маркер, если был
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
    
      // Добавляем новый маркер
      this.marker = L.marker([lat, lng]).addTo(this.map);
    
      // Загружаем погоду (заглушка)
      this.loadWeather(lat, lng);
    });
  }

  loadWeather(lat: number, lon: number): void {
    // Заглушка ответа — позже здесь будет реальный API-запрос
    const fakeWeather = {
      lat,
      lon,
      current: {
        temp: 15.4,
        wind: 3.2,
        humidity: 65,
      },
      forecast: [
        { day: 'Tomorrow', temp: 16 },
        { day: 'In 2 days', temp: 17 },
      ],
    };

    this.weatherJson = JSON.stringify(fakeWeather, null, 2);
  }
}