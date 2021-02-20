import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { Subscription } from 'rxjs';
import { DocumentService } from '../document.service';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Output() selectedCDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [];
  private subscription: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents.slice();
      }
    );

    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentList: Document[]) => {
        this.documents = documentList;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
