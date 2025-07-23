import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Note } from '../../models/note.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {
  noteForm: FormGroup;
  isEditMode = false;
  noteId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.noteId = this.route.snapshot.params['id'];
    if (this.noteId) {
      this.isEditMode = true;
      this.noteService.getNote(this.noteId).subscribe(note => {
        this.noteForm.patchValue(note);
      });
    }
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      const noteData: Note = this.noteForm.value;
      if (this.isEditMode && this.noteId) {
        this.noteService.updateNote(this.noteId, noteData).subscribe(() => {
          this.router.navigate(['/notes']);
        });
      } else {
        this.noteService.createNote(noteData).subscribe(() => {
          this.router.navigate(['/notes']);
        });
      }
    }
  }
}
