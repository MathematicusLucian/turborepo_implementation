// Data Transfer Objects
// DTO as a simple interface with no constructor (not full domain model); 
// "View Models" object that carries data between two separate systems.
// To decouple types used for data transfer from the actual data model
 
// Output DTO
export interface UserDTO {
  id: number
  name: string
  // email: string
  createdAt: string
}

// Input DTO
export interface NewUserDTO {
  name: string
  // email: string
}