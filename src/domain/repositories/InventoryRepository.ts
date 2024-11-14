import {RootListResponse} from '../../data/models/RootListResponse.ts';
import {InventoryResponse} from '../../data/models/InventoryResponse.ts';

export default abstract class InventoryRepository {
  abstract data(
    page: number,
    size: number,
  ): Promise<RootListResponse<InventoryResponse>>;

  abstract detail(id: string): Promise<InventoryResponse>;

  abstract create(data: InventoryResponse): Promise<boolean>;

  abstract update(data: InventoryResponse): Promise<boolean>;
}
