import { shallowMount } from "@vue/test-utils";
import ProductPrice from "@/components/ProductPrice";

describe("ProductPrice.vue", () => {
  it("renders the price with a dollar sign", async () => {
    const wrapper = shallowMount(ProductPrice);
    wrapper.setProps({ price: "25" });
    expect(wrapper.html()).toBe("<div>\n  $25\n  <!----></div>");
  });
  it("renders the price without the symbol", async () => {
    const wrapper = shallowMount(ProductPrice);
    wrapper.setProps({ price: "25", currencyCode: "AUS" });
    expect(wrapper.html()).toBe("<div>\n  25\n  <!----></div>");
  });
});
