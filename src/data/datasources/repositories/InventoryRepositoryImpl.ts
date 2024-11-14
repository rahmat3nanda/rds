import InventoryRepository from '../../../domain/repositories/InventoryRepository.ts';

import ApiService from '../ApiService.ts';
import InventoryRemoteDataSource from '../remote/InventoryRemoteDataSource.ts';
import {RootListResponse} from '../../models/RootListResponse.ts';
import {InventoryResponse} from '../../models/InventoryResponse.ts';

export default class InventoryRepositoryImpl extends InventoryRepository {
  private remoteDataSource: InventoryRemoteDataSource;

  constructor(service: ApiService) {
    super();
    this.remoteDataSource = new InventoryRemoteDataSource(service);
  }

  async data(
    page: number,
    size: number,
  ): Promise<RootListResponse<InventoryResponse>> {
    return this.remoteDataSource.data(page, size);
  }

  async detail(id: string): Promise<InventoryResponse> {
    return this.remoteDataSource.detail(id);
  }

  async create(data: InventoryResponse): Promise<boolean> {
    return this.remoteDataSource.create(data);
  }

  async update(data: InventoryResponse): Promise<boolean> {
    return this.remoteDataSource.update(data);
  }
}
