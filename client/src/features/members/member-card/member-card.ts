import { Component, computed, inject, input } from '@angular/core';
import { Member } from '../../../types/member';
import { RouterLink } from '@angular/router';
import { AgePipe } from '../../../core/pipes/age-pipe';
import { LikesService } from '../../../core/services/likes-service';

@Component({
  selector: 'app-member-card',
  imports: [RouterLink, AgePipe],
  templateUrl: './member-card.html',
  styleUrl: './member-card.css',
})
export class MemberCard {
  private likeService = inject(LikesService);
  member = input.required<Member>();
  protected hasLiked = computed(() =>
    this.likeService.likedIds().includes(this.member().id)
  );

  toggleLike(event: Event) {
    event.stopPropagation();
    this.likeService.toggleLike(this.member().id).subscribe({
      next: () => {
        if (this.hasLiked()) {
          this.likeService.likedIds.update((ids) =>
            ids.filter((id) => id !== this.member().id)
          );
        } else {
          this.likeService.likedIds.update((ids) => [...ids, this.member().id]);
        }
      },
    });
  }
}
