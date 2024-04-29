export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    public expDate: Date
  ) {}

  get token() {
    if (!this.expDate || new Date() > this.expDate) {
      return null;
    }

    return this._token;
  }
}
