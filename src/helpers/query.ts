// // queries.ts
import { gql } from "@apollo/client";

export const GET_BANNER = gql`
  query MyQuery {
    mst_banner(
      where: {
        shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" }
        visibility: { _eq: true }
      }
    ) {
      id
      image
    }
  }
`;

export const CHECK_MOBILE = gql`
  query MyQuery($mobile: String) {
    mst_users(
      where: {
        mobile: { _eq: $mobile }
        shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" }
      }
    ) {
      email
      id
      mobile
      name
      image
    }
  }
`;

export const CHECK_EMAIL = gql`
  query MyQuery($email: String) {
    mst_users(
      where: {
        email: { _eq: $email }
        shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" }
      }
    ) {
      email
      id
      mobile
      name
      image
      created_at
      isdeleted
    }
  }
`;
export const GET_ONE_PRODUCT=gql`
query MyQuery($id: uuid) {
  mst_product(where: {id: {_eq: $id}}) {
    id
    name
    offered_price
    image
    price
    product_code
    quantity
    selling_price
    shop_id
    show_stock
    status
    stocks
    sub_category
    top_selling
    trending_products
    updated_at
    description

  }
}
`
export const GET_PRODUCT = gql`
  query MyQuery($name: order_by = asc, $limit: Int, $offset: Int) {
    mst_product(
      order_by: { name: $name, discount: asc }
      where: {
        isdeleted: { _eq: false }
        shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" }
      }
      limit: $limit
      offset: $offset
    ) {
      id
      name
      description
      category
      sub_category
      price
      expiry
      isdeleted
      duration
      attributes
      mst_category {
        category
        id
        created_at
      }
      mst_sub_category {
        sub_name
      }
      created_at
      image
      featured_products
      quantity
      selling_price
      status
      top_selling
      trending_products
      offered_price
    }
    mst_product_aggregate(
      where: { shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" } }
    ) {
      aggregate {
        count(columns: id)
      }
    }
  }
`;

export const GET_CATEGORY_PRODUCT = gql`
  query MyQuery(
    $name: order_by = asc
    $limit: Int
    $offset: Int
    $categoryId: uuid
  ) {
    mst_product(
      order_by: { name: $name, discount: asc }
      where: {
        isdeleted: { _eq: false }
        shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" }
        category: { _eq: $categoryId }
      }
      limit: $limit
      offset: $offset
    ) {
      id
      name
      description
      category
      sub_category
      price
      expiry
      isdeleted
      duration
      attributes
      created_at
      image
      featured_products
      quantity
      selling_price
      status
      top_selling
      trending_products
      offered_price
    }
    mst_product_aggregate(
      where: {
        shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" }
        category: { _eq: $categoryId }
      }
    ) {
      aggregate {
        count(columns: id)
      }
    }
  }
`;

export const GET_SUBCATEGORY_PRODUCT = gql`
  query MyQuery(
    $name: order_by = asc
    $limit: Int!
    $offset: Int!
    $sub_categoryId: uuid
  ) {
    mst_product(
      order_by: { name: $name, discount: asc }
      where: {
        isdeleted: { _eq: false }
        shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" }
        sub_category: { _eq: $sub_categoryId }
      }
      limit: $limit
      offset: $offset
    ) {
      id
      name
      description
      category
      sub_category
      price
      expiry
      isdeleted
      duration
      attributes
      created_at
      image
      featured_products
      quantity
      selling_price
      status
      top_selling
      trending_products
      offered_price
    }
    mst_product_aggregate(
      where: {
        shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" }
        sub_category: { _eq: $sub_categoryId }
      }
    ) {
      aggregate {
        count(columns: id)
      }
    }
  }
`;

export const GET_FEATURED = gql`
 query MyQuery {
  mst_product(where: {featured_products: {_eq: true}, shop_id: {_eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a"}}, order_by: {created_at: desc}) {
    name
    id
    offered_price
    price
    product_code
    quantity
    selling_price
    shop_id
    show_stock
    status
    stocks
    image
    sub_category
    top_selling
    trending_products
    updated_at
    description
  }
}


`;


