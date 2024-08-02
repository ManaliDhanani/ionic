import { Component, OnInit } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Platform } from '@ionic/angular';
import { GoogleCalendarService } from '../services/google-calendar.service';
import { ToastService } from '../services/toastr.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  providers: [Calendar],
})
export class CalendarPage implements OnInit {

  selectedDate: string = new Date().toISOString().substring(0, 10);
  events: any[] = [];
  newEventName: string = '';
  newEventDate = new Date().toISOString();
  eventList = [
    {
      title: 'Event 1',
      location: 'Location 1',
      notes: 'Notes for Event 1',
      startDate: new Date(2024, 6, 24, 10, 0, 0),
      endDate: new Date(2024, 6, 24, 12, 0, 0)
    },
    {
      title: 'Event 2',
      location: 'Location 2',
      notes: 'Notes for Event 2',
      startDate: new Date(2024, 6, 25, 14, 0, 0),
      endDate: new Date(2024, 6, 25, 16, 0, 0)
    },
    {
      title: 'Event 3',
      location: 'Location 3',
      notes: 'Notes for Event 3',
      startDate: new Date(2024, 6, 26, 9, 0, 0),
      endDate: new Date(2024, 6, 26, 11, 0, 0)
    },
    {
      title: 'Event 4',
      location: 'Location 4',
      notes: 'Notes for Event 4',
      startDate: new Date(2024, 6, 27, 8, 0, 0),
      endDate: new Date(2024, 6, 27, 23, 0, 0)
    }
  ];

  constructor(
    private platform: Platform, 
    private calendar: Calendar,
    private googleCalendarService: GoogleCalendarService,
    private toastrService: ToastService,
  ) {}

  ngOnInit() {
    this.loadEvents(this.selectedDate);
    this.createCalendar();
  }

  loadGapiClient(){
    // this.googleCalendarService.loadGapiClient().then(() => {
      // this.googleCalendarService.signIn().subscribe({
      //   next: () => {
      //     console.log('Sign-in successful');
      //     this.createEvents();
      //     this.loadEvents(this.selectedDate);
      //   },
      //   error: (error) => {
      //     console.error('Error during sign-in', error);
      //   }
      // });
  // });
  }

  async createCalendar() {
    try {
      if (this.platform.is('cordova')) {
        const calendarName = 'My Custom Calendar';
        await this.calendar.createCalendar({
          calendarName: calendarName,
          calendarColor: '#FF0000' // Optional color for the calendar
        });
        // this.toastrService.successToast(`${calendarName} created successfully!`);
      } else {
        console.warn('Calendar creation is only supported on device.');
      }
    } catch (error) {
      console.error('Error creating calendar', error);
      this.toastrService.errorToast('Error creating calendar.');
    }
  }

  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
    console.log('this.selectedDate: ', this.selectedDate);
    this.loadEvents(this.selectedDate);
  }

  loadEvents(date: string) {
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    if (this.platform.is('cordova')) {
      this.calendar.findEvent('', '', '', selectedDate, endOfDay).then(
        (events) => {
          this.events = this.removeDuplicateEvents(events);
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      this.events = this.eventList.filter(event => {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);
        return (eventStart <= endOfDay && eventEnd >= selectedDate);
      });
    }
  }

  createEvents(newEvent: any) {
    if (this.platform.is('cordova')) {
      this.calendar.findEvent(newEvent.title, newEvent.location, newEvent.notes, newEvent.startDate, newEvent.endDate).then(events => {
        if (events.length === 0) {
          this.calendar.createEvent(newEvent.title, newEvent.location, newEvent.notes, newEvent.startDate, newEvent.endDate).then(
            (msg) => { 
              console.log(msg); 
              this.loadEvents(this.selectedDate); 
            },
            (err) => { 
              console.error(err); 
            }
          );
        }
      });
    } else {
      this.events.push(newEvent);
      // this.googleCalendarService.addEvent({
      //   summary: newEvent.title,
      //   location: newEvent.location,
      //   description: newEvent.notes,
      //   start: {
      //     dateTime: newEvent.startDate.toISOString()
      //   },
      //   end: {
      //     dateTime: newEvent.endDate.toISOString()
      //   }
      // }).subscribe({
      //   next: (response) => {
      //     console.log('Event added to Google Calendar', response);
      //   },
      //   error: (error) => {
      //     console.error('Error adding event to Google Calendar', error);
      //   }
      // });
      this.loadEvents(this.selectedDate);
    }
  }

  addNewEvent() {
    if (!this.newEventName || !this.newEventDate) {
      console.error('Event name and date are required');
      return;
    }

    const startDate = new Date(this.newEventDate);
    startDate.setHours(0, 0, 0);
    const endDate = new Date(this.newEventDate);
    endDate.setHours(23, 59, 59);

    const newEvent = {
      title: this.newEventName,
      location: 'Custom Location',
      notes: 'Custom Notes',
      startDate,
      endDate
    };
    console.log('this.newEventDate:', this.newEventDate);
    console.log('newEvent: ', newEvent);
    console.log('this.selectedDate: ', this.selectedDate);

    this.eventList.push(newEvent);
    this.createEvents(newEvent);
    this.toastrService.successToast("Event created successfully!");

    this.newEventName = '';
    this.newEventDate = new Date().toISOString();
  }

  removeDuplicateEvents(events: any[]): any[] {
    const uniqueEvents = new Map();
    events.forEach(event => {
      const key = `${event.title}-${event.startDate}-${event.endDate}`;
      if (!uniqueEvents.has(key)) {
        uniqueEvents.set(key, event);
      }
    });
    return Array.from(uniqueEvents.values());
  }

}
