import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../../../models/course';
import { CourseService } from '../../../services/course.service';
import { RouterLink } from '@angular/router';
import { LevelCoursePipe } from '../../../pipes/level-course.pipe';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-course-list',
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule, RouterLink, LevelCoursePipe],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];
  purchasedUuids = new Set<string>();
  searchText = '';
  selectedCategory = '';
  pageSize: number = 9;
  currentPage: number = 0;
  totalPages: number = 0;

  readonly categories: string[] = [
    'JAVA', 'JAVASCRIPT', 'PYTHON', 'CSHARP', 'RUBY', 'PHP', 'SWIFT', 'KOTLIN', 'GO', 'RUST',
    'HTML', 'CSS', 'SQL', 'CPLUSPLUS', 'C', 'DART', 'SCALA', 'PERL', 'HASKELL', 'LISP',
    'MATLAB', 'GROOVY', 'COBOL', 'FORTRAN', 'OBJECTIVEC', 'VISUALBASIC', 'ASSEMBLY',
    'TYPESCRIPT', 'ELIXIR', 'CLOJURE', 'OCAML', 'FSHARP', 'LUA', 'PROLOG', 'SMALLTALK',
    'ACTIONSCRIPT', 'ABAP', 'APEX', 'PLSQL', 'RPG', 'XQUERY', 'VHDL', 'VERILOG',
    'SQLSERVER', 'MYSQL', 'POSTGRESQL', 'MONGODB', 'ORACLE', 'SQLITE', 'REDIS'
  ];

  constructor(private courseService: CourseService, private cartService: CartService, private userService: UserService) { }

  ngOnInit() {
    this.getAllCourses();

    this.getPurchasedCourses();
  }

  getAllCourses(title?: string, category?: string): void {
    this.courseService.getAllCourses(this.currentPage, this.pageSize, category, title).subscribe({
      next: (data) => {
        this.courses = data.content;
        this.totalPages = data.totalPages;
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      }
    });
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAllCourses();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getAllCourses();
    }
  }

  onFiltersChange(): void {
    this.getAllCourses(this.searchText, this.selectedCategory);
  }

  getPurchasedCourses(): void {
    this.userService.getPurchasedCourses().subscribe({
      next: (data) => {
        data.forEach(course => this.purchasedUuids.add(course.uuid));
      },
      error: (error) => {
        console.error('Error fetching purchased courses:', error);
      }
    });
  }

  isPurchased(courseUuid: string): boolean {
    return this.purchasedUuids.has(courseUuid);
  }

  addToCart(course: Course): void {
    this.cartService.addToCart(course);
  }
}
