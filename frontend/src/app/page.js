"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState(null);
  useEffect(() => {
    try {
      axios.get(apiUrl).then((res) => {
        setData(res.data.products);
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to Sartaj.Space! CID Test </h1>
      {data && (
        <div>
          <h2>Products</h2>
          <ul>
            {data.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
