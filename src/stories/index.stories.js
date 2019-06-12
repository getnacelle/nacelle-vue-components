/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { withInfo } from "storybook-addon-vue-info";

import ProductPrice from "../components/ProductPrice";

storiesOf("Product Price", module)
  .addDecorator(withInfo)
  .add(
    "Just the Price",
    () => ({
      components: { ProductPrice },
      template: '<product-price :price="29.00"></product-price>'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  );
