import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/pages/OrderTaking.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=76d1f7a8"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/applet/pages/OrderTaking.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=76d1f7a8"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"];
import { useOutletContext, useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=76d1f7a8";
import { OrderStatus, PaymentStatus } from "/types.ts";
import { Search, Plus, Minus, ShoppingCart, Check, Calendar, FileText, CreditCard, Mail, CheckCircle, Trash2, Package, AlertCircle, MessageSquare } from "/node_modules/.vite/deps/lucide-react.js?v=76d1f7a8";
import { sendOrderConfirmationSMS } from "/services/smsService.ts";
import { sendOrderConfirmationWhatsApp } from "/services/whatsappService.ts";
import { sendOrderEmail, getMailtoLink } from "/services/emailService.ts";
const OrderTaking = () => {
  _s();
  const { products, customers, addOrder, currentUser, orders } = useOutletContext();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMobileTab, setActiveMobileTab] = useState("catalog");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(PaymentStatus.PENDING);
  const [sendSms, setSendSms] = useState(false);
  const [sendWhatsapp, setSendWhatsapp] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { productId: product.id, quantity: 1, priceAtTime: product.price, productName: product.name }];
    });
  };
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };
  const updateQuantity = (productId, delta) => {
    setCart((prev) => prev.map((item) => {
      if (item.productId === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };
  const cartTotal = cart.reduce((sum, item) => sum + item.priceAtTime * item.quantity, 0);
  const getNextOrderId = () => {
    let maxId = 1e3;
    orders.forEach((order) => {
      const num = parseInt(order.id.replace(/\D/g, ""));
      if (!isNaN(num) && num < 1e9) {
        if (num > maxId) maxId = num;
      }
    });
    return (maxId + 1).toString();
  };
  const handleCheckout = async () => {
    if (!selectedCustomerId || cart.length === 0) return;
    setIsSubmitting(true);
    const customer = customers.find((c) => c.id === selectedCustomerId);
    if (!customer) {
      setIsSubmitting(false);
      return;
    }
    const orderDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const newOrderId = getNextOrderId();
    const newOrder = {
      id: newOrderId,
      customerId: customer.id,
      customerName: customer.businessName,
      customerAddress: customer.address,
      salesExecId: currentUser.id,
      items: cart,
      totalAmount: cartTotal,
      status: OrderStatus.PENDING,
      date: orderDate,
      deliveryDate: deliveryDate || void 0,
      notes: notes || "",
      paymentStatus
    };
    addOrder(newOrder);
    if (sendSms && customer.phone) {
      const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
      const distinctItems = cart.length;
      sendOrderConfirmationSMS({
        phoneNumber: customer.phone,
        orderId: newOrder.id,
        salesExecName: currentUser.name,
        distinctItems,
        totalQuantity: totalQty,
        amount: cartTotal
      }).then((success) => {
        if (success) console.log("SMS process finished.");
      });
    }
    if (sendWhatsapp && customer.phone) {
      const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
      const itemsSummaryStr = cart.map((item) => `${item.quantity}x ${item.productName}`).join(", ");
      sendOrderConfirmationWhatsApp({
        phoneNumber: customer.phone,
        customerName: customer.businessName,
        orderId: newOrderId,
        itemsSummary: itemsSummaryStr,
        totalQuantity: totalQty,
        totalAmount: cartTotal,
        salesExecName: currentUser.name
      }).then((res) => {
        if (res.success) {
          console.log("WhatsApp order confirmation sent successfully:", res.message);
        } else {
          console.warn("WhatsApp order confirmation failed:", res.message);
        }
      });
    }
    const emailResult = await sendOrderEmail(newOrder, customer, currentUser.name);
    setLastOrderDetails({
      order: newOrder,
      customerEmail: customer.email,
      mailto: getMailtoLink(newOrder, customer, currentUser.name),
      emailStatus: {
        customerSent: emailResult.customer.success,
        adminSent: emailResult.admin.success,
        wasBlocked: emailResult.customer.wasBlocked || emailResult.admin.wasBlocked || false
      }
    });
    setIsSubmitting(false);
    setShowSuccessModal(true);
  };
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/orders");
  };
  React.useEffect(() => {
    const tomorrow = /* @__PURE__ */ new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDeliveryDate(tomorrow.toISOString().split("T")[0]);
  }, []);
  return /* @__PURE__ */ jsxDEV("div", { className: "h-[calc(100vh-6rem)] flex flex-col lg:flex-row gap-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "md:hidden flex bg-white rounded-lg p-1 shadow-sm border border-gray-200 shrink-0 mb-2", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveMobileTab("catalog"),
          className: `flex-1 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition ${activeMobileTab === "catalog" ? "bg-amber-100 text-amber-800" : "text-gray-600"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Package, { size: 16 }, void 0, false, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 205,
              columnNumber: 11
            }, this),
            " Catalog"
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 201,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveMobileTab("cart"),
          className: `flex-1 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition ${activeMobileTab === "cart" ? "bg-amber-100 text-amber-800" : "text-gray-600"}`,
          children: [
            /* @__PURE__ */ jsxDEV(ShoppingCart, { size: 16 }, void 0, false, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 211,
              columnNumber: 11
            }, this),
            " Cart (",
            cart.length,
            ")"
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 207,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/pages/OrderTaking.tsx",
      lineNumber: 200,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: `lg:w-[60%] flex flex-col h-full flex-1 min-h-0 ${activeMobileTab === "cart" ? "hidden md:flex" : "flex"}`, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxDEV("h1", { className: "text-xl md:text-2xl font-bold text-gray-900", children: "Create New Order" }, void 0, false, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 218,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-gray-500 text-sm hidden lg:block", children: "Select products and add details to generate an order." }, void 0, false, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 219,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/OrderTaking.tsx",
        lineNumber: 217,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mb-4 relative shrink-0", children: [
        /* @__PURE__ */ jsxDEV(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 20 }, void 0, false, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 223,
          columnNumber: 12
        }, this),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "text",
            placeholder: "Search catalog...",
            className: "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 shadow-sm input-responsive bg-white text-black",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 224,
            columnNumber: 12
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/pages/OrderTaking.tsx",
        lineNumber: 222,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto pr-2 custom-scrollbar", children: /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-20 md:pb-4", children: products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(
        (product) => /* @__PURE__ */ jsxDEV("div", { className: "bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-row md:flex-col gap-4 hover:shadow-md transition items-center md:items-stretch", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "relative h-20 w-20 md:h-32 md:w-full shrink-0", children: [
            /* @__PURE__ */ jsxDEV("img", { src: product.image, alt: product.name, className: "w-full h-full object-cover rounded-lg" }, void 0, false, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 238,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1 right-1 bg-white/90 px-2 py-0.5 rounded text-xs font-bold shadow-sm hidden md:block", children: [
              product.stock,
              " left"
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 239,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 237,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex flex-col justify-between", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900 leading-tight line-clamp-1", children: product.name }, void 0, false, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 245,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-500 mb-2", children: product.category }, void 0, false, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 246,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 244,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mt-1", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-amber-600", children: [
                "₹",
                product.price.toFixed(2)
              ] }, void 0, true, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 249,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => addToCart(product),
                  className: "bg-amber-100 text-amber-800 hover:bg-amber-200 p-2 rounded-lg transition",
                  children: /* @__PURE__ */ jsxDEV(Plus, { size: 18 }, void 0, false, {
                    fileName: "/app/applet/pages/OrderTaking.tsx",
                    lineNumber: 254,
                    columnNumber: 23
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/pages/OrderTaking.tsx",
                  lineNumber: 250,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 248,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 243,
            columnNumber: 17
          }, this)
        ] }, product.id, true, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 236,
          columnNumber: 13
        }, this)
      ) }, void 0, false, {
        fileName: "/app/applet/pages/OrderTaking.tsx",
        lineNumber: 234,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/pages/OrderTaking.tsx",
        lineNumber: 233,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/OrderTaking.tsx",
      lineNumber: 216,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: `w-full lg:w-[calc(40%-1.5rem)] bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col h-full flex-1 min-h-0 overflow-hidden ${activeMobileTab === "catalog" ? "hidden md:flex" : "flex"}`, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center shrink-0", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "font-bold text-lg flex items-center space-x-2 text-gray-800", children: [
          /* @__PURE__ */ jsxDEV(FileText, { size: 20, className: "text-amber-600" }, void 0, false, {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 269,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Order Details" }, void 0, false, {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 270,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 268,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-gray-500", children: [
          cart.length,
          " items"
        ] }, void 0, true, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 272,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/OrderTaking.tsx",
        lineNumber: 267,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Customer" }, void 0, false, {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 278,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              className: "w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 bg-white input-responsive text-black",
              value: selectedCustomerId,
              onChange: (e) => setSelectedCustomerId(e.target.value),
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: "", children: "-- Select Business --" }, void 0, false, {
                  fileName: "/app/applet/pages/OrderTaking.tsx",
                  lineNumber: 284,
                  columnNumber: 15
                }, this),
                customers.filter((c) => c.status === "Active").map(
                  (c) => /* @__PURE__ */ jsxDEV("option", { value: c.id, children: [
                    c.businessName,
                    " (",
                    c.ownerName,
                    ")"
                  ] }, c.id, true, {
                    fileName: "/app/applet/pages/OrderTaking.tsx",
                    lineNumber: 288,
                    columnNumber: 15
                  }, this)
                )
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 279,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 277,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(Calendar, { size: 12 }, void 0, false, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 297,
                columnNumber: 20
              }, this),
              " Delivery Date"
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 296,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "date",
                value: deliveryDate,
                onChange: (e) => setDeliveryDate(e.target.value),
                className: "w-full p-2 border border-gray-300 rounded-lg focus:ring-2 text-sm input-responsive bg-white text-black"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 299,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 295,
            columnNumber: 14
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(CreditCard, { size: 12 }, void 0, false, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 308,
                columnNumber: 20
              }, this),
              " Payment"
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 307,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                value: paymentStatus,
                onChange: (e) => setPaymentStatus(e.target.value),
                className: "w-full p-2 border border-gray-300 rounded-lg focus:ring-2 text-sm bg-white input-responsive text-black",
                children: Object.values(PaymentStatus).map(
                  (status) => /* @__PURE__ */ jsxDEV("option", { value: status, children: status }, status, false, {
                    fileName: "/app/applet/pages/OrderTaking.tsx",
                    lineNumber: 316,
                    columnNumber: 17
                  }, this)
                )
              },
              void 0,
              false,
              {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 310,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 306,
            columnNumber: 14
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 294,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Order Notes" }, void 0, false, {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 323,
            columnNumber: 14
          }, this),
          /* @__PURE__ */ jsxDEV(
            "textarea",
            {
              rows: 2,
              value: notes,
              onChange: (e) => setNotes(e.target.value),
              placeholder: "Special instructions...",
              className: "w-full p-2 border border-gray-300 rounded-lg focus:ring-2 text-sm resize-none input-responsive bg-white text-black"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 324,
              columnNumber: 14
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 322,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "border-t border-gray-100 pt-4", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-700 mb-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "Selected Items" }, void 0, false, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 335,
              columnNumber: 16
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-normal text-gray-500", children: [
              cart.length,
              " items"
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 336,
              columnNumber: 16
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 334,
            columnNumber: 13
          }, this),
          cart.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200", children: [
            /* @__PURE__ */ jsxDEV(ShoppingCart, { className: "mx-auto text-gray-300 mb-2", size: 24 }, void 0, false, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 341,
              columnNumber: 18
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-400", children: "Cart is empty" }, void 0, false, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 342,
              columnNumber: 18
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 340,
            columnNumber: 13
          }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: cart.map(
            (item) => /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center p-2 bg-gray-50 rounded-lg border border-gray-100", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0 pr-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "font-medium text-sm text-gray-900 truncate", children: item.productName }, void 0, false, {
                  fileName: "/app/applet/pages/OrderTaking.tsx",
                  lineNumber: 349,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-gray-500", children: [
                  "₹",
                  item.priceAtTime.toFixed(2)
                ] }, void 0, true, {
                  fileName: "/app/applet/pages/OrderTaking.tsx",
                  lineNumber: 350,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 348,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 bg-white rounded-md border border-gray-200 p-0.5 shadow-sm", children: [
                  /* @__PURE__ */ jsxDEV("button", { onClick: () => updateQuantity(item.productId, -1), className: "p-1 hover:bg-gray-100 rounded text-gray-600", children: /* @__PURE__ */ jsxDEV(Minus, { size: 12 }, void 0, false, {
                    fileName: "/app/applet/pages/OrderTaking.tsx",
                    lineNumber: 354,
                    columnNumber: 140
                  }, this) }, void 0, false, {
                    fileName: "/app/applet/pages/OrderTaking.tsx",
                    lineNumber: 354,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-semibold w-5 text-center", children: item.quantity }, void 0, false, {
                    fileName: "/app/applet/pages/OrderTaking.tsx",
                    lineNumber: 355,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("button", { onClick: () => updateQuantity(item.productId, 1), className: "p-1 hover:bg-gray-100 rounded text-gray-600", children: /* @__PURE__ */ jsxDEV(Plus, { size: 12 }, void 0, false, {
                    fileName: "/app/applet/pages/OrderTaking.tsx",
                    lineNumber: 356,
                    columnNumber: 139
                  }, this) }, void 0, false, {
                    fileName: "/app/applet/pages/OrderTaking.tsx",
                    lineNumber: 356,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/pages/OrderTaking.tsx",
                  lineNumber: 353,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => removeFromCart(item.productId),
                    className: "text-gray-400 hover:text-red-500 transition p-1 hover:bg-red-50 rounded",
                    children: /* @__PURE__ */ jsxDEV(Trash2, { size: 16 }, void 0, false, {
                      fileName: "/app/applet/pages/OrderTaking.tsx",
                      lineNumber: 362,
                      columnNumber: 25
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/pages/OrderTaking.tsx",
                    lineNumber: 358,
                    columnNumber: 23
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 352,
                columnNumber: 21
              }, this)
            ] }, item.productId, true, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 347,
              columnNumber: 15
            }, this)
          ) }, void 0, false, {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 345,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 333,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/OrderTaking.tsx",
        lineNumber: 275,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-t border-gray-100 bg-gray-50 shrink-0 space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2.5", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-sm text-gray-700", children: [
              /* @__PURE__ */ jsxDEV(MessageSquare, { size: 16, className: sendWhatsapp ? "text-green-600" : "text-gray-400" }, void 0, false, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 376,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: "Send WhatsApp Confirmation" }, void 0, false, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 377,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 375,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("label", { className: "relative inline-flex items-center cursor-pointer", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  className: "sr-only peer",
                  checked: sendWhatsapp,
                  onChange: (e) => setSendWhatsapp(e.target.checked)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/pages/OrderTaking.tsx",
                  lineNumber: 380,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600" }, void 0, false, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 386,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 379,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 374,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-sm text-gray-700", children: [
              /* @__PURE__ */ jsxDEV(MessageSquare, { size: 16, className: sendSms ? "text-blue-600" : "text-gray-400" }, void 0, false, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 392,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: "Send SMS Notification" }, void 0, false, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 393,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 391,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("label", { className: "relative inline-flex items-center cursor-pointer", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  className: "sr-only peer",
                  checked: sendSms,
                  onChange: (e) => setSendSms(e.target.checked)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/pages/OrderTaking.tsx",
                  lineNumber: 396,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" }, void 0, false, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 402,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 395,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 390,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 373,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-gray-600 text-sm block", children: "Total Amount" }, void 0, false, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 409,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-gray-400", children: "Tax inclusive" }, void 0, false, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 410,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 408,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-2xl font-bold text-gray-900", children: [
            "₹",
            cartTotal.toFixed(2)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 412,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 407,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            disabled: cart.length === 0 || !selectedCustomerId || isSubmitting,
            onClick: handleCheckout,
            className: `w-full py-3.5 rounded-lg font-bold flex justify-center items-center space-x-2 transition-all transform ${cart.length > 0 && selectedCustomerId && !isSubmitting ? "bg-amber-600 text-white hover:bg-amber-700 shadow-lg hover:shadow-xl active:scale-[0.98]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`,
            children: isSubmitting ? /* @__PURE__ */ jsxDEV("div", { className: "w-5 h-5 border-2 border-gray-400 border-t-white rounded-full animate-spin" }, void 0, false, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 424,
              columnNumber: 13
            }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(Check, { size: 20 }, void 0, false, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 427,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Submit Order" }, void 0, false, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 428,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 426,
              columnNumber: 13
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 414,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/pages/OrderTaking.tsx",
        lineNumber: 372,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/OrderTaking.tsx",
      lineNumber: 265,
      columnNumber: 7
    }, this),
    showSuccessModal && lastOrderDetails && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in backdrop-blur-sm", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-green-50 p-6 flex flex-col items-center justify-center border-b border-green-100", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-green-100 p-3 rounded-full mb-4", children: /* @__PURE__ */ jsxDEV(CheckCircle, { size: 48, className: "text-green-600" }, void 0, false, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 440,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 439,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold text-gray-900", children: "Order Placed!" }, void 0, false, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 442,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-green-800 font-medium", children: [
          "#",
          lastOrderDetails.order.id
        ] }, void 0, true, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 443,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/OrderTaking.tsx",
        lineNumber: 438,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-6 space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: `p-4 rounded-xl border space-y-3 ${lastOrderDetails.emailStatus.wasBlocked ? "bg-amber-50 border-amber-200" : "bg-gray-50 border-gray-100"}`, children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-start gap-3", children: [
          lastOrderDetails.emailStatus.wasBlocked ? /* @__PURE__ */ jsxDEV(AlertCircle, { className: "text-amber-600 mt-1", size: 20 }, void 0, false, {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 450,
            columnNumber: 17
          }, this) : /* @__PURE__ */ jsxDEV(Mail, { className: "text-amber-600 mt-1", size: 20 }, void 0, false, {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 452,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-bold text-gray-800", children: lastOrderDetails.emailStatus.wasBlocked ? "Auto-Email Blocked by Security" : "Email Notification Status" }, void 0, false, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 455,
              columnNumber: 24
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-500 mt-1", children: [
              "Admin: ",
              lastOrderDetails.emailStatus.adminSent ? /* @__PURE__ */ jsxDEV("span", { className: "text-green-600 font-bold", children: "Sent" }, void 0, false, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 462,
                columnNumber: 75
              }, this) : /* @__PURE__ */ jsxDEV("span", { className: "text-red-500", children: "Failed" }, void 0, false, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 462,
                columnNumber: 132
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 461,
              columnNumber: 24
            }, this),
            lastOrderDetails.customerEmail && /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-500", children: [
              "Customer: ",
              lastOrderDetails.emailStatus.customerSent ? /* @__PURE__ */ jsxDEV("span", { className: "text-green-600 font-bold", children: "Sent" }, void 0, false, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 466,
                columnNumber: 85
              }, this) : /* @__PURE__ */ jsxDEV("span", { className: "text-red-500", children: "Failed" }, void 0, false, {
                fileName: "/app/applet/pages/OrderTaking.tsx",
                lineNumber: 466,
                columnNumber: 142
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 465,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/OrderTaking.tsx",
            lineNumber: 454,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 448,
          columnNumber: 18
        }, this) }, void 0, false, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 447,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxDEV(
            "a",
            {
              href: lastOrderDetails.mailto,
              className: `w-full font-bold py-3 rounded-xl transition text-center flex items-center justify-center gap-2 ${lastOrderDetails.emailStatus.wasBlocked || !lastOrderDetails.emailStatus.adminSent && !lastOrderDetails.emailStatus.customerSent ? "bg-amber-600 hover:bg-amber-700 text-white shadow-md" : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium"}`,
              children: [
                /* @__PURE__ */ jsxDEV(Mail, { size: 16 }, void 0, false, {
                  fileName: "/app/applet/pages/OrderTaking.tsx",
                  lineNumber: 482,
                  columnNumber: 19
                }, this),
                lastOrderDetails.emailStatus.wasBlocked ? "Send Email Manually" : "Open in Email Client"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 474,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: closeSuccessModal,
              className: "w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition",
              children: "Return to Dashboard"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/pages/OrderTaking.tsx",
              lineNumber: 486,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/pages/OrderTaking.tsx",
          lineNumber: 473,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/OrderTaking.tsx",
        lineNumber: 446,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/OrderTaking.tsx",
      lineNumber: 437,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/pages/OrderTaking.tsx",
      lineNumber: 436,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/pages/OrderTaking.tsx",
    lineNumber: 197,
    columnNumber: 5
  }, this);
};
_s(OrderTaking, "eYM3f6dmU+2tDHzQcx62o5ZVRNk=", false, function() {
  return [useOutletContext, useNavigate];
});
_c = OrderTaking;
export default OrderTaking;
var _c;
$RefreshReg$(_c, "OrderTaking");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/applet/pages/OrderTaking.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/applet/pages/OrderTaking.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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O0FBQUEsY0FDQyxNQUFNN0UsaUJBQWlCMkU7QUFBQUEsY0FDdkIsV0FBVyxrR0FDUDNFLGlCQUFpQjRFLFlBQVlJLGNBQWUsQ0FBQ2hGLGlCQUFpQjRFLFlBQVlFLGFBQWEsQ0FBQzlFLGlCQUFpQjRFLFlBQVlDLGVBQ25ILHlEQUNBLDRFQUE0RTtBQUFBLGNBR2xGO0FBQUEsdUNBQUMsUUFBSyxNQUFNLE1BQVo7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBZTtBQUFBLGdCQUNkN0UsaUJBQWlCNEUsWUFBWUksYUFBYSx3QkFBd0I7QUFBQTtBQUFBO0FBQUEsWUFUckU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBVUE7QUFBQSxVQUVBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxTQUFTQztBQUFBQSxjQUNULFdBQVU7QUFBQSxjQUF5RjtBQUFBO0FBQUEsWUFGckc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBS0E7QUFBQSxhQWxCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBbUJBO0FBQUEsV0E5Q0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQStDQTtBQUFBLFNBeERGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0F5REEsS0ExREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQTJEQTtBQUFBLE9BMVNKO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0E0U0E7QUFFSjtBQUFFL0csR0F0ZElELGFBQXFCO0FBQUEsVUFDc0N0QixrQkFDOUNDLFdBQVc7QUFBQTtBQUFBLEtBRnhCcUI7QUF3ZE4sZUFBZUE7QUFBWSxJQUFBbUk7QUFBQSxhQUFBQSxJQUFBIiwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZU91dGxldENvbnRleHQiLCJ1c2VOYXZpZ2F0ZSIsIk9yZGVyU3RhdHVzIiwiUGF5bWVudFN0YXR1cyIsIlNlYXJjaCIsIlBsdXMiLCJNaW51cyIsIlNob3BwaW5nQ2FydCIsIkNoZWNrIiwiQ2FsZW5kYXIiLCJGaWxlVGV4dCIsIkNyZWRpdENhcmQiLCJNYWlsIiwiQ2hlY2tDaXJjbGUiLCJUcmFzaDIiLCJQYWNrYWdlIiwiQWxlcnRDaXJjbGUiLCJNZXNzYWdlU3F1YXJlIiwic2VuZE9yZGVyQ29uZmlybWF0aW9uU01TIiwic2VuZE9yZGVyQ29uZmlybWF0aW9uV2hhdHNBcHAiLCJzZW5kT3JkZXJFbWFpbCIsImdldE1haWx0b0xpbmsiLCJPcmRlclRha2luZyIsIl9zIiwicHJvZHVjdHMiLCJjdXN0b21lcnMiLCJhZGRPcmRlciIsImN1cnJlbnRVc2VyIiwib3JkZXJzIiwibmF2aWdhdGUiLCJjYXJ0Iiwic2V0Q2FydCIsInNlYXJjaFRlcm0iLCJzZXRTZWFyY2hUZXJtIiwiYWN0aXZlTW9iaWxlVGFiIiwic2V0QWN0aXZlTW9iaWxlVGFiIiwic2VsZWN0ZWRDdXN0b21lcklkIiwic2V0U2VsZWN0ZWRDdXN0b21lcklkIiwiZGVsaXZlcnlEYXRlIiwic2V0RGVsaXZlcnlEYXRlIiwibm90ZXMiLCJzZXROb3RlcyIsInBheW1lbnRTdGF0dXMiLCJzZXRQYXltZW50U3RhdHVzIiwiUEVORElORyIsInNlbmRTbXMiLCJzZXRTZW5kU21zIiwic2VuZFdoYXRzYXBwIiwic2V0U2VuZFdoYXRzYXBwIiwiaXNTdWJtaXR0aW5nIiwic2V0SXNTdWJtaXR0aW5nIiwic2hvd1N1Y2Nlc3NNb2RhbCIsInNldFNob3dTdWNjZXNzTW9kYWwiLCJsYXN0T3JkZXJEZXRhaWxzIiwic2V0TGFzdE9yZGVyRGV0YWlscyIsImFkZFRvQ2FydCIsInByb2R1Y3QiLCJwcmV2IiwiZXhpc3RpbmciLCJmaW5kIiwiaXRlbSIsInByb2R1Y3RJZCIsImlkIiwibWFwIiwicXVhbnRpdHkiLCJwcmljZUF0VGltZSIsInByaWNlIiwicHJvZHVjdE5hbWUiLCJuYW1lIiwicmVtb3ZlRnJvbUNhcnQiLCJmaWx0ZXIiLCJ1cGRhdGVRdWFudGl0eSIsImRlbHRhIiwibmV3UXR5IiwiY2FydFRvdGFsIiwicmVkdWNlIiwic3VtIiwiZ2V0TmV4dE9yZGVySWQiLCJtYXhJZCIsImZvckVhY2giLCJvcmRlciIsIm51bSIsInBhcnNlSW50IiwicmVwbGFjZSIsImlzTmFOIiwidG9TdHJpbmciLCJoYW5kbGVDaGVja291dCIsImxlbmd0aCIsImN1c3RvbWVyIiwiYyIsIm9yZGVyRGF0ZSIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInNwbGl0IiwibmV3T3JkZXJJZCIsIm5ld09yZGVyIiwiY3VzdG9tZXJJZCIsImN1c3RvbWVyTmFtZSIsImJ1c2luZXNzTmFtZSIsImN1c3RvbWVyQWRkcmVzcyIsImFkZHJlc3MiLCJzYWxlc0V4ZWNJZCIsIml0ZW1zIiwidG90YWxBbW91bnQiLCJzdGF0dXMiLCJkYXRlIiwidW5kZWZpbmVkIiwicGhvbmUiLCJ0b3RhbFF0eSIsImRpc3RpbmN0SXRlbXMiLCJwaG9uZU51bWJlciIsIm9yZGVySWQiLCJzYWxlc0V4ZWNOYW1lIiwidG90YWxRdWFudGl0eSIsImFtb3VudCIsInRoZW4iLCJzdWNjZXNzIiwiY29uc29sZSIsImxvZyIsIml0ZW1zU3VtbWFyeVN0ciIsImpvaW4iLCJpdGVtc1N1bW1hcnkiLCJyZXMiLCJtZXNzYWdlIiwid2FybiIsImVtYWlsUmVzdWx0IiwiY3VzdG9tZXJFbWFpbCIsImVtYWlsIiwibWFpbHRvIiwiZW1haWxTdGF0dXMiLCJjdXN0b21lclNlbnQiLCJhZG1pblNlbnQiLCJhZG1pbiIsIndhc0Jsb2NrZWQiLCJjbG9zZVN1Y2Nlc3NNb2RhbCIsInVzZUVmZmVjdCIsInRvbW9ycm93Iiwic2V0RGF0ZSIsImdldERhdGUiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJwIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsImltYWdlIiwic3RvY2siLCJjYXRlZ29yeSIsInRvRml4ZWQiLCJvd25lck5hbWUiLCJPYmplY3QiLCJ2YWx1ZXMiLCJjaGVja2VkIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiT3JkZXJUYWtpbmcudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlT3V0bGV0Q29udGV4dCwgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IEFwcENvbnRleHRUeXBlLCBQcm9kdWN0LCBPcmRlckl0ZW0sIE9yZGVyLCBPcmRlclN0YXR1cywgUGF5bWVudFN0YXR1cyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFNlYXJjaCwgUGx1cywgTWludXMsIFNob3BwaW5nQ2FydCwgQ2hlY2ssIENhbGVuZGFyLCBGaWxlVGV4dCwgQ3JlZGl0Q2FyZCwgWCwgTWFpbCwgQ2hlY2tDaXJjbGUsIFRyYXNoMiwgUGFja2FnZSwgQWxlcnRDaXJjbGUsIEFycm93UmlnaHQsIE1lc3NhZ2VTcXVhcmUgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgc2VuZE9yZGVyQ29uZmlybWF0aW9uU01TIH0gZnJvbSAnLi4vc2VydmljZXMvc21zU2VydmljZSc7XG5pbXBvcnQgeyBzZW5kT3JkZXJDb25maXJtYXRpb25XaGF0c0FwcCB9IGZyb20gJy4uL3NlcnZpY2VzL3doYXRzYXBwU2VydmljZSc7XG5pbXBvcnQgeyBzZW5kT3JkZXJFbWFpbCwgZ2V0TWFpbHRvTGluayB9IGZyb20gJy4uL3NlcnZpY2VzL2VtYWlsU2VydmljZSc7XG5cbmNvbnN0IE9yZGVyVGFraW5nOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgeyBwcm9kdWN0cywgY3VzdG9tZXJzLCBhZGRPcmRlciwgY3VycmVudFVzZXIsIG9yZGVycyB9ID0gdXNlT3V0bGV0Q29udGV4dDxBcHBDb250ZXh0VHlwZT4oKTtcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICBcbiAgLy8gQ2FydCBTdGF0ZVxuICBjb25zdCBbY2FydCwgc2V0Q2FydF0gPSB1c2VTdGF0ZTxPcmRlckl0ZW1bXT4oW10pO1xuICBjb25zdCBbc2VhcmNoVGVybSwgc2V0U2VhcmNoVGVybV0gPSB1c2VTdGF0ZSgnJyk7XG4gIFxuICAvLyBNb2JpbGUgVUkgU3RhdGVcbiAgY29uc3QgW2FjdGl2ZU1vYmlsZVRhYiwgc2V0QWN0aXZlTW9iaWxlVGFiXSA9IHVzZVN0YXRlPCdjYXRhbG9nJyB8ICdjYXJ0Jz4oJ2NhdGFsb2cnKTtcbiAgXG4gIC8vIEZvcm0gU3RhdGVcbiAgY29uc3QgW3NlbGVjdGVkQ3VzdG9tZXJJZCwgc2V0U2VsZWN0ZWRDdXN0b21lcklkXSA9IHVzZVN0YXRlPHN0cmluZz4oJycpO1xuICBjb25zdCBbZGVsaXZlcnlEYXRlLCBzZXREZWxpdmVyeURhdGVdID0gdXNlU3RhdGU8c3RyaW5nPignJyk7XG4gIGNvbnN0IFtub3Rlcywgc2V0Tm90ZXNdID0gdXNlU3RhdGU8c3RyaW5nPignJyk7XG4gIGNvbnN0IFtwYXltZW50U3RhdHVzLCBzZXRQYXltZW50U3RhdHVzXSA9IHVzZVN0YXRlPFBheW1lbnRTdGF0dXM+KFBheW1lbnRTdGF0dXMuUEVORElORyk7XG4gIGNvbnN0IFtzZW5kU21zLCBzZXRTZW5kU21zXSA9IHVzZVN0YXRlKGZhbHNlKTsgLy8gRGVmYXVsdCB0byBPRkYgYXMgcmVxdWVzdGVkXG4gIGNvbnN0IFtzZW5kV2hhdHNhcHAsIHNldFNlbmRXaGF0c2FwcF0gPSB1c2VTdGF0ZSh0cnVlKTsgLy8gRGVmYXVsdCB0byBPTiBmb3IgcXVpY2sgdXBkYXRlc1xuICBcbiAgY29uc3QgW2lzU3VibWl0dGluZywgc2V0SXNTdWJtaXR0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgXG4gIC8vIFN1Y2Nlc3MgTW9kYWwgU3RhdGVcbiAgY29uc3QgW3Nob3dTdWNjZXNzTW9kYWwsIHNldFNob3dTdWNjZXNzTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbGFzdE9yZGVyRGV0YWlscywgc2V0TGFzdE9yZGVyRGV0YWlsc10gPSB1c2VTdGF0ZTx7XG4gICAgb3JkZXI6IE9yZGVyLCBcbiAgICBjdXN0b21lckVtYWlsOiBzdHJpbmcsIFxuICAgIG1haWx0bzogc3RyaW5nLFxuICAgIGVtYWlsU3RhdHVzOiB7XG4gICAgICAgIGN1c3RvbWVyU2VudDogYm9vbGVhbjtcbiAgICAgICAgYWRtaW5TZW50OiBib29sZWFuO1xuICAgICAgICB3YXNCbG9ja2VkOiBib29sZWFuO1xuICAgIH1cbiAgfSB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IGFkZFRvQ2FydCA9IChwcm9kdWN0OiBQcm9kdWN0KSA9PiB7XG4gICAgc2V0Q2FydChwcmV2ID0+IHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nID0gcHJldi5maW5kKGl0ZW0gPT4gaXRlbS5wcm9kdWN0SWQgPT09IHByb2R1Y3QuaWQpO1xuICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgIHJldHVybiBwcmV2Lm1hcChpdGVtID0+IGl0ZW0ucHJvZHVjdElkID09PSBwcm9kdWN0LmlkID8geyAuLi5pdGVtLCBxdWFudGl0eTogaXRlbS5xdWFudGl0eSArIDEgfSA6IGl0ZW0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFsuLi5wcmV2LCB7IHByb2R1Y3RJZDogcHJvZHVjdC5pZCwgcXVhbnRpdHk6IDEsIHByaWNlQXRUaW1lOiBwcm9kdWN0LnByaWNlLCBwcm9kdWN0TmFtZTogcHJvZHVjdC5uYW1lIH1dO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZUZyb21DYXJ0ID0gKHByb2R1Y3RJZDogc3RyaW5nKSA9PiB7XG4gICAgc2V0Q2FydChwcmV2ID0+IHByZXYuZmlsdGVyKGl0ZW0gPT4gaXRlbS5wcm9kdWN0SWQgIT09IHByb2R1Y3RJZCkpO1xuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZVF1YW50aXR5ID0gKHByb2R1Y3RJZDogc3RyaW5nLCBkZWx0YTogbnVtYmVyKSA9PiB7XG4gICAgc2V0Q2FydChwcmV2ID0+IHByZXYubWFwKGl0ZW0gPT4ge1xuICAgICAgaWYgKGl0ZW0ucHJvZHVjdElkID09PSBwcm9kdWN0SWQpIHtcbiAgICAgICAgY29uc3QgbmV3UXR5ID0gaXRlbS5xdWFudGl0eSArIGRlbHRhO1xuICAgICAgICByZXR1cm4gbmV3UXR5ID4gMCA/IHsgLi4uaXRlbSwgcXVhbnRpdHk6IG5ld1F0eSB9IDogaXRlbTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0pKTtcbiAgfTtcblxuICBjb25zdCBjYXJ0VG90YWwgPSBjYXJ0LnJlZHVjZSgoc3VtLCBpdGVtKSA9PiBzdW0gKyAoaXRlbS5wcmljZUF0VGltZSAqIGl0ZW0ucXVhbnRpdHkpLCAwKTtcblxuICBjb25zdCBnZXROZXh0T3JkZXJJZCA9ICgpID0+IHtcbiAgICBsZXQgbWF4SWQgPSAxMDAwO1xuICAgIG9yZGVycy5mb3JFYWNoKG9yZGVyID0+IHtcbiAgICAgICAgLy8gU3RyaXAgbm9uLW51bWVyaWMgY2hhcmFjdGVycyB0byBoYW5kbGUgJ28xJywgJ28yJyBldGMuXG4gICAgICAgIGNvbnN0IG51bSA9IHBhcnNlSW50KG9yZGVyLmlkLnJlcGxhY2UoL1xcRC9nLCAnJykpO1xuICAgICAgICBpZiAoIWlzTmFOKG51bSkgJiYgbnVtIDwgMTAwMDAwMDAwMCkge1xuICAgICAgICAgICAgaWYgKG51bSA+IG1heElkKSBtYXhJZCA9IG51bTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiAobWF4SWQgKyAxKS50b1N0cmluZygpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNoZWNrb3V0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghc2VsZWN0ZWRDdXN0b21lcklkIHx8IGNhcnQubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgc2V0SXNTdWJtaXR0aW5nKHRydWUpO1xuICAgIFxuICAgIGNvbnN0IGN1c3RvbWVyID0gY3VzdG9tZXJzLmZpbmQoYyA9PiBjLmlkID09PSBzZWxlY3RlZEN1c3RvbWVySWQpO1xuICAgIGlmICghY3VzdG9tZXIpIHtcbiAgICAgIHNldElzU3VibWl0dGluZyhmYWxzZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgb3JkZXJEYXRlID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XG4gICAgY29uc3QgbmV3T3JkZXJJZCA9IGdldE5leHRPcmRlcklkKCk7XG5cbiAgICBjb25zdCBuZXdPcmRlcjogT3JkZXIgPSB7XG4gICAgICBpZDogbmV3T3JkZXJJZCxcbiAgICAgIGN1c3RvbWVySWQ6IGN1c3RvbWVyLmlkLFxuICAgICAgY3VzdG9tZXJOYW1lOiBjdXN0b21lci5idXNpbmVzc05hbWUsXG4gICAgICBjdXN0b21lckFkZHJlc3M6IGN1c3RvbWVyLmFkZHJlc3MsXG4gICAgICBzYWxlc0V4ZWNJZDogY3VycmVudFVzZXIuaWQsXG4gICAgICBpdGVtczogY2FydCxcbiAgICAgIHRvdGFsQW1vdW50OiBjYXJ0VG90YWwsXG4gICAgICBzdGF0dXM6IE9yZGVyU3RhdHVzLlBFTkRJTkcsXG4gICAgICBkYXRlOiBvcmRlckRhdGUsXG4gICAgICBkZWxpdmVyeURhdGU6IGRlbGl2ZXJ5RGF0ZSB8fCB1bmRlZmluZWQsXG4gICAgICBub3Rlczogbm90ZXMgfHwgJycsXG4gICAgICBwYXltZW50U3RhdHVzOiBwYXltZW50U3RhdHVzXG4gICAgfTtcblxuICAgIGFkZE9yZGVyKG5ld09yZGVyKTtcblxuICAgIGlmIChzZW5kU21zICYmIGN1c3RvbWVyLnBob25lKSB7XG4gICAgICBjb25zdCB0b3RhbFF0eSA9IGNhcnQucmVkdWNlKChzdW0sIGl0ZW0pID0+IHN1bSArIGl0ZW0ucXVhbnRpdHksIDApO1xuICAgICAgY29uc3QgZGlzdGluY3RJdGVtcyA9IGNhcnQubGVuZ3RoO1xuICAgICAgXG4gICAgICBzZW5kT3JkZXJDb25maXJtYXRpb25TTVMoe1xuICAgICAgICBwaG9uZU51bWJlcjogY3VzdG9tZXIucGhvbmUsXG4gICAgICAgIG9yZGVySWQ6IG5ld09yZGVyLmlkLFxuICAgICAgICBzYWxlc0V4ZWNOYW1lOiBjdXJyZW50VXNlci5uYW1lLFxuICAgICAgICBkaXN0aW5jdEl0ZW1zOiBkaXN0aW5jdEl0ZW1zLFxuICAgICAgICB0b3RhbFF1YW50aXR5OiB0b3RhbFF0eSwgXG4gICAgICAgIGFtb3VudDogY2FydFRvdGFsXG4gICAgICB9KS50aGVuKHN1Y2Nlc3MgPT4ge1xuICAgICAgICBpZiAoc3VjY2VzcykgY29uc29sZS5sb2coXCJTTVMgcHJvY2VzcyBmaW5pc2hlZC5cIik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc2VuZFdoYXRzYXBwICYmIGN1c3RvbWVyLnBob25lKSB7XG4gICAgICBjb25zdCB0b3RhbFF0eSA9IGNhcnQucmVkdWNlKChzdW0sIGl0ZW0pID0+IHN1bSArIGl0ZW0ucXVhbnRpdHksIDApO1xuICAgICAgY29uc3QgaXRlbXNTdW1tYXJ5U3RyID0gY2FydC5tYXAoaXRlbSA9PiBgJHtpdGVtLnF1YW50aXR5fXggJHtpdGVtLnByb2R1Y3ROYW1lfWApLmpvaW4oJywgJyk7XG4gICAgICBcbiAgICAgIHNlbmRPcmRlckNvbmZpcm1hdGlvbldoYXRzQXBwKHtcbiAgICAgICAgcGhvbmVOdW1iZXI6IGN1c3RvbWVyLnBob25lLFxuICAgICAgICBjdXN0b21lck5hbWU6IGN1c3RvbWVyLmJ1c2luZXNzTmFtZSxcbiAgICAgICAgb3JkZXJJZDogbmV3T3JkZXJJZCxcbiAgICAgICAgaXRlbXNTdW1tYXJ5OiBpdGVtc1N1bW1hcnlTdHIsXG4gICAgICAgIHRvdGFsUXVhbnRpdHk6IHRvdGFsUXR5LFxuICAgICAgICB0b3RhbEFtb3VudDogY2FydFRvdGFsLFxuICAgICAgICBzYWxlc0V4ZWNOYW1lOiBjdXJyZW50VXNlci5uYW1lXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2hhdHNBcHAgb3JkZXIgY29uZmlybWF0aW9uIHNlbnQgc3VjY2Vzc2Z1bGx5OlwiLCByZXMubWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFwiV2hhdHNBcHAgb3JkZXIgY29uZmlybWF0aW9uIGZhaWxlZDpcIiwgcmVzLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBlbWFpbFJlc3VsdCA9IGF3YWl0IHNlbmRPcmRlckVtYWlsKG5ld09yZGVyLCBjdXN0b21lciwgY3VycmVudFVzZXIubmFtZSk7XG5cbiAgICBzZXRMYXN0T3JkZXJEZXRhaWxzKHtcbiAgICAgIG9yZGVyOiBuZXdPcmRlcixcbiAgICAgIGN1c3RvbWVyRW1haWw6IGN1c3RvbWVyLmVtYWlsLFxuICAgICAgbWFpbHRvOiBnZXRNYWlsdG9MaW5rKG5ld09yZGVyLCBjdXN0b21lciwgY3VycmVudFVzZXIubmFtZSksXG4gICAgICBlbWFpbFN0YXR1czoge1xuICAgICAgICAgIGN1c3RvbWVyU2VudDogZW1haWxSZXN1bHQuY3VzdG9tZXIuc3VjY2VzcyxcbiAgICAgICAgICBhZG1pblNlbnQ6IGVtYWlsUmVzdWx0LmFkbWluLnN1Y2Nlc3MsXG4gICAgICAgICAgd2FzQmxvY2tlZDogZW1haWxSZXN1bHQuY3VzdG9tZXIud2FzQmxvY2tlZCB8fCBlbWFpbFJlc3VsdC5hZG1pbi53YXNCbG9ja2VkIHx8IGZhbHNlXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzZXRJc1N1Ym1pdHRpbmcoZmFsc2UpO1xuICAgIHNldFNob3dTdWNjZXNzTW9kYWwodHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgY2xvc2VTdWNjZXNzTW9kYWwgPSAoKSA9PiB7XG4gICAgc2V0U2hvd1N1Y2Nlc3NNb2RhbChmYWxzZSk7XG4gICAgbmF2aWdhdGUoJy9vcmRlcnMnKTtcbiAgfTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHRvbW9ycm93ID0gbmV3IERhdGUoKTtcbiAgICB0b21vcnJvdy5zZXREYXRlKHRvbW9ycm93LmdldERhdGUoKSArIDEpO1xuICAgIHNldERlbGl2ZXJ5RGF0ZSh0b21vcnJvdy50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0pO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImgtW2NhbGMoMTAwdmgtNnJlbSldIGZsZXggZmxleC1jb2wgbGc6ZmxleC1yb3cgZ2FwLTZcIj5cbiAgICAgIFxuICAgICAgey8qIE1PQklMRSBUQUJTIC0gVmlzaWJsZSBvbmx5IG9uIFBob25lcyAoPDc2OHB4KSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWQ6aGlkZGVuIGZsZXggYmctd2hpdGUgcm91bmRlZC1sZyBwLTEgc2hhZG93LXNtIGJvcmRlciBib3JkZXItZ3JheS0yMDAgc2hyaW5rLTAgbWItMlwiPlxuICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZU1vYmlsZVRhYignY2F0YWxvZycpfVxuICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBweS0yIHJvdW5kZWQtbWQgdGV4dC1zbSBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiB0cmFuc2l0aW9uICR7YWN0aXZlTW9iaWxlVGFiID09PSAnY2F0YWxvZycgPyAnYmctYW1iZXItMTAwIHRleHQtYW1iZXItODAwJyA6ICd0ZXh0LWdyYXktNjAwJ31gfVxuICAgICAgICA+XG4gICAgICAgICAgPFBhY2thZ2Ugc2l6ZT17MTZ9IC8+IENhdGFsb2dcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlTW9iaWxlVGFiKCdjYXJ0Jyl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgZmxleC0xIHB5LTIgcm91bmRlZC1tZCB0ZXh0LXNtIGZvbnQtbWVkaXVtIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHRyYW5zaXRpb24gJHthY3RpdmVNb2JpbGVUYWIgPT09ICdjYXJ0JyA/ICdiZy1hbWJlci0xMDAgdGV4dC1hbWJlci04MDAnIDogJ3RleHQtZ3JheS02MDAnfWB9XG4gICAgICAgID5cbiAgICAgICAgICA8U2hvcHBpbmdDYXJ0IHNpemU9ezE2fSAvPiBDYXJ0ICh7Y2FydC5sZW5ndGh9KVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTEVGVCAoVE9QIG9uIFRhYmxldCk6IFByb2R1Y3QgQ2F0YWxvZyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbGc6dy1bNjAlXSBmbGV4IGZsZXgtY29sIGgtZnVsbCBmbGV4LTEgbWluLWgtMCAke2FjdGl2ZU1vYmlsZVRhYiA9PT0gJ2NhcnQnID8gJ2hpZGRlbiBtZDpmbGV4JyA6ICdmbGV4J31gfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi00XCI+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQteGwgbWQ6dGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIj5DcmVhdGUgTmV3IE9yZGVyPC9oMT5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwIHRleHQtc20gaGlkZGVuIGxnOmJsb2NrXCI+U2VsZWN0IHByb2R1Y3RzIGFuZCBhZGQgZGV0YWlscyB0byBnZW5lcmF0ZSBhbiBvcmRlci48L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNCByZWxhdGl2ZSBzaHJpbmstMFwiPlxuICAgICAgICAgICA8U2VhcmNoIGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMyB0b3AtMS8yIHRyYW5zZm9ybSAtdHJhbnNsYXRlLXktMS8yIHRleHQtZ3JheS00MDBcIiBzaXplPXsyMH0gLz5cbiAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGNhdGFsb2cuLi5cIiBcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwbC0xMCBwci00IHB5LTMgYm9yZGVyIGJvcmRlci1ncmF5LTIwMCByb3VuZGVkLWxnIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgc2hhZG93LXNtIGlucHV0LXJlc3BvbnNpdmUgYmctd2hpdGUgdGV4dC1ibGFja1wiXG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNoVGVybX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoVGVybShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LXktYXV0byBwci0yIGN1c3RvbS1zY3JvbGxiYXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTMgZ2FwLTQgcGItMjAgbWQ6cGItNFwiPlxuICAgICAgICAgICAge3Byb2R1Y3RzLmZpbHRlcihwID0+IHAubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSkpLm1hcChwcm9kdWN0ID0+IChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e3Byb2R1Y3QuaWR9IGNsYXNzTmFtZT1cImJnLXdoaXRlIHAtNCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItZ3JheS0xMDAgc2hhZG93LXNtIGZsZXggZmxleC1yb3cgbWQ6ZmxleC1jb2wgZ2FwLTQgaG92ZXI6c2hhZG93LW1kIHRyYW5zaXRpb24gaXRlbXMtY2VudGVyIG1kOml0ZW1zLXN0cmV0Y2hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGgtMjAgdy0yMCBtZDpoLTMyIG1kOnctZnVsbCBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3Byb2R1Y3QuaW1hZ2V9IGFsdD17cHJvZHVjdC5uYW1lfSBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlciByb3VuZGVkLWxnXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTEgcmlnaHQtMSBiZy13aGl0ZS85MCBweC0yIHB5LTAuNSByb3VuZGVkIHRleHQteHMgZm9udC1ib2xkIHNoYWRvdy1zbSBoaWRkZW4gbWQ6YmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgICAge3Byb2R1Y3Quc3RvY2t9IGxlZnRcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwIGxlYWRpbmctdGlnaHQgbGluZS1jbGFtcC0xXCI+e3Byb2R1Y3QubmFtZX08L2gzPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZ3JheS01MDAgbWItMlwiPntwcm9kdWN0LmNhdGVnb3J5fTwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1hbWJlci02MDBcIj7igrl7cHJvZHVjdC5wcmljZS50b0ZpeGVkKDIpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBhZGRUb0NhcnQocHJvZHVjdCl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctYW1iZXItMTAwIHRleHQtYW1iZXItODAwIGhvdmVyOmJnLWFtYmVyLTIwMCBwLTIgcm91bmRlZC1sZyB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxQbHVzIHNpemU9ezE4fSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogUklHSFQgKEJPVFRPTSBvbiBUYWJsZXQpOiBPcmRlciBGb3JtICYgQ2FydCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdy1mdWxsIGxnOnctW2NhbGMoNDAlLTEuNXJlbSldIGJnLXdoaXRlIHJvdW5kZWQteGwgc2hhZG93LWxnIGJvcmRlciBib3JkZXItZ3JheS0yMDAgZmxleCBmbGV4LWNvbCBoLWZ1bGwgZmxleC0xIG1pbi1oLTAgb3ZlcmZsb3ctaGlkZGVuICR7YWN0aXZlTW9iaWxlVGFiID09PSAnY2F0YWxvZycgPyAnaGlkZGVuIG1kOmZsZXgnIDogJ2ZsZXgnfWB9PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgYm9yZGVyLWIgYm9yZGVyLWdyYXktMTAwIGJnLWdyYXktNTAgZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHNocmluay0wXCI+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWxnIGZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiB0ZXh0LWdyYXktODAwXCI+XG4gICAgICAgICAgICA8RmlsZVRleHQgc2l6ZT17MjB9IGNsYXNzTmFtZT1cInRleHQtYW1iZXItNjAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPk9yZGVyIERldGFpbHM8L3NwYW4+XG4gICAgICAgICAgPC9oMj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZ3JheS01MDBcIj57Y2FydC5sZW5ndGh9IGl0ZW1zPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBvdmVyZmxvdy15LWF1dG8gcC01IHNwYWNlLXktNiBjdXN0b20tc2Nyb2xsYmFyXCI+XG4gICAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIj5DdXN0b21lcjwvbGFiZWw+XG4gICAgICAgICAgICA8c2VsZWN0IFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcC0yLjUgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBiZy13aGl0ZSBpbnB1dC1yZXNwb25zaXZlIHRleHQtYmxhY2tcIlxuICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDdXN0b21lcklkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlbGVjdGVkQ3VzdG9tZXJJZChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj4tLSBTZWxlY3QgQnVzaW5lc3MgLS08L29wdGlvbj5cbiAgICAgICAgICAgICAge2N1c3RvbWVyc1xuICAgICAgICAgICAgICAgIC5maWx0ZXIoYyA9PiBjLnN0YXR1cyA9PT0gJ0FjdGl2ZScpXG4gICAgICAgICAgICAgICAgLm1hcChjID0+IChcbiAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtjLmlkfSB2YWx1ZT17Yy5pZH0+e2MuYnVzaW5lc3NOYW1lfSAoe2Mub3duZXJOYW1lfSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgIDxDYWxlbmRhciBzaXplPXsxMn0gLz4gRGVsaXZlcnkgRGF0ZVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgdHlwZT1cImRhdGVcIiBcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtkZWxpdmVyeURhdGV9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldERlbGl2ZXJ5RGF0ZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcC0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBmb2N1czpyaW5nLTIgdGV4dC1zbSBpbnB1dC1yZXNwb25zaXZlIGJnLXdoaXRlIHRleHQtYmxhY2tcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtZ3JheS01MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgPENyZWRpdENhcmQgc2l6ZT17MTJ9IC8+IFBheW1lbnRcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxzZWxlY3QgXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17cGF5bWVudFN0YXR1c31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UGF5bWVudFN0YXR1cyhlLnRhcmdldC52YWx1ZSBhcyBQYXltZW50U3RhdHVzKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwLTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiB0ZXh0LXNtIGJnLXdoaXRlIGlucHV0LXJlc3BvbnNpdmUgdGV4dC1ibGFja1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge09iamVjdC52YWx1ZXMoUGF5bWVudFN0YXR1cykubWFwKHN0YXR1cyA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtzdGF0dXN9IHZhbHVlPXtzdGF0dXN9PntzdGF0dXN9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPk9yZGVyIE5vdGVzPC9sYWJlbD5cbiAgICAgICAgICAgICA8dGV4dGFyZWEgXG4gICAgICAgICAgICAgICAgcm93cz17Mn1cbiAgICAgICAgICAgICAgICB2YWx1ZT17bm90ZXN9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROb3RlcyhlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTcGVjaWFsIGluc3RydWN0aW9ucy4uLlwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHAtMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIHRleHQtc20gcmVzaXplLW5vbmUgaW5wdXQtcmVzcG9uc2l2ZSBiZy13aGl0ZSB0ZXh0LWJsYWNrXCJcbiAgICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXItdCBib3JkZXItZ3JheS0xMDAgcHQtNFwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTcwMCBtYi0zIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgPHNwYW4+U2VsZWN0ZWQgSXRlbXM8L3NwYW4+XG4gICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbm9ybWFsIHRleHQtZ3JheS01MDBcIj57Y2FydC5sZW5ndGh9IGl0ZW1zPC9zcGFuPlxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAge2NhcnQubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHB5LTggYmctZ3JheS01MCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZGFzaGVkIGJvcmRlci1ncmF5LTIwMFwiPlxuICAgICAgICAgICAgICAgICA8U2hvcHBpbmdDYXJ0IGNsYXNzTmFtZT1cIm14LWF1dG8gdGV4dC1ncmF5LTMwMCBtYi0yXCIgc2l6ZT17MjR9IC8+XG4gICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTQwMFwiPkNhcnQgaXMgZW1wdHk8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICB7Y2FydC5tYXAoaXRlbSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aXRlbS5wcm9kdWN0SWR9IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBwLTIgYmctZ3JheS01MCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZ3JheS0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgbWluLXctMCBwci0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LW1lZGl1bSB0ZXh0LXNtIHRleHQtZ3JheS05MDAgdHJ1bmNhdGVcIj57aXRlbS5wcm9kdWN0TmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1ncmF5LTUwMFwiPuKCuXtpdGVtLnByaWNlQXRUaW1lLnRvRml4ZWQoMil9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgYmctd2hpdGUgcm91bmRlZC1tZCBib3JkZXIgYm9yZGVyLWdyYXktMjAwIHAtMC41IHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB1cGRhdGVRdWFudGl0eShpdGVtLnByb2R1Y3RJZCwgLTEpfSBjbGFzc05hbWU9XCJwLTEgaG92ZXI6YmctZ3JheS0xMDAgcm91bmRlZCB0ZXh0LWdyYXktNjAwXCI+PE1pbnVzIHNpemU9ezEyfS8+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdy01IHRleHQtY2VudGVyXCI+e2l0ZW0ucXVhbnRpdHl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB1cGRhdGVRdWFudGl0eShpdGVtLnByb2R1Y3RJZCwgMSl9IGNsYXNzTmFtZT1cInAtMSBob3ZlcjpiZy1ncmF5LTEwMCByb3VuZGVkIHRleHQtZ3JheS02MDBcIj48UGx1cyBzaXplPXsxMn0vPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiByZW1vdmVGcm9tQ2FydChpdGVtLnByb2R1Y3RJZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtcmVkLTUwMCB0cmFuc2l0aW9uIHAtMSBob3ZlcjpiZy1yZWQtNTAgcm91bmRlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRyYXNoMiBzaXplPXsxNn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBib3JkZXItdCBib3JkZXItZ3JheS0xMDAgYmctZ3JheS01MCBzaHJpbmstMCBzcGFjZS15LTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYmctd2hpdGUgcC0zIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1ncmF5LTIwMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1ncmF5LTcwMFwiPlxuICAgICAgICAgICAgICAgIDxNZXNzYWdlU3F1YXJlIHNpemU9ezE2fSBjbGFzc05hbWU9e3NlbmRXaGF0c2FwcCA/IFwidGV4dC1ncmVlbi02MDBcIiA6IFwidGV4dC1ncmF5LTQwMFwifSAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtXCI+U2VuZCBXaGF0c0FwcCBDb25maXJtYXRpb248L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwicmVsYXRpdmUgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGN1cnNvci1wb2ludGVyXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCIgXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzci1vbmx5IHBlZXJcIlxuICAgICAgICAgICAgICAgICAgY2hlY2tlZD17c2VuZFdoYXRzYXBwfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZW5kV2hhdHNhcHAoZS50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTEgaC02IGJnLWdyYXktMjAwIHBlZXItZm9jdXM6b3V0bGluZS1ub25lIHBlZXItZm9jdXM6cmluZy00IHBlZXItZm9jdXM6cmluZy1ncmVlbi0xMDAgcm91bmRlZC1mdWxsIHBlZXIgcGVlci1jaGVja2VkOmFmdGVyOnRyYW5zbGF0ZS14LWZ1bGwgcnRsOnBlZXItY2hlY2tlZDphZnRlcjotdHJhbnNsYXRlLXgtZnVsbCBwZWVyLWNoZWNrZWQ6YWZ0ZXI6Ym9yZGVyLXdoaXRlIGFmdGVyOmNvbnRlbnQtWycnXSBhZnRlcjphYnNvbHV0ZSBhZnRlcjp0b3AtWzJweF0gYWZ0ZXI6c3RhcnQtWzJweF0gYWZ0ZXI6Ymctd2hpdGUgYWZ0ZXI6Ym9yZGVyLWdyYXktMzAwIGFmdGVyOmJvcmRlciBhZnRlcjpyb3VuZGVkLWZ1bGwgYWZ0ZXI6aC01IGFmdGVyOnctNSBhZnRlcjp0cmFuc2l0aW9uLWFsbCBwZWVyLWNoZWNrZWQ6YmctZ3JlZW4tNjAwXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYmctd2hpdGUgcC0zIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1ncmF5LTIwMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1ncmF5LTcwMFwiPlxuICAgICAgICAgICAgICAgIDxNZXNzYWdlU3F1YXJlIHNpemU9ezE2fSBjbGFzc05hbWU9e3NlbmRTbXMgPyBcInRleHQtYmx1ZS02MDBcIiA6IFwidGV4dC1ncmF5LTQwMFwifSAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtXCI+U2VuZCBTTVMgTm90aWZpY2F0aW9uPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInJlbGF0aXZlIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBjdXJzb3ItcG9pbnRlclwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiIFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3Itb25seSBwZWVyXCJcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbmRTbXN9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlbmRTbXMoZS50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTEgaC02IGJnLWdyYXktMjAwIHBlZXItZm9jdXM6b3V0bGluZS1ub25lIHBlZXItZm9jdXM6cmluZy00IHBlZXItZm9jdXM6cmluZy1ibHVlLTEwMCByb3VuZGVkLWZ1bGwgcGVlciBwZWVyLWNoZWNrZWQ6YWZ0ZXI6dHJhbnNsYXRlLXgtZnVsbCBydGw6cGVlci1jaGVja2VkOmFmdGVyOi10cmFuc2xhdGUteC1mdWxsIHBlZXItY2hlY2tlZDphZnRlcjpib3JkZXItd2hpdGUgYWZ0ZXI6Y29udGVudC1bJyddIGFmdGVyOmFic29sdXRlIGFmdGVyOnRvcC1bMnB4XSBhZnRlcjpzdGFydC1bMnB4XSBhZnRlcjpiZy13aGl0ZSBhZnRlcjpib3JkZXItZ3JheS0zMDAgYWZ0ZXI6Ym9yZGVyIGFmdGVyOnJvdW5kZWQtZnVsbCBhZnRlcjpoLTUgYWZ0ZXI6dy01IGFmdGVyOnRyYW5zaXRpb24tYWxsIHBlZXItY2hlY2tlZDpiZy1ibHVlLTYwMFwiPjwvZGl2PlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBtYi00XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIHRleHQtc20gYmxvY2tcIj5Ub3RhbCBBbW91bnQ8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1ncmF5LTQwMFwiPlRheCBpbmNsdXNpdmU8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCI+4oK5e2NhcnRUb3RhbC50b0ZpeGVkKDIpfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgZGlzYWJsZWQ9e2NhcnQubGVuZ3RoID09PSAwIHx8ICFzZWxlY3RlZEN1c3RvbWVySWQgfHwgaXNTdWJtaXR0aW5nfVxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ2hlY2tvdXR9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgcHktMy41IHJvdW5kZWQtbGcgZm9udC1ib2xkIGZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIHNwYWNlLXgtMiB0cmFuc2l0aW9uLWFsbCB0cmFuc2Zvcm0gJHtcbiAgICAgICAgICAgICAgY2FydC5sZW5ndGggPiAwICYmIHNlbGVjdGVkQ3VzdG9tZXJJZCAmJiAhaXNTdWJtaXR0aW5nXG4gICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTYwMCB0ZXh0LXdoaXRlIGhvdmVyOmJnLWFtYmVyLTcwMCBzaGFkb3ctbGcgaG92ZXI6c2hhZG93LXhsIGFjdGl2ZTpzY2FsZS1bMC45OF0nIFxuICAgICAgICAgICAgICA6ICdiZy1ncmF5LTIwMCB0ZXh0LWdyYXktNDAwIGN1cnNvci1ub3QtYWxsb3dlZCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpc1N1Ym1pdHRpbmcgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy01IGgtNSBib3JkZXItMiBib3JkZXItZ3JheS00MDAgYm9yZGVyLXQtd2hpdGUgcm91bmRlZC1mdWxsIGFuaW1hdGUtc3BpblwiPjwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8Q2hlY2sgc2l6ZT17MjB9IC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+U3VibWl0IE9yZGVyPC9zcGFuPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtzaG93U3VjY2Vzc01vZGFsICYmIGxhc3RPcmRlckRldGFpbHMgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgYmctYmxhY2sgYmctb3BhY2l0eS02MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTQgei01MCBhbmltYXRlLWZhZGUtaW4gYmFja2Ryb3AtYmx1ci1zbVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0yeGwgc2hhZG93LTJ4bCB3LWZ1bGwgbWF4LXctbWQgb3ZlcmZsb3ctaGlkZGVuIHRyYW5zZm9ybSB0cmFuc2l0aW9uLWFsbCBzY2FsZS0xMDBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JlZW4tNTAgcC02IGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJvcmRlci1iIGJvcmRlci1ncmVlbi0xMDBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmVlbi0xMDAgcC0zIHJvdW5kZWQtZnVsbCBtYi00XCI+XG4gICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlIHNpemU9ezQ4fSBjbGFzc05hbWU9XCJ0ZXh0LWdyZWVuLTYwMFwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIj5PcmRlciBQbGFjZWQhPC9oMj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmVlbi04MDAgZm9udC1tZWRpdW1cIj4je2xhc3RPcmRlckRldGFpbHMub3JkZXIuaWR9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtNCByb3VuZGVkLXhsIGJvcmRlciBzcGFjZS15LTMgJHtsYXN0T3JkZXJEZXRhaWxzLmVtYWlsU3RhdHVzLndhc0Jsb2NrZWQgPyAnYmctYW1iZXItNTAgYm9yZGVyLWFtYmVyLTIwMCcgOiAnYmctZ3JheS01MCBib3JkZXItZ3JheS0xMDAnfWB9PlxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgICAge2xhc3RPcmRlckRldGFpbHMuZW1haWxTdGF0dXMud2FzQmxvY2tlZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxBbGVydENpcmNsZSBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTYwMCBtdC0xXCIgc2l6ZT17MjB9IC8+XG4gICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8TWFpbCBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTYwMCBtdC0xXCIgc2l6ZT17MjB9IC8+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtZ3JheS04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYXN0T3JkZXJEZXRhaWxzLmVtYWlsU3RhdHVzLndhc0Jsb2NrZWQgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIkF1dG8tRW1haWwgQmxvY2tlZCBieSBTZWN1cml0eVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJFbWFpbCBOb3RpZmljYXRpb24gU3RhdHVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZ3JheS01MDAgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgIEFkbWluOiB7bGFzdE9yZGVyRGV0YWlscy5lbWFpbFN0YXR1cy5hZG1pblNlbnQgPyA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyZWVuLTYwMCBmb250LWJvbGRcIj5TZW50PC9zcGFuPiA6IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcmVkLTUwMFwiPkZhaWxlZDwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAge2xhc3RPcmRlckRldGFpbHMuY3VzdG9tZXJFbWFpbCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZ3JheS01MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ3VzdG9tZXI6IHtsYXN0T3JkZXJEZXRhaWxzLmVtYWlsU3RhdHVzLmN1c3RvbWVyU2VudCA/IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JlZW4tNjAwIGZvbnQtYm9sZFwiPlNlbnQ8L3NwYW4+IDogPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yZWQtNTAwXCI+RmFpbGVkPC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICA8YSBcbiAgICAgICAgICAgICAgICAgIGhyZWY9e2xhc3RPcmRlckRldGFpbHMubWFpbHRvfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIGZvbnQtYm9sZCBweS0zIHJvdW5kZWQteGwgdHJhbnNpdGlvbiB0ZXh0LWNlbnRlciBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiAke1xuICAgICAgICAgICAgICAgICAgICAgIGxhc3RPcmRlckRldGFpbHMuZW1haWxTdGF0dXMud2FzQmxvY2tlZCB8fCAoIWxhc3RPcmRlckRldGFpbHMuZW1haWxTdGF0dXMuYWRtaW5TZW50ICYmICFsYXN0T3JkZXJEZXRhaWxzLmVtYWlsU3RhdHVzLmN1c3RvbWVyU2VudClcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1hbWJlci02MDAgaG92ZXI6YmctYW1iZXItNzAwIHRleHQtd2hpdGUgc2hhZG93LW1kJyBcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy13aGl0ZSBib3JkZXIgYm9yZGVyLWdyYXktMjAwIGhvdmVyOmJnLWdyYXktNTAgdGV4dC1ncmF5LTYwMCBmb250LW1lZGl1bSdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxNYWlsIHNpemU9ezE2fSAvPiBcbiAgICAgICAgICAgICAgICAgIHtsYXN0T3JkZXJEZXRhaWxzLmVtYWlsU3RhdHVzLndhc0Jsb2NrZWQgPyBcIlNlbmQgRW1haWwgTWFudWFsbHlcIiA6IFwiT3BlbiBpbiBFbWFpbCBDbGllbnRcIn1cbiAgICAgICAgICAgICAgICA8L2E+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgICAgb25DbGljaz17Y2xvc2VTdWNjZXNzTW9kYWx9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctZ3JheS0xMDAgaG92ZXI6YmctZ3JheS0yMDAgdGV4dC1ncmF5LTcwMCBmb250LWJvbGQgcHktMyByb3VuZGVkLXhsIHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFJldHVybiB0byBEYXNoYm9hcmRcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgT3JkZXJUYWtpbmc7XG4iXSwiZmlsZSI6Ii9hcHAvYXBwbGV0L3BhZ2VzL09yZGVyVGFraW5nLnRzeCJ9