export const GET_BESTSELLER = gql`
 query MyQuery {
  mst_product(where: {top_selling: {_eq: true}, shop_id: {_eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a"}}, order_by: {created_at: desc}) {
    name
    id
    offered_price
    price
    product_code
    quantity
    selling_price
    shop_id
    show_stock
    status
    stocks
    image
    sub_category
    top_selling
    trending_products
    updated_at
    description
  }
}
`;

export const GET_TRENDING = gql`query MyQuery {
  mst_product(where: {trending_products: {_eq: true}, shop_id: {_eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a"}}, order_by: {created_at: desc}) {
    id
    name
    offered_price
    price
    product_code
    quantity
    selling_price
    shop_id
    show_stock
    status
    stocks
    image
    sub_category
    top_selling
    trending_products
    updated_at
    description
  }
}
`;

export const GET_CATEGORY = gql`
  query MyQuery {
    mst_category(
      where: {
        isdeleted: { _eq: false }
        shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" }
      }
    ) {
      image
      isdeleted
      category
      shop_id
      id
    }
  }
`;
export const GET_SUB = gql`
  query MyQuery($category: uuid) {
    mst_sub_category(
      where: {
        isdeleted: { _eq: false }
        shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" }
      }
    ) {
      id
      description
      category
      sub_name
      image

      isdeleted
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query MyQuery($id: uuid!) {
    mst_users(where: { id: { _eq: $id } }) {
      email
      id
      mobile
      name
      image
    }
  }
`;

export const GET_USER_ADDRESS = gql`
  query MyQuery($user: uuid) {
    mst_user_address(where: { user: { _eq: $user } }) {
      id
      mobile
      pincode
      state
      user
      email
      city
      address
      landmark
      save_address_as
      name
    }
  }
`;

export const GET_HIGH_TO_LOW = gql`
  query MyQuery($priceOrder: order_by = asc, $limit: Int!, $offset: Int!) {
    mst_product(
      order_by: { offered_price: $priceOrder }
      where: {
        isdeleted: { _eq: false }
        shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" }
      }
      limit: $limit
      offset: $offset
    ) {
      id
      name
      description
      category
      sub_category
      price
      expiry
      isdeleted
      duration
      attributes
      mst_category {
        category
        id
        created_at
      }
      mst_sub_category {
        sub_name
      }
      created_at
      image
      featured_products
      quantity
      selling_price
      status
      top_selling
      trending_products
      offered_price
    }
    mst_product_aggregate(
      where: { shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" } }
    ) {
      aggregate {
        count(columns: id)
      }
    }
  }
`;

export const GET_CART_ITEMS = gql`
  query MyQuery($user_id: uuid!) {
    mst_cart(
      where: {
        user_id: { _eq: $user_id }
        shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" }
      }
    ) {
      product_id
      product_name
      image
      quantity
      price
      attributes
      original_price
      selling_price
      offered_price
      saved_price
    }
  }
`;

export const CHECK_PRODUCT_QUERY = gql`
  query MyQuery($product_id: uuid!, $user_id: uuid!) {
    mst_cart(
      where: {
        _and: [
          { product_id: { _eq: $product_id } }
          { user_id: { _eq: $user_id } }
          { shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" } }
        ]
      }
    ) {
      product_id
    }
  }
`;

export const GET_PLACE_ORDERS = gql`
 query MyQuery ($user: uuid){
  mst_bookings(where: {userAddress: {user: {_eq:$user}}, shop_id: {_eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a"}}, order_by: {created_at: desc}) {
    id
    created_at
    payment_type
    status
    total
    dispatched_at
    inTransit_at
    delivered_at
    rejected_at
    tracking_id
    tracking_image
    mst_booked_products {
      id
      booking_id
      product
      quantity
      sub_total
      attributes
      star_rating
      review_rating
      review_photos_videos
      is_review
      coupon_price
      saved_price
      paid_price
      mst_products {
        image
        name
        selling_price
        offered_price
        price
      }
    }
    userAddress {
      address
      city
      email
      mobile
      pincode
      state
      user
    }
  }
}
`
