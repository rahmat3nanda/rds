import ApiService from '../ApiService.ts';
import {SupplierResponse} from '../../models/SupplierResponse.ts';
import {RootListResponse} from '../../models/RootListResponse.ts';

export default class SupplierRemoteDataSource {
  private service: ApiService;

  constructor(service: ApiService) {
    this.service = service;
  }

  async data(
    page: number,
    size: number,
  ): Promise<RootListResponse<SupplierResponse>> {
    try {
      const response = await this.service.get<
        RootListResponse<SupplierResponse>
      >(`/Supplier/inquiry/${page}/${size}`);

      return response.data;
    } catch (e) {
      throw e;
    }
  }

  async create(data: object): Promise<boolean> {
    try {
      const response = await this.service.post('/Supplier', data);

      return response.status === 200;
    } catch (e) {
      throw e;
    }
  }

  async update(data: object): Promise<boolean> {
    try {
      const response = await this.service.put('/Supplier', data);

      return response.status === 200;
    } catch (e) {
      throw e;
    }
  }
}
