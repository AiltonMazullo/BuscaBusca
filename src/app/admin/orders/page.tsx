/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { Package, RefreshCcw } from "lucide-react";
import { ordersService } from "@/services/orders.service";
import type { Order } from "@/types/orders.types";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
import { getOrderStatus } from "@/utils/order-status";
import { cn } from "@/utils/utils";

const ITEMS_PER_PAGE = 10;

function formatDate(value?: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(d);
}

function formatMoney(value?: number) {
  if (typeof value !== "number") return "—";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getOrderItemsCount(order: Order) {
  const items = order.products ?? [];
  return Array.isArray(items)
    ? items.reduce((acc, i) => acc + (i.quantity ?? 0), 0)
    : 0;
}

function getOrderTotal(order: Order) {
  if (typeof order.totalValue === "number") {
    return order.totalValue;
  }

  const items = order.products ?? [];
  return items.reduce((sum, item) => {
    return sum + (item.price ?? 0) * item.quantity;
  }, 0);
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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  async function loadOrders() {
    setError(null);

    try {
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
        "Não foi possível carregar os pedidos.";

      setError(`${status ? `Status ${status}: ` : ""}${message}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const rows = useMemo(() => {
    return [...orders]
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      })
      .map((o) => {
        const id = String(o.id ?? "—");
        const status = getOrderStatus(o.status);
        const date = formatDate(o.createdAt);
        const total = formatMoney(getOrderTotal(o));
        const qty = getOrderItemsCount(o);
        const itemsLabel = getOrderItemsLabel(o);

        return { id, status, date, total, qty, itemsLabel };
      });
  }, [orders]);

  const totalPages = Math.max(1, Math.ceil(rows.length / ITEMS_PER_PAGE));

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return rows.slice(start, end);
  }, [rows, currentPage]);

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
    <ProtectedRoute requireAdmin>
      <div className="mx-auto max-w-[1280px] px-4 py-8">
        <div className="mb-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Package className="text-primary" size={32} />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-zinc-800">Pedidos</h1>
              <p className="text-xs text-zinc-500">
                Lista de pedidos do usuário logado
              </p>
            </div>
          </div>

          <button
            onClick={loadOrders}
            className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-60"
            disabled={isLoading}
          >
            <RefreshCcw size={14} />
            Recarregar
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm">
          <Table>
            <TableHeader className="bg-zinc-50">
              <TableRow>
                <TableHead className="px-4 py-3 text-left">Pedido</TableHead>
                <TableHead className="px-4 py-3 text-left">Data</TableHead>
                <TableHead className="px-4 py-3 text-left">Status</TableHead>
                <TableHead className="px-4 py-3 text-left">Itens</TableHead>
                <TableHead className="px-4 py-3 text-left">Produtos</TableHead>
                <TableHead className="px-4 py-3 text-right">Total</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    className="px-4 py-6 text-center text-sm text-zinc-500"
                    colSpan={6}
                  >
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    className="px-4 py-6 text-center text-sm text-zinc-500"
                    colSpan={6}
                  >
                    Nenhum pedido encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRows.map((o) => (
                  <TableRow key={o.id} className="align-top">
                    <TableCell className="px-4 py-3 font-semibold text-zinc-800">
                      {o.id}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-zinc-600">
                      {o.date}
                    </TableCell>

                    <TableCell className="px-3 py-3">
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-medium",
                          o.status.className,
                        )}
                      >
                        {o.status.label}
                      </span>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-zinc-700">
                      {o.qty}
                    </TableCell>

                    <TableCell className="max-w-[320px] px-4 py-3 text-zinc-700">
                      <span className="line-clamp-2">{o.itemsLabel}</span>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-right font-bold text-primary">
                      {o.total}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {!isLoading && rows.length > 0 && totalPages > 1 && (
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
                    {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
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
      </div>
    </ProtectedRoute>
  );
}
