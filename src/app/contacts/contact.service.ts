import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  contactChangedEvent: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();
  contactListChangedEvent: Subject<Contact[]> = new Subject<Contact[]>();
  maxContactID: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      .slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }

  getMaxID(): number {
    let maxID = 0;
    for (let contact of this.contacts) {
      let currentID = +contact.id;
      if (currentID > maxID) {
        maxID = currentID;
      }
    }

    return maxID;
  }

  addContact(newContact: Contact) {
    if (newContact === undefined || newContact === null) {
      return;
    }
    this.maxContactID++;
    newContact.id = this.maxContactID.toString();
    this.contacts.push(newContact);
    this.contactChangedEvent.next(this.contacts.slice());
  }

  updateContact(originalContact: Contact, newDoc: Contact) {
    if (
      originalContact === null ||
      originalContact === undefined ||
      newDoc === null ||
      newDoc === undefined
    ) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newDoc.id = originalContact.id;
    this.contacts[pos] = newDoc;
    this.contactListChangedEvent.next([...this.contacts]);
  }
}
