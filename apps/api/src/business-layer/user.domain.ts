// Domain Object/Model (or really, and Entity as it has a validation for a field)

export class User {
    // Entity-specific properties and methods
    id: number;
    name: string;
    // email?: string;
    createdAt: Date | null;

    constructor(id: number, name: string, createdAt: Date) { // email: string, 
        this.id = id;
        this.name = name;
        // this.email = email;
        this.createdAt = createdAt;
    } 

  // Validate the field and apply business rules if necessary
//   isEmailGmail(): boolean {
//     return this.email.endsWith('@gmail.com')
//   }
}
  //   // Example business rule: name must not be empty
  //   if (!data.name.trim()) throw new Error('Name cannot be empty')
//   //     if (typeof userData.name !== 'string') {
//   //       throw new Error('Name is required and must be a string');
//   //     }
  //   //     if (typeof userData.name !== 'string') {
  //   //       throw new Error('Name is required and must be a string');
  //   //     }