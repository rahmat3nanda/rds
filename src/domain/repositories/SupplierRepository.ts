import {SupplierResponse} from '../../data/models/SupplierResponse.ts';
import {RootListResponse} from '../../data/models/RootListResponse.ts';

abstract class SupplierRepository {
  abstract data(
    page: number,
    size: number,
  ): Promise<RootListResponse<SupplierResponse>>;

  abstract create(data: SupplierResponse): Promise<boolean>;

  abstract update(data: SupplierResponse): Promise<boolean>;
}

export default SupplierRepository;
