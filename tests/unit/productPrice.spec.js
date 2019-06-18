import { shallowMount } from "@vue/test-utils";
import ProductPrice from "@/components/ProductPrice";

describe("ProductPrice.vue", () => {
  it("renders the price with a dollar sign", async () => {
    const wrapper = shallowMount(ProductPrice, { propsData: { price: 2500 } });
    expect(wrapper.html()).toBe("<div>$25</div>");
  });
});
