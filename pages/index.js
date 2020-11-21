import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import {FirebaseContext} from "../firebase"
import DetailProduct from "../components/layout/DetailProduct";

const Home = () => {
  const [products, setProducts] = useState([]);
  const {firebase} = useContext(FirebaseContext);

  useEffect(() => {
   const getProducts = () =>{
    firebase.db.collection("products").orderBy("created_at","desc").onSnapshot(handleSnapshot)
   }
   getProducts();
  }, [])

  function handleSnapshot(snapshot) {
    const products = snapshot.docs.map( doc => {
      return{
        id:doc.id,
        ...doc.data()
      }
    });

    setProducts(products);
  }

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
export default Home;
