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

  }

  sortAndSend() {
   this.maxDocumentID = this.getMaxId();
   this.documents.sort((a, b) => {
     if (a.name < b.name) {
       return -1;
     }
     if (a.name > b.name) {
       return 1;
     }
     return 0;
   })
   this.documentListChangedEvent.next(this.documents.slice());
  }

  getDocuments() {
    this.http.get('http://localhost:8080/documents').subscribe(
      //success method
      (documents: any) => {
        console.log(documents);
        this.documents = documents.documents;
        this.sortAndSend();
      },
      //error method
      (error: any) => {
        console.log(error);
      });
  }

  getDocument(id: string) {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId: number = 0;
    for (let document of this.documents) {
      let currentId: number = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }


 addDocument(document: Document) {
   if (!document) {
     return;
   }

   // make sure id of the new Document is empty
   document.id = '';

   const headers = new HttpHeaders({'Content-Type': 'application/json'});

   // add to database
   this.http.post<{ message: string, document: Document }>('http://localhost:8080/documents',
     document,
     { headers: headers })
     .subscribe(
       (responseData) => {
         // add new document to documents
         this.documents.push(responseData.document);
         this.sortAndSend();
       }
     );
 }

 updateDocument(originalDocument: Document, newDocument: Document) {
   if (!originalDocument || !newDocument) {
     return;
   }

   const pos = this.documents.findIndex(d => d.id === originalDocument.id);

   if (pos < 0) {
     return;
   }

   // set the id of the new Document to the id of the old Document
   newDocument.id = originalDocument.id;
   newDocument._id = originalDocument._id;

   const headers = new HttpHeaders({'Content-Type': 'application/json'});

   // update database
   this.http.put('http://localhost:8080/documents/' + originalDocument.id,
     newDocument, { headers: headers })
     .subscribe(
       (response: Response) => {
         this.documents[pos] = newDocument;
         this.sortAndSend();
       }
     );
 }

 deleteDocument(document: Document) {

   if (!document) {
     return;
   }

   const pos = this.documents.findIndex(d => d.id === document.id);

   if (pos < 0) {
     return;
   }

   // delete from database
   this.http.delete('http://localhost:8080/documents/' + document.id)
     .subscribe(
       (response: Response) => {
         this.documents.splice(pos, 1);
         this.sortAndSend();
       }
     );
 }
}
