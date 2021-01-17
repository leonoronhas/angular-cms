export class Contact {
  public id: string | number;
  public name: string;
  public email: string;
  public phone: number | string;
  public imageUrl: string;
  public group: any[];

  constructor(
    id: string | number,
    name: string,
    email: string,
    phone: number | string,
    imageUrl: string,
    group: any[]
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.imageUrl = imageUrl;
    this.group =  group;
  }
}
