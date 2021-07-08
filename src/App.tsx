import { useQuery } from "react-query";
import { useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Cart from "./Cart/Cart";
import Grid from "@material-ui/core/Grid";
import { Wrapper, StyledButton } from "./App.styles";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Drawer from "@material-ui/core/Drawer";
import Badge from "@material-ui/core/Badge";

// Components
import Item from "./Item/Item";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((ack: number, item) => ack + item.amount, 0);
  };
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = cartItems.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) => {
          if (item.id === clickedItem.id) {
            return { ...item, amount: item.amount + 1 };
          } else {
            return item;
          }
        });
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.id === clickedItem.id) {
          if (item.amount === 1) return item;
          return { ...item, amount: item.amount - 1 };
        } else {
          return item;
        }
      });
    });
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <>Something went wrong ...</>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge color="error" badgeContent={getTotalItems(cartItems)}>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => {
          return (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          );
        })}
      </Grid>
    </Wrapper>
  );
}

export default App;
