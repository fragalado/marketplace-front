import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../../../models/course';
import { CourseService } from '../../../services/course.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-list',
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];
  searchText = '';
  selectedCategory = '';

  readonly categories: string[] = [
    'JAVA', 'JAVASCRIPT', 'PYTHON', 'CSHARP', 'RUBY', 'PHP', 'SWIFT', 'KOTLIN', 'GO', 'RUST',
    'HTML', 'CSS', 'SQL', 'CPLUSPLUS', 'C', 'DART', 'SCALA', 'PERL', 'HASKELL', 'LISP',
    'MATLAB', 'GROOVY', 'COBOL', 'FORTRAN', 'OBJECTIVEC', 'VISUALBASIC', 'ASSEMBLY',
    'TYPESCRIPT', 'ELIXIR', 'CLOJURE', 'OCAML', 'FSHARP', 'LUA', 'PROLOG', 'SMALLTALK',
    'ACTIONSCRIPT', 'ABAP', 'APEX', 'PLSQL', 'RPG', 'XQUERY', 'VHDL', 'VERILOG',
    'SQLSERVER', 'MYSQL', 'POSTGRESQL', 'MONGODB', 'ORACLE', 'SQLITE', 'REDIS'
  ];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getAllCourses().subscribe({
      next: (data: Course[]) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      }
    });
  }

  filteredCourses(): Course[] {
    return this.courses.filter(course =>
      (!this.selectedCategory || course.category === this.selectedCategory) &&
      (!this.searchText || course.title.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }
}
