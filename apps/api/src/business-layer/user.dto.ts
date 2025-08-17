// Data Transfer Objects
// DTO as a simple interface with no constructor (not full domain model); 
// "View Models" object that carries data between two separate systems.
 
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