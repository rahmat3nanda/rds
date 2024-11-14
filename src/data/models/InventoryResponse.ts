import {SupplierResponse} from './SupplierResponse.ts';

export interface InventoryResponse {
  id: string;
  sku: string;
  name: string;
  costPrice: number;
  retailPrice: number;
  qty: number;
  marginPercentage: number;
  supplier: SupplierResponse;
  actor: string;
  timestamp: string; // ISO 8601 timestamp format
}
