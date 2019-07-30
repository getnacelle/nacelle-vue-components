export const defaultProduct = {
  priceRange: {
    min: '10.99',
    max: '29.99'
  },
  title: 'Awesome T-Shirt',
  category: "Men's Shirts",
  featuredMedia: {
    src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
    thumbnailSrc: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
  },
  description:
    "<p>This is the t-shirt description. It's a really nice item, isn't it? You can buy it in different colors and sizes.</p>",
  id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
  handle: 'gray-t-shirt',
  variants: [
    {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==',
      price: '29.99'
    }
  ],
  options: [
    {
      name: 'Size',
      values: ['xs', 's']
    }
    // {
    //   name: 'Shape',
    //   values: ['Oval', 'Triangle', 'Square']
    // }
    // {
    //   name: 'Color',
    //   values: ['white', 'red', 'blue']
    // }
  ]
}

export const defaultLineItem = {
  image: {
    src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
    thumbnailSrc: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
  },
  title: 'Gray T-Shirt',
  productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
  handle: 'gray-t-shirt',
  variant: {
    id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==',
    price: '29.99'
  }
}
