import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/pages/OrderDetails.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=76d1f7a8"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/applet/pages/OrderDetails.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=76d1f7a8"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react;
import { useParams, useOutletContext, Link, useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=76d1f7a8";
import { OrderStatus, Role } from "/types.ts";
import { generateInvoicePDF } from "/services/pdfService.ts";
import { sendWhatsAppSessionMessage } from "/services/whatsappService.ts";
import { formatDate } from "/services/dateFormatter.ts";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  Package,
  Truck,
  CheckCircle,
  CreditCard,
  FileText,
  ShieldAlert,
  Download,
  MessageSquare,
  ExternalLink
} from "/node_modules/.vite/deps/lucide-react.js?v=76d1f7a8";
const OrderDetails = () => {
  _s();
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, customers, products, updateOrderStatus, assignDriver, users, currentUser } = useOutletContext();
  const order = orders.find((o) => o.id === id);
  const customer = customers.find((c) => c.id === order?.customerId);
  const deliveryStaff = users.filter((u) => u.role === Role.DELIVERY_PERSON);
  const getDriverName = (driverId) => {
    return users.find((u) => u.id === driverId)?.name || "Unknown Driver";
  };
  if (!order) {
    return /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center justify-center h-96 text-gray-500", children: [
      /* @__PURE__ */ jsxDEV("p", { className: "text-xl font-semibold mb-4", children: "Order not found" }, void 0, false, {
        fileName: "/app/applet/pages/OrderDetails.tsx",
        lineNumber: 64,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("button", { onClick: () => navigate(-1), className: "text-amber-600 hover:underline", children: "Go Back" }, void 0, false, {
        fileName: "/app/applet/pages/OrderDetails.tsx",
        lineNumber: 65,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/OrderDetails.tsx",
      lineNumber: 63,
      columnNumber: 7
    }, this);
  }
  if (currentUser.role === Role.SALES_EXECUTIVE && order.salesExecId !== currentUser.id) {
    return /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center justify-center h-[calc(100vh-100px)] text-gray-500", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-red-50 p-6 rounded-full mb-4", children: /* @__PURE__ */ jsxDEV(ShieldAlert, { size: 48, className: "text-red-500" }, void 0, false, {
        fileName: "/app/applet/pages/OrderDetails.tsx",
        lineNumber: 77,
        columnNumber: 12
      }, this) }, void 0, false, {
        fileName: "/app/applet/pages/OrderDetails.tsx",
        lineNumber: 76,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Access Denied" }, void 0, false, {
        fileName: "/app/applet/pages/OrderDetails.tsx",
        lineNumber: 79,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600 mb-6 text-center max-w-md", children: "You do not have permission to view this order details as it was created by another Sales Executive." }, void 0, false, {
        fileName: "/app/applet/pages/OrderDetails.tsx",
        lineNumber: 80,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => navigate("/orders"),
          className: "bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition",
          children: "Back to My Orders"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/pages/OrderDetails.tsx",
          lineNumber: 83,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/pages/OrderDetails.tsx",
      lineNumber: 75,
      columnNumber: 7
    }, this);
  }
  const getStatusColor = (status) => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return "bg-green-100 text-green-800 border-green-200";
      case OrderStatus.OUT_FOR_DELIVERY:
        return "bg-blue-100 text-blue-800 border-blue-200";
      case OrderStatus.CANCELLED:
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };
  const getProductImage = (productId) => {
    return products.find((p) => p.id === productId)?.image || "https://via.placeholder.com/50";
  };
  const handleDownloadInvoice = () => {
    generateInvoicePDF(order, customer);
  };
  const [isSendingWa, setIsSendingWa] = React.useState(false);
  const [waStatus, setWaStatus] = React.useState(null);
  const handleSendWhatsAppSession = async () => {
    if (!customer?.phone) {
      alert("No phone number found for this customer.");
      return;
    }
    setIsSendingWa(true);
    setWaStatus(null);
    try {
      const itemsList = order.items.map((item) => `${item.quantity}x ${item.productName}`).join(", ");
      const message = `Hi ${customer.ownerName || customer.businessName},

Here are your order details for Order *#${order.id}* from *Svashicalis*:
Items: ${itemsList}
Total: *₹${order.totalAmount.toFixed(2)}*
Payment: *${order.paymentStatus}*
Status: *${order.status}*

Thank you for choosing Svashicalis! 🍫`;
      const res = await sendWhatsAppSessionMessage({
        phoneNumber: customer.phone,
        type: "text",
        text: message
      });
      if (res.success) {
        setWaStatus("✅ Message sent successfully!");
      } else {
        setWaStatus(`❌ Error: ${res.message}`);
      }
    } catch (e) {
      setWaStatus(`❌ Network error: ${e.message}`);
    } finally {
      setIsSendingWa(false);
      setTimeout(() => setWaStatus(null), 5e3);
    }
  };
  const getWaWebLink = () => {
    if (!customer?.phone) return "#";
    const itemsList = order.items.map((item) => `${item.quantity}x ${item.productName}`).join(", ");
    const message = `Hi ${customer.ownerName || customer.businessName},

Here are your order details for Order *#${order.id}* from *Svashicalis*:
Items: ${itemsList}
Total: *₹${order.totalAmount.toFixed(2)}*
Payment: *${order.paymentStatus}*
Status: *${order.status}*

Thank you for choosing Svashicalis! 🍫`;
    const cleanedPhone = customer.phone.replace(/\D/g, "");
    const fullPhone = cleanedPhone.length === 10 ? `91${cleanedPhone}` : cleanedPhone;
    return `https://api.whatsapp.com/send?phone=${fullPhone}&text=${encodeURIComponent(message)}`;
  };
  const canUpdateStatus = currentUser.role === Role.ADMIN || currentUser.role === Role.DELIVERY_PERSON || currentUser.role === Role.SALES_EXECUTIVE;
  const canAssignDriver = currentUser.role === Role.ADMIN || currentUser.role === Role.SALES_EXECUTIVE;
  return /* @__PURE__ */ jsxDEV("div", { className: "max-w-5xl mx-auto space-y-6 animate-fade-in pb-10", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxDEV(Link, { to: "..", onClick: (e) => {
          e.preventDefault();
          navigate(-1);
        }, className: "p-2 hover:bg-gray-200 rounded-full transition", children: /* @__PURE__ */ jsxDEV(ArrowLeft, { size: 24, className: "text-gray-600" }, void 0, false, {
          fileName: "/app/applet/pages/OrderDetails.tsx",
          lineNumber: 172,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/pages/OrderDetails.tsx",
          lineNumber: 171,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-bold text-gray-900 flex items-center gap-3", children: [
            "Order #",
            order.id,
            /* @__PURE__ */ jsxDEV("span", { className: `px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`, children: order.status }, void 0, false, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 177,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderDetails.tsx",
            lineNumber: 175,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-gray-500 text-sm flex items-center mt-1", children: [
            /* @__PURE__ */ jsxDEV(Calendar, { size: 14, className: "mr-1" }, void 0, false, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 182,
              columnNumber: 15
            }, this),
            "Placed on ",
            formatDate(order.date)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderDetails.tsx",
            lineNumber: 181,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/OrderDetails.tsx",
          lineNumber: 174,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/OrderDetails.tsx",
        lineNumber: 170,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-end sm:items-center gap-3", children: [
        waStatus && /* @__PURE__ */ jsxDEV("div", { className: `text-xs font-semibold px-3 py-1.5 rounded-lg border ${waStatus.startsWith("✅") ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`, children: waStatus }, void 0, false, {
          fileName: "/app/applet/pages/OrderDetails.tsx",
          lineNumber: 189,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleSendWhatsAppSession,
              disabled: isSendingWa,
              className: `flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-semibold text-sm shadow-sm transition ${isSendingWa ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`,
              title: "Send automated message via Fast2SMS WhatsApp API",
              children: [
                /* @__PURE__ */ jsxDEV(MessageSquare, { size: 16 }, void 0, false, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 201,
                  columnNumber: 16
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isSendingWa ? "Sending..." : "Send via WhatsApp API" }, void 0, false, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 202,
                  columnNumber: 16
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 195,
              columnNumber: 14
            },
            this
          ),
          customer?.phone && /* @__PURE__ */ jsxDEV(
            "a",
            {
              href: getWaWebLink(),
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center space-x-2 px-4 py-2 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-sm font-semibold transition",
              title: "Open in WhatsApp Web / App directly",
              children: [
                /* @__PURE__ */ jsxDEV(ExternalLink, { size: 14 }, void 0, false, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 214,
                  columnNumber: 18
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "WhatsApp Web" }, void 0, false, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 215,
                  columnNumber: 18
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 207,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/pages/OrderDetails.tsx",
          lineNumber: 193,
          columnNumber: 12
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleDownloadInvoice,
            className: "flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-semibold transition shadow-sm",
            children: [
              /* @__PURE__ */ jsxDEV(Download, { size: 18 }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 224,
                columnNumber: 14
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Invoice" }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 225,
                columnNumber: 14
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/pages/OrderDetails.tsx",
            lineNumber: 220,
            columnNumber: 12
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/pages/OrderDetails.tsx",
        lineNumber: 187,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/OrderDetails.tsx",
      lineNumber: 169,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "font-bold text-gray-900 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(Package, { size: 20, className: "text-amber-600" }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 236,
                columnNumber: 17
              }, this),
              "Order Items"
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 235,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-sm text-gray-500", children: [
              order.items.length,
              " Items"
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 239,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderDetails.tsx",
            lineNumber: 234,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "divide-y divide-gray-100", children: order.items.map(
            (item, index) => /* @__PURE__ */ jsxDEV("div", { className: "p-4 flex items-center space-x-4", children: [
              /* @__PURE__ */ jsxDEV(
                "img",
                {
                  src: getProductImage(item.productId),
                  alt: item.productName,
                  className: "w-16 h-16 object-cover rounded-lg border border-gray-100"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 244,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: item.productName }, void 0, false, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 250,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-500", children: [
                  "Unit Price: ₹",
                  item.priceAtTime.toFixed(2)
                ] }, void 0, true, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 251,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 249,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "font-bold text-gray-900", children: [
                  "₹",
                  (item.priceAtTime * item.quantity).toFixed(2)
                ] }, void 0, true, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 254,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-500", children: [
                  "Qty: ",
                  item.quantity
                ] }, void 0, true, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 255,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 253,
                columnNumber: 19
              }, this)
            ] }, index, true, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 243,
              columnNumber: 15
            }, this)
          ) }, void 0, false, {
            fileName: "/app/applet/pages/OrderDetails.tsx",
            lineNumber: 241,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 p-6 border-t border-gray-100", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-gray-600", children: "Subtotal" }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 262,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: [
                "₹",
                order.totalAmount.toFixed(2)
              ] }, void 0, true, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 263,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 261,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-gray-600", children: "Tax (0%)" }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 266,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: "₹0.00" }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 267,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 265,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center pt-4 border-t border-gray-200", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-lg font-bold text-gray-900", children: "Total" }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 270,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-2xl font-bold text-amber-600", children: [
                "₹",
                order.totalAmount.toFixed(2)
              ] }, void 0, true, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 271,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 269,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderDetails.tsx",
            lineNumber: 260,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/OrderDetails.tsx",
          lineNumber: 233,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-6", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-gray-900 mb-4", children: "Additional Information" }, void 0, false, {
            fileName: "/app/applet/pages/OrderDetails.tsx",
            lineNumber: 278,
            columnNumber: 14
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs uppercase text-gray-500 font-semibold flex items-center gap-1", children: [
                /* @__PURE__ */ jsxDEV(FileText, { size: 14 }, void 0, false, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 282,
                  columnNumber: 21
                }, this),
                " Order Notes"
              ] }, void 0, true, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 281,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm", children: order.notes || "No notes provided." }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 284,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 280,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs uppercase text-gray-500 font-semibold flex items-center gap-1", children: [
                /* @__PURE__ */ jsxDEV(CreditCard, { size: 14 }, void 0, false, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 290,
                  columnNumber: 22
                }, this),
                " Payment Status"
              ] }, void 0, true, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 289,
                columnNumber: 20
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsxDEV("span", { className: `px-3 py-1.5 rounded-lg text-sm font-bold ${order.paymentStatus === "Paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`, children: order.paymentStatus || "Pending" }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 293,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 292,
                columnNumber: 20
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 288,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderDetails.tsx",
            lineNumber: 279,
            columnNumber: 14
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/OrderDetails.tsx",
          lineNumber: 277,
          columnNumber: 11
        }, this),
        canUpdateStatus && order.status !== OrderStatus.DELIVERED && order.status !== OrderStatus.CANCELLED && /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-6", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-gray-900 mb-4", children: "Update Status" }, void 0, false, {
            fileName: "/app/applet/pages/OrderDetails.tsx",
            lineNumber: 306,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-3", children: [
            order.status === OrderStatus.PENDING && /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => updateOrderStatus(order.id, OrderStatus.PROCESSING),
                  className: "px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition",
                  children: "Mark as Processing"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 310,
                  columnNumber: 22
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => updateOrderStatus(order.id, OrderStatus.OUT_FOR_DELIVERY),
                  className: "px-4 py-2 bg-amber-50 text-amber-700 rounded-lg font-medium hover:bg-amber-100 transition",
                  children: "Dispatch for Delivery"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 316,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 309,
              columnNumber: 15
            }, this),
            order.status === OrderStatus.PROCESSING && /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => updateOrderStatus(order.id, OrderStatus.OUT_FOR_DELIVERY),
                className: "px-4 py-2 bg-amber-50 text-amber-700 rounded-lg font-medium hover:bg-amber-100 transition",
                children: "Dispatch for Delivery"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 325,
                columnNumber: 15
              },
              this
            ),
            order.status === OrderStatus.OUT_FOR_DELIVERY && /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => updateOrderStatus(order.id, OrderStatus.DELIVERED),
                className: "px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsxDEV(CheckCircle, { size: 16 }, void 0, false, {
                    fileName: "/app/applet/pages/OrderDetails.tsx",
                    lineNumber: 337,
                    columnNumber: 21
                  }, this),
                  "Confirm Delivery"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 333,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => updateOrderStatus(order.id, OrderStatus.CANCELLED),
                className: "px-4 py-2 bg-red-50 text-red-700 rounded-lg font-medium hover:bg-red-100 transition ml-auto",
                children: "Cancel Order"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 341,
                columnNumber: 18
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderDetails.tsx",
            lineNumber: 307,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/OrderDetails.tsx",
          lineNumber: 305,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/OrderDetails.tsx",
        lineNumber: 232,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-6", children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "font-bold text-gray-900 mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(User, { size: 20, className: "text-amber-600" }, void 0, false, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 356,
              columnNumber: 15
            }, this),
            "Customer Details"
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderDetails.tsx",
            lineNumber: 355,
            columnNumber: 13
          }, this),
          customer ? /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-lg", children: customer.businessName }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 362,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-gray-500 text-sm", children: [
                "Owner: ",
                customer.ownerName
              ] }, void 0, true, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 363,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 361,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 pt-2", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-start gap-3 text-sm text-gray-600", children: [
                /* @__PURE__ */ jsxDEV(MapPin, { size: 16, className: "mt-1 shrink-0" }, void 0, false, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 368,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: customer.address }, void 0, false, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 369,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 367,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 text-sm text-gray-600", children: [
                /* @__PURE__ */ jsxDEV(Phone, { size: 16 }, void 0, false, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 372,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: customer.phone }, void 0, false, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 373,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 371,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 text-sm text-gray-600", children: [
                /* @__PURE__ */ jsxDEV(Mail, { size: 16 }, void 0, false, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 376,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("a", { href: `mailto:${customer.email}`, className: "text-blue-600 hover:underline", children: customer.email }, void 0, false, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 377,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 375,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 366,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "pt-4 flex gap-2", children: [
              /* @__PURE__ */ jsxDEV("button", { className: "flex-1 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition text-gray-700", children: "View Profile" }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 382,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("button", { className: "flex-1 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-sm font-medium transition", children: "Contact" }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 385,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 381,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderDetails.tsx",
            lineNumber: 360,
            columnNumber: 13
          }, this) : /* @__PURE__ */ jsxDEV("div", { className: "text-gray-500 italic", children: "Customer information not available." }, void 0, false, {
            fileName: "/app/applet/pages/OrderDetails.tsx",
            lineNumber: 391,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/OrderDetails.tsx",
          lineNumber: 354,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-6", children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "font-bold text-gray-900 mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Truck, { size: 20, className: "text-amber-600" }, void 0, false, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 397,
              columnNumber: 15
            }, this),
            "Delivery Info"
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderDetails.tsx",
            lineNumber: 396,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 text-sm", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "block text-gray-500 text-xs uppercase tracking-wider", children: "Requested Date" }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 402,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-gray-800 font-medium mt-1 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(Calendar, { size: 14, className: "text-gray-400" }, void 0, false, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 404,
                  columnNumber: 20
                }, this),
                formatDate(order.deliveryDate) || "Not specified"
              ] }, void 0, true, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 403,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 401,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "block text-gray-500 text-xs uppercase tracking-wider", children: "Address" }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 409,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-gray-800 font-medium mt-1", children: order.customerAddress }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 410,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 408,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "block text-gray-500 text-xs uppercase tracking-wider mb-1", children: "Delivery Person" }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 414,
                columnNumber: 17
              }, this),
              canAssignDriver ? /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxDEV(
                "select",
                {
                  value: order.deliveryPersonId || "",
                  onChange: (e) => assignDriver(order.id, e.target.value),
                  className: "w-full bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2",
                  children: [
                    /* @__PURE__ */ jsxDEV("option", { value: "", children: "-- Unassigned --" }, void 0, false, {
                      fileName: "/app/applet/pages/OrderDetails.tsx",
                      lineNumber: 422,
                      columnNumber: 25
                    }, this),
                    deliveryStaff.map(
                      (staff) => /* @__PURE__ */ jsxDEV("option", { value: staff.id, children: staff.name }, staff.id, false, {
                        fileName: "/app/applet/pages/OrderDetails.tsx",
                        lineNumber: 424,
                        columnNumber: 21
                      }, this)
                    )
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 417,
                  columnNumber: 22
                },
                this
              ) }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 416,
                columnNumber: 17
              }, this) : /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mt-1", children: order.deliveryPersonId ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold", children: "DP" }, void 0, false, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 432,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "font-medium text-gray-800", children: getDriverName(order.deliveryPersonId) }, void 0, false, {
                  fileName: "/app/applet/pages/OrderDetails.tsx",
                  lineNumber: 435,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 431,
                columnNumber: 19
              }, this) : /* @__PURE__ */ jsxDEV("span", { className: "text-amber-600 italic", children: "Unassigned" }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 438,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/pages/OrderDetails.tsx",
                lineNumber: 429,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderDetails.tsx",
              lineNumber: 413,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderDetails.tsx",
            lineNumber: 400,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/OrderDetails.tsx",
          lineNumber: 395,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/OrderDetails.tsx",
        lineNumber: 353,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/OrderDetails.tsx",
      lineNumber: 230,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/pages/OrderDetails.tsx",
    lineNumber: 167,
    columnNumber: 5
  }, this);
};
_s(OrderDetails, "WeJDoDha4Lz0t+Hs+5yfxg4gL+E=", false, function() {
  return [useParams, useNavigate, useOutletContext];
});
_c = OrderDetails;
export default OrderDetails;
var _c;
$RefreshReg$(_c, "OrderDetails");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/applet/pages/OrderDetails.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/applet/pages/OrderDetails.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QUEsdUJBRUE7QUFBQSxnQkFDQSx1QkFBQyxVQUFLLFdBQVUsNkJBQTZCaEUsd0JBQWNYLE1BQU0yRSxnQkFBZ0IsS0FBakY7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBbUY7QUFBQSxtQkFKdEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFLQSxJQUVBLHVCQUFDLFVBQUssV0FBVSx5QkFBd0IsMEJBQXhDO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWtELEtBVHJEO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBV0Q7QUFBQSxpQkEzQkg7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkE2QkE7QUFBQSxlQTFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQTJDQTtBQUFBLGFBaERGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFpREE7QUFBQSxXQTNGRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBNEZBO0FBQUEsU0F2TkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQXdOQTtBQUFBLE9BdlJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0F3UkE7QUFFSjtBQUFFckYsR0FqWklELGNBQXNCO0FBQUEsVUFDWHhCLFdBQ0VHLGFBQzRFRixnQkFBZ0I7QUFBQTtBQUFBLEtBSHpHdUI7QUFtWk4sZUFBZUE7QUFBYSxJQUFBMEY7QUFBQSxhQUFBQSxJQUFBIiwibmFtZXMiOlsiUmVhY3QiLCJ1c2VQYXJhbXMiLCJ1c2VPdXRsZXRDb250ZXh0IiwiTGluayIsInVzZU5hdmlnYXRlIiwiT3JkZXJTdGF0dXMiLCJSb2xlIiwiZ2VuZXJhdGVJbnZvaWNlUERGIiwic2VuZFdoYXRzQXBwU2Vzc2lvbk1lc3NhZ2UiLCJmb3JtYXREYXRlIiwiQXJyb3dMZWZ0IiwiTWFwUGluIiwiQ2FsZW5kYXIiLCJVc2VyIiwiUGhvbmUiLCJNYWlsIiwiUGFja2FnZSIsIlRydWNrIiwiQ2hlY2tDaXJjbGUiLCJDcmVkaXRDYXJkIiwiRmlsZVRleHQiLCJTaGllbGRBbGVydCIsIkRvd25sb2FkIiwiTWVzc2FnZVNxdWFyZSIsIkV4dGVybmFsTGluayIsIk9yZGVyRGV0YWlscyIsIl9zIiwiaWQiLCJuYXZpZ2F0ZSIsIm9yZGVycyIsImN1c3RvbWVycyIsInByb2R1Y3RzIiwidXBkYXRlT3JkZXJTdGF0dXMiLCJhc3NpZ25Ecml2ZXIiLCJ1c2VycyIsImN1cnJlbnRVc2VyIiwib3JkZXIiLCJmaW5kIiwibyIsImN1c3RvbWVyIiwiYyIsImN1c3RvbWVySWQiLCJkZWxpdmVyeVN0YWZmIiwiZmlsdGVyIiwidSIsInJvbGUiLCJERUxJVkVSWV9QRVJTT04iLCJnZXREcml2ZXJOYW1lIiwiZHJpdmVySWQiLCJuYW1lIiwiU0FMRVNfRVhFQ1VUSVZFIiwic2FsZXNFeGVjSWQiLCJnZXRTdGF0dXNDb2xvciIsInN0YXR1cyIsIkRFTElWRVJFRCIsIk9VVF9GT1JfREVMSVZFUlkiLCJDQU5DRUxMRUQiLCJnZXRQcm9kdWN0SW1hZ2UiLCJwcm9kdWN0SWQiLCJwIiwiaW1hZ2UiLCJoYW5kbGVEb3dubG9hZEludm9pY2UiLCJpc1NlbmRpbmdXYSIsInNldElzU2VuZGluZ1dhIiwidXNlU3RhdGUiLCJ3YVN0YXR1cyIsInNldFdhU3RhdHVzIiwiaGFuZGxlU2VuZFdoYXRzQXBwU2Vzc2lvbiIsInBob25lIiwiYWxlcnQiLCJpdGVtc0xpc3QiLCJpdGVtcyIsIm1hcCIsIml0ZW0iLCJxdWFudGl0eSIsInByb2R1Y3ROYW1lIiwiam9pbiIsIm1lc3NhZ2UiLCJvd25lck5hbWUiLCJidXNpbmVzc05hbWUiLCJ0b3RhbEFtb3VudCIsInRvRml4ZWQiLCJwYXltZW50U3RhdHVzIiwicmVzIiwicGhvbmVOdW1iZXIiLCJ0eXBlIiwidGV4dCIsInN1Y2Nlc3MiLCJlIiwic2V0VGltZW91dCIsImdldFdhV2ViTGluayIsImNsZWFuZWRQaG9uZSIsInJlcGxhY2UiLCJmdWxsUGhvbmUiLCJsZW5ndGgiLCJlbmNvZGVVUklDb21wb25lbnQiLCJjYW5VcGRhdGVTdGF0dXMiLCJBRE1JTiIsImNhbkFzc2lnbkRyaXZlciIsInByZXZlbnREZWZhdWx0IiwiZGF0ZSIsInN0YXJ0c1dpdGgiLCJpbmRleCIsInByaWNlQXRUaW1lIiwibm90ZXMiLCJQRU5ESU5HIiwiUFJPQ0VTU0lORyIsImFkZHJlc3MiLCJlbWFpbCIsImRlbGl2ZXJ5RGF0ZSIsImN1c3RvbWVyQWRkcmVzcyIsImRlbGl2ZXJ5UGVyc29uSWQiLCJ0YXJnZXQiLCJ2YWx1ZSIsInN0YWZmIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiT3JkZXJEZXRhaWxzLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VQYXJhbXMsIHVzZU91dGxldENvbnRleHQsIExpbmssIHVzZU5hdmlnYXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBBcHBDb250ZXh0VHlwZSwgT3JkZXJTdGF0dXMsIFJvbGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBnZW5lcmF0ZUludm9pY2VQREYgfSBmcm9tICcuLi9zZXJ2aWNlcy9wZGZTZXJ2aWNlJztcbmltcG9ydCB7IHNlbmRXaGF0c0FwcFNlc3Npb25NZXNzYWdlIH0gZnJvbSAnLi4vc2VydmljZXMvd2hhdHNhcHBTZXJ2aWNlJztcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tICcuLi9zZXJ2aWNlcy9kYXRlRm9ybWF0dGVyJztcbmltcG9ydCB7IFxuICBBcnJvd0xlZnQsIFxuICBNYXBQaW4sIFxuICBDYWxlbmRhciwgXG4gIFVzZXIsIFxuICBQaG9uZSwgXG4gIE1haWwsIFxuICBQYWNrYWdlLCBcbiAgVHJ1Y2ssIFxuICBDaGVja0NpcmNsZSxcbiAgQ2xvY2ssXG4gIFhDaXJjbGUsXG4gIFByaW50ZXIsXG4gIENyZWRpdENhcmQsXG4gIEZpbGVUZXh0LFxuICBTaGllbGRBbGVydCxcbiAgRG93bmxvYWQsXG4gIE1lc3NhZ2VTcXVhcmUsXG4gIEV4dGVybmFsTGlua1xufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG5jb25zdCBPcmRlckRldGFpbHM6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCB7IGlkIH0gPSB1c2VQYXJhbXM8eyBpZDogc3RyaW5nIH0+KCk7XG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcbiAgY29uc3QgeyBvcmRlcnMsIGN1c3RvbWVycywgcHJvZHVjdHMsIHVwZGF0ZU9yZGVyU3RhdHVzLCBhc3NpZ25Ecml2ZXIsIHVzZXJzLCBjdXJyZW50VXNlciB9ID0gdXNlT3V0bGV0Q29udGV4dDxBcHBDb250ZXh0VHlwZT4oKTtcblxuICBjb25zdCBvcmRlciA9IG9yZGVycy5maW5kKG8gPT4gby5pZCA9PT0gaWQpO1xuICBjb25zdCBjdXN0b21lciA9IGN1c3RvbWVycy5maW5kKGMgPT4gYy5pZCA9PT0gb3JkZXI/LmN1c3RvbWVySWQpO1xuICBjb25zdCBkZWxpdmVyeVN0YWZmID0gdXNlcnMuZmlsdGVyKHUgPT4gdS5yb2xlID09PSBSb2xlLkRFTElWRVJZX1BFUlNPTik7XG5cbiAgY29uc3QgZ2V0RHJpdmVyTmFtZSA9IChkcml2ZXJJZDogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIHVzZXJzLmZpbmQodSA9PiB1LmlkID09PSBkcml2ZXJJZCk/Lm5hbWUgfHwgJ1Vua25vd24gRHJpdmVyJztcbiAgfTtcblxuICBpZiAoIW9yZGVyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgaC05NiB0ZXh0LWdyYXktNTAwXCI+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1zZW1pYm9sZCBtYi00XCI+T3JkZXIgbm90IGZvdW5kPC9wPlxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKC0xKX0gY2xhc3NOYW1lPVwidGV4dC1hbWJlci02MDAgaG92ZXI6dW5kZXJsaW5lXCI+XG4gICAgICAgICAgR28gQmFja1xuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvLyBTZWN1cml0eSBDaGVjazogU2FsZXMgRXhlY3V0aXZlIGNhbiBvbmx5IHZpZXcgdGhlaXIgb3duIG9yZGVyc1xuICBpZiAoY3VycmVudFVzZXIucm9sZSA9PT0gUm9sZS5TQUxFU19FWEVDVVRJVkUgJiYgb3JkZXIuc2FsZXNFeGVjSWQgIT09IGN1cnJlbnRVc2VyLmlkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgaC1bY2FsYygxMDB2aC0xMDBweCldIHRleHQtZ3JheS01MDBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1yZWQtNTAgcC02IHJvdW5kZWQtZnVsbCBtYi00XCI+XG4gICAgICAgICAgIDxTaGllbGRBbGVydCBzaXplPXs0OH0gY2xhc3NOYW1lPVwidGV4dC1yZWQtNTAwXCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBtYi0yXCI+QWNjZXNzIERlbmllZDwvaDI+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDAgbWItNiB0ZXh0LWNlbnRlciBtYXgtdy1tZFwiPlxuICAgICAgICAgIFlvdSBkbyBub3QgaGF2ZSBwZXJtaXNzaW9uIHRvIHZpZXcgdGhpcyBvcmRlciBkZXRhaWxzIGFzIGl0IHdhcyBjcmVhdGVkIGJ5IGFub3RoZXIgU2FsZXMgRXhlY3V0aXZlLlxuICAgICAgICA8L3A+XG4gICAgICAgIDxidXR0b24gXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoJy9vcmRlcnMnKX0gXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYmctYW1iZXItNjAwIGhvdmVyOmJnLWFtYmVyLTcwMCB0ZXh0LXdoaXRlIHB4LTYgcHktMiByb3VuZGVkLWxnIHRyYW5zaXRpb25cIlxuICAgICAgICA+XG4gICAgICAgICAgQmFjayB0byBNeSBPcmRlcnNcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgY29uc3QgZ2V0U3RhdHVzQ29sb3IgPSAoc3RhdHVzOiBPcmRlclN0YXR1cykgPT4ge1xuICAgIHN3aXRjaChzdGF0dXMpIHtcbiAgICAgIGNhc2UgT3JkZXJTdGF0dXMuREVMSVZFUkVEOiByZXR1cm4gJ2JnLWdyZWVuLTEwMCB0ZXh0LWdyZWVuLTgwMCBib3JkZXItZ3JlZW4tMjAwJztcbiAgICAgIGNhc2UgT3JkZXJTdGF0dXMuT1VUX0ZPUl9ERUxJVkVSWTogcmV0dXJuICdiZy1ibHVlLTEwMCB0ZXh0LWJsdWUtODAwIGJvcmRlci1ibHVlLTIwMCc7XG4gICAgICBjYXNlIE9yZGVyU3RhdHVzLkNBTkNFTExFRDogcmV0dXJuICdiZy1yZWQtMTAwIHRleHQtcmVkLTgwMCBib3JkZXItcmVkLTIwMCc7XG4gICAgICBkZWZhdWx0OiByZXR1cm4gJ2JnLWFtYmVyLTEwMCB0ZXh0LWFtYmVyLTgwMCBib3JkZXItYW1iZXItMjAwJztcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0UHJvZHVjdEltYWdlID0gKHByb2R1Y3RJZDogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIHByb2R1Y3RzLmZpbmQocCA9PiBwLmlkID09PSBwcm9kdWN0SWQpPy5pbWFnZSB8fCAnaHR0cHM6Ly92aWEucGxhY2Vob2xkZXIuY29tLzUwJztcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZEludm9pY2UgPSAoKSA9PiB7XG4gICAgZ2VuZXJhdGVJbnZvaWNlUERGKG9yZGVyLCBjdXN0b21lcik7XG4gIH07XG5cbiAgY29uc3QgW2lzU2VuZGluZ1dhLCBzZXRJc1NlbmRpbmdXYV0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt3YVN0YXR1cywgc2V0V2FTdGF0dXNdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgaGFuZGxlU2VuZFdoYXRzQXBwU2Vzc2lvbiA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIWN1c3RvbWVyPy5waG9uZSkge1xuICAgICAgYWxlcnQoXCJObyBwaG9uZSBudW1iZXIgZm91bmQgZm9yIHRoaXMgY3VzdG9tZXIuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRJc1NlbmRpbmdXYSh0cnVlKTtcbiAgICBzZXRXYVN0YXR1cyhudWxsKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgaXRlbXNMaXN0ID0gb3JkZXIuaXRlbXMubWFwKGl0ZW0gPT4gYCR7aXRlbS5xdWFudGl0eX14ICR7aXRlbS5wcm9kdWN0TmFtZX1gKS5qb2luKCcsICcpO1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGBIaSAke2N1c3RvbWVyLm93bmVyTmFtZSB8fCBjdXN0b21lci5idXNpbmVzc05hbWV9LFxcblxcbmAgK1xuICAgICAgICAgICAgICAgICAgICAgIGBIZXJlIGFyZSB5b3VyIG9yZGVyIGRldGFpbHMgZm9yIE9yZGVyICojJHtvcmRlci5pZH0qIGZyb20gKlN2YXNoaWNhbGlzKjpcXG5gICtcbiAgICAgICAgICAgICAgICAgICAgICBgSXRlbXM6ICR7aXRlbXNMaXN0fVxcbmAgK1xuICAgICAgICAgICAgICAgICAgICAgIGBUb3RhbDogKuKCuSR7b3JkZXIudG90YWxBbW91bnQudG9GaXhlZCgyKX0qXFxuYCArXG4gICAgICAgICAgICAgICAgICAgICAgYFBheW1lbnQ6ICoke29yZGVyLnBheW1lbnRTdGF0dXN9KlxcbmAgK1xuICAgICAgICAgICAgICAgICAgICAgIGBTdGF0dXM6ICoke29yZGVyLnN0YXR1c30qXFxuXFxuYCArXG4gICAgICAgICAgICAgICAgICAgICAgYFRoYW5rIHlvdSBmb3IgY2hvb3NpbmcgU3Zhc2hpY2FsaXMhIPCfjatgO1xuXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBzZW5kV2hhdHNBcHBTZXNzaW9uTWVzc2FnZSh7XG4gICAgICAgIHBob25lTnVtYmVyOiBjdXN0b21lci5waG9uZSxcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICB0ZXh0OiBtZXNzYWdlXG4gICAgICB9KTtcbiAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICBzZXRXYVN0YXR1cyhcIuKchSBNZXNzYWdlIHNlbnQgc3VjY2Vzc2Z1bGx5IVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFdhU3RhdHVzKGDinYwgRXJyb3I6ICR7cmVzLm1lc3NhZ2V9YCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgICBzZXRXYVN0YXR1cyhg4p2MIE5ldHdvcmsgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc1NlbmRpbmdXYShmYWxzZSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHNldFdhU3RhdHVzKG51bGwpLCA1MDAwKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0V2FXZWJMaW5rID0gKCkgPT4ge1xuICAgIGlmICghY3VzdG9tZXI/LnBob25lKSByZXR1cm4gJyMnO1xuICAgIGNvbnN0IGl0ZW1zTGlzdCA9IG9yZGVyLml0ZW1zLm1hcChpdGVtID0+IGAke2l0ZW0ucXVhbnRpdHl9eCAke2l0ZW0ucHJvZHVjdE5hbWV9YCkuam9pbignLCAnKTtcbiAgICBjb25zdCBtZXNzYWdlID0gYEhpICR7Y3VzdG9tZXIub3duZXJOYW1lIHx8IGN1c3RvbWVyLmJ1c2luZXNzTmFtZX0sXFxuXFxuYCArXG4gICAgICAgICAgICAgICAgICAgIGBIZXJlIGFyZSB5b3VyIG9yZGVyIGRldGFpbHMgZm9yIE9yZGVyICojJHtvcmRlci5pZH0qIGZyb20gKlN2YXNoaWNhbGlzKjpcXG5gICtcbiAgICAgICAgICAgICAgICAgICAgYEl0ZW1zOiAke2l0ZW1zTGlzdH1cXG5gICtcbiAgICAgICAgICAgICAgICAgICAgYFRvdGFsOiAq4oK5JHtvcmRlci50b3RhbEFtb3VudC50b0ZpeGVkKDIpfSpcXG5gICtcbiAgICAgICAgICAgICAgICAgICAgYFBheW1lbnQ6ICoke29yZGVyLnBheW1lbnRTdGF0dXN9KlxcbmAgK1xuICAgICAgICAgICAgICAgICAgICBgU3RhdHVzOiAqJHtvcmRlci5zdGF0dXN9KlxcblxcbmAgK1xuICAgICAgICAgICAgICAgICAgICBgVGhhbmsgeW91IGZvciBjaG9vc2luZyBTdmFzaGljYWxpcyEg8J+Nq2A7XG4gICAgY29uc3QgY2xlYW5lZFBob25lID0gY3VzdG9tZXIucGhvbmUucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgICBjb25zdCBmdWxsUGhvbmUgPSBjbGVhbmVkUGhvbmUubGVuZ3RoID09PSAxMCA/IGA5MSR7Y2xlYW5lZFBob25lfWAgOiBjbGVhbmVkUGhvbmU7XG4gICAgcmV0dXJuIGBodHRwczovL2FwaS53aGF0c2FwcC5jb20vc2VuZD9waG9uZT0ke2Z1bGxQaG9uZX0mdGV4dD0ke2VuY29kZVVSSUNvbXBvbmVudChtZXNzYWdlKX1gO1xuICB9O1xuXG4gIGNvbnN0IGNhblVwZGF0ZVN0YXR1cyA9IGN1cnJlbnRVc2VyLnJvbGUgPT09IFJvbGUuQURNSU4gfHwgY3VycmVudFVzZXIucm9sZSA9PT0gUm9sZS5ERUxJVkVSWV9QRVJTT04gfHwgY3VycmVudFVzZXIucm9sZSA9PT0gUm9sZS5TQUxFU19FWEVDVVRJVkU7XG4gIGNvbnN0IGNhbkFzc2lnbkRyaXZlciA9IGN1cnJlbnRVc2VyLnJvbGUgPT09IFJvbGUuQURNSU4gfHwgY3VycmVudFVzZXIucm9sZSA9PT0gUm9sZS5TQUxFU19FWEVDVVRJVkU7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTV4bCBteC1hdXRvIHNwYWNlLXktNiBhbmltYXRlLWZhZGUtaW4gcGItMTBcIj5cbiAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtNFwiPlxuICAgICAgICAgIDxMaW5rIHRvPVwiLi5cIiBvbkNsaWNrPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IG5hdmlnYXRlKC0xKTsgfX0gY2xhc3NOYW1lPVwicC0yIGhvdmVyOmJnLWdyYXktMjAwIHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uXCI+XG4gICAgICAgICAgICA8QXJyb3dMZWZ0IHNpemU9ezI0fSBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwXCIgLz5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICBPcmRlciAje29yZGVyLmlkfVxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BweC0zIHB5LTEgcm91bmRlZC1mdWxsIHRleHQtc20gZm9udC1tZWRpdW0gYm9yZGVyICR7Z2V0U3RhdHVzQ29sb3Iob3JkZXIuc3RhdHVzKX1gfT5cbiAgICAgICAgICAgICAgICB7b3JkZXIuc3RhdHVzfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2gxPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTUwMCB0ZXh0LXNtIGZsZXggaXRlbXMtY2VudGVyIG10LTFcIj5cbiAgICAgICAgICAgICAgPENhbGVuZGFyIHNpemU9ezE0fSBjbGFzc05hbWU9XCJtci0xXCIgLz5cbiAgICAgICAgICAgICAgUGxhY2VkIG9uIHtmb3JtYXREYXRlKG9yZGVyLmRhdGUpfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLWVuZCBzbTppdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAge3dhU3RhdHVzICYmIChcbiAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHRleHQteHMgZm9udC1zZW1pYm9sZCBweC0zIHB5LTEuNSByb3VuZGVkLWxnIGJvcmRlciAke3dhU3RhdHVzLnN0YXJ0c1dpdGgoJ+KchScpID8gJ2JnLWdyZWVuLTUwIHRleHQtZ3JlZW4tODAwIGJvcmRlci1ncmVlbi0yMDAnIDogJ2JnLXJlZC01MCB0ZXh0LXJlZC04MDAgYm9yZGVyLXJlZC0yMDAnfWB9PlxuICAgICAgICAgICAgICAge3dhU3RhdHVzfVxuICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICApfVxuICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTJcIj5cbiAgICAgICAgICAgICB7LyogRmFzdDJTTVMgU2Vzc2lvbiBBUEkgZGlzcGF0Y2ggKi99XG4gICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNlbmRXaGF0c0FwcFNlc3Npb259XG4gICAgICAgICAgICAgICBkaXNhYmxlZD17aXNTZW5kaW5nV2F9XG4gICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgcHgtNCBweS0yIHJvdW5kZWQtbGcgdGV4dC13aGl0ZSBmb250LXNlbWlib2xkIHRleHQtc20gc2hhZG93LXNtIHRyYW5zaXRpb24gJHtpc1NlbmRpbmdXYSA/ICdiZy1ncmF5LTQwMCBjdXJzb3Itbm90LWFsbG93ZWQnIDogJ2JnLWdyZWVuLTYwMCBob3ZlcjpiZy1ncmVlbi03MDAnfWB9XG4gICAgICAgICAgICAgICB0aXRsZT1cIlNlbmQgYXV0b21hdGVkIG1lc3NhZ2UgdmlhIEZhc3QyU01TIFdoYXRzQXBwIEFQSVwiXG4gICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgPE1lc3NhZ2VTcXVhcmUgc2l6ZT17MTZ9IC8+XG4gICAgICAgICAgICAgICA8c3Bhbj57aXNTZW5kaW5nV2EgPyAnU2VuZGluZy4uLicgOiAnU2VuZCB2aWEgV2hhdHNBcHAgQVBJJ308L3NwYW4+XG4gICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICB7LyogTWFudWFsIFdoYXRzQXBwIGxpbmsgcmVkaXJlY3Rpb24gZmFsbGJhY2sgKi99XG4gICAgICAgICAgICAge2N1c3RvbWVyPy5waG9uZSAmJiAoXG4gICAgICAgICAgICAgICA8YSBcbiAgICAgICAgICAgICAgICAgaHJlZj17Z2V0V2FXZWJMaW5rKCl9XG4gICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgcHgtNCBweS0yIGJnLWVtZXJhbGQtNTAgdGV4dC1lbWVyYWxkLTgwMCBob3ZlcjpiZy1lbWVyYWxkLTEwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtMjAwIHJvdW5kZWQtbGcgdGV4dC1zbSBmb250LXNlbWlib2xkIHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICAgICB0aXRsZT1cIk9wZW4gaW4gV2hhdHNBcHAgV2ViIC8gQXBwIGRpcmVjdGx5XCJcbiAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgPEV4dGVybmFsTGluayBzaXplPXsxNH0gLz5cbiAgICAgICAgICAgICAgICAgPHNwYW4+V2hhdHNBcHAgV2ViPC9zcGFuPlxuICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICl9XG4gICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRG93bmxvYWRJbnZvaWNlfVxuICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiBweC00IHB5LTIgYmctYW1iZXItNjAwIHRleHQtd2hpdGUgcm91bmRlZC1sZyBob3ZlcjpiZy1hbWJlci03MDAgdGV4dC1zbSBmb250LXNlbWlib2xkIHRyYW5zaXRpb24gc2hhZG93LXNtXCJcbiAgICAgICAgICAgPlxuICAgICAgICAgICAgIDxEb3dubG9hZCBzaXplPXsxOH0gLz5cbiAgICAgICAgICAgICA8c3Bhbj5JbnZvaWNlPC9zcGFuPlxuICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0zIGdhcC02XCI+XG4gICAgICAgIHsvKiBNYWluIENvbnRlbnQgLSBPcmRlciBJdGVtcyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi0yIHNwYWNlLXktNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC14bCBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNiBweS00IGJvcmRlci1iIGJvcmRlci1ncmF5LTEwMCBiZy1ncmF5LTUwIGZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtZ3JheS05MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8UGFja2FnZSBzaXplPXsyMH0gY2xhc3NOYW1lPVwidGV4dC1hbWJlci02MDBcIiAvPlxuICAgICAgICAgICAgICAgIE9yZGVyIEl0ZW1zXG4gICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTUwMFwiPntvcmRlci5pdGVtcy5sZW5ndGh9IEl0ZW1zPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpdmlkZS15IGRpdmlkZS1ncmF5LTEwMFwiPlxuICAgICAgICAgICAgICB7b3JkZXIuaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPVwicC00IGZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtNFwiPlxuICAgICAgICAgICAgICAgICAgPGltZyBcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtnZXRQcm9kdWN0SW1hZ2UoaXRlbS5wcm9kdWN0SWQpfSBcbiAgICAgICAgICAgICAgICAgICAgYWx0PXtpdGVtLnByb2R1Y3ROYW1lfSBcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xNiBoLTE2IG9iamVjdC1jb3ZlciByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZ3JheS0xMDBcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIj57aXRlbS5wcm9kdWN0TmFtZX08L2gzPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS01MDBcIj5Vbml0IFByaWNlOiDigrl7aXRlbS5wcmljZUF0VGltZS50b0ZpeGVkKDIpfTwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCI+4oK5eyhpdGVtLnByaWNlQXRUaW1lICogaXRlbS5xdWFudGl0eSkudG9GaXhlZCgyKX08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTUwMFwiPlF0eToge2l0ZW0ucXVhbnRpdHl9PC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYXktNTAgcC02IGJvcmRlci10IGJvcmRlci1ncmF5LTEwMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBtYi0yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTYwMFwiPlN1YnRvdGFsPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtXCI+4oK5e29yZGVyLnRvdGFsQW1vdW50LnRvRml4ZWQoMil9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgbWItNFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDBcIj5UYXggKDAlKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1lZGl1bVwiPuKCuTAuMDA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBwdC00IGJvcmRlci10IGJvcmRlci1ncmF5LTIwMFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIj5Ub3RhbDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1hbWJlci02MDBcIj7igrl7b3JkZXIudG90YWxBbW91bnQudG9GaXhlZCgyKX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQWRkaXRpb25hbCBEZXRhaWxzIChOb3RlcyAmIFBheW1lbnQpICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC14bCBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBwLTZcIj5cbiAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItNFwiPkFkZGl0aW9uYWwgSW5mb3JtYXRpb248L2gzPlxuICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBtZDpncmlkLWNvbHMtMiBnYXAtNlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHVwcGVyY2FzZSB0ZXh0LWdyYXktNTAwIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPEZpbGVUZXh0IHNpemU9ezE0fSAvPiBPcmRlciBOb3Rlc1xuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTcwMCBiZy1ncmF5LTUwIHAtMyByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZ3JheS0xMDAgdGV4dC1zbVwiPlxuICAgICAgICAgICAgICAgICAgICB7b3JkZXIubm90ZXMgfHwgXCJObyBub3RlcyBwcm92aWRlZC5cIn1cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdXBwZXJjYXNlIHRleHQtZ3JheS01MDAgZm9udC1zZW1pYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgPENyZWRpdENhcmQgc2l6ZT17MTR9IC8+IFBheW1lbnQgU3RhdHVzXG4gICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgcm91bmRlZC1sZyB0ZXh0LXNtIGZvbnQtYm9sZCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyLnBheW1lbnRTdGF0dXMgPT09ICdQYWlkJyA/ICdiZy1ncmVlbi0xMDAgdGV4dC1ncmVlbi03MDAnIDogJ2JnLW9yYW5nZS0xMDAgdGV4dC1vcmFuZ2UtNzAwJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtvcmRlci5wYXltZW50U3RhdHVzIHx8ICdQZW5kaW5nJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogU3RhdHVzIEFjdGlvbnMgKi99XG4gICAgICAgICAge2NhblVwZGF0ZVN0YXR1cyAmJiBvcmRlci5zdGF0dXMgIT09IE9yZGVyU3RhdHVzLkRFTElWRVJFRCAmJiBvcmRlci5zdGF0dXMgIT09IE9yZGVyU3RhdHVzLkNBTkNFTExFRCAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQteGwgc2hhZG93LXNtIGJvcmRlciBib3JkZXItZ3JheS0xMDAgcC02XCI+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBtYi00XCI+VXBkYXRlIFN0YXR1czwvaDM+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICB7b3JkZXIuc3RhdHVzID09PSBPcmRlclN0YXR1cy5QRU5ESU5HICYmIChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHVwZGF0ZU9yZGVyU3RhdHVzKG9yZGVyLmlkLCBPcmRlclN0YXR1cy5QUk9DRVNTSU5HKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgYmctYmx1ZS01MCB0ZXh0LWJsdWUtNzAwIHJvdW5kZWQtbGcgZm9udC1tZWRpdW0gaG92ZXI6YmctYmx1ZS0xMDAgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBNYXJrIGFzIFByb2Nlc3NpbmdcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdXBkYXRlT3JkZXJTdGF0dXMob3JkZXIuaWQsIE9yZGVyU3RhdHVzLk9VVF9GT1JfREVMSVZFUlkpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiBiZy1hbWJlci01MCB0ZXh0LWFtYmVyLTcwMCByb3VuZGVkLWxnIGZvbnQtbWVkaXVtIGhvdmVyOmJnLWFtYmVyLTEwMCB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIERpc3BhdGNoIGZvciBEZWxpdmVyeVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge29yZGVyLnN0YXR1cyA9PT0gT3JkZXJTdGF0dXMuUFJPQ0VTU0lORyAmJiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB1cGRhdGVPcmRlclN0YXR1cyhvcmRlci5pZCwgT3JkZXJTdGF0dXMuT1VUX0ZPUl9ERUxJVkVSWSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiBiZy1hbWJlci01MCB0ZXh0LWFtYmVyLTcwMCByb3VuZGVkLWxnIGZvbnQtbWVkaXVtIGhvdmVyOmJnLWFtYmVyLTEwMCB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgRGlzcGF0Y2ggZm9yIERlbGl2ZXJ5XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtvcmRlci5zdGF0dXMgPT09IE9yZGVyU3RhdHVzLk9VVF9GT1JfREVMSVZFUlkgJiYgKFxuICAgICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHVwZGF0ZU9yZGVyU3RhdHVzKG9yZGVyLmlkLCBPcmRlclN0YXR1cy5ERUxJVkVSRUQpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgYmctZ3JlZW4tNTAgdGV4dC1ncmVlbi03MDAgcm91bmRlZC1sZyBmb250LW1lZGl1bSBob3ZlcjpiZy1ncmVlbi0xMDAgdHJhbnNpdGlvbiBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZSBzaXplPXsxNn0gLz5cbiAgICAgICAgICAgICAgICAgICAgQ29uZmlybSBEZWxpdmVyeVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdXBkYXRlT3JkZXJTdGF0dXMob3JkZXIuaWQsIE9yZGVyU3RhdHVzLkNBTkNFTExFRCl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiBiZy1yZWQtNTAgdGV4dC1yZWQtNzAwIHJvdW5kZWQtbGcgZm9udC1tZWRpdW0gaG92ZXI6YmctcmVkLTEwMCB0cmFuc2l0aW9uIG1sLWF1dG9cIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBDYW5jZWwgT3JkZXJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBTaWRlYmFyIC0gQ3VzdG9tZXIgSW5mbyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQteGwgc2hhZG93LXNtIGJvcmRlciBib3JkZXItZ3JheS0xMDAgcC02XCI+XG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItNCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8VXNlciBzaXplPXsyMH0gY2xhc3NOYW1lPVwidGV4dC1hbWJlci02MDBcIiAvPlxuICAgICAgICAgICAgICBDdXN0b21lciBEZXRhaWxzXG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAge2N1c3RvbWVyID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWxnXCI+e2N1c3RvbWVyLmJ1c2luZXNzTmFtZX08L2gzPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTUwMCB0ZXh0LXNtXCI+T3duZXI6IHtjdXN0b21lci5vd25lck5hbWV9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zIHB0LTJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtMyB0ZXh0LXNtIHRleHQtZ3JheS02MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPE1hcFBpbiBzaXplPXsxNn0gY2xhc3NOYW1lPVwibXQtMSBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntjdXN0b21lci5hZGRyZXNzfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXNtIHRleHQtZ3JheS02MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPFBob25lIHNpemU9ezE2fSAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57Y3VzdG9tZXIucGhvbmV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHRleHQtc20gdGV4dC1ncmF5LTYwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8TWFpbCBzaXplPXsxNn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17YG1haWx0bzoke2N1c3RvbWVyLmVtYWlsfWB9IGNsYXNzTmFtZT1cInRleHQtYmx1ZS02MDAgaG92ZXI6dW5kZXJsaW5lXCI+e2N1c3RvbWVyLmVtYWlsfTwvYT5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC00IGZsZXggZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiZmxleC0xIHB5LTIgYmctZ3JheS0xMDAgaG92ZXI6YmctZ3JheS0yMDAgcm91bmRlZC1sZyB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24gdGV4dC1ncmF5LTcwMFwiPlxuICAgICAgICAgICAgICAgICAgICBWaWV3IFByb2ZpbGVcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJmbGV4LTEgcHktMiBiZy1hbWJlci01MCBob3ZlcjpiZy1hbWJlci0xMDAgdGV4dC1hbWJlci03MDAgcm91bmRlZC1sZyB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRyYW5zaXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgQ29udGFjdFxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwIGl0YWxpY1wiPkN1c3RvbWVyIGluZm9ybWF0aW9uIG5vdCBhdmFpbGFibGUuPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLXhsIHNoYWRvdy1zbSBib3JkZXIgYm9yZGVyLWdyYXktMTAwIHAtNlwiPlxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPFRydWNrIHNpemU9ezIwfSBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTYwMFwiIC8+XG4gICAgICAgICAgICAgIERlbGl2ZXJ5IEluZm9cbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCB0ZXh0LXNtXCI+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1ncmF5LTUwMCB0ZXh0LXhzIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPlJlcXVlc3RlZCBEYXRlPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS04MDAgZm9udC1tZWRpdW0gbXQtMSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgIDxDYWxlbmRhciBzaXplPXsxNH0gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAge2Zvcm1hdERhdGUob3JkZXIuZGVsaXZlcnlEYXRlKSB8fCAnTm90IHNwZWNpZmllZCd9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LWdyYXktNTAwIHRleHQteHMgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCI+QWRkcmVzczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktODAwIGZvbnQtbWVkaXVtIG10LTFcIj57b3JkZXIuY3VzdG9tZXJBZGRyZXNzfTwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtZ3JheS01MDAgdGV4dC14cyB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgbWItMVwiPkRlbGl2ZXJ5IFBlcnNvbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7Y2FuQXNzaWduRHJpdmVyID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtvcmRlci5kZWxpdmVyeVBlcnNvbklkIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBhc3NpZ25Ecml2ZXIob3JkZXIuaWQsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLWdyYXktMjAwIHRleHQtZ3JheS03MDAgdGV4dC1zbSByb3VuZGVkLWxnIGZvY3VzOnJpbmctYW1iZXItNTAwIGZvY3VzOmJvcmRlci1hbWJlci01MDAgYmxvY2sgcC0yXCJcbiAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj4tLSBVbmFzc2lnbmVkIC0tPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGVsaXZlcnlTdGFmZi5tYXAoc3RhZmYgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17c3RhZmYuaWR9IHZhbHVlPXtzdGFmZi5pZH0+e3N0YWZmLm5hbWV9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgIHtvcmRlci5kZWxpdmVyeVBlcnNvbklkID8gKFxuICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy02IGgtNiByb3VuZGVkLWZ1bGwgYmctYmx1ZS0xMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1ibHVlLTcwMCB0ZXh0LXhzIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBEUFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1lZGl1bSB0ZXh0LWdyYXktODAwXCI+e2dldERyaXZlck5hbWUob3JkZXIuZGVsaXZlcnlQZXJzb25JZCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItNjAwIGl0YWxpY1wiPlVuYXNzaWduZWQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE9yZGVyRGV0YWlscztcbiJdLCJmaWxlIjoiL2FwcC9hcHBsZXQvcGFnZXMvT3JkZXJEZXRhaWxzLnRzeCJ9