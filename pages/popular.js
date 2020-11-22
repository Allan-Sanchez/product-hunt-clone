import React from "react";
import Layout from "../components/layout/Layout";
import DetailProduct from "../components/layout/DetailProduct";
import useProducts from "../hooks/useProducts"
const Popular = () => {
  const {products} = useProducts('votes');

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {products.map( product => (
                <DetailProduct key={product.id} product={product}></DetailProduct>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default Popular;
