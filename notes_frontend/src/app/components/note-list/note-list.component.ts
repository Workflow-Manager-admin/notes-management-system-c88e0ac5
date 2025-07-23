import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  deleteNote(id: number | undefined): void {
    if (id !== undefined) {
      this.noteService.deleteNote(id).subscribe(() => {
        this.notes = this.notes.filter(note => note.id !== id);
      });
    }
  }
}
