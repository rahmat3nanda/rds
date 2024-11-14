import ApiService from '../ApiService.ts';
import {RootListResponse} from '../../models/RootListResponse.ts';
import {InventoryResponse} from '../../models/InventoryResponse.ts';

export default class InventoryRemoteDataSource {
  private service: ApiService;

  constructor(service: ApiService) {
    this.service = service;
  }

  async data(
    page: number,
    size: number,
  ): Promise<RootListResponse<InventoryResponse>> {
    try {
      const response = await this.service.get<
        RootListResponse<InventoryResponse>
      >(`/InventoryItem/inquiry/${page}/${size}`);

      return response.data;
    } catch (e) {
      throw e;
    }
  }

  async detail(id: string): Promise<InventoryResponse> {
    try {
      const response = await this.service.get<InventoryResponse>(
        `/InventoryItem/${id}`,
      );

      return response.data;
    } catch (e) {
      throw e;
    }
  }

  async create(data: object): Promise<boolean> {
    try {
      const response = await this.service.post('/InventoryItem', data);

      return response.status === 200;
    } catch (e) {
      throw e;
    }
  }

  async update(data: object): Promise<boolean> {
    try {
      const response = await this.service.put(
        '/InventoryItem/UpdateItem',
        data,
      );

      return response.status === 200;
    } catch (e) {
      throw e;
    }
  }
}
