"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./Dashboard.module.css";
import { Plus, Package, Clock, CheckCircle2, Truck, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

interface Order {
  _id: string;
  productName: string;
  sourceLocation: string;
  shippingMethod: string;
  status: string;
  createdAt: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    
    if (status === "authenticated") {
      fetchOrders();
    }
  }, [status, router]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <Loader2 className={styles.spinner} />
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending": return <Clock size={16} className={styles.pendingIcon} />;
      case "Processing": return <Package size={16} className={styles.processingIcon} />;
      case "Shipped": return <Truck size={16} className={styles.shippedIcon} />;
      case "Delivered": return <CheckCircle2 size={16} className={styles.deliveredIcon} />;
      default: return <AlertCircle size={16} />;
    }
  };

  return (
    <div className={styles.wrapper}>
      <Navbar />
      
      <main className="container">
        <div className={styles.dashboardHeader}>
          <div>
            <h1>Hello, {session?.user?.name}</h1>
            <p>Welcome to your ESSENTIAL LUXE dashboard.</p>
          </div>
          <Link href="/orders/new" className={styles.newOrderBtn}>
            <Plus size={20} /> Start New Order
          </Link>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Clock /></div>
            <div className={styles.statInfo}>
              <span>Pending</span>
              <h3>{orders.filter(o => o.status === "Pending").length}</h3>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Package /></div>
            <div className={styles.statInfo}>
              <span>Processing</span>
              <h3>{orders.filter(o => o.status === "Processing").length}</h3>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Truck /></div>
            <div className={styles.statInfo}>
              <span>Shipped</span>
              <h3>{orders.filter(o => o.status === "Shipped").length}</h3>
            </div>
          </div>
        </div>

        <section className={styles.ordersSection}>
          <div className={styles.sectionHeader}>
            <h2>Recent Orders</h2>
          </div>

          {orders.length === 0 ? (
            <div className={styles.emptyState}>
              <Package size={48} />
              <h3>No orders yet</h3>
              <p>When you start an import request, it will appear here.</p>
              <Link href="/orders/new" className={styles.secondaryBtn}>Place Your First Order</Link>
            </div>
          ) : (
            <div className={styles.ordersTableWrapper}>
              <table className={styles.ordersTable}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Source</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className={styles.productName}>{order.productName}</td>
                      <td>{order.sourceLocation}</td>
                      <td>{order.shippingMethod}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
