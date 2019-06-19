import { shallowMount } from "@vue/test-utils";
import ProductPrice from "@/components/ProductPrice";

describe("ProductPrice.vue", () => {
  it("renders the price with a dollar sign", async () => {
    const wrapper = shallowMount(ProductPrice, { propsData: { price: 2500 } });
    expect(wrapper.html()).toBe("<div>$25 </div>");
  });

  it("renders the currency code", async () => {
    const wrapper = shallowMount(ProductPrice, {
      propsData: { price: 2500, "show-currency-code": true }
    });
    expect(wrapper.html()).toBe("<div>$25 USD</div>");
  });
});
