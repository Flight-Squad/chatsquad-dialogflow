import { AxiosInstance } from "axios";
import urlJoin from "url-join";
import { DuffelSearch, DuffelSearchResponse } from "./interfaces/search";
import {
  DuffelOrderCancelResponse,
  DuffelOrderRequest,
  DuffelOrderResponse
} from "./interfaces/order";

const wrapWithData = data => ({ data });

export class DuffelAgent {
  private extendUrl = route => urlJoin(this.baseUrl, route);
  routes = {
    search: "/air/offer_requests",
    createOrder: "/air/orders",
    cancelOrder: "/air/order_cancellations",
    confirmOrderCancellation: id =>
      `/air/order_cancellations/${id}/actions/confirm`
  };

  async search(search: DuffelSearch): Promise<DuffelSearchResponse> {
    const res = await this.axios.post(
      this.extendUrl(this.routes.search),
      wrapWithData(search)
    );
    return res.data.data as DuffelSearchResponse;
  }

  async createOrder(order: DuffelOrderRequest) {
    const res = await this.axios.post(
      this.extendUrl(this.routes.createOrder),
      wrapWithData(order)
    );
    return res.data.data as DuffelOrderResponse;
  }

  async cancelOrder(order_id: string) {
    const res = await this.axios.post(
      this.extendUrl(this.routes.cancelOrder),
      wrapWithData({ order_id })
    );
    return res.data.data as DuffelOrderCancelResponse;
  }

  async confirmOrderCancellation(orderId: string) {
    const res = await this.axios.get(
      this.extendUrl(this.routes.confirmOrderCancellation(orderId))
    );
    return res.data.data as DuffelOrderCancelResponse;
  }
  /**
   *
   * @param baseUrl Used to
   * @param axios Axios Instance with pre-configured headers, etc
   */
  constructor(readonly baseUrl: string, private axios: AxiosInstance) {}
}
