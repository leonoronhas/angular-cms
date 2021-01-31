import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Output() selectedCDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document('1', 'Leo', 'Team 1', 'https://www.google.com', null),
    new Document('2', 'Thyne', 'Team 2', 'https://www.google.com', null),
    new Document('3', 'Giovanva', 'Team 3', 'https://www.google.com', null),
    new Document('4', 'Sophia', 'Team 4', 'https://www.google.com', null),
    new Document('5', 'Francisco', 'Team 5', 'https://www.google.com', null),
    new Document('6', 'Stuart', 'Little', 'https://www.google.com', null),
    new Document('7', 'Jacob', 'Doc 2', 'https://www.google.com', null),
  ];

  constructor() {}

  ngOnInit(): void {}

  onSelectedDocument(document: Document) {
    this.selectedCDocumentEvent.emit(document);
  }
}
