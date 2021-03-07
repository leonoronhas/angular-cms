import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents = [];
  documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
  documentChangedEvent: EventEmitter<Document[]> = new EventEmitter<
    Document[]
  >();
  documentListChangedEvent: Subject<Document[]> = new Subject<Document[]>();
  maxDocumentID: number;

  constructor(private http: HttpClient) {
    this.maxDocumentID = this.getMaxID();
  }

  getDocuments() {
    return this.http
      .get('https://angular-cms-bed0f-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentID = this.getMaxID();
          this.documentListChangedEvent.next([...this.documents]);
        },
        (err: any) => {
          console.error(err);
          return [...this.documents];
        }
      );
  }

  storeDocuments() {
    const docs = JSON.stringify(this.documents);
    this.http
      .put(
        'https://angular-cms-bed0f-default-rtdb.firebaseio.com/documents.json',
        docs
      )
      .subscribe(() => {
        this.documentListChangedEvent.next([...this.documents]);
      });
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
    this.storeDocuments();
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
    this.storeDocuments();
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
    this.storeDocuments();
  }
}
