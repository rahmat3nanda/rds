import {
  SupplierDataResponse,
  SupplierResponse,
} from '../../data/models/SupplierResponse.ts';

abstract class SupplierRepository {
  abstract data(page: number, size: number): Promise<SupplierResponse>;

  abstract create(data: SupplierDataResponse): Promise<boolean>;

  abstract update(data: SupplierDataResponse): Promise<boolean>;
}

export default SupplierRepository;
