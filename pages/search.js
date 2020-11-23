import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import DetailProduct from "../components/layout/DetailProduct";
import useProducts from "../hooks/useProducts";
import Error404 from "../components/layout/404";
const Search = () => {
  const { products } = useProducts("created_at");
  const [produtsFilter, setProductsFilter] = useState([]);
  const router = useRouter();
  const {
    query: { q },
  } = router;

  useEffect(() => {
    const search = q.toLowerCase();
    const filter = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      );
    });

    setProductsFilter(filter);
  }, [q, products]);

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {produtsFilter.length === 0 ? (
                <Error404 />
              ) : (
                produtsFilter.map((product) => (
                  <DetailProduct
                    key={product.id}
                    product={product}
                  ></DetailProduct>
                ))
              )}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default Search;
