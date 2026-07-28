import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/pages/Orders.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=76d1f7a8"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/applet/pages/Orders.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=76d1f7a8"; const useState = __vite__cjsImport3_react["useState"];
import { useOutletContext, Link } from "/node_modules/.vite/deps/react-router-dom.js?v=76d1f7a8";
import { OrderStatus, Role } from "/types.ts";
import { formatDate } from "/services/dateFormatter.ts";
import {
  Search,
  Filter,
  Eye
} from "/node_modules/.vite/deps/lucide-react.js?v=76d1f7a8";
const Orders = () => {
  _s();
  const { orders, users, customers, currentUser } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const getUserName = (userId) => {
    if (!userId) return /* @__PURE__ */ jsxDEV("span", { className: "text-gray-400 italic", children: "Unassigned" }, void 0, false, {
      fileName: "/app/applet/pages/Orders.tsx",
      lineNumber: 42,
      columnNumber: 25
    }, this);
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown";
  };
  const getStatusBadge = (status) => {
    const styles = {
      [OrderStatus.PENDING]: "bg-amber-100 text-amber-800 border-amber-200",
      [OrderStatus.PROCESSING]: "bg-blue-100 text-blue-800 border-blue-200",
      [OrderStatus.OUT_FOR_DELIVERY]: "bg-purple-100 text-purple-800 border-purple-200",
      [OrderStatus.DELIVERED]: "bg-green-100 text-green-800 border-green-200",
      [OrderStatus.CANCELLED]: "bg-red-100 text-red-800 border-red-200"
    };
    return /* @__PURE__ */ jsxDEV("span", { className: `px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`, children: status }, void 0, false, {
      fileName: "/app/applet/pages/Orders.tsx",
      lineNumber: 56,
      columnNumber: 7
    }, this);
  };
  const filteredOrders = orders.filter((order) => {
    if (currentUser.role === Role.SALES_EXECUTIVE) {
      if (order.salesExecId !== currentUser.id) return false;
    }
    if (currentUser.role === Role.DELIVERY_PERSON) {
      if (order.deliveryPersonId !== currentUser.id) return false;
    }
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-bold text-gray-900", children: currentUser.role === Role.SALES_EXECUTIVE ? "My Orders" : "All Orders" }, void 0, false, {
        fileName: "/app/applet/pages/Orders.tsx",
        lineNumber: 79,
        columnNumber: 14
      }, this) }, void 0, false, {
        fileName: "/app/applet/pages/Orders.tsx",
        lineNumber: 79,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row gap-3 w-full md:w-auto", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDEV(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 18 }, void 0, false, {
            fileName: "/app/applet/pages/Orders.tsx",
            lineNumber: 82,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              placeholder: "Search...",
              className: "w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 input-responsive",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/pages/Orders.tsx",
              lineNumber: 83,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Orders.tsx",
          lineNumber: 81,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDEV(Filter, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 18 }, void 0, false, {
            fileName: "/app/applet/pages/Orders.tsx",
            lineNumber: 92,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              className: "w-full sm:w-48 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 appearance-none bg-white input-responsive",
              value: statusFilter,
              onChange: (e) => setStatusFilter(e.target.value),
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: "ALL", children: "All Statuses" }, void 0, false, {
                  fileName: "/app/applet/pages/Orders.tsx",
                  lineNumber: 98,
                  columnNumber: 15
                }, this),
                Object.values(OrderStatus).map(
                  (status) => /* @__PURE__ */ jsxDEV("option", { value: status, children: status }, status, false, {
                    fileName: "/app/applet/pages/Orders.tsx",
                    lineNumber: 100,
                    columnNumber: 15
                  }, this)
                )
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/pages/Orders.tsx",
              lineNumber: 93,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Orders.tsx",
          lineNumber: 91,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Orders.tsx",
        lineNumber: 80,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Orders.tsx",
      lineNumber: 78,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left text-sm", children: [
      /* @__PURE__ */ jsxDEV("thead", { className: "bg-gray-50 text-gray-500 border-b border-gray-100", children: /* @__PURE__ */ jsxDEV("tr", { children: [
        /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-4 font-medium", children: "Order ID" }, void 0, false, {
          fileName: "/app/applet/pages/Orders.tsx",
          lineNumber: 111,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-4 font-medium", children: "Date" }, void 0, false, {
          fileName: "/app/applet/pages/Orders.tsx",
          lineNumber: 111,
          columnNumber: 70
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-4 font-medium", children: "Customer" }, void 0, false, {
          fileName: "/app/applet/pages/Orders.tsx",
          lineNumber: 111,
          columnNumber: 117
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-4 font-medium", children: "Amount" }, void 0, false, {
          fileName: "/app/applet/pages/Orders.tsx",
          lineNumber: 111,
          columnNumber: 168
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-4 font-medium text-right", children: "Action" }, void 0, false, {
          fileName: "/app/applet/pages/Orders.tsx",
          lineNumber: 111,
          columnNumber: 217
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Orders.tsx",
        lineNumber: 111,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/pages/Orders.tsx",
        lineNumber: 110,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-gray-100", children: filteredOrders.map(
        (order) => /* @__PURE__ */ jsxDEV("tr", { className: "hover:bg-gray-50 transition", children: [
          /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 font-medium text-amber-700", children: [
            "#",
            order.id
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Orders.tsx",
            lineNumber: 115,
            columnNumber: 74
          }, this),
          /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 text-gray-600", children: formatDate(order.date) }, void 0, false, {
            fileName: "/app/applet/pages/Orders.tsx",
            lineNumber: 115,
            columnNumber: 143
          }, this),
          /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4", children: order.customerName }, void 0, false, {
            fileName: "/app/applet/pages/Orders.tsx",
            lineNumber: 115,
            columnNumber: 212
          }, this),
          /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 font-bold", children: [
            "₹",
            order.totalAmount.toFixed(2)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Orders.tsx",
            lineNumber: 115,
            columnNumber: 263
          }, this),
          /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxDEV(Link, { to: `/orders/${order.id}`, className: "inline-flex items-center p-2 bg-gray-100 rounded-lg", children: /* @__PURE__ */ jsxDEV(Eye, { size: 18 }, void 0, false, {
            fileName: "/app/applet/pages/Orders.tsx",
            lineNumber: 115,
            columnNumber: 469
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Orders.tsx",
            lineNumber: 115,
            columnNumber: 372
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Orders.tsx",
            lineNumber: 115,
            columnNumber: 335
          }, this)
        ] }, order.id, true, {
          fileName: "/app/applet/pages/Orders.tsx",
          lineNumber: 115,
          columnNumber: 15
        }, this)
      ) }, void 0, false, {
        fileName: "/app/applet/pages/Orders.tsx",
        lineNumber: 113,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Orders.tsx",
      lineNumber: 109,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/pages/Orders.tsx",
      lineNumber: 108,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/pages/Orders.tsx",
      lineNumber: 107,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/pages/Orders.tsx",
    lineNumber: 77,
    columnNumber: 5
  }, this);
};
_s(Orders, "M7Q5rRRuttxPuIdTdDqCjP4lcl8=", false, function() {
  return [useOutletContext];
});
_c = Orders;
export default Orders;
var _c;
$RefreshReg$(_c, "Orders");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/applet/pages/Orders.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/applet/pages/Orders.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBc0J3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFyQnhCLFNBQWdCQSxnQkFBZ0I7QUFDaEMsU0FBU0Msa0JBQWtCQyxZQUFZO0FBQ3ZDLFNBQXlCQyxhQUE0QkMsWUFBWTtBQUNqRSxTQUFTQyxrQkFBa0I7QUFDM0I7QUFBQSxFQUNFQztBQUFBQSxFQUNBQztBQUFBQSxFQUNBQztBQUFBQSxPQU1LO0FBRVAsTUFBTUMsU0FBbUJBLE1BQU07QUFBQUMsS0FBQTtBQUM3QixRQUFNLEVBQUVDLFFBQVFDLE9BQU9DLFdBQVdDLFlBQVksSUFBSWIsaUJBQWlDO0FBQ25GLFFBQU0sQ0FBQ2MsWUFBWUMsYUFBYSxJQUFJaEIsU0FBUyxFQUFFO0FBQy9DLFFBQU0sQ0FBQ2lCLGNBQWNDLGVBQWUsSUFBSWxCLFNBQWlCLEtBQUs7QUFFOUQsUUFBTW1CLGNBQWNBLENBQUNDLFdBQW9CO0FBQ3ZDLFFBQUksQ0FBQ0EsT0FBUSxRQUFPLHVCQUFDLFVBQUssV0FBVSx3QkFBdUIsMEJBQXZDO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBaUQ7QUFDckUsVUFBTUMsT0FBT1QsTUFBTVUsS0FBSyxDQUFBQyxNQUFLQSxFQUFFQyxPQUFPSixNQUFNO0FBQzVDLFdBQU9DLE9BQU9BLEtBQUtJLE9BQU87QUFBQSxFQUM1QjtBQUVBLFFBQU1DLGlCQUFpQkEsQ0FBQ0MsV0FBd0I7QUFDOUMsVUFBTUMsU0FBUztBQUFBLE1BQ2IsQ0FBQ3pCLFlBQVkwQixPQUFPLEdBQUc7QUFBQSxNQUN2QixDQUFDMUIsWUFBWTJCLFVBQVUsR0FBRztBQUFBLE1BQzFCLENBQUMzQixZQUFZNEIsZ0JBQWdCLEdBQUc7QUFBQSxNQUNoQyxDQUFDNUIsWUFBWTZCLFNBQVMsR0FBRztBQUFBLE1BQ3pCLENBQUM3QixZQUFZOEIsU0FBUyxHQUFHO0FBQUEsSUFDM0I7QUFDQSxXQUNFLHVCQUFDLFVBQUssV0FBVyx5REFBeURMLE9BQU9ELE1BQU0sQ0FBQyxJQUNyRkEsb0JBREg7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUVBO0FBQUEsRUFFSjtBQUVBLFFBQU1PLGlCQUFpQnZCLE9BQU93QixPQUFPLENBQUFDLFVBQVM7QUFDNUMsUUFBSXRCLFlBQVl1QixTQUFTakMsS0FBS2tDLGlCQUFpQjtBQUM3QyxVQUFJRixNQUFNRyxnQkFBZ0J6QixZQUFZVSxHQUFJLFFBQU87QUFBQSxJQUNuRDtBQUNBLFFBQUlWLFlBQVl1QixTQUFTakMsS0FBS29DLGlCQUFpQjtBQUM3QyxVQUFJSixNQUFNSyxxQkFBcUIzQixZQUFZVSxHQUFJLFFBQU87QUFBQSxJQUN4RDtBQUNBLFVBQU1rQixnQkFDSk4sTUFBTVosR0FBR21CLFlBQVksRUFBRUMsU0FBUzdCLFdBQVc0QixZQUFZLENBQUMsS0FDeERQLE1BQU1TLGFBQWFGLFlBQVksRUFBRUMsU0FBUzdCLFdBQVc0QixZQUFZLENBQUM7QUFDcEUsVUFBTUcsZ0JBQWdCN0IsaUJBQWlCLFNBQVNtQixNQUFNVCxXQUFXVjtBQUNqRSxXQUFPeUIsaUJBQWlCSTtBQUFBQSxFQUMxQixDQUFDLEVBQUVDLEtBQUssQ0FBQ0MsR0FBR0MsTUFBTSxJQUFJQyxLQUFLRCxFQUFFRSxJQUFJLEVBQUVDLFFBQVEsSUFBSSxJQUFJRixLQUFLRixFQUFFRyxJQUFJLEVBQUVDLFFBQVEsQ0FBQztBQUV6RSxTQUNFLHVCQUFDLFNBQUksV0FBVSw2QkFDYjtBQUFBLDJCQUFDLFNBQUksV0FBVSwrRUFDYjtBQUFBLDZCQUFDLFNBQUksaUNBQUMsUUFBRyxXQUFVLG9DQUFvQ3RDLHNCQUFZdUIsU0FBU2pDLEtBQUtrQyxrQkFBa0IsY0FBYyxnQkFBNUc7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUF5SCxLQUE5SDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQW1JO0FBQUEsTUFDbkksdUJBQUMsU0FBSSxXQUFVLG9EQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLFlBQ2I7QUFBQSxpQ0FBQyxVQUFPLFdBQVUsb0VBQW1FLE1BQU0sTUFBM0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBOEY7QUFBQSxVQUM5RjtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsTUFBSztBQUFBLGNBQ0wsYUFBWTtBQUFBLGNBQ1osV0FBVTtBQUFBLGNBQ1YsT0FBT3ZCO0FBQUFBLGNBQ1AsVUFBVSxDQUFDc0MsTUFBTXJDLGNBQWNxQyxFQUFFQyxPQUFPQyxLQUFLO0FBQUE7QUFBQSxZQUwvQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFLaUQ7QUFBQSxhQVBuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBU0E7QUFBQSxRQUNBLHVCQUFDLFNBQUksV0FBVSxZQUNiO0FBQUEsaUNBQUMsVUFBTyxXQUFVLG9FQUFtRSxNQUFNLE1BQTNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQThGO0FBQUEsVUFDOUY7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFdBQVU7QUFBQSxjQUNWLE9BQU90QztBQUFBQSxjQUNQLFVBQVUsQ0FBQ29DLE1BQU1uQyxnQkFBZ0JtQyxFQUFFQyxPQUFPQyxLQUFLO0FBQUEsY0FFL0M7QUFBQSx1Q0FBQyxZQUFPLE9BQU0sT0FBTSw0QkFBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBZ0M7QUFBQSxnQkFDL0JDLE9BQU9DLE9BQU90RCxXQUFXLEVBQUV1RDtBQUFBQSxrQkFBSSxDQUFBL0IsV0FDOUIsdUJBQUMsWUFBb0IsT0FBT0EsUUFBU0Esb0JBQXhCQSxRQUFiO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQTRDO0FBQUEsZ0JBQzdDO0FBQUE7QUFBQTtBQUFBLFlBUkg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBU0E7QUFBQSxhQVhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFZQTtBQUFBLFdBdkJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUF3QkE7QUFBQSxTQTFCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBMkJBO0FBQUEsSUFFQSx1QkFBQyxTQUFJLFdBQVUsd0VBQ2IsaUNBQUMsU0FBSSxXQUFVLG1CQUNiLGlDQUFDLFdBQU0sV0FBVSw0QkFDZjtBQUFBLDZCQUFDLFdBQU0sV0FBVSxxREFDZixpQ0FBQyxRQUFHO0FBQUEsK0JBQUMsUUFBRyxXQUFVLHlCQUF3Qix3QkFBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUE4QztBQUFBLFFBQUssdUJBQUMsUUFBRyxXQUFVLHlCQUF3QixvQkFBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUEwQztBQUFBLFFBQUssdUJBQUMsUUFBRyxXQUFVLHlCQUF3Qix3QkFBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUE4QztBQUFBLFFBQUssdUJBQUMsUUFBRyxXQUFVLHlCQUF3QixzQkFBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUE0QztBQUFBLFFBQUssdUJBQUMsUUFBRyxXQUFVLG9DQUFtQyxzQkFBakQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUF1RDtBQUFBLFdBQWpRO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBc1EsS0FEeFE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVBO0FBQUEsTUFDQSx1QkFBQyxXQUFNLFdBQVUsNEJBQ2RPLHlCQUFld0I7QUFBQUEsUUFBSSxDQUFDdEIsVUFDbkIsdUJBQUMsUUFBa0IsV0FBVSwrQkFBOEI7QUFBQSxpQ0FBQyxRQUFHLFdBQVUsd0NBQXVDO0FBQUE7QUFBQSxZQUFFQSxNQUFNWjtBQUFBQSxlQUE3RDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFnRTtBQUFBLFVBQUssdUJBQUMsUUFBRyxXQUFVLDJCQUEyQm5CLHFCQUFXK0IsTUFBTWUsSUFBSSxLQUE5RDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFnRTtBQUFBLFVBQUssdUJBQUMsUUFBRyxXQUFVLGFBQWFmLGdCQUFNUyxnQkFBakM7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBOEM7QUFBQSxVQUFLLHVCQUFDLFFBQUcsV0FBVSx1QkFBc0I7QUFBQTtBQUFBLFlBQUVULE1BQU11QixZQUFZQyxRQUFRLENBQUM7QUFBQSxlQUFqRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFtRTtBQUFBLFVBQUssdUJBQUMsUUFBRyxXQUFVLHdCQUF1QixpQ0FBQyxRQUFLLElBQUksV0FBV3hCLE1BQU1aLEVBQUUsSUFBSSxXQUFVLHVEQUFzRCxpQ0FBQyxPQUFJLE1BQU0sTUFBWDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFjLEtBQS9HO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQWtILEtBQXZKO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQThKO0FBQUEsYUFBcmRZLE1BQU1aLElBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFtZTtBQUFBLE1BQ3BlLEtBSEg7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUlBO0FBQUEsU0FSRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBU0EsS0FWRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBV0EsS0FaRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBYUE7QUFBQSxPQTNDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBNENBO0FBRUo7QUFBRWQsR0F2RklELFFBQWdCO0FBQUEsVUFDOEJSLGdCQUFnQjtBQUFBO0FBQUEsS0FEOURRO0FBeUZOLGVBQWVBO0FBQU8sSUFBQW9EO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlT3V0bGV0Q29udGV4dCIsIkxpbmsiLCJPcmRlclN0YXR1cyIsIlJvbGUiLCJmb3JtYXREYXRlIiwiU2VhcmNoIiwiRmlsdGVyIiwiRXllIiwiT3JkZXJzIiwiX3MiLCJvcmRlcnMiLCJ1c2VycyIsImN1c3RvbWVycyIsImN1cnJlbnRVc2VyIiwic2VhcmNoVGVybSIsInNldFNlYXJjaFRlcm0iLCJzdGF0dXNGaWx0ZXIiLCJzZXRTdGF0dXNGaWx0ZXIiLCJnZXRVc2VyTmFtZSIsInVzZXJJZCIsInVzZXIiLCJmaW5kIiwidSIsImlkIiwibmFtZSIsImdldFN0YXR1c0JhZGdlIiwic3RhdHVzIiwic3R5bGVzIiwiUEVORElORyIsIlBST0NFU1NJTkciLCJPVVRfRk9SX0RFTElWRVJZIiwiREVMSVZFUkVEIiwiQ0FOQ0VMTEVEIiwiZmlsdGVyZWRPcmRlcnMiLCJmaWx0ZXIiLCJvcmRlciIsInJvbGUiLCJTQUxFU19FWEVDVVRJVkUiLCJzYWxlc0V4ZWNJZCIsIkRFTElWRVJZX1BFUlNPTiIsImRlbGl2ZXJ5UGVyc29uSWQiLCJtYXRjaGVzU2VhcmNoIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsImN1c3RvbWVyTmFtZSIsIm1hdGNoZXNTdGF0dXMiLCJzb3J0IiwiYSIsImIiLCJEYXRlIiwiZGF0ZSIsImdldFRpbWUiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJPYmplY3QiLCJ2YWx1ZXMiLCJtYXAiLCJ0b3RhbEFtb3VudCIsInRvRml4ZWQiLCJfYyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJPcmRlcnMudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlT3V0bGV0Q29udGV4dCwgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHsgQXBwQ29udGV4dFR5cGUsIE9yZGVyU3RhdHVzLCBQYXltZW50U3RhdHVzLCBSb2xlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZm9ybWF0RGF0ZSB9IGZyb20gJy4uL3NlcnZpY2VzL2RhdGVGb3JtYXR0ZXInO1xuaW1wb3J0IHsgXG4gIFNlYXJjaCwgXG4gIEZpbHRlciwgXG4gIEV5ZSwgXG4gIENhbGVuZGFyLCBcbiAgVXNlciwgXG4gIENyZWRpdENhcmQsXG4gIFRydWNrLFxuICBCcmllZmNhc2Vcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuY29uc3QgT3JkZXJzOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgeyBvcmRlcnMsIHVzZXJzLCBjdXN0b21lcnMsIGN1cnJlbnRVc2VyIH0gPSB1c2VPdXRsZXRDb250ZXh0PEFwcENvbnRleHRUeXBlPigpO1xuICBjb25zdCBbc2VhcmNoVGVybSwgc2V0U2VhcmNoVGVybV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtzdGF0dXNGaWx0ZXIsIHNldFN0YXR1c0ZpbHRlcl0gPSB1c2VTdGF0ZTxzdHJpbmc+KCdBTEwnKTtcblxuICBjb25zdCBnZXRVc2VyTmFtZSA9ICh1c2VySWQ/OiBzdHJpbmcpID0+IHtcbiAgICBpZiAoIXVzZXJJZCkgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgaXRhbGljXCI+VW5hc3NpZ25lZDwvc3Bhbj47XG4gICAgY29uc3QgdXNlciA9IHVzZXJzLmZpbmQodSA9PiB1LmlkID09PSB1c2VySWQpO1xuICAgIHJldHVybiB1c2VyID8gdXNlci5uYW1lIDogJ1Vua25vd24nO1xuICB9O1xuXG4gIGNvbnN0IGdldFN0YXR1c0JhZGdlID0gKHN0YXR1czogT3JkZXJTdGF0dXMpID0+IHtcbiAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICBbT3JkZXJTdGF0dXMuUEVORElOR106ICdiZy1hbWJlci0xMDAgdGV4dC1hbWJlci04MDAgYm9yZGVyLWFtYmVyLTIwMCcsXG4gICAgICBbT3JkZXJTdGF0dXMuUFJPQ0VTU0lOR106ICdiZy1ibHVlLTEwMCB0ZXh0LWJsdWUtODAwIGJvcmRlci1ibHVlLTIwMCcsXG4gICAgICBbT3JkZXJTdGF0dXMuT1VUX0ZPUl9ERUxJVkVSWV06ICdiZy1wdXJwbGUtMTAwIHRleHQtcHVycGxlLTgwMCBib3JkZXItcHVycGxlLTIwMCcsXG4gICAgICBbT3JkZXJTdGF0dXMuREVMSVZFUkVEXTogJ2JnLWdyZWVuLTEwMCB0ZXh0LWdyZWVuLTgwMCBib3JkZXItZ3JlZW4tMjAwJyxcbiAgICAgIFtPcmRlclN0YXR1cy5DQU5DRUxMRURdOiAnYmctcmVkLTEwMCB0ZXh0LXJlZC04MDAgYm9yZGVyLXJlZC0yMDAnLFxuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1tZWRpdW0gYm9yZGVyICR7c3R5bGVzW3N0YXR1c119YH0+XG4gICAgICAgIHtzdGF0dXN9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBmaWx0ZXJlZE9yZGVycyA9IG9yZGVycy5maWx0ZXIob3JkZXIgPT4ge1xuICAgIGlmIChjdXJyZW50VXNlci5yb2xlID09PSBSb2xlLlNBTEVTX0VYRUNVVElWRSkge1xuICAgICAgaWYgKG9yZGVyLnNhbGVzRXhlY0lkICE9PSBjdXJyZW50VXNlci5pZCkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoY3VycmVudFVzZXIucm9sZSA9PT0gUm9sZS5ERUxJVkVSWV9QRVJTT04pIHtcbiAgICAgIGlmIChvcmRlci5kZWxpdmVyeVBlcnNvbklkICE9PSBjdXJyZW50VXNlci5pZCkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBtYXRjaGVzU2VhcmNoID0gXG4gICAgICBvcmRlci5pZC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSkgfHxcbiAgICAgIG9yZGVyLmN1c3RvbWVyTmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSk7XG4gICAgY29uc3QgbWF0Y2hlc1N0YXR1cyA9IHN0YXR1c0ZpbHRlciA9PT0gJ0FMTCcgfHwgb3JkZXIuc3RhdHVzID09PSBzdGF0dXNGaWx0ZXI7XG4gICAgcmV0dXJuIG1hdGNoZXNTZWFyY2ggJiYgbWF0Y2hlc1N0YXR1cztcbiAgfSkuc29ydCgoYSwgYikgPT4gbmV3IERhdGUoYi5kYXRlKS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShhLmRhdGUpLmdldFRpbWUoKSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNiBhbmltYXRlLWZhZGUtaW5cIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGdhcC00XCI+XG4gICAgICAgIDxkaXY+PGgxIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCI+e2N1cnJlbnRVc2VyLnJvbGUgPT09IFJvbGUuU0FMRVNfRVhFQ1VUSVZFID8gJ015IE9yZGVycycgOiAnQWxsIE9yZGVycyd9PC9oMT48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGdhcC0zIHctZnVsbCBtZDp3LWF1dG9cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICA8U2VhcmNoIGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMyB0b3AtMS8yIHRyYW5zZm9ybSAtdHJhbnNsYXRlLXktMS8yIHRleHQtZ3JheS00MDBcIiBzaXplPXsxOH0gLz5cbiAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2guLi5cIiBcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHNtOnctNjQgcGwtMTAgcHItNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0yMDAgcm91bmRlZC1sZyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGlucHV0LXJlc3BvbnNpdmVcIlxuICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNoVGVybX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWFyY2hUZXJtKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgPEZpbHRlciBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTMgdG9wLTEvMiB0cmFuc2Zvcm0gLXRyYW5zbGF0ZS15LTEvMiB0ZXh0LWdyYXktNDAwXCIgc2l6ZT17MTh9IC8+XG4gICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBzbTp3LTQ4IHBsLTEwIHByLTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMjAwIHJvdW5kZWQtbGcgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBhcHBlYXJhbmNlLW5vbmUgYmctd2hpdGUgaW5wdXQtcmVzcG9uc2l2ZVwiXG4gICAgICAgICAgICAgIHZhbHVlPXtzdGF0dXNGaWx0ZXJ9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U3RhdHVzRmlsdGVyKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkFMTFwiPkFsbCBTdGF0dXNlczwvb3B0aW9uPlxuICAgICAgICAgICAgICB7T2JqZWN0LnZhbHVlcyhPcmRlclN0YXR1cykubWFwKHN0YXR1cyA9PiAoXG4gICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e3N0YXR1c30gdmFsdWU9e3N0YXR1c30+e3N0YXR1c308L29wdGlvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLXhsIHNoYWRvdy1zbSBib3JkZXIgYm9yZGVyLWdyYXktMTAwIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJmbG93LXgtYXV0b1wiPlxuICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC1sZWZ0IHRleHQtc21cIj5cbiAgICAgICAgICAgIDx0aGVhZCBjbGFzc05hbWU9XCJiZy1ncmF5LTUwIHRleHQtZ3JheS01MDAgYm9yZGVyLWIgYm9yZGVyLWdyYXktMTAwXCI+XG4gICAgICAgICAgICAgIDx0cj48dGggY2xhc3NOYW1lPVwicHgtNiBweS00IGZvbnQtbWVkaXVtXCI+T3JkZXIgSUQ8L3RoPjx0aCBjbGFzc05hbWU9XCJweC02IHB5LTQgZm9udC1tZWRpdW1cIj5EYXRlPC90aD48dGggY2xhc3NOYW1lPVwicHgtNiBweS00IGZvbnQtbWVkaXVtXCI+Q3VzdG9tZXI8L3RoPjx0aCBjbGFzc05hbWU9XCJweC02IHB5LTQgZm9udC1tZWRpdW1cIj5BbW91bnQ8L3RoPjx0aCBjbGFzc05hbWU9XCJweC02IHB5LTQgZm9udC1tZWRpdW0gdGV4dC1yaWdodFwiPkFjdGlvbjwvdGg+PC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHkgY2xhc3NOYW1lPVwiZGl2aWRlLXkgZGl2aWRlLWdyYXktMTAwXCI+XG4gICAgICAgICAgICAgIHtmaWx0ZXJlZE9yZGVycy5tYXAoKG9yZGVyKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17b3JkZXIuaWR9IGNsYXNzTmFtZT1cImhvdmVyOmJnLWdyYXktNTAgdHJhbnNpdGlvblwiPjx0ZCBjbGFzc05hbWU9XCJweC02IHB5LTQgZm9udC1tZWRpdW0gdGV4dC1hbWJlci03MDBcIj4je29yZGVyLmlkfTwvdGQ+PHRkIGNsYXNzTmFtZT1cInB4LTYgcHktNCB0ZXh0LWdyYXktNjAwXCI+e2Zvcm1hdERhdGUob3JkZXIuZGF0ZSl9PC90ZD48dGQgY2xhc3NOYW1lPVwicHgtNiBweS00XCI+e29yZGVyLmN1c3RvbWVyTmFtZX08L3RkPjx0ZCBjbGFzc05hbWU9XCJweC02IHB5LTQgZm9udC1ib2xkXCI+4oK5e29yZGVyLnRvdGFsQW1vdW50LnRvRml4ZWQoMil9PC90ZD48dGQgY2xhc3NOYW1lPVwicHgtNiBweS00IHRleHQtcmlnaHRcIj48TGluayB0bz17YC9vcmRlcnMvJHtvcmRlci5pZH1gfSBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgcC0yIGJnLWdyYXktMTAwIHJvdW5kZWQtbGdcIj48RXllIHNpemU9ezE4fSAvPjwvTGluaz48L3RkPjwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgT3JkZXJzO1xuIl0sImZpbGUiOiIvYXBwL2FwcGxldC9wYWdlcy9PcmRlcnMudHN4In0=