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
//   constructor(
//     public id: number,
//     public name: string,
//     // public email: string,
//     public createdAt: Date
//   ) {}

  // Validate the field and apply business rules if necessary
//   isEmailGmail(): boolean {
//     return this.email.endsWith('@gmail.com')
//   }
}