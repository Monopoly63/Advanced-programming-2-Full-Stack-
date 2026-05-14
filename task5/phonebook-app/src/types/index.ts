// =============================================================================
//  Type definitions for Phonebook App
//  Signed: by Abdulmoin Hablas
// =============================================================================

export interface Person {
  id: string;
  name: string;
  number: string;
}

export type NewPerson = Omit<Person, 'id'>;

export type NotificationType = 'success' | 'error';

export interface Notification {
  message: string;
  type: NotificationType;
}