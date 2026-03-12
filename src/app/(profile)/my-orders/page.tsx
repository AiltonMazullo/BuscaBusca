/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Package, RefreshCcw } from "lucide-react";
import { ordersService } from "@/services/orders.service";
import { useAuth } from "@/hooks/useAuth";
import type { Order } from "@/types/orders.types";
import { getOrderStatus } from "@/utils/order-status";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10;

function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getOrderTotal(order: Order) {
  if (typeof order.totalValue === "number") {
    return order.totalValue;
  }

  return (order.products ?? []).reduce((sum, item) => {
    return sum + (item.price ?? 0) * item.quantity;
  }, 0);
}

function getOrderItemsCount(order: Order) {
  const items = order.products ?? [];
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

function getOrderItemsLabel(order: Order) {
  const items = order.products ?? [];

  if (!items.length) return "—";

  return items
    .map(
      (item) =>
        `${item.quantity}x ${item.name ?? `Produto #${item.productId}`}`,
    )
    .join(", ");
}

export default function MyOrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  async function loadOrders() {
    try {
      setError(null);
      setIsLoading(true);

      const data = await ordersService.listMyOrders();
      setOrders(data);
      setCurrentPage(1);
    } catch (err: any) {
      const status = err?.response?.status;
      const message =
        err?.response?.data?.message ??
        (typeof err?.response?.data === "string" ? err.response.data : null) ??
        err?.message ??
        "Erro ao carregar pedidos.";

      setError(`${status ? `Status ${status}: ` : ""}${message}`);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirectTo=/my-orders");
      return;
    }

    loadOrders();
  }, [isAuthenticated, router]);

  const normalizedOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      })
      .map((order) => ({
        ...order,
        total: getOrderTotal(order),
        qty: getOrderItemsCount(order),
        itemsLabel: getOrderItemsLabel(order),
        statusMeta: getOrderStatus(order.status),
      }));
  }, [orders]);

  const totalPages = Math.max(
    1,
    Math.ceil(normalizedOrders.length / ITEMS_PER_PAGE),
  );

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return normalizedOrders.slice(start, end);
  }, [normalizedOrders, currentPage]);

  const visiblePages = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4];
    }

    if (currentPage >= totalPages - 2) {
      return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  }, [currentPage, totalPages]);

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Package className="text-primary" size={32} />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-zinc-800">Meus Pedidos</h1>
            <p className="text-sm text-zinc-500">
              Acompanhe os pedidos feitos na sua conta.
            </p>
          </div>
        </div>

        <button
          onClick={loadOrders}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-60"
        >
          <RefreshCcw size={14} />
          Recarregar
        </button>
      </div>

      {isLoading ? (
        <div className="rounded-lg border border-zinc-200 bg-white p-6 text-center text-sm text-zinc-500 shadow-sm">
          Carregando pedidos...
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
          {error}
        </div>
      ) : normalizedOrders.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 bg-white p-6 text-center text-sm text-zinc-500 shadow-sm">
          Você ainda não possui pedidos.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-zinc-50 hover:bg-zinc-50">
                  <TableHead className="px-4 py-3 text-left">Pedido</TableHead>
                  <TableHead className="px-4 py-3 text-left">Data</TableHead>
                  <TableHead className="px-4 py-3 text-left">Status</TableHead>
                  <TableHead className="px-4 py-3 text-left">Itens</TableHead>
                  <TableHead className="px-4 py-3 text-left">
                    Produtos
                  </TableHead>
                  <TableHead className="px-4 py-3 text-right">Total</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order.id} className="align-top">
                    <TableCell className="px-4 py-4 font-semibold text-zinc-800">
                      #{order.id}
                    </TableCell>

                    <TableCell className="px-4 py-4 text-zinc-600">
                      {formatDate(order.createdAt)}
                    </TableCell>

                    <TableCell className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${order.statusMeta.className}`}
                      >
                        {order.statusMeta.label}
                      </span>
                    </TableCell>

                    <TableCell className="px-4 py-4 text-zinc-700">
                      {order.qty}
                    </TableCell>

                    <TableCell className="max-w-[420px] px-4 py-4 text-zinc-700">
                      <span className="block whitespace-normal break-words leading-relaxed">
                        {order.itemsLabel}
                      </span>
                    </TableCell>

                    <TableCell className="px-4 py-4 text-right font-bold text-primary">
                      {formatPrice(order.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        goToPage(currentPage - 1);
                      }}
                      aria-disabled={currentPage === 1}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {visiblePages[0] > 1 && (
                    <>
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            goToPage(1);
                          }}
                          isActive={currentPage === 1}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>

                      {visiblePages[0] > 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                    </>
                  )}

                  {visiblePages.map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(page);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {visiblePages[visiblePages.length - 1] < totalPages && (
                    <>
                      {visiblePages[visiblePages.length - 1] <
                        totalPages - 1 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            goToPage(totalPages);
                          }}
                          isActive={currentPage === totalPages}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        goToPage(currentPage + 1);
                      }}
                      aria-disabled={currentPage === totalPages}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
}
