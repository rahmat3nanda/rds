// Contact model representing each contact in the "contacts" array
export interface SupplierDataContactResponse {
  name: string;
  contactType: string;
  value: string;
  actor: string;
  timestamp: string; // You can use Date if you want to convert the string into Date object
}

// Data model representing an item in the "data" array
export interface SupplierDataResponse {
  id: number;
  name: string;
  address: string;
  city: string;
  postCode: string;
  contacts: SupplierDataContactResponse[];
  actor: string;
  timestamp: string; // Again, use Date if necessary
}

// Main response model
export interface SupplierResponse {
  totalDatas: number;
  totalPages: number;
  page: number;
  data: SupplierDataResponse[];
}
