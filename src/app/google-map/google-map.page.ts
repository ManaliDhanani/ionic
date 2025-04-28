import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { GoogleMap, MapType, Marker } from '@capacitor/google-maps';
import { ModalController, Platform } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';
import { ModalComponent } from './modal/modal.component';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.page.html',
  styleUrls: ['./google-map.page.scss'],
})
export class GoogleMapPage {
  @ViewChild('map') mapRef!: ElementRef;
  map!: GoogleMap;
  searchQuery: string = '';

  apiLoaded: Observable<boolean>;

  constructor(
    private modalCtrl : ModalController,
    private pl: Platform,
    httpClient: HttpClient
  ) {
  }

  ionViewDidEnter() {
    this.createMap();
  }

  // async searchLocations() {
  //   if (this.searchQuery) {
  //     const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${this.searchQuery}&key=${environment.mapsKey}`);
  //     const data = await response.json();
  //     console.log(data.predictions);
  //     if (data.predictions.length > 0) {
  //       const firstPrediction = data.predictions[0];
  //       this.centerMapOnLocation(firstPrediction.description);
  //     }
  //   }
  // }

  // async centerMapOnLocation(location: string) {
  //   const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${environment.mapsKey}`);
  //   const data = await response.json();
  //   if (data.results.length > 0) {
  //     const { lat, lng } = data.results[0].geometry.location;
  //     await this.map.setCamera({
  //       coordinate: {
  //         lat,
  //         lng
  //       },
  //       zoom: 12
  //     });

  //     // Optionally add a marker at this location
  //     await this.map.addMarker({
  //       coordinate: { lat, lng },
  //       title: location
  //     });
  //   }
  // }

  async createMap() {
    if(this.pl.is('hybrid')) {
      try {
        const permissions = await Geolocation.requestPermissions();
        if (permissions.location === 'denied') {
          alert('Location permissions are denied.');
        }
        
        const position = await Geolocation.getCurrentPosition();
        const currentLat = position.coords.latitude;
        const currentLng = position.coords.longitude;
  
        this.map = await GoogleMap.create({
          id: 'my-map',
          apiKey: environment.mapsKey,
          element: this.mapRef.nativeElement,
          config: {
            center: {
              lat: currentLat,
              lng: currentLng
            },
            zoom: 8
          },
        });

        // this.map.setMapType(MapType.Satellite);
  
        this.addMarkers();
  
      } catch (error) {
        console.error('Error getting location', error);
        alert('Please enable location services to use this feature.');
      }
    }
    else {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            console.log('position: ', position);
            const currentLat = position.coords.latitude;
            const currentLng = position.coords.longitude;

            this.map = await GoogleMap.create({
              id: 'my-map',
              apiKey: environment.mapsKey,
              element: this.mapRef.nativeElement,
              config: {
                center: {
                  lat: currentLat,
                  lng: currentLng
                },
                zoom: 8
              },
            });

            this.addMarkers();
          },
          (error) => {
            console.error('Error getting location', error);
            alert('Unable to retrieve your location. Please check location settings.');
            this.loadDefaultMap();
          }
        );
      } else {
        alert('Geolocation is not supported by your browser.');
        this.loadDefaultMap();
      }
    }
  }

  async loadDefaultMap() {
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9
        },
        zoom: 8
      },
    });
    this.addMarkers();
  }

  async addMarkers() {
    const markers: Marker[] = [
      {
        coordinate: {
          lat: 21.1702,
          lng: 72.8311
        },
        title: 'Surat, India',
        snippet: 'This is Surat, a city in Gujarat',
      },
      {
        coordinate: {
          lat: 23.2156,
          lng: 72.6369
        },
        title: 'Gujarat, India',
        snippet: 'This is Gandhinagar, the capital of Gujarat',
      },
    ];
  
    for (const marker of markers) {
      await this.map.addMarker(marker);
    }
    this.map.setOnMarkerClickListener(async (marker)=>{
      const modal = await this.modalCtrl.create({
        component: ModalComponent,
        componentProps: {
         marker
        },
        breakpoints : [0,0.3],      
        initialBreakpoint : 0.3
      });
      modal.present();
    })
  }

}