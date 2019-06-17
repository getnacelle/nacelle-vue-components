import { shallowMount } from "@vue/test-utils";
import Spinner from "@/components/Spinner";

describe("Spinner.vue", () => {
  it("sets default loaderSvg prop", () => {
    const wrapper = shallowMount(Spinner);
    expect(wrapper.props("loaderSvg")).toBeDefined();
  });

  it("renders an image", async () => {
    const wrapper = shallowMount(Spinner);
    expect(wrapper.contains("img")).toBe(true);
  });
});
