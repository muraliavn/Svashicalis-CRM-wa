import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/pages/Inventory.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=76d1f7a8"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/applet/pages/Inventory.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=76d1f7a8"; const useState = __vite__cjsImport3_react["useState"]; const useRef = __vite__cjsImport3_react["useRef"];
import { useOutletContext } from "/node_modules/.vite/deps/react-router-dom.js?v=76d1f7a8";
import { Plus, Search, Package, AlertCircle, Edit2, X, Save, Download, Upload, Trash2 } from "/node_modules/.vite/deps/lucide-react.js?v=76d1f7a8";
const PRODUCT_CATEGORIES = [
  "Bars",
  "Dragees",
  "Gift Boxes",
  "Truffles",
  "Bonbons",
  "Hampers",
  "Spreads",
  "General"
];
const Inventory = () => {
  _s();
  const { products, addProduct, updateProduct, deleteProduct } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
    image: ""
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? parseFloat(value) || 0 : value
    }));
  };
  const handleAddClick = () => {
    setIsEditing(false);
    setFormData({
      name: "",
      category: "",
      // Default to empty to force selection
      price: 0,
      stock: 0,
      description: "",
      image: "https://picsum.photos/300/300?random=" + Math.floor(Math.random() * 1e3)
    });
    setShowModal(true);
  };
  const handleEditClick = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
    setFormData({ ...product });
    setShowModal(true);
  };
  const handleDelete = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || formData.price === void 0) return;
    if (isEditing && formData.id) {
      updateProduct(formData);
    } else {
      const product = {
        id: `p${Date.now()}`,
        name: formData.name || "",
        category: formData.category || "General",
        price: formData.price || 0,
        stock: formData.stock || 0,
        description: formData.description || "",
        image: formData.image || "https://via.placeholder.com/300x300?text=No+Image"
      };
      addProduct(product);
    }
    setShowModal(false);
  };
  const handleExportCSV = () => {
    const headers = ["Name", "Category", "Price", "Stock", "Description", "Image"];
    const csvRows = products.map((p) => {
      const escapedDesc = `"${(p.description || "").replace(/"/g, '""')}"`;
      return [
        `"${p.name.replace(/"/g, '""')}"`,
        p.category,
        p.price,
        p.stock,
        escapedDesc,
        p.image
      ].join(",");
    });
    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `inventory_export_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleImportClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (text) {
        processCSV(text);
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };
  const processCSV = (csvText) => {
    const lines = csvText.split("\n");
    let addedCount = 0;
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const regex = /(?:^|,)(?:"([^"]*(?:""[^"]*)*)"|([^",]*))/g;
      const matches = [];
      let match;
      while (match = regex.exec(line)) {
        let val = match[1] !== void 0 ? match[1].replace(/""/g, '"') : match[2];
        matches.push(val?.trim());
      }
      if (matches.length >= 4) {
        const cols = matches.filter((m) => m !== void 0);
        const name = cols[0];
        const price = parseFloat(cols[2] || "0");
        if (name && !isNaN(price)) {
          const newProduct = {
            id: `p${Date.now() + i}`,
            name,
            category: cols[1] || "General",
            price,
            stock: parseFloat(cols[3] || "0"),
            description: cols[4] || "",
            image: cols[5] || "https://via.placeholder.com/300x300?text=No+Image"
          };
          addProduct(newProduct);
          addedCount++;
        }
      }
    }
    if (addedCount > 0) alert(`Imported ${addedCount} products.`);
  };
  const filteredProducts = products.filter(
    (p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-bold text-gray-900", children: "Product Inventory" }, void 0, false, {
          fileName: "/app/applet/pages/Inventory.tsx",
          lineNumber: 199,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-gray-500", children: "Manage catalog and stock." }, void 0, false, {
          fileName: "/app/applet/pages/Inventory.tsx",
          lineNumber: 199,
          columnNumber: 85
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Inventory.tsx",
        lineNumber: 199,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxDEV("input", { type: "file", ref: fileInputRef, accept: ".csv", style: { display: "none" }, onChange: handleFileChange }, void 0, false, {
          fileName: "/app/applet/pages/Inventory.tsx",
          lineNumber: 201,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: handleImportClick, className: "flex items-center space-x-2 bg-white border border-gray-300 px-3 py-2 rounded-lg text-sm", children: [
          /* @__PURE__ */ jsxDEV(Upload, { size: 16 }, void 0, false, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 202,
            columnNumber: 148
          }, this),
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline", children: "Import" }, void 0, false, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 202,
            columnNumber: 169
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Inventory.tsx",
          lineNumber: 202,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: handleExportCSV, className: "flex items-center space-x-2 bg-white border border-gray-300 px-3 py-2 rounded-lg text-sm", children: [
          /* @__PURE__ */ jsxDEV(Download, { size: 16 }, void 0, false, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 203,
            columnNumber: 146
          }, this),
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline", children: "Export" }, void 0, false, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 203,
            columnNumber: 169
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Inventory.tsx",
          lineNumber: 203,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: handleAddClick, className: "flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition shadow-sm", children: [
          /* @__PURE__ */ jsxDEV(Plus, { size: 18 }, void 0, false, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 204,
            columnNumber: 169
          }, this),
          " ",
          /* @__PURE__ */ jsxDEV("span", { children: "New Product" }, void 0, false, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 204,
            columnNumber: 188
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Inventory.tsx",
          lineNumber: 204,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Inventory.tsx",
        lineNumber: 200,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Inventory.tsx",
      lineNumber: 198,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
      /* @__PURE__ */ jsxDEV(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 20 }, void 0, false, {
        fileName: "/app/applet/pages/Inventory.tsx",
        lineNumber: 210,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          type: "text",
          placeholder: "Search products...",
          className: "w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 bg-white text-black input-responsive",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/pages/Inventory.tsx",
          lineNumber: 211,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Inventory.tsx",
      lineNumber: 209,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/pages/Inventory.tsx",
      lineNumber: 208,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: filteredProducts.map(
      (product) => /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "relative aspect-square overflow-hidden bg-gray-100 border-b border-gray-100", children: [
          /* @__PURE__ */ jsxDEV("img", { src: product.image, alt: product.name, className: "w-full h-full object-cover transform group-hover:scale-105 transition duration-500" }, void 0, false, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 225,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-700", children: product.category }, void 0, false, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 226,
            columnNumber: 16
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Inventory.tsx",
          lineNumber: 224,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-start mb-2", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-lg text-gray-900 line-clamp-1", children: product.name }, void 0, false, {
              fileName: "/app/applet/pages/Inventory.tsx",
              lineNumber: 229,
              columnNumber: 70
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-amber-600", children: [
              "₹",
              product.price.toFixed(2)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/Inventory.tsx",
              lineNumber: 229,
              columnNumber: 150
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 229,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-500 line-clamp-2 h-10 mb-4", children: product.description }, void 0, false, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 230,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center pt-4 border-t border-gray-50", children: [
            /* @__PURE__ */ jsxDEV("div", { className: `flex items-center space-x-1.5 text-sm font-medium ${product.stock < 50 ? "text-red-600" : "text-green-600"}`, children: [
              product.stock < 50 ? /* @__PURE__ */ jsxDEV(AlertCircle, { size: 16 }, void 0, false, {
                fileName: "/app/applet/pages/Inventory.tsx",
                lineNumber: 233,
                columnNumber: 42
              }, this) : /* @__PURE__ */ jsxDEV(Package, { size: 16 }, void 0, false, {
                fileName: "/app/applet/pages/Inventory.tsx",
                lineNumber: 233,
                columnNumber: 70
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: [
                product.stock,
                " in stock"
              ] }, void 0, true, {
                fileName: "/app/applet/pages/Inventory.tsx",
                lineNumber: 233,
                columnNumber: 92
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/Inventory.tsx",
              lineNumber: 232,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex space-x-2", children: [
              /* @__PURE__ */ jsxDEV("button", { onClick: (e) => handleEditClick(e, product), className: "text-gray-400 hover:text-amber-600 p-1.5 rounded-lg", children: /* @__PURE__ */ jsxDEV(Edit2, { size: 18 }, void 0, false, {
                fileName: "/app/applet/pages/Inventory.tsx",
                lineNumber: 236,
                columnNumber: 136
              }, this) }, void 0, false, {
                fileName: "/app/applet/pages/Inventory.tsx",
                lineNumber: 236,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("button", { onClick: (e) => handleDelete(e, product.id), className: "text-gray-400 hover:text-red-600 p-1.5 rounded-lg", children: /* @__PURE__ */ jsxDEV(Trash2, { size: 18 }, void 0, false, {
                fileName: "/app/applet/pages/Inventory.tsx",
                lineNumber: 237,
                columnNumber: 134
              }, this) }, void 0, false, {
                fileName: "/app/applet/pages/Inventory.tsx",
                lineNumber: 237,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/Inventory.tsx",
              lineNumber: 235,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 231,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Inventory.tsx",
          lineNumber: 228,
          columnNumber: 13
        }, this)
      ] }, product.id, true, {
        fileName: "/app/applet/pages/Inventory.tsx",
        lineNumber: 223,
        columnNumber: 9
      }, this)
    ) }, void 0, false, {
      fileName: "/app/applet/pages/Inventory.tsx",
      lineNumber: 221,
      columnNumber: 7
    }, this),
    showModal && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-bold text-gray-900", children: isEditing ? "Edit Product" : "Add New Product" }, void 0, false, {
          fileName: "/app/applet/pages/Inventory.tsx",
          lineNumber: 249,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: () => setShowModal(false), className: "text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsxDEV(X, { size: 20 }, void 0, false, {
          fileName: "/app/applet/pages/Inventory.tsx",
          lineNumber: 250,
          columnNumber: 105
        }, this) }, void 0, false, {
          fileName: "/app/applet/pages/Inventory.tsx",
          lineNumber: 250,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Inventory.tsx",
        lineNumber: 248,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "p-6 space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Product Name" }, void 0, false, {
              fileName: "/app/applet/pages/Inventory.tsx",
              lineNumber: 255,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("input", { required: true, name: "name", value: formData.name, onChange: handleInputChange, className: "w-full rounded-lg border border-gray-300 p-2 focus:ring-2 outline-none transition bg-white text-black input-responsive" }, void 0, false, {
              fileName: "/app/applet/pages/Inventory.tsx",
              lineNumber: 256,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 254,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Category" }, void 0, false, {
              fileName: "/app/applet/pages/Inventory.tsx",
              lineNumber: 259,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                required: true,
                name: "category",
                value: formData.category,
                onChange: handleInputChange,
                className: "w-full rounded-lg border border-gray-300 p-2 focus:ring-2 outline-none transition bg-white text-black input-responsive",
                children: [
                  /* @__PURE__ */ jsxDEV("option", { value: "", children: "Select Category" }, void 0, false, {
                    fileName: "/app/applet/pages/Inventory.tsx",
                    lineNumber: 267,
                    columnNumber: 21
                  }, this),
                  PRODUCT_CATEGORIES.map(
                    (cat) => /* @__PURE__ */ jsxDEV("option", { value: cat, children: cat }, cat, false, {
                      fileName: "/app/applet/pages/Inventory.tsx",
                      lineNumber: 269,
                      columnNumber: 19
                    }, this)
                  )
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/pages/Inventory.tsx",
                lineNumber: 260,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 258,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Price (₹)" }, void 0, false, {
              fileName: "/app/applet/pages/Inventory.tsx",
              lineNumber: 274,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("input", { required: true, type: "number", step: "0.01", name: "price", value: formData.price, onChange: handleInputChange, className: "w-full rounded-lg border border-gray-300 p-2 focus:ring-2 outline-none transition bg-white text-black input-responsive" }, void 0, false, {
              fileName: "/app/applet/pages/Inventory.tsx",
              lineNumber: 275,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 273,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Stock" }, void 0, false, {
              fileName: "/app/applet/pages/Inventory.tsx",
              lineNumber: 278,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("input", { required: true, type: "number", name: "stock", value: formData.stock, onChange: handleInputChange, className: "w-full rounded-lg border border-gray-300 p-2 focus:ring-2 outline-none transition bg-white text-black input-responsive" }, void 0, false, {
              fileName: "/app/applet/pages/Inventory.tsx",
              lineNumber: 279,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 277,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Image URL" }, void 0, false, {
              fileName: "/app/applet/pages/Inventory.tsx",
              lineNumber: 282,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("input", { name: "image", value: formData.image, onChange: handleInputChange, className: "w-full rounded-lg border border-gray-300 p-2 focus:ring-2 outline-none transition bg-white text-black input-responsive", placeholder: "https://..." }, void 0, false, {
              fileName: "/app/applet/pages/Inventory.tsx",
              lineNumber: 283,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 281,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "col-span-2", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }, void 0, false, {
                fileName: "/app/applet/pages/Inventory.tsx",
                lineNumber: 288,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("textarea", { rows: 2, name: "description", value: formData.description, onChange: handleInputChange, className: "w-full rounded-lg border border-gray-300 p-2 focus:ring-2 outline-none transition bg-white text-black input-responsive resize-none" }, void 0, false, {
                fileName: "/app/applet/pages/Inventory.tsx",
                lineNumber: 289,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/Inventory.tsx",
              lineNumber: 287,
              columnNumber: 21
            }, this),
            formData.image && /* @__PURE__ */ jsxDEV("div", { className: "w-20 h-20 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden shrink-0 mt-5", children: /* @__PURE__ */ jsxDEV(
              "img",
              {
                src: formData.image,
                alt: "Preview",
                className: "w-full h-full object-cover",
                onError: (e) => {
                  e.currentTarget.src = "https://via.placeholder.com/100?text=Error";
                }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/pages/Inventory.tsx",
                lineNumber: 293,
                columnNumber: 25
              },
              this
            ) }, void 0, false, {
              fileName: "/app/applet/pages/Inventory.tsx",
              lineNumber: 292,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 286,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 285,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Inventory.tsx",
          lineNumber: 253,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end space-x-3 pt-4 border-t border-gray-100", children: [
          /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: () => setShowModal(false), className: "px-4 py-2 border border-gray-300 rounded-lg text-gray-700", children: "Cancel" }, void 0, false, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 307,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("button", { type: "submit", className: "px-4 py-2 bg-amber-600 rounded-lg text-white hover:bg-amber-700 flex items-center space-x-2 shadow-sm font-bold", children: [
            /* @__PURE__ */ jsxDEV(Save, { size: 16 }, void 0, false, {
              fileName: "/app/applet/pages/Inventory.tsx",
              lineNumber: 308,
              columnNumber: 163
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: isEditing ? "Update Product" : "Add Product" }, void 0, false, {
              fileName: "/app/applet/pages/Inventory.tsx",
              lineNumber: 308,
              columnNumber: 181
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Inventory.tsx",
            lineNumber: 308,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Inventory.tsx",
          lineNumber: 306,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Inventory.tsx",
        lineNumber: 252,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Inventory.tsx",
      lineNumber: 247,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/pages/Inventory.tsx",
      lineNumber: 246,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/pages/Inventory.tsx",
    lineNumber: 197,
    columnNumber: 5
  }, this);
};
_s(Inventory, "eIc7KuLRXbQxhWTa4krU3TIKykE=", false, function() {
  return [useOutletContext];
});
_c = Inventory;
export default Inventory;
var _c;
$RefreshReg$(_c, "Inventory");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/applet/pages/Inventory.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/applet/pages/Inventory.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QkFBaEk7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBc0k7QUFBQSxVQUN0SSx1QkFBQyxZQUFPLE1BQUssVUFBUyxXQUFVLG1IQUFrSDtBQUFBLG1DQUFDLFFBQUssTUFBTSxNQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQWU7QUFBQSxZQUFHLHVCQUFDLFVBQU1DLHNCQUFZLG1CQUFtQixpQkFBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBb0Q7QUFBQSxlQUF4TjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUErTjtBQUFBLGFBRmpPO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFHQTtBQUFBLFdBekRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUEwREE7QUFBQSxTQS9ERjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBZ0VBLEtBakVGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FrRUE7QUFBQSxPQW5ISjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBcUhBO0FBRUo7QUFBRVQsR0F0UklELFdBQW1CO0FBQUEsVUFDd0NaLGdCQUFnQjtBQUFBO0FBQUEsS0FEM0VZO0FBd1JOLGVBQWVBO0FBQVUsSUFBQTZHO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlUmVmIiwidXNlT3V0bGV0Q29udGV4dCIsIlBsdXMiLCJTZWFyY2giLCJQYWNrYWdlIiwiQWxlcnRDaXJjbGUiLCJFZGl0MiIsIlgiLCJTYXZlIiwiRG93bmxvYWQiLCJVcGxvYWQiLCJUcmFzaDIiLCJQUk9EVUNUX0NBVEVHT1JJRVMiLCJJbnZlbnRvcnkiLCJfcyIsInByb2R1Y3RzIiwiYWRkUHJvZHVjdCIsInVwZGF0ZVByb2R1Y3QiLCJkZWxldGVQcm9kdWN0Iiwic2VhcmNoVGVybSIsInNldFNlYXJjaFRlcm0iLCJzaG93TW9kYWwiLCJzZXRTaG93TW9kYWwiLCJpc0VkaXRpbmciLCJzZXRJc0VkaXRpbmciLCJmaWxlSW5wdXRSZWYiLCJmb3JtRGF0YSIsInNldEZvcm1EYXRhIiwibmFtZSIsImNhdGVnb3J5IiwicHJpY2UiLCJzdG9jayIsImRlc2NyaXB0aW9uIiwiaW1hZ2UiLCJoYW5kbGVJbnB1dENoYW5nZSIsImUiLCJ2YWx1ZSIsInRhcmdldCIsInByZXYiLCJwYXJzZUZsb2F0IiwiaGFuZGxlQWRkQ2xpY2siLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJoYW5kbGVFZGl0Q2xpY2siLCJwcm9kdWN0IiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJoYW5kbGVEZWxldGUiLCJwcm9kdWN0SWQiLCJ3aW5kb3ciLCJjb25maXJtIiwiaGFuZGxlU3VibWl0IiwidW5kZWZpbmVkIiwiaWQiLCJEYXRlIiwibm93IiwiaGFuZGxlRXhwb3J0Q1NWIiwiaGVhZGVycyIsImNzdlJvd3MiLCJtYXAiLCJwIiwiZXNjYXBlZERlc2MiLCJyZXBsYWNlIiwiam9pbiIsImNzdkNvbnRlbnQiLCJibG9iIiwiQmxvYiIsInR5cGUiLCJ1cmwiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJsaW5rIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwidG9JU09TdHJpbmciLCJzcGxpdCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNsaWNrIiwicmVtb3ZlQ2hpbGQiLCJoYW5kbGVJbXBvcnRDbGljayIsImN1cnJlbnQiLCJoYW5kbGVGaWxlQ2hhbmdlIiwiZXZlbnQiLCJmaWxlIiwiZmlsZXMiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwidGV4dCIsInJlc3VsdCIsInByb2Nlc3NDU1YiLCJyZWFkQXNUZXh0IiwiY3N2VGV4dCIsImxpbmVzIiwiYWRkZWRDb3VudCIsImkiLCJsZW5ndGgiLCJsaW5lIiwidHJpbSIsInJlZ2V4IiwibWF0Y2hlcyIsIm1hdGNoIiwiZXhlYyIsInZhbCIsInB1c2giLCJjb2xzIiwiZmlsdGVyIiwibSIsImlzTmFOIiwibmV3UHJvZHVjdCIsImFsZXJ0IiwiZmlsdGVyZWRQcm9kdWN0cyIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJkaXNwbGF5IiwidG9GaXhlZCIsImNhdCIsImN1cnJlbnRUYXJnZXQiLCJzcmMiLCJfYyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJJbnZlbnRvcnkudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VPdXRsZXRDb250ZXh0IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBBcHBDb250ZXh0VHlwZSwgUHJvZHVjdCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFBsdXMsIFNlYXJjaCwgUGFja2FnZSwgQWxlcnRDaXJjbGUsIEVkaXQyLCBYLCBTYXZlLCBEb3dubG9hZCwgVXBsb2FkLCBUcmFzaDIsIEltYWdlIGFzIEltYWdlSWNvbiB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5cbi8vIFByZWRlZmluZWQgY2F0ZWdvcmllcyBmb3IgdGhlIGRyb3Bkb3duXG5jb25zdCBQUk9EVUNUX0NBVEVHT1JJRVMgPSBbXG4gICdCYXJzJyxcbiAgJ0RyYWdlZXMnLFxuICAnR2lmdCBCb3hlcycsXG4gICdUcnVmZmxlcycsXG4gICdCb25ib25zJyxcbiAgJ0hhbXBlcnMnLFxuICAnU3ByZWFkcycsXG4gICdHZW5lcmFsJ1xuXTtcblxuY29uc3QgSW52ZW50b3J5OiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgeyBwcm9kdWN0cywgYWRkUHJvZHVjdCwgdXBkYXRlUHJvZHVjdCwgZGVsZXRlUHJvZHVjdCB9ID0gdXNlT3V0bGV0Q29udGV4dDxBcHBDb250ZXh0VHlwZT4oKTtcbiAgY29uc3QgW3NlYXJjaFRlcm0sIHNldFNlYXJjaFRlcm1dID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbc2hvd01vZGFsLCBzZXRTaG93TW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNFZGl0aW5nLCBzZXRJc0VkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBmaWxlSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudD4obnVsbCk7XG4gIFxuICBjb25zdCBbZm9ybURhdGEsIHNldEZvcm1EYXRhXSA9IHVzZVN0YXRlPFBhcnRpYWw8UHJvZHVjdD4+KHtcbiAgICBuYW1lOiAnJyxcbiAgICBjYXRlZ29yeTogJycsXG4gICAgcHJpY2U6IDAsXG4gICAgc3RvY2s6IDAsXG4gICAgZGVzY3JpcHRpb246ICcnLFxuICAgIGltYWdlOiAnJ1xuICB9KTtcblxuICBjb25zdCBoYW5kbGVJbnB1dENoYW5nZSA9IChlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudCB8IEhUTUxTZWxlY3RFbGVtZW50PikgPT4ge1xuICAgIGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IGUudGFyZ2V0O1xuICAgIHNldEZvcm1EYXRhKHByZXYgPT4gKHtcbiAgICAgIC4uLnByZXYsXG4gICAgICBbbmFtZV06IG5hbWUgPT09ICdwcmljZScgfHwgbmFtZSA9PT0gJ3N0b2NrJyA/IHBhcnNlRmxvYXQodmFsdWUpIHx8IDAgOiB2YWx1ZVxuICAgIH0pKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBZGRDbGljayA9ICgpID0+IHtcbiAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgIHNldEZvcm1EYXRhKHtcbiAgICAgIG5hbWU6ICcnLFxuICAgICAgY2F0ZWdvcnk6ICcnLCAvLyBEZWZhdWx0IHRvIGVtcHR5IHRvIGZvcmNlIHNlbGVjdGlvblxuICAgICAgcHJpY2U6IDAsXG4gICAgICBzdG9jazogMCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgIGltYWdlOiAnaHR0cHM6Ly9waWNzdW0ucGhvdG9zLzMwMC8zMDA/cmFuZG9tPScgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwKVxuICAgIH0pO1xuICAgIHNldFNob3dNb2RhbCh0cnVlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVFZGl0Q2xpY2sgPSAoZTogUmVhY3QuTW91c2VFdmVudCwgcHJvZHVjdDogUHJvZHVjdCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHNldElzRWRpdGluZyh0cnVlKTtcbiAgICBzZXRGb3JtRGF0YSh7IC4uLnByb2R1Y3QgfSk7XG4gICAgc2V0U2hvd01vZGFsKHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9IChlOiBSZWFjdC5Nb3VzZUV2ZW50LCBwcm9kdWN0SWQ6IHN0cmluZykgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICh3aW5kb3cuY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBwcm9kdWN0P1wiKSkge1xuICAgICAgZGVsZXRlUHJvZHVjdChwcm9kdWN0SWQpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghZm9ybURhdGEubmFtZSB8fCBmb3JtRGF0YS5wcmljZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICBpZiAoaXNFZGl0aW5nICYmIGZvcm1EYXRhLmlkKSB7XG4gICAgICB1cGRhdGVQcm9kdWN0KGZvcm1EYXRhIGFzIFByb2R1Y3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcm9kdWN0OiBQcm9kdWN0ID0ge1xuICAgICAgICBpZDogYHAke0RhdGUubm93KCl9YCxcbiAgICAgICAgbmFtZTogZm9ybURhdGEubmFtZSB8fCAnJyxcbiAgICAgICAgY2F0ZWdvcnk6IGZvcm1EYXRhLmNhdGVnb3J5IHx8ICdHZW5lcmFsJyxcbiAgICAgICAgcHJpY2U6IGZvcm1EYXRhLnByaWNlIHx8IDAsXG4gICAgICAgIHN0b2NrOiBmb3JtRGF0YS5zdG9jayB8fCAwLFxuICAgICAgICBkZXNjcmlwdGlvbjogZm9ybURhdGEuZGVzY3JpcHRpb24gfHwgJycsXG4gICAgICAgIGltYWdlOiBmb3JtRGF0YS5pbWFnZSB8fCAnaHR0cHM6Ly92aWEucGxhY2Vob2xkZXIuY29tLzMwMHgzMDA/dGV4dD1ObytJbWFnZScsXG4gICAgICB9O1xuICAgICAgYWRkUHJvZHVjdChwcm9kdWN0KTtcbiAgICB9XG4gICAgc2V0U2hvd01vZGFsKGZhbHNlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVFeHBvcnRDU1YgPSAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVycyA9IFsnTmFtZScsICdDYXRlZ29yeScsICdQcmljZScsICdTdG9jaycsICdEZXNjcmlwdGlvbicsICdJbWFnZSddO1xuICAgIGNvbnN0IGNzdlJvd3MgPSBwcm9kdWN0cy5tYXAocCA9PiB7XG4gICAgICBjb25zdCBlc2NhcGVkRGVzYyA9IGBcIiR7KHAuZGVzY3JpcHRpb24gfHwgJycpLnJlcGxhY2UoL1wiL2csICdcIlwiJyl9XCJgO1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgYFwiJHtwLm5hbWUucmVwbGFjZSgvXCIvZywgJ1wiXCInKX1cImAsXG4gICAgICAgIHAuY2F0ZWdvcnksXG4gICAgICAgIHAucHJpY2UsXG4gICAgICAgIHAuc3RvY2ssXG4gICAgICAgIGVzY2FwZWREZXNjLFxuICAgICAgICBwLmltYWdlXG4gICAgICBdLmpvaW4oJywnKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGNzdkNvbnRlbnQgPSBbaGVhZGVycy5qb2luKCcsJyksIC4uLmNzdlJvd3NdLmpvaW4oJ1xcbicpO1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbY3N2Q29udGVudF0sIHsgdHlwZTogJ3RleHQvY3N2O2NoYXJzZXQ9dXRmLTg7JyB9KTtcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwpO1xuICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGBpbnZlbnRvcnlfZXhwb3J0XyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19LmNzdmApO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgbGluay5jbGljaygpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlSW1wb3J0Q2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKGZpbGVJbnB1dFJlZi5jdXJyZW50KSBmaWxlSW5wdXRSZWYuY3VycmVudC5jbGljaygpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUZpbGVDaGFuZ2UgPSAoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3QgZmlsZSA9IGV2ZW50LnRhcmdldC5maWxlcz8uWzBdO1xuICAgIGlmICghZmlsZSkgcmV0dXJuO1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9ubG9hZCA9IChlKSA9PiB7XG4gICAgICAvLyBGaXggVFMxODA0NzogZS50YXJnZXQgbWlnaHQgYmUgbnVsbFxuICAgICAgY29uc3QgdGV4dCA9IGUudGFyZ2V0Py5yZXN1bHQgYXMgc3RyaW5nO1xuICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgcHJvY2Vzc0NTVih0ZXh0KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xuICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9ICcnO1xuICB9O1xuXG4gIGNvbnN0IHByb2Nlc3NDU1YgPSAoY3N2VGV4dDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgbGluZXMgPSBjc3ZUZXh0LnNwbGl0KCdcXG4nKTtcbiAgICBsZXQgYWRkZWRDb3VudCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbGluZSA9IGxpbmVzW2ldLnRyaW0oKTtcbiAgICAgIGlmICghbGluZSkgY29udGludWU7XG4gICAgICBjb25zdCByZWdleCA9IC8oPzpefCwpKD86XCIoW15cIl0qKD86XCJcIlteXCJdKikqKVwifChbXlwiLF0qKSkvZztcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSBbXTtcbiAgICAgIGxldCBtYXRjaDtcbiAgICAgIHdoaWxlICgobWF0Y2ggPSByZWdleC5leGVjKGxpbmUpKSkge1xuICAgICAgICBsZXQgdmFsID0gbWF0Y2hbMV0gIT09IHVuZGVmaW5lZCA/IG1hdGNoWzFdLnJlcGxhY2UoL1wiXCIvZywgJ1wiJykgOiBtYXRjaFsyXTtcbiAgICAgICAgbWF0Y2hlcy5wdXNoKHZhbD8udHJpbSgpKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCA+PSA0KSB7XG4gICAgICAgIGNvbnN0IGNvbHMgPSBtYXRjaGVzLmZpbHRlcihtID0+IG0gIT09IHVuZGVmaW5lZCk7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBjb2xzWzBdO1xuICAgICAgICBjb25zdCBwcmljZSA9IHBhcnNlRmxvYXQoY29sc1syXSB8fCAnMCcpO1xuICAgICAgICBpZiAobmFtZSAmJiAhaXNOYU4ocHJpY2UpKSB7XG4gICAgICAgICAgY29uc3QgbmV3UHJvZHVjdDogUHJvZHVjdCA9IHtcbiAgICAgICAgICAgIGlkOiBgcCR7RGF0ZS5ub3coKSArIGl9YCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBjYXRlZ29yeTogY29sc1sxXSB8fCAnR2VuZXJhbCcsXG4gICAgICAgICAgICBwcmljZSxcbiAgICAgICAgICAgIHN0b2NrOiBwYXJzZUZsb2F0KGNvbHNbM10gfHwgJzAnKSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBjb2xzWzRdIHx8ICcnLFxuICAgICAgICAgICAgaW1hZ2U6IGNvbHNbNV0gfHwgJ2h0dHBzOi8vdmlhLnBsYWNlaG9sZGVyLmNvbS8zMDB4MzAwP3RleHQ9Tm8rSW1hZ2UnXG4gICAgICAgICAgfTtcbiAgICAgICAgICBhZGRQcm9kdWN0KG5ld1Byb2R1Y3QpO1xuICAgICAgICAgIGFkZGVkQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYWRkZWRDb3VudCA+IDApIGFsZXJ0KGBJbXBvcnRlZCAke2FkZGVkQ291bnR9IHByb2R1Y3RzLmApO1xuICB9O1xuXG4gIGNvbnN0IGZpbHRlcmVkUHJvZHVjdHMgPSBwcm9kdWN0cy5maWx0ZXIocCA9PiBcbiAgICBwLm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpIHx8IFxuICAgIHAuY2F0ZWdvcnkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1zdGFydCBtZDppdGVtcy1jZW50ZXIgZ2FwLTRcIj5cbiAgICAgICAgPGRpdj48aDEgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIj5Qcm9kdWN0IEludmVudG9yeTwvaDE+PHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTUwMFwiPk1hbmFnZSBjYXRhbG9nIGFuZCBzdG9jay48L3A+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMlwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIHJlZj17ZmlsZUlucHV0UmVmfSBhY2NlcHQ9XCIuY3N2XCIgc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19IG9uQ2hhbmdlPXtoYW5kbGVGaWxlQ2hhbmdlfSAvPlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlSW1wb3J0Q2xpY2t9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHB4LTMgcHktMiByb3VuZGVkLWxnIHRleHQtc21cIj48VXBsb2FkIHNpemU9ezE2fSAvPiA8c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4gc206aW5saW5lXCI+SW1wb3J0PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlRXhwb3J0Q1NWfSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCBweC0zIHB5LTIgcm91bmRlZC1sZyB0ZXh0LXNtXCI+PERvd25sb2FkIHNpemU9ezE2fSAvPiA8c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4gc206aW5saW5lXCI+RXhwb3J0PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlQWRkQ2xpY2t9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiBiZy1hbWJlci02MDAgaG92ZXI6YmctYW1iZXItNzAwIHRleHQtd2hpdGUgcHgtNCBweS0yIHJvdW5kZWQtbGcgdHJhbnNpdGlvbiBzaGFkb3ctc21cIj48UGx1cyBzaXplPXsxOH0gLz4gPHNwYW4+TmV3IFByb2R1Y3Q8L3NwYW4+PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC14bCBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBwLTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgIDxTZWFyY2ggY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0zIHRvcC0xLzIgdHJhbnNmb3JtIC10cmFuc2xhdGUteS0xLzIgdGV4dC1ncmF5LTQwMFwiIHNpemU9ezIwfSAvPlxuICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBwcm9kdWN0cy4uLlwiIFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHBsLTEwIHByLTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMjAwIHJvdW5kZWQtbGcgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBiZy13aGl0ZSB0ZXh0LWJsYWNrIGlucHV0LXJlc3BvbnNpdmVcIlxuICAgICAgICAgICAgdmFsdWU9e3NlYXJjaFRlcm19XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlYXJjaFRlcm0oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyB4bDpncmlkLWNvbHMtNCBnYXAtNlwiPlxuICAgICAgICB7ZmlsdGVyZWRQcm9kdWN0cy5tYXAocHJvZHVjdCA9PiAoXG4gICAgICAgICAgPGRpdiBrZXk9e3Byb2R1Y3QuaWR9IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQteGwgc2hhZG93LXNtIGJvcmRlciBib3JkZXItZ3JheS0xMDAgb3ZlcmZsb3ctaGlkZGVuIGdyb3VwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGFzcGVjdC1zcXVhcmUgb3ZlcmZsb3ctaGlkZGVuIGJnLWdyYXktMTAwIGJvcmRlci1iIGJvcmRlci1ncmF5LTEwMFwiPlxuICAgICAgICAgICAgICAgPGltZyBzcmM9e3Byb2R1Y3QuaW1hZ2V9IGFsdD17cHJvZHVjdC5uYW1lfSBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlciB0cmFuc2Zvcm0gZ3JvdXAtaG92ZXI6c2NhbGUtMTA1IHRyYW5zaXRpb24gZHVyYXRpb24tNTAwXCIgLz5cbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTIgcmlnaHQtMiBiZy13aGl0ZS85MCBiYWNrZHJvcC1ibHVyLXNtIHB4LTIgcHktMSByb3VuZGVkLW1kIHRleHQteHMgZm9udC1ib2xkIHRleHQtZ3JheS03MDBcIj57cHJvZHVjdC5jYXRlZ29yeX08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTVcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1zdGFydCBtYi0yXCI+PGgzIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWxnIHRleHQtZ3JheS05MDAgbGluZS1jbGFtcC0xXCI+e3Byb2R1Y3QubmFtZX08L2gzPjxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWFtYmVyLTYwMFwiPuKCuXtwcm9kdWN0LnByaWNlLnRvRml4ZWQoMil9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS01MDAgbGluZS1jbGFtcC0yIGgtMTAgbWItNFwiPntwcm9kdWN0LmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgcHQtNCBib3JkZXItdCBib3JkZXItZ3JheS01MFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0xLjUgdGV4dC1zbSBmb250LW1lZGl1bSAke3Byb2R1Y3Quc3RvY2sgPCA1MCA/ICd0ZXh0LXJlZC02MDAnIDogJ3RleHQtZ3JlZW4tNjAwJ31gfT5cbiAgICAgICAgICAgICAgICAgICB7cHJvZHVjdC5zdG9jayA8IDUwID8gPEFsZXJ0Q2lyY2xlIHNpemU9ezE2fSAvPiA6IDxQYWNrYWdlIHNpemU9ezE2fSAvPn08c3Bhbj57cHJvZHVjdC5zdG9ja30gaW4gc3RvY2s8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoZSkgPT4gaGFuZGxlRWRpdENsaWNrKGUsIHByb2R1Y3QpfSBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtYW1iZXItNjAwIHAtMS41IHJvdW5kZWQtbGdcIj48RWRpdDIgc2l6ZT17MTh9IC8+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eyhlKSA9PiBoYW5kbGVEZWxldGUoZSwgcHJvZHVjdC5pZCl9IGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC1yZWQtNjAwIHAtMS41IHJvdW5kZWQtbGdcIj48VHJhc2gyIHNpemU9ezE4fSAvPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7c2hvd01vZGFsICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIGJnLWJsYWNrIGJnLW9wYWNpdHktNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00IHotNTAgYW5pbWF0ZS1mYWRlLWluXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLXhsIHNoYWRvdy0yeGwgdy1mdWxsIG1heC13LWxnIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC02IHB5LTQgYm9yZGVyLWIgYm9yZGVyLWdyYXktMTAwIGZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBiZy1ncmF5LTUwXCI+XG4gICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCI+e2lzRWRpdGluZyA/ICdFZGl0IFByb2R1Y3QnIDogJ0FkZCBOZXcgUHJvZHVjdCd9PC9oMj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93TW9kYWwoZmFsc2UpfSBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtZ3JheS02MDBcIj48WCBzaXplPXsyMH0gLz48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gY2xhc3NOYW1lPVwicC02IHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zcGFuLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiPlByb2R1Y3QgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgcmVxdWlyZWQgbmFtZT1cIm5hbWVcIiB2YWx1ZT17Zm9ybURhdGEubmFtZX0gb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfSBjbGFzc05hbWU9XCJ3LWZ1bGwgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHAtMiBmb2N1czpyaW5nLTIgb3V0bGluZS1ub25lIHRyYW5zaXRpb24gYmctd2hpdGUgdGV4dC1ibGFjayBpbnB1dC1yZXNwb25zaXZlXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCI+Q2F0ZWdvcnk8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPHNlbGVjdCBcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQgXG4gICAgICAgICAgICAgICAgICAgIG5hbWU9XCJjYXRlZ29yeVwiIFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEuY2F0ZWdvcnl9IFxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9IFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHAtMiBmb2N1czpyaW5nLTIgb3V0bGluZS1ub25lIHRyYW5zaXRpb24gYmctd2hpdGUgdGV4dC1ibGFjayBpbnB1dC1yZXNwb25zaXZlXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBDYXRlZ29yeTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICB7UFJPRFVDVF9DQVRFR09SSUVTLm1hcChjYXQgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtjYXR9IHZhbHVlPXtjYXR9PntjYXR9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiPlByaWNlICjigrkpPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCByZXF1aXJlZCB0eXBlPVwibnVtYmVyXCIgc3RlcD1cIjAuMDFcIiBuYW1lPVwicHJpY2VcIiB2YWx1ZT17Zm9ybURhdGEucHJpY2V9IG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX0gY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCBwLTIgZm9jdXM6cmluZy0yIG91dGxpbmUtbm9uZSB0cmFuc2l0aW9uIGJnLXdoaXRlIHRleHQtYmxhY2sgaW5wdXQtcmVzcG9uc2l2ZVwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiPlN0b2NrPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCByZXF1aXJlZCB0eXBlPVwibnVtYmVyXCIgbmFtZT1cInN0b2NrXCIgdmFsdWU9e2Zvcm1EYXRhLnN0b2NrfSBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9IGNsYXNzTmFtZT1cInctZnVsbCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcC0yIGZvY3VzOnJpbmctMiBvdXRsaW5lLW5vbmUgdHJhbnNpdGlvbiBiZy13aGl0ZSB0ZXh0LWJsYWNrIGlucHV0LXJlc3BvbnNpdmVcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIj5JbWFnZSBVUkw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IG5hbWU9XCJpbWFnZVwiIHZhbHVlPXtmb3JtRGF0YS5pbWFnZX0gb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfSBjbGFzc05hbWU9XCJ3LWZ1bGwgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHAtMiBmb2N1czpyaW5nLTIgb3V0bGluZS1ub25lIHRyYW5zaXRpb24gYmctd2hpdGUgdGV4dC1ibGFjayBpbnB1dC1yZXNwb25zaXZlXCIgcGxhY2Vob2xkZXI9XCJodHRwczovLy4uLlwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc3Bhbi0yXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC00XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCI+RGVzY3JpcHRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPXsyfSBuYW1lPVwiZGVzY3JpcHRpb25cIiB2YWx1ZT17Zm9ybURhdGEuZGVzY3JpcHRpb259IG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX0gY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCBwLTIgZm9jdXM6cmluZy0yIG91dGxpbmUtbm9uZSB0cmFuc2l0aW9uIGJnLXdoaXRlIHRleHQtYmxhY2sgaW5wdXQtcmVzcG9uc2l2ZSByZXNpemUtbm9uZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7Zm9ybURhdGEuaW1hZ2UgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0yMCBoLTIwIGJnLWdyYXktNTAgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWdyYXktMjAwIG92ZXJmbG93LWhpZGRlbiBzaHJpbmstMCBtdC01XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2Zvcm1EYXRhLmltYWdlfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiUHJldmlld1wiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uRXJyb3I9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnNyYyA9IFwiaHR0cHM6Ly92aWEucGxhY2Vob2xkZXIuY29tLzEwMD90ZXh0PUVycm9yXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmQgc3BhY2UteC0zIHB0LTQgYm9yZGVyLXQgYm9yZGVyLWdyYXktMTAwXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gc2V0U2hvd01vZGFsKGZhbHNlKX0gY2xhc3NOYW1lPVwicHgtNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyB0ZXh0LWdyYXktNzAwXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwicHgtNCBweS0yIGJnLWFtYmVyLTYwMCByb3VuZGVkLWxnIHRleHQtd2hpdGUgaG92ZXI6YmctYW1iZXItNzAwIGZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiBzaGFkb3ctc20gZm9udC1ib2xkXCI+PFNhdmUgc2l6ZT17MTZ9IC8+PHNwYW4+e2lzRWRpdGluZyA/ICdVcGRhdGUgUHJvZHVjdCcgOiAnQWRkIFByb2R1Y3QnfTwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEludmVudG9yeTtcbiJdLCJmaWxlIjoiL2FwcC9hcHBsZXQvcGFnZXMvSW52ZW50b3J5LnRzeCJ9