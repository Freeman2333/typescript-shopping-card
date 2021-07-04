import { useQuery } from "react-query";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import { Wrapper, StyledButton } from "./App.styles";

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
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  if (isLoading) return <LinearProgress />;
  if (error) return <>Something went wrong ...</>;

  return (
    <Wrapper>
      <Grid container spacing={3}>
        {data?.map((item) => {
          return (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} />
            </Grid>
          );
        })}
      </Grid>
    </Wrapper>
  );
}

export default App;
