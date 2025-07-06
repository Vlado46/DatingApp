import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected title = 'Dating app';
  protected members = signal<any[]>([]);

  async ngOnInit() {
    this.members.set(await this.getMembers());
  }

  async getMembers() {
    try {
      return lastValueFrom(
        this.http.get<any[]>('https://localhost:5001/api/members')
      );
    } catch (error) {
      console.error('Error fetching members:', error);
      throw error; // Re-throw the error for further handling if needed
    }
  }
}
