// =============================================================================
//  Type definitions for Course Info App
//  Signed: by Abdulmoin Hablas
// =============================================================================

export interface CoursePart {
  name: string;
  exerciseCount: number;
}

export interface CourseData {
  id: number;
  name: string;
  parts: CoursePart[];
}