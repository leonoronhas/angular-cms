import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
})
export class DocumentEditComponent implements OnInit {
  [x: string]: any;
  document: Document;
  originalDocument: Document;
  editMode = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editMode = false;
      let id = params['id'];
      if (id === null || id === undefined) {
        return;
      }

      let document = this.documentService.getDocument(id);
      if (!document) {
        return;
      }

      this.originalDocument = document;
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(document));
    });
  }

  onSubmit(form: NgForm) {
    const values = form.value;

    const newDoc = new Document(
      null,
      values.name,
      values.description,
      values.url,
      null
    );

    if (this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, newDoc);
    } else {
      this.documentService.addDocument(newDoc);
    }
    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}
