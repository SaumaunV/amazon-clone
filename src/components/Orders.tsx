import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { db } from "../firebase";
import Order from "./Order";
import styled from 'styled-components'

export interface DocumentType {
  id: string;
  data: DocumentData;
}

function Orders() {
  const [{ user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState<DocumentType[]>([]);

  const colRef = collection(db, "users", `${user?.uid}`, "orders");
  const q = query(colRef, orderBy("created", "desc"));

  useEffect(() => {
    let unsubscribe: Unsubscribe;
    if (user) {
     unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } else {
      setOrders([]);
    }
    if(user) {
      return () => unsubscribe();
    }
    
    //return onsnapshot unsubscribe function
  }, []);

  return (
    <Container>
      <h1>Your Orders</h1>
      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </Container>
  );
}

export default Orders;
 
const Container = styled.div`
  padding: 20px 80px;
  background-color: #eaeded;

  h1 {
    text-align: left;
    margin: 30px;
  }
`;