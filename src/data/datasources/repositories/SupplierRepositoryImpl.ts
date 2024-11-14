import ApiService from '../ApiService.ts';
import SupplierRepository from '../../../domain/repositories/SupplierRepository.ts';
import {SupplierResponse} from '../../models/SupplierResponse.ts';
import SupplierRemoteDataSource from '../remote/SupplierRemoteDataSource.ts';
import {RootListResponse} from '../../models/RootListResponse.ts';

class SupplierRepositoryImpl extends SupplierRepository {
  private remoteDataSource: SupplierRemoteDataSource;

  constructor(service: ApiService) {
    super();
    this.remoteDataSource = new SupplierRemoteDataSource(service);
  }

  async data(
    page: number,
    size: number,
  ): Promise<RootListResponse<SupplierResponse>> {
    return this.remoteDataSource.data(page, size);
  }

  async create(data: SupplierResponse): Promise<boolean> {
    return this.remoteDataSource.create(data);
  }

  async update(data: SupplierResponse): Promise<boolean> {
    return this.remoteDataSource.update(data);
  }
}

export default SupplierRepositoryImpl;
