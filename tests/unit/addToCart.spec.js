import { shallowMount } from "@vue/test-utils";
import AddToCartButton from "@/components/AddToCartButton";

describe("AddToCartButton.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(AddToCartButton, {
      propsData: { msg }
    });
    expect(wrapper.props("msg")).toMatch(msg);
  });
});
