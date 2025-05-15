import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { Lesson } from '../../../models/lesson';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LessonService } from '../../../services/lesson.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-lesson-detail',
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterLink],
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.css'
})
export class LessonDetailComponent implements OnInit {
  lesson!: Lesson;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.lessonService.getLessonByUuid(id).subscribe({
      next: (data) => {
        this.lesson = data;
      },
      error: (error) => {
        console.error("Error al obtener la lección:", error);
      }
    });
  }

  getSafeVideoUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.transformToEmbed(url));
  }

  private transformToEmbed(url: string): string {
    // Simple transformación para YouTube
    if (url.includes('youtube.com/watch')) {
      return url.replace('watch?v=', 'embed/');
    }
    return url;
  }
}
