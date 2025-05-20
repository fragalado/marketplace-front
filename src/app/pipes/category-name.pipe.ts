import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryName'
})
export class CategoryNamePipe implements PipeTransform {

  transform(value: string): unknown {
    const customNames: { [key: string]: string } = {
      CPLUSPLUS: 'C++',
      CSHARP: 'C#',
      FSHARP: 'F#',
      PLSQL: 'PL/SQL',
      OBJECTIVEC: 'Objective-C',
      VISUALBASIC: 'Visual Basic',
      TYPESCRIPT: 'TypeScript',
      SQLSERVER: 'SQL Server',
      POSTGRESQL: 'PostgreSQL',
      MONGODB: 'MongoDB',
      SQLITE: 'SQLite',
      JAVASCRIPT: 'JavaScript',
      ACTIONSCRIPT: 'ActionScript'
    };

    if (customNames[value]) {
      return customNames[value];
    }

    // Por defecto, capitaliza y agrega espacios si fuese necesario
    return value
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

}
