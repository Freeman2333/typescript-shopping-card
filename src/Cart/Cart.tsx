import CartItem from "../CartItem/CartItem";
import { CartItemType } from "../App";
import { Wrapper } from "./Cart.styles";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (clickedItem: CartItemType) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          item={item}
        />
      ))}
    </Wrapper>
  );
};

export default Cart;
