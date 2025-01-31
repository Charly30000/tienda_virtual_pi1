
import { Card } from "./Card";
import { Product } from "@/services/BussinessTools/Props/GetProducts";

interface Props {
    products: Product[];
    onBlockProduct: (id: number) => void;
}

export const BussinessProducts = ({ products, onBlockProduct }: Props) => {

  return (
    <div className="flex flex-wrap gap-4">
      {products.map((e) => (
        <Card
          key={e.id}
          id={e.id}
          image={e.image}
          name={e.name}
          price={e.price}
          productBlocked={e.isBlocked}
          quantity={e.quantity}
          totalAvailable={e.quantity - e.sold}
          onBlockProduct={onBlockProduct}
        />
      ))}
    </div>
  );
};
