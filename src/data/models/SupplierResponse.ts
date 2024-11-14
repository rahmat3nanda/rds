// Contact model representing each contact in the "contacts" array
export interface SupplierContactResponse {
  name: string;
  contactType: string;
  value: string;
  actor: string;
  timestamp: string; // You can use Date if you want to convert the string into Date object
}

// Data model representing an item in the "data" array
export interface SupplierResponse {
  id: number | null;
  name: string;
  address: string;
  city: string;
  postCode: string;
  contacts: SupplierContactResponse[];
  actor: string | null;
  timestamp: string | null; // Again, use Date if necessary
}

class SupplierDataResponseClass implements SupplierResponse {
  id: number | null;
  name: string;
  address: string;
  city: string;
  postCode: string;
  contacts: SupplierContactResponse[];
  actor: string | null;
  timestamp: string | null;

  constructor(
    id: number | null, // Added id field to constructor
    name: string,
    address: string,
    city: string,
    postCode: string,
    contacts: SupplierContactResponse[],
    actor: string | null = null, // Default value is null if not provided
    timestamp: string | null = null, // Default value is null if not provided
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.city = city;
    this.postCode = postCode;
    this.contacts = contacts;
    this.actor = actor;
    this.timestamp = timestamp;
  }
}

export default SupplierDataResponseClass;
