import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation MyMutation(
    $name: String
    $email: String
    $mobile: String
    $user_type: String
  ) {
    insert_mst_users(
      objects: {
        name: $name
        email: $email
        mobile: $mobile
        user_type: $user_type
        shop_id: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a"
      }
    ) {
      returning {
        id
        mobile
        name
        email
        shop_id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation MyMutation($id: uuid, $name: String, $email: String) {
    update_mst_users(
      where: {
        id: { _eq: $id }
        shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" }
      }
      _set: { email: $email, name: $name }
    ) {
      affected_rows
    }
  }
`;

export const SAVE_ADDRESS = gql`
  mutation SaveAddress(
    $user: uuid!, 
    $name: String!, 
    $address: String!, 
    $pincode: String!, 
    $city: String!, 
    $save_address_as: String!, 
    $landmark: String!
  ) {
    insert_mst_user_address(
      objects: {
        user: $user, 
        name: $name, 
        address: $address, 
        pincode: $pincode, 
        city: $city, 
        save_address_as: $save_address_as, 
        landmark: $landmark, 
        shop_id: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a"
      }
    ) {
      affected_rows
      returning {
        id
        user
        name
        address
        city
        landmark
        pincode
      }
    }
  }
`;


export const DELETE_USER_ADDRESS = gql`
  mutation MyMutation($id: uuid) {
    delete_mst_user_address(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const UPDATE_USER_ADDRESS = gql`
  mutation UpdateUserAddress(
    $id: uuid!, 
    $address: String, 
    $pincode: String, 
    $city: String, 
    $save_address_as: String, 
    $name: String, 
    $landmark: String
  ) {
    update_mst_user_address(
      where: {
        id: { _eq: $id }, 
        shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" }
      }, 
      _set: {
        address: $address, 
        pincode: $pincode, 
        city: $city, 
        save_address_as: $save_address_as, 
        name: $name, 
        landmark: $landmark
      }
    ) {
      affected_rows
    }
  }
`;


export const ADD_CART = gql`
  mutation MyMutation(
    $product_id: uuid!
    $image: String
    $product_name: String
    $user_id: uuid
    $quantity: Int
    $price: Int
    $stocks: Int
    $attributes: jsonb
    $saved_price:float8
    $original_price:Int
    $offered_price:Int
    $selling_price:Int
  ) {
    insert_mst_cart(
      objects: {
        product_id: $product_id
        product_name: $product_name
        image: $image
        user_id: $user_id
        quantity: $quantity
        price: $price
        stocks: $stocks
        saved_price:$saved_price
        original_price:$original_price
        offered_price:$offered_price
        selling_price:$selling_price
        attributes: $attributes
        shop_id: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a"
      }
    ) {
      affected_rows
       returning {
        image
        product_id
        product_name
        user_id
        quantity
        price
        attributes
        saved_price
        original_price
        offered_price
        selling_price
      }
    }
  }
`;

export const UPDATE_CART = gql`
  mutation MyMutation(
    $product_id: uuid
    $user_id: uuid!
    $quantity: Int
    $price: Int
   $saved_price:float8
  ) {
    update_mst_cart(
      where: {
        user_id: { _eq: $user_id }
        product_id: { _eq: $product_id }
        shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" }
      }
      _inc: { quantity: $quantity,saved_price:$saved_price,price: $price }
    ) {
      affected_rows
      returning {
        id
        product_id
        product_name
        user_id
        quantity
        price
        saved_price
        original_price
        offered_price
        selling_price
      }
    }
  }
`;

export const INCREASE_QUANTITY = gql`
  mutation MyMutation($user_id: uuid!, $product_id: uuid!, $quantity: Int!, $price: Int, $saved_price:float8) {
    update_mst_cart(
      where: {
        user_id: { _eq: $user_id }
        product_id: { _eq: $product_id }
        shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" }
      }
      _inc: { quantity: $quantity,price: $price,saved_price: $saved_price}
    ) {
      affected_rows
    }
  }
`;


export const REMOVE_ITEM = gql`
  mutation MyMutation($user_id: uuid!, $product_id: uuid!) {
    delete_mst_cart(
      where: {
        user_id: { _eq: $user_id }
        product_id: { _eq: $product_id }
        shop_id: { _eq: "c0554ffb-8e3a-4ce4-bb3b-d345873e061a" }
      }
    ) {
      affected_rows
    }
  }
`;


export const CREATE_BOOKING_PRODUCT = gql`
 mutation MyMutation($status: String,$payment_type: String,$total: float8,$address:uuid,$customer:uuid,$coupon_code: String,$coupon_used: Boolean,$created_at: timestamp) {
  insert_mst_bookings(objects: {status:$status, payment_type:$payment_type, total:$total, address:$address, customer:$customer, shop_id:"c0554ffb-8e3a-4ce4-bb3b-d345873e061a", coupon_code:$coupon_code, coupon_used:$coupon_used, created_at:$created_at}) {
    affected_rows
    returning {
      id
      created_at
      status
      payment_type
      address
      total
      customer
      coupon_code
      coupon_used
    }
  }
}
`;

export const BOOKED_PRODUCT = gql`
 mutation MyMutation($sub_total: float8,$quantity: Int,$booking_id: uuid,$product: uuid,$attributes: jsonb,$coupon_price: Int,$saved_price: float8,$paid_price: float8) {
  insert_mst_booked_products(objects: {sub_total:$sub_total, quantity:$quantity, booking_id:$booking_id, product:$product, attributes:$attributes, coupon_price:$coupon_price, saved_price:$saved_price, paid_price:$paid_price, shop_id:"c0554ffb-8e3a-4ce4-bb3b-d345873e061a"}) {
    affected_rows
    returning {
      sub_total
      quantity
      id
      booking_id
      product
      attributes
    }
  }
}
`;

export const DELETE_CART_ITEM = gql`
 mutation MyMutation($user_id: uuid) {
  delete_mst_cart(where: {user_id: {_eq:$user_id}, shop_id: {_eq:"c0554ffb-8e3a-4ce4-bb3b-d345873e061a"}}) {
    affected_rows
  }
}
`;


