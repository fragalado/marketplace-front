import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'levelCourse'
})
export class LevelCoursePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    switch (value) {
      case 'BEGINNER':
        return 'Principiante';
      case 'INTERMEDIATE':
        return 'Intermedio';
      case 'ADVANCED':
        return 'Avanzado';
    }
    return null;
  }

}
