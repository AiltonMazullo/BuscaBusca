export const ORDER_STATUS_MAP = {
  PENDING: {
    label: "Pendente",
    className: "bg-orange-100 text-orange-700",
  },
  COMPLETED: {
    label: "Finalizado",
    className: "bg-green-100 text-green-700",
  },
  CLOSED: {
    label: "Cancelado",
    className: "bg-red-100 text-red-700",
  },
  FAILED: {
    label: "Cancelado",
    className: "bg-red-100 text-red-700",
  },
};

export function getOrderStatus(status?: string) {
  if (!status) {
    return {
      label: "Desconhecido",
      className: "bg-zinc-100 text-zinc-600",
    };
  }

  return (
    ORDER_STATUS_MAP[status as keyof typeof ORDER_STATUS_MAP] ?? {
      label: status,
      className: "bg-zinc-100 text-zinc-600",
    }
  );
}
