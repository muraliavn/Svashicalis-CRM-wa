import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/pages/Deliveries.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=76d1f7a8"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/applet/pages/Deliveries.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import { useOutletContext, Link } from "/node_modules/.vite/deps/react-router-dom.js?v=76d1f7a8";
import { OrderStatus, Role } from "/types.ts";
import { formatDate } from "/services/dateFormatter.ts";
import { MapPin, CheckCircle, XCircle, Clock, Package, ExternalLink, UserPlus, User as UserIcon } from "/node_modules/.vite/deps/lucide-react.js?v=76d1f7a8";
const Deliveries = () => {
  _s();
  const { orders, updateOrderStatus, currentUser, users, assignDriver } = useOutletContext();
  const isAdmin = currentUser.role === Role.ADMIN;
  const deliveryStaff = users.filter((u) => u.role === Role.DELIVERY_PERSON);
  const displayOrders = isAdmin ? orders.filter((o) => o.status !== OrderStatus.DELIVERED && o.status !== OrderStatus.CANCELLED) : orders.filter((o) => o.deliveryPersonId === currentUser.id && o.status !== OrderStatus.CANCELLED);
  const getStatusColor = (status) => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return "text-green-600 bg-green-50 border-green-200";
      case OrderStatus.OUT_FOR_DELIVERY:
        return "text-blue-600 bg-blue-50 border-blue-200";
      case OrderStatus.PENDING:
        return "text-amber-600 bg-amber-50 border-amber-200";
      case OrderStatus.PROCESSING:
        return "text-indigo-600 bg-indigo-50 border-indigo-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };
  const getDriverName = (driverId) => {
    if (!driverId) return "Unassigned";
    return users.find((u) => u.id === driverId)?.name || "Unknown Driver";
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-bold text-gray-900", children: isAdmin ? "Manage All Deliveries" : "My Delivery Route" }, void 0, false, {
          fileName: "/app/applet/pages/Deliveries.tsx",
          lineNumber: 57,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-gray-500", children: isAdmin ? "Assign drivers and monitor active shipments." : "Orders assigned to you for delivery." }, void 0, false, {
          fileName: "/app/applet/pages/Deliveries.tsx",
          lineNumber: 60,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Deliveries.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this),
      isAdmin && /* @__PURE__ */ jsxDEV("div", { className: "bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(UserIcon, { size: 16, className: "text-amber-600" }, void 0, false, {
          fileName: "/app/applet/pages/Deliveries.tsx",
          lineNumber: 69,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-medium text-gray-700", children: [
          deliveryStaff.length,
          " Drivers Online"
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Deliveries.tsx",
          lineNumber: 70,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Deliveries.tsx",
        lineNumber: 68,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Deliveries.tsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid gap-6", children: [
      displayOrders.map(
        (order) => /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-6", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap justify-between items-start gap-4 mb-4", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-bold text-gray-900 flex items-center gap-2", children: [
                  "Order #",
                  order.id,
                  /* @__PURE__ */ jsxDEV(Link, { to: `/orders/${order.id}`, className: "text-gray-400 hover:text-amber-600 transition", title: "View Order Details", children: /* @__PURE__ */ jsxDEV(ExternalLink, { size: 16 }, void 0, false, {
                    fileName: "/app/applet/pages/Deliveries.tsx",
                    lineNumber: 84,
                    columnNumber: 23
                  }, this) }, void 0, false, {
                    fileName: "/app/applet/pages/Deliveries.tsx",
                    lineNumber: 83,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/pages/Deliveries.tsx",
                  lineNumber: 81,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-500", children: formatDate(order.date) }, void 0, false, {
                  fileName: "/app/applet/pages/Deliveries.tsx",
                  lineNumber: 87,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/pages/Deliveries.tsx",
                lineNumber: 80,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxDEV("span", { className: `px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`, children: order.status }, void 0, false, {
                fileName: "/app/applet/pages/Deliveries.tsx",
                lineNumber: 90,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/pages/Deliveries.tsx",
                lineNumber: 89,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/Deliveries.tsx",
              lineNumber: 79,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-start space-x-3", children: [
                  /* @__PURE__ */ jsxDEV(MapPin, { className: "text-amber-600 mt-1 shrink-0", size: 20 }, void 0, false, {
                    fileName: "/app/applet/pages/Deliveries.tsx",
                    lineNumber: 100,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-gray-900", children: order.customerName }, void 0, false, {
                      fileName: "/app/applet/pages/Deliveries.tsx",
                      lineNumber: 102,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600 text-sm", children: order.customerAddress }, void 0, false, {
                      fileName: "/app/applet/pages/Deliveries.tsx",
                      lineNumber: 103,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/pages/Deliveries.tsx",
                    lineNumber: 101,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/pages/Deliveries.tsx",
                  lineNumber: 99,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
                  /* @__PURE__ */ jsxDEV(Package, { className: "text-gray-400 shrink-0", size: 20 }, void 0, false, {
                    fileName: "/app/applet/pages/Deliveries.tsx",
                    lineNumber: 107,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-gray-600 text-sm", children: [
                    order.items.length,
                    " Items (",
                    order.items.reduce((acc, i) => acc + i.quantity, 0),
                    " units)"
                  ] }, void 0, true, {
                    fileName: "/app/applet/pages/Deliveries.tsx",
                    lineNumber: 108,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/pages/Deliveries.tsx",
                  lineNumber: 106,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/pages/Deliveries.tsx",
                lineNumber: 98,
                columnNumber: 17
              }, this),
              isAdmin ? /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col justify-center space-y-2 p-4 bg-gray-50 rounded-xl border border-gray-100", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxDEV(UserPlus, { size: 12 }, void 0, false, {
                    fileName: "/app/applet/pages/Deliveries.tsx",
                    lineNumber: 118,
                    columnNumber: 23
                  }, this),
                  " Assign Delivery Person"
                ] }, void 0, true, {
                  fileName: "/app/applet/pages/Deliveries.tsx",
                  lineNumber: 117,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "select",
                  {
                    value: order.deliveryPersonId || "",
                    onChange: (e) => assignDriver(order.id, e.target.value),
                    className: "w-full bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2.5 shadow-sm",
                    children: [
                      /* @__PURE__ */ jsxDEV("option", { value: "", children: "-- Select Driver --" }, void 0, false, {
                        fileName: "/app/applet/pages/Deliveries.tsx",
                        lineNumber: 125,
                        columnNumber: 23
                      }, this),
                      deliveryStaff.map(
                        (staff) => /* @__PURE__ */ jsxDEV("option", { value: staff.id, children: staff.name }, staff.id, false, {
                          fileName: "/app/applet/pages/Deliveries.tsx",
                          lineNumber: 127,
                          columnNumber: 19
                        }, this)
                      )
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/pages/Deliveries.tsx",
                    lineNumber: 120,
                    columnNumber: 21
                  },
                  this
                ),
                order.deliveryPersonId && /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-green-600 font-medium", children: [
                  "Currently assigned to ",
                  getDriverName(order.deliveryPersonId)
                ] }, void 0, true, {
                  fileName: "/app/applet/pages/Deliveries.tsx",
                  lineNumber: 131,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/pages/Deliveries.tsx",
                lineNumber: 116,
                columnNumber: 15
              }, this) : (
                /* Current Assignment Label (Driver view) */
                /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-blue-50 border border-blue-100 rounded-lg", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-blue-600 font-bold uppercase block mb-1", children: "Status Summary" }, void 0, false, {
                    fileName: "/app/applet/pages/Deliveries.tsx",
                    lineNumber: 138,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-blue-800", children: "You are responsible for this delivery." }, void 0, false, {
                    fileName: "/app/applet/pages/Deliveries.tsx",
                    lineNumber: 139,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/pages/Deliveries.tsx",
                  lineNumber: 137,
                  columnNumber: 21
                }, this) }, void 0, false, {
                  fileName: "/app/applet/pages/Deliveries.tsx",
                  lineNumber: 136,
                  columnNumber: 15
                }, this)
              ),
              /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col justify-center space-y-2", children: [
                !isAdmin && order.status === OrderStatus.PENDING && /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => updateOrderStatus(order.id, OrderStatus.OUT_FOR_DELIVERY),
                    className: "w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition shadow-sm",
                    children: [
                      /* @__PURE__ */ jsxDEV(Clock, { size: 18 }, void 0, false, {
                        fileName: "/app/applet/pages/Deliveries.tsx",
                        lineNumber: 151,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "Start Delivery" }, void 0, false, {
                        fileName: "/app/applet/pages/Deliveries.tsx",
                        lineNumber: 152,
                        columnNumber: 25
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/pages/Deliveries.tsx",
                    lineNumber: 147,
                    columnNumber: 17
                  },
                  this
                ),
                !isAdmin && order.status === OrderStatus.OUT_FOR_DELIVERY && /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => updateOrderStatus(order.id, OrderStatus.DELIVERED),
                      className: "bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition shadow-sm",
                      children: [
                        /* @__PURE__ */ jsxDEV(CheckCircle, { size: 18 }, void 0, false, {
                          fileName: "/app/applet/pages/Deliveries.tsx",
                          lineNumber: 162,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Delivered" }, void 0, false, {
                          fileName: "/app/applet/pages/Deliveries.tsx",
                          lineNumber: 163,
                          columnNumber: 27
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/pages/Deliveries.tsx",
                      lineNumber: 158,
                      columnNumber: 24
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => updateOrderStatus(order.id, OrderStatus.PENDING),
                      className: "bg-red-100 hover:bg-red-200 text-red-700 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition",
                      children: [
                        /* @__PURE__ */ jsxDEV(XCircle, { size: 18 }, void 0, false, {
                          fileName: "/app/applet/pages/Deliveries.tsx",
                          lineNumber: 169,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Failed" }, void 0, false, {
                          fileName: "/app/applet/pages/Deliveries.tsx",
                          lineNumber: 170,
                          columnNumber: 27
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/pages/Deliveries.tsx",
                      lineNumber: 165,
                      columnNumber: 24
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/pages/Deliveries.tsx",
                  lineNumber: 157,
                  columnNumber: 17
                }, this),
                isAdmin && /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: /* @__PURE__ */ jsxDEV(
                  Link,
                  {
                    to: `/orders/${order.id}`,
                    className: "inline-flex items-center gap-2 text-amber-600 hover:text-amber-800 font-bold text-sm px-4 py-2 rounded-lg hover:bg-amber-50 transition",
                    children: [
                      "Manage Detailed Status ",
                      /* @__PURE__ */ jsxDEV(ExternalLink, { size: 14 }, void 0, false, {
                        fileName: "/app/applet/pages/Deliveries.tsx",
                        lineNumber: 181,
                        columnNumber: 50
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/pages/Deliveries.tsx",
                    lineNumber: 177,
                    columnNumber: 25
                  },
                  this
                ) }, void 0, false, {
                  fileName: "/app/applet/pages/Deliveries.tsx",
                  lineNumber: 176,
                  columnNumber: 17
                }, this),
                !isAdmin && order.status === OrderStatus.DELIVERED && /* @__PURE__ */ jsxDEV("div", { className: "text-center text-green-600 font-bold py-2 bg-green-50 rounded-lg border border-green-100 flex items-center justify-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV(CheckCircle, { size: 18 }, void 0, false, {
                    fileName: "/app/applet/pages/Deliveries.tsx",
                    lineNumber: 188,
                    columnNumber: 25
                  }, this),
                  " Job Completed"
                ] }, void 0, true, {
                  fileName: "/app/applet/pages/Deliveries.tsx",
                  lineNumber: 187,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/pages/Deliveries.tsx",
                lineNumber: 145,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/Deliveries.tsx",
              lineNumber: 96,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Deliveries.tsx",
            lineNumber: 78,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 px-6 py-3 border-t border-gray-100", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-gray-400 uppercase font-bold tracking-widest", children: "Shipment Content" }, void 0, false, {
                fileName: "/app/applet/pages/Deliveries.tsx",
                lineNumber: 198,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-gray-400 uppercase font-bold tracking-widest", children: [
                "Total Value: ₹",
                order.totalAmount.toLocaleString()
              ] }, void 0, true, {
                fileName: "/app/applet/pages/Deliveries.tsx",
                lineNumber: 199,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/Deliveries.tsx",
              lineNumber: 197,
              columnNumber: 16
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-1 text-xs text-gray-600 flex flex-wrap gap-2", children: order.items.map(
              (i, idx) => /* @__PURE__ */ jsxDEV("span", { className: "bg-white border border-gray-200 px-2 py-0.5 rounded shadow-sm text-gray-700", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-amber-700", children: [
                  i.quantity,
                  "x"
                ] }, void 0, true, {
                  fileName: "/app/applet/pages/Deliveries.tsx",
                  lineNumber: 204,
                  columnNumber: 22
                }, this),
                " ",
                i.productName
              ] }, idx, true, {
                fileName: "/app/applet/pages/Deliveries.tsx",
                lineNumber: 203,
                columnNumber: 15
              }, this)
            ) }, void 0, false, {
              fileName: "/app/applet/pages/Deliveries.tsx",
              lineNumber: 201,
              columnNumber: 16
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Deliveries.tsx",
            lineNumber: 196,
            columnNumber: 13
          }, this)
        ] }, order.id, true, {
          fileName: "/app/applet/pages/Deliveries.tsx",
          lineNumber: 77,
          columnNumber: 9
        }, this)
      ),
      displayOrders.length === 0 && /* @__PURE__ */ jsxDEV("div", { className: "text-center py-20 bg-white rounded-xl border border-dashed border-gray-200", children: [
        /* @__PURE__ */ jsxDEV(Package, { size: 64, className: "mx-auto mb-4 text-gray-200" }, void 0, false, {
          fileName: "/app/applet/pages/Deliveries.tsx",
          lineNumber: 214,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-medium text-gray-900", children: "No active deliveries found" }, void 0, false, {
          fileName: "/app/applet/pages/Deliveries.tsx",
          lineNumber: 215,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-gray-500 max-w-xs mx-auto", children: isAdmin ? "There are currently no pending or processing orders that need delivery attention." : "Your route is clear! You have no active assignments right now." }, void 0, false, {
          fileName: "/app/applet/pages/Deliveries.tsx",
          lineNumber: 216,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Deliveries.tsx",
        lineNumber: 213,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Deliveries.tsx",
      lineNumber: 75,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/pages/Deliveries.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
};
_s(Deliveries, "+65arZuZyFJ/Z7/kzq3PaQZzeaA=", false, function() {
  return [useOutletContext];
});
_c = Deliveries;
export default Deliveries;
var _c;
$RefreshReg$(_c, "Deliveries");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/applet/pages/Deliveries.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/applet/pages/Deliveries.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QUFDLFdBQVEsTUFBTSxJQUFJLFdBQVUsZ0NBQTdCO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBeUQ7QUFBQSxRQUN6RCx1QkFBQyxRQUFHLFdBQVUscUNBQW9DLDBDQUFsRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQTRFO0FBQUEsUUFDNUUsdUJBQUMsT0FBRSxXQUFVLGtDQUNWdEIsb0JBQ0csc0ZBQ0Esb0VBSE47QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUtBO0FBQUEsV0FSRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBU0E7QUFBQSxTQW5KSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBcUpBO0FBQUEsT0ExS0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQTJLQTtBQUVKO0FBQUVOLEdBeE1JRCxZQUFvQjtBQUFBLFVBQ2dEZCxnQkFBZ0I7QUFBQTtBQUFBLEtBRHBGYztBQTBNTixlQUFlQTtBQUFXLElBQUFnRDtBQUFBLGFBQUFBLElBQUEiLCJuYW1lcyI6WyJ1c2VPdXRsZXRDb250ZXh0IiwiTGluayIsIk9yZGVyU3RhdHVzIiwiUm9sZSIsImZvcm1hdERhdGUiLCJNYXBQaW4iLCJDaGVja0NpcmNsZSIsIlhDaXJjbGUiLCJDbG9jayIsIlBhY2thZ2UiLCJFeHRlcm5hbExpbmsiLCJVc2VyUGx1cyIsIlVzZXIiLCJVc2VySWNvbiIsIkRlbGl2ZXJpZXMiLCJfcyIsIm9yZGVycyIsInVwZGF0ZU9yZGVyU3RhdHVzIiwiY3VycmVudFVzZXIiLCJ1c2VycyIsImFzc2lnbkRyaXZlciIsImlzQWRtaW4iLCJyb2xlIiwiQURNSU4iLCJkZWxpdmVyeVN0YWZmIiwiZmlsdGVyIiwidSIsIkRFTElWRVJZX1BFUlNPTiIsImRpc3BsYXlPcmRlcnMiLCJvIiwic3RhdHVzIiwiREVMSVZFUkVEIiwiQ0FOQ0VMTEVEIiwiZGVsaXZlcnlQZXJzb25JZCIsImlkIiwiZ2V0U3RhdHVzQ29sb3IiLCJPVVRfRk9SX0RFTElWRVJZIiwiUEVORElORyIsIlBST0NFU1NJTkciLCJnZXREcml2ZXJOYW1lIiwiZHJpdmVySWQiLCJmaW5kIiwibmFtZSIsImxlbmd0aCIsIm1hcCIsIm9yZGVyIiwiZGF0ZSIsImN1c3RvbWVyTmFtZSIsImN1c3RvbWVyQWRkcmVzcyIsIml0ZW1zIiwicmVkdWNlIiwiYWNjIiwiaSIsInF1YW50aXR5IiwiZSIsInRhcmdldCIsInZhbHVlIiwic3RhZmYiLCJ0b3RhbEFtb3VudCIsInRvTG9jYWxlU3RyaW5nIiwiaWR4IiwicHJvZHVjdE5hbWUiLCJfYyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJEZWxpdmVyaWVzLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VPdXRsZXRDb250ZXh0LCBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBBcHBDb250ZXh0VHlwZSwgT3JkZXJTdGF0dXMsIFJvbGUsIFVzZXIgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBmb3JtYXREYXRlIH0gZnJvbSAnLi4vc2VydmljZXMvZGF0ZUZvcm1hdHRlcic7XG5pbXBvcnQgeyBNYXBQaW4sIENoZWNrQ2lyY2xlLCBYQ2lyY2xlLCBDbG9jaywgUGFja2FnZSwgRXh0ZXJuYWxMaW5rLCBVc2VyUGx1cywgVXNlciBhcyBVc2VySWNvbiB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5cbmNvbnN0IERlbGl2ZXJpZXM6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCB7IG9yZGVycywgdXBkYXRlT3JkZXJTdGF0dXMsIGN1cnJlbnRVc2VyLCB1c2VycywgYXNzaWduRHJpdmVyIH0gPSB1c2VPdXRsZXRDb250ZXh0PEFwcENvbnRleHRUeXBlPigpO1xuXG4gIGNvbnN0IGlzQWRtaW4gPSBjdXJyZW50VXNlci5yb2xlID09PSBSb2xlLkFETUlOO1xuICBjb25zdCBkZWxpdmVyeVN0YWZmID0gdXNlcnMuZmlsdGVyKHUgPT4gdS5yb2xlID09PSBSb2xlLkRFTElWRVJZX1BFUlNPTik7XG5cbiAgLy8gRmlsdGVyIGxvZ2ljIGJhc2VkIG9uIHJvbGVcbiAgY29uc3QgZGlzcGxheU9yZGVycyA9IGlzQWRtaW4gXG4gICAgPyBvcmRlcnMuZmlsdGVyKG8gPT4gby5zdGF0dXMgIT09IE9yZGVyU3RhdHVzLkRFTElWRVJFRCAmJiBvLnN0YXR1cyAhPT0gT3JkZXJTdGF0dXMuQ0FOQ0VMTEVEKVxuICAgIDogb3JkZXJzLmZpbHRlcihvID0+IG8uZGVsaXZlcnlQZXJzb25JZCA9PT0gY3VycmVudFVzZXIuaWQgJiYgby5zdGF0dXMgIT09IE9yZGVyU3RhdHVzLkNBTkNFTExFRCk7XG5cbiAgY29uc3QgZ2V0U3RhdHVzQ29sb3IgPSAoc3RhdHVzOiBPcmRlclN0YXR1cykgPT4ge1xuICAgIHN3aXRjaChzdGF0dXMpIHtcbiAgICAgIGNhc2UgT3JkZXJTdGF0dXMuREVMSVZFUkVEOiByZXR1cm4gJ3RleHQtZ3JlZW4tNjAwIGJnLWdyZWVuLTUwIGJvcmRlci1ncmVlbi0yMDAnO1xuICAgICAgY2FzZSBPcmRlclN0YXR1cy5PVVRfRk9SX0RFTElWRVJZOiByZXR1cm4gJ3RleHQtYmx1ZS02MDAgYmctYmx1ZS01MCBib3JkZXItYmx1ZS0yMDAnO1xuICAgICAgY2FzZSBPcmRlclN0YXR1cy5QRU5ESU5HOiByZXR1cm4gJ3RleHQtYW1iZXItNjAwIGJnLWFtYmVyLTUwIGJvcmRlci1hbWJlci0yMDAnO1xuICAgICAgY2FzZSBPcmRlclN0YXR1cy5QUk9DRVNTSU5HOiByZXR1cm4gJ3RleHQtaW5kaWdvLTYwMCBiZy1pbmRpZ28tNTAgYm9yZGVyLWluZGlnby0yMDAnO1xuICAgICAgZGVmYXVsdDogcmV0dXJuICd0ZXh0LWdyYXktNjAwIGJnLWdyYXktNTAgYm9yZGVyLWdyYXktMjAwJztcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0RHJpdmVyTmFtZSA9IChkcml2ZXJJZD86IHN0cmluZykgPT4ge1xuICAgIGlmICghZHJpdmVySWQpIHJldHVybiAnVW5hc3NpZ25lZCc7XG4gICAgcmV0dXJuIHVzZXJzLmZpbmQodSA9PiB1LmlkID09PSBkcml2ZXJJZCk/Lm5hbWUgfHwgJ1Vua25vd24gRHJpdmVyJztcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLXN0YXJ0IG1kOml0ZW1zLWNlbnRlciBnYXAtNFwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMFwiPlxuICAgICAgICAgICAge2lzQWRtaW4gPyAnTWFuYWdlIEFsbCBEZWxpdmVyaWVzJyA6ICdNeSBEZWxpdmVyeSBSb3V0ZSd9XG4gICAgICAgICAgPC9oMT5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwXCI+XG4gICAgICAgICAgICB7aXNBZG1pbiBcbiAgICAgICAgICAgICAgPyAnQXNzaWduIGRyaXZlcnMgYW5kIG1vbml0b3IgYWN0aXZlIHNoaXBtZW50cy4nIFxuICAgICAgICAgICAgICA6ICdPcmRlcnMgYXNzaWduZWQgdG8geW91IGZvciBkZWxpdmVyeS4nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge2lzQWRtaW4gJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcHgtNCBweS0yIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBzaGFkb3ctc20gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxVc2VySWNvbiBzaXplPXsxNn0gY2xhc3NOYW1lPVwidGV4dC1hbWJlci02MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwXCI+e2RlbGl2ZXJ5U3RhZmYubGVuZ3RofSBEcml2ZXJzIE9ubGluZTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ2FwLTZcIj5cbiAgICAgICAge2Rpc3BsYXlPcmRlcnMubWFwKG9yZGVyID0+IChcbiAgICAgICAgICA8ZGl2IGtleT17b3JkZXIuaWR9IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQteGwgc2hhZG93LXNtIGJvcmRlciBib3JkZXItZ3JheS0xMDAgb3ZlcmZsb3ctaGlkZGVuIGhvdmVyOnNoYWRvdy1tZCB0cmFuc2l0aW9uXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGp1c3RpZnktYmV0d2VlbiBpdGVtcy1zdGFydCBnYXAtNCBtYi00XCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIE9yZGVyICN7b3JkZXIuaWR9XG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIHRvPXtgL29yZGVycy8ke29yZGVyLmlkfWB9IGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC1hbWJlci02MDAgdHJhbnNpdGlvblwiIHRpdGxlPVwiVmlldyBPcmRlciBEZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPEV4dGVybmFsTGluayBzaXplPXsxNn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTUwMFwiPntmb3JtYXREYXRlKG9yZGVyLmRhdGUpfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BweC0zIHB5LTEgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1ib2xkIGJvcmRlciAke2dldFN0YXR1c0NvbG9yKG9yZGVyLnN0YXR1cyl9YH0+XG4gICAgICAgICAgICAgICAgICAgIHtvcmRlci5zdGF0dXN9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtNlwiPlxuICAgICAgICAgICAgICAgIHsvKiBMb2NhdGlvbiAmIEN1c3RvbWVyICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgc3BhY2UteC0zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxNYXBQaW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci02MDAgbXQtMSBzaHJpbmstMFwiIHNpemU9ezIwfSAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMFwiPntvcmRlci5jdXN0b21lck5hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDAgdGV4dC1zbVwiPntvcmRlci5jdXN0b21lckFkZHJlc3N9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgPFBhY2thZ2UgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCBzaHJpbmstMFwiIHNpemU9ezIwfSAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIHRleHQtc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICB7b3JkZXIuaXRlbXMubGVuZ3RofSBJdGVtcyAoe29yZGVyLml0ZW1zLnJlZHVjZSgoYWNjLCBpKSA9PiBhY2MgKyBpLnF1YW50aXR5LCAwKX0gdW5pdHMpXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIEFzc2lnbm1lbnQgRHJvcGRvd24gKEFETUlOIG9ubHkpICovfVxuICAgICAgICAgICAgICAgIHtpc0FkbWluID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyIHNwYWNlLXktMiBwLTQgYmctZ3JheS01MCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItZ3JheS0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtYm9sZCB0ZXh0LWdyYXktNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxVc2VyUGx1cyBzaXplPXsxMn0gLz4gQXNzaWduIERlbGl2ZXJ5IFBlcnNvblxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtvcmRlci5kZWxpdmVyeVBlcnNvbklkIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gYXNzaWduRHJpdmVyKG9yZGVyLmlkLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXdoaXRlIGJvcmRlciBib3JkZXItZ3JheS0zMDAgdGV4dC1ncmF5LTcwMCB0ZXh0LXNtIHJvdW5kZWQtbGcgZm9jdXM6cmluZy1hbWJlci01MDAgZm9jdXM6Ym9yZGVyLWFtYmVyLTUwMCBibG9jayBwLTIuNSBzaGFkb3ctc21cIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPi0tIFNlbGVjdCBEcml2ZXIgLS08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICB7ZGVsaXZlcnlTdGFmZi5tYXAoc3RhZmYgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e3N0YWZmLmlkfSB2YWx1ZT17c3RhZmYuaWR9PntzdGFmZi5uYW1lfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAge29yZGVyLmRlbGl2ZXJ5UGVyc29uSWQgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZ3JlZW4tNjAwIGZvbnQtbWVkaXVtXCI+Q3VycmVudGx5IGFzc2lnbmVkIHRvIHtnZXREcml2ZXJOYW1lKG9yZGVyLmRlbGl2ZXJ5UGVyc29uSWQpfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAvKiBDdXJyZW50IEFzc2lnbm1lbnQgTGFiZWwgKERyaXZlciB2aWV3KSAqL1xuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJnLWJsdWUtNTAgYm9yZGVyIGJvcmRlci1ibHVlLTEwMCByb3VuZGVkLWxnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1ibHVlLTYwMCBmb250LWJvbGQgdXBwZXJjYXNlIGJsb2NrIG1iLTFcIj5TdGF0dXMgU3VtbWFyeTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtYmx1ZS04MDBcIj5Zb3UgYXJlIHJlc3BvbnNpYmxlIGZvciB0aGlzIGRlbGl2ZXJ5LjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgey8qIEFjdGlvbnMgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgIHshaXNBZG1pbiAmJiBvcmRlci5zdGF0dXMgPT09IE9yZGVyU3RhdHVzLlBFTkRJTkcgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHVwZGF0ZU9yZGVyU3RhdHVzKG9yZGVyLmlkLCBPcmRlclN0YXR1cy5PVVRfRk9SX0RFTElWRVJZKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1ibHVlLTYwMCBob3ZlcjpiZy1ibHVlLTcwMCB0ZXh0LXdoaXRlIHB5LTIgcHgtNCByb3VuZGVkLWxnIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNwYWNlLXgtMiB0cmFuc2l0aW9uIHNoYWRvdy1zbVwiXG4gICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2xvY2sgc2l6ZT17MTh9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5TdGFydCBEZWxpdmVyeTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgeyFpc0FkbWluICYmIG9yZGVyLnN0YXR1cyA9PT0gT3JkZXJTdGF0dXMuT1VUX0ZPUl9ERUxJVkVSWSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdXBkYXRlT3JkZXJTdGF0dXMob3JkZXIuaWQsIE9yZGVyU3RhdHVzLkRFTElWRVJFRCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWdyZWVuLTYwMCBob3ZlcjpiZy1ncmVlbi03MDAgdGV4dC13aGl0ZSBweS0yIHB4LTQgcm91bmRlZC1sZyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzcGFjZS14LTIgdHJhbnNpdGlvbiBzaGFkb3ctc21cIlxuICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZSBzaXplPXsxOH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RGVsaXZlcmVkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdXBkYXRlT3JkZXJTdGF0dXMob3JkZXIuaWQsIE9yZGVyU3RhdHVzLlBFTkRJTkcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1yZWQtMTAwIGhvdmVyOmJnLXJlZC0yMDAgdGV4dC1yZWQtNzAwIHB5LTIgcHgtNCByb3VuZGVkLWxnIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNwYWNlLXgtMiB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8WENpcmNsZSBzaXplPXsxOH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RmFpbGVkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgICB7aXNBZG1pbiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGluayBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdG89e2Avb3JkZXJzLyR7b3JkZXIuaWR9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtYW1iZXItNjAwIGhvdmVyOnRleHQtYW1iZXItODAwIGZvbnQtYm9sZCB0ZXh0LXNtIHB4LTQgcHktMiByb3VuZGVkLWxnIGhvdmVyOmJnLWFtYmVyLTUwIHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBNYW5hZ2UgRGV0YWlsZWQgU3RhdHVzIDxFeHRlcm5hbExpbmsgc2l6ZT17MTR9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgIHshaXNBZG1pbiAmJiBvcmRlci5zdGF0dXMgPT09IE9yZGVyU3RhdHVzLkRFTElWRVJFRCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciB0ZXh0LWdyZWVuLTYwMCBmb250LWJvbGQgcHktMiBiZy1ncmVlbi01MCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZ3JlZW4tMTAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUgc2l6ZT17MTh9IC8+IEpvYiBDb21wbGV0ZWRcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogUXVpY2sgQ29udGVudCBQcmV2aWV3ICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmF5LTUwIHB4LTYgcHktMyBib3JkZXItdCBib3JkZXItZ3JheS0xMDBcIj5cbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZ3JheS00MDAgdXBwZXJjYXNlIGZvbnQtYm9sZCB0cmFja2luZy13aWRlc3RcIj5TaGlwbWVudCBDb250ZW50PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZ3JheS00MDAgdXBwZXJjYXNlIGZvbnQtYm9sZCB0cmFja2luZy13aWRlc3RcIj5Ub3RhbCBWYWx1ZTog4oK5e29yZGVyLnRvdGFsQW1vdW50LnRvTG9jYWxlU3RyaW5nKCl9PC9kaXY+XG4gICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXhzIHRleHQtZ3JheS02MDAgZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAge29yZGVyLml0ZW1zLm1hcCgoaSwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgPHNwYW4ga2V5PXtpZHh9IGNsYXNzTmFtZT1cImJnLXdoaXRlIGJvcmRlciBib3JkZXItZ3JheS0yMDAgcHgtMiBweS0wLjUgcm91bmRlZCBzaGFkb3ctc20gdGV4dC1ncmF5LTcwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtYW1iZXItNzAwXCI+e2kucXVhbnRpdHl9eDwvc3Bhbj4ge2kucHJvZHVjdE5hbWV9XG4gICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuXG4gICAgICAgIHtkaXNwbGF5T3JkZXJzLmxlbmd0aCA9PT0gMCAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBweS0yMCBiZy13aGl0ZSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItZGFzaGVkIGJvcmRlci1ncmF5LTIwMFwiPlxuICAgICAgICAgICAgPFBhY2thZ2Ugc2l6ZT17NjR9IGNsYXNzTmFtZT1cIm14LWF1dG8gbWItNCB0ZXh0LWdyYXktMjAwXCIgLz5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDBcIj5ObyBhY3RpdmUgZGVsaXZlcmllcyBmb3VuZDwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwIG1heC13LXhzIG14LWF1dG9cIj5cbiAgICAgICAgICAgICAge2lzQWRtaW4gXG4gICAgICAgICAgICAgICAgPyBcIlRoZXJlIGFyZSBjdXJyZW50bHkgbm8gcGVuZGluZyBvciBwcm9jZXNzaW5nIG9yZGVycyB0aGF0IG5lZWQgZGVsaXZlcnkgYXR0ZW50aW9uLlwiIFxuICAgICAgICAgICAgICAgIDogXCJZb3VyIHJvdXRlIGlzIGNsZWFyISBZb3UgaGF2ZSBubyBhY3RpdmUgYXNzaWdubWVudHMgcmlnaHQgbm93LlwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGVsaXZlcmllcztcbiJdLCJmaWxlIjoiL2FwcC9hcHBsZXQvcGFnZXMvRGVsaXZlcmllcy50c3gifQ==