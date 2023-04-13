export class Restaurant {
  private id: number;
  private name: string;
  private type: string;
  private address: string;
  private hours: string;
  private phoneNumber: string;

  constructor( id: number, name: string, type: string, address: string, hours: string, phoneNumber: string) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.address = address;
    this.hours = hours;
    this.phoneNumber = phoneNumber;
  }
}
