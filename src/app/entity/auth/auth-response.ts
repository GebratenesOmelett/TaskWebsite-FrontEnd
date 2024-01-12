export class AuthResponse {
  constructor(
    public email: string,
    public token: string,
    public expiresIn: string) {
  }
}
