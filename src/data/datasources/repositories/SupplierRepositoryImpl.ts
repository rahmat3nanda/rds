import ApiService from '../ApiService.ts';
import SupplierRepository from '../../../domain/repositories/SupplierRepository.ts';
import {
  SupplierDataResponse,
  SupplierResponse,
} from '../../models/SupplierResponse.ts';
import SupplierRemoteDataSource from '../remote/SupplierRemoteDataSource.ts';

class SupplierRepositoryImpl extends SupplierRepository {
  private remoteDataSource: SupplierRemoteDataSource;

  constructor(service: ApiService) {
    super();
    this.remoteDataSource = new SupplierRemoteDataSource(service);
  }

  async data(page: number, size: number): Promise<SupplierResponse> {
    return this.remoteDataSource.data(page, size);
  }

  async create(data: SupplierDataResponse): Promise<boolean> {
    return this.remoteDataSource.create(data);
  }

  async update(data: SupplierDataResponse): Promise<boolean> {
    return this.remoteDataSource.update(data);
  }
}

export default SupplierRepositoryImpl;
