import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): Contact[] {
    if (!contacts.length || !term) {
      return contacts;
    }
    term = term.trim().toLowerCase();

    let filtered = contacts.filter((contact: Contact) => {
      return contact.name.toLowerCase().includes(term);
    });

    if (!filtered.length) {
      return null;
    }

    return filtered;
  }
}
