import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
  documentChangedEvent: EventEmitter<Document[]> = new EventEmitter<
    Document[]
  >();
  documentListChangedEvent: Subject<Document[]> = new Subject<Document[]>();
  maxDocumentID: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentID = this.getMaxID();
  }

  getDocuments(): Document[] {
    return this.documents
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      .slice();
  }

  getDocument(id: string): Document {
    return this.documents.find((document) => document.id === id);
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }

  getMaxID(): number {
    let maxID = 0;
    for (let document of this.documents) {
      let currentID = +document.id;
      if (currentID > maxID) {
        maxID = currentID;
      }
    }
    return maxID;
  }

  addDocument(newDoc: Document) {
    if (newDoc === undefined || newDoc === null) {
      return;
    }
    this.maxDocumentID++;
    newDoc.id = this.maxDocumentID.toString();
    this.documents.push(newDoc);
    this.documentChangedEvent.next(this.documents.slice());
  }

  updateDocument(originalDoc: Document, newDoc: Document) {
    if (
      originalDoc === null ||
      originalDoc === undefined ||
      newDoc === null ||
      newDoc === undefined
    ) {
      return;
    }
    const pos = this.documents.indexOf(originalDoc);
    if (pos < 0) {
      return;
    }

    newDoc.id = originalDoc.id;
    this.documents[pos] = newDoc;
    this.documentListChangedEvent.next([...this.documents]);
  }
}
