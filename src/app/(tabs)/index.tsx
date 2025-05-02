import { View } from '@/src/components/Themed';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';


export default function TabOneScreen() {
  return (
    <View>
      <ProductListItem product={products[1]}/>
      <ProductListItem product={products[2]}/>
    </View>
  );
}
