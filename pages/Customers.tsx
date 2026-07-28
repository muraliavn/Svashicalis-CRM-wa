import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/pages/Customers.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=76d1f7a8"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/applet/pages/Customers.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=76d1f7a8"; const useState = __vite__cjsImport3_react["useState"]; const useRef = __vite__cjsImport3_react["useRef"];
import { useOutletContext } from "/node_modules/.vite/deps/react-router-dom.js?v=76d1f7a8";
import { Plus, Search, Mail, MapPin, Phone, Edit2, Trash2, FileText, X, Save, Upload, Download } from "/node_modules/.vite/deps/lucide-react.js?v=76d1f7a8";
import { generateCustomerEmail } from "/services/geminiService.ts";
const Customers = () => {
  _s();
  const { customers, addCustomer, updateCustomer, deleteCustomer, orders, users } = useOutletContext();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [emailDraft, setEmailDraft] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    gst: "",
    email: "",
    phone: "",
    address: "",
    status: "Active"
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const openAddModal = () => {
    setIsEditing(false);
    setFormData({ businessName: "", ownerName: "", gst: "", email: "", phone: "", address: "", status: "Active" });
    setShowModal(true);
  };
  const openEditModal = (customer) => {
    setIsEditing(true);
    setFormData({ ...customer });
    setShowModal(true);
  };
  const handleDelete = (customerId) => {
    if (confirm("Are you sure you want to delete this customer? This action cannot be undone.")) {
      deleteCustomer(customerId);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.businessName || !formData.ownerName) return;
    if (isEditing && formData.id) {
      updateCustomer(formData);
    } else {
      const customer = {
        id: `c${Date.now()}`,
        businessName: formData.businessName || "Unknown",
        ownerName: formData.ownerName || "Unknown",
        gst: formData.gst || "",
        email: formData.email || "",
        phone: formData.phone || "",
        address: formData.address || "",
        status: formData.status || "Active",
        lastOrderDate: "Never"
      };
      addCustomer(customer);
      setSearchTerm("");
    }
    setShowModal(false);
  };
  const handleExportCSV = () => {
    const headers = ["Business Name", "Owner Name", "GST", "Phone", "Email", "Address", "Status"];
    const csvRows = customers.map((c) => {
      const safe = (str) => `"${(str || "").replace(/"/g, '""')}"`;
      return [
        safe(c.businessName),
        safe(c.ownerName),
        safe(c.gst),
        safe(c.phone),
        safe(c.email),
        safe(c.address),
        safe(c.status)
      ].join(",");
    });
    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `customers_export_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
    if (lines.length < 2) {
      alert("CSV file appears empty or missing headers.");
      return;
    }
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
      if (matches.length >= 2) {
        const cols = matches.filter((m) => m !== void 0);
        const businessName = cols[0];
        const ownerName = cols[1];
        if (businessName && ownerName) {
          const newCustomer = {
            id: `c${Date.now() + i}`,
            businessName,
            ownerName,
            gst: cols[2] || "",
            phone: cols[3] || "",
            email: cols[4] || "",
            address: cols[5] || "",
            status: cols[6] === "Inactive" ? "Inactive" : "Active",
            lastOrderDate: "Never"
          };
          addCustomer(newCustomer);
          addedCount++;
        }
      }
    }
    if (addedCount > 0) {
      alert(`Successfully imported ${addedCount} customers.`);
    }
  };
  const handleGenerateBillEmail = async (customer) => {
    setLoadingAi(true);
    setEmailDraft(null);
    const customerOrders = orders.filter((o) => o.customerId === customer.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const lastOrder = customerOrders.length > 0 ? customerOrders[0] : void 0;
    let salesExecName = "Sales Team";
    if (lastOrder && lastOrder.salesExecId) {
      const se = users.find((u) => u.id === lastOrder.salesExecId);
      if (se) salesExecName = se.name;
    }
    const draft = await generateCustomerEmail(customer, lastOrder, salesExecName);
    setEmailDraft(draft);
    setLoadingAi(false);
  };
  const filteredCustomers = customers.filter(
    (c) => c.businessName.toLowerCase().includes(searchTerm.toLowerCase()) || c.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) || c.gst && c.gst.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone && c.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-bold text-gray-900", children: "Business Owners" }, void 0, false, {
          fileName: "/app/applet/pages/Customers.tsx",
          lineNumber: 221,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-gray-500", children: "Manage B2B relationships and billing details." }, void 0, false, {
          fileName: "/app/applet/pages/Customers.tsx",
          lineNumber: 222,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Customers.tsx",
        lineNumber: 220,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxDEV("input", { type: "file", ref: fileInputRef, accept: ".csv", style: { display: "none" }, onChange: handleFileChange }, void 0, false, {
          fileName: "/app/applet/pages/Customers.tsx",
          lineNumber: 225,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: handleImportClick, className: "flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg transition shadow-sm text-sm font-medium", children: [
          /* @__PURE__ */ jsxDEV(Upload, { size: 16 }, void 0, false, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 227,
            columnNumber: 13
          }, this),
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline", children: "Import CSV" }, void 0, false, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 227,
            columnNumber: 34
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Customers.tsx",
          lineNumber: 226,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: handleExportCSV, className: "flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg transition shadow-sm text-sm font-medium", children: [
          /* @__PURE__ */ jsxDEV(Download, { size: 16 }, void 0, false, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 230,
            columnNumber: 13
          }, this),
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline", children: "Export CSV" }, void 0, false, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 230,
            columnNumber: 36
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Customers.tsx",
          lineNumber: 229,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: openAddModal, className: "flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition shadow-sm", children: [
          /* @__PURE__ */ jsxDEV(Plus, { size: 18 }, void 0, false, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 233,
            columnNumber: 13
          }, this),
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline", children: "Add New Customer" }, void 0, false, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 233,
            columnNumber: 32
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Customers.tsx",
          lineNumber: 232,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Customers.tsx",
        lineNumber: 224,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Customers.tsx",
      lineNumber: 219,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
      /* @__PURE__ */ jsxDEV(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 20 }, void 0, false, {
        fileName: "/app/applet/pages/Customers.tsx",
        lineNumber: 240,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          type: "text",
          placeholder: "Search by business, owner, GST, or phone...",
          className: "w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 bg-white text-black input-responsive",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/pages/Customers.tsx",
          lineNumber: 241,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Customers.tsx",
      lineNumber: 239,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/pages/Customers.tsx",
      lineNumber: 238,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredCustomers.map(
      (customer) => /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition relative group", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "absolute top-4 right-4 flex space-x-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition", children: [
          /* @__PURE__ */ jsxDEV("button", { onClick: () => openEditModal(customer), className: "p-1.5 bg-gray-100 hover:bg-amber-100 text-gray-600 hover:text-amber-700 rounded-md", children: /* @__PURE__ */ jsxDEV(Edit2, { size: 16 }, void 0, false, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 256,
            columnNumber: 18
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 255,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV("button", { onClick: () => handleDelete(customer.id), className: "p-1.5 bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-700 rounded-md", children: /* @__PURE__ */ jsxDEV(Trash2, { size: 16 }, void 0, false, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 259,
            columnNumber: 18
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 258,
            columnNumber: 16
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Customers.tsx",
          lineNumber: 254,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-start mb-4 pr-16", children: /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-lg text-gray-900 leading-tight", children: customer.businessName }, void 0, false, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 264,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-amber-700 font-medium", children: customer.ownerName }, void 0, false, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 265,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Customers.tsx",
          lineNumber: 263,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/pages/Customers.tsx",
          lineNumber: 262,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 text-sm text-gray-600 mb-4", children: [
          customer.gst && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV(FileText, { size: 16, className: "text-gray-400" }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 271,
              columnNumber: 20
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono bg-gray-100 px-1 rounded text-xs", children: customer.gst }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 272,
              columnNumber: 20
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 270,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV(MapPin, { size: 16, className: "text-gray-400" }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 275,
              columnNumber: 60
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "truncate", children: customer.address }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 275,
              columnNumber: 106
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 275,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV(Phone, { size: 16, className: "text-gray-400" }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 276,
              columnNumber: 60
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: customer.phone }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 276,
              columnNumber: 105
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 276,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV(Mail, { size: 16, className: "text-gray-400" }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 277,
              columnNumber: 60
            }, this),
            /* @__PURE__ */ jsxDEV("a", { href: `mailto:${customer.email}`, className: "hover:text-amber-600 truncate block", children: customer.email }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 277,
              columnNumber: 104
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 277,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Customers.tsx",
          lineNumber: 268,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "pt-4 border-t border-gray-100 flex justify-between items-center text-sm", children: [
          /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded-full text-xs font-semibold ${customer.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`, children: customer.status }, void 0, false, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 280,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV("button", { onClick: () => handleGenerateBillEmail(customer), className: "text-amber-600 hover:text-amber-800 font-bold flex items-center space-x-1 px-2 py-1 rounded hover:bg-amber-50 transition", children: [
            /* @__PURE__ */ jsxDEV(Mail, { size: 16 }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 282,
              columnNumber: 19
            }, this),
            " ",
            /* @__PURE__ */ jsxDEV("span", { children: "Draft Bill Email" }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 282,
              columnNumber: 38
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 281,
            columnNumber: 16
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Customers.tsx",
          lineNumber: 279,
          columnNumber: 13
        }, this)
      ] }, customer.id, true, {
        fileName: "/app/applet/pages/Customers.tsx",
        lineNumber: 253,
        columnNumber: 9
      }, this)
    ) }, void 0, false, {
      fileName: "/app/applet/pages/Customers.tsx",
      lineNumber: 251,
      columnNumber: 7
    }, this),
    showModal && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-2xl w-full max-w-lg p-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-gray-900", children: isEditing ? "Edit Customer" : "Add New Customer" }, void 0, false, {
          fileName: "/app/applet/pages/Customers.tsx",
          lineNumber: 293,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: () => setShowModal(false), className: "text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsxDEV(X, { size: 24 }, void 0, false, {
          fileName: "/app/applet/pages/Customers.tsx",
          lineNumber: 294,
          columnNumber: 105
        }, this) }, void 0, false, {
          fileName: "/app/applet/pages/Customers.tsx",
          lineNumber: 294,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Customers.tsx",
        lineNumber: 292,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Business Name *" }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 299,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("input", { required: true, name: "businessName", value: formData.businessName, onChange: handleInputChange, className: "w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 outline-none transition bg-white text-black input-responsive" }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 300,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 298,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Owner Name *" }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 303,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("input", { required: true, name: "ownerName", value: formData.ownerName, onChange: handleInputChange, className: "w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 outline-none transition bg-white text-black input-responsive" }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 304,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 302,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Status" }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 307,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                name: "status",
                value: formData.status,
                onChange: handleInputChange,
                className: "w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 outline-none transition bg-white text-black input-responsive",
                children: [
                  /* @__PURE__ */ jsxDEV("option", { value: "Active", children: "Active" }, void 0, false, {
                    fileName: "/app/applet/pages/Customers.tsx",
                    lineNumber: 314,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "Inactive", children: "Inactive" }, void 0, false, {
                    fileName: "/app/applet/pages/Customers.tsx",
                    lineNumber: 315,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/pages/Customers.tsx",
                lineNumber: 308,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 306,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "GST Number" }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 319,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("input", { name: "gst", value: formData.gst, onChange: handleInputChange, className: "w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 outline-none transition bg-white text-black input-responsive font-mono" }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 320,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 318,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Phone" }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 323,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("input", { name: "phone", value: formData.phone, onChange: handleInputChange, className: "w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 outline-none transition bg-white text-black input-responsive" }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 324,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 322,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 327,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("input", { type: "email", name: "email", value: formData.email, onChange: handleInputChange, className: "w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 outline-none transition bg-white text-black input-responsive" }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 328,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 326,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Address" }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 331,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("input", { name: "address", value: formData.address, onChange: handleInputChange, className: "w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 outline-none transition bg-white text-black input-responsive" }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 332,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 330,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Customers.tsx",
          lineNumber: 297,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end space-x-3 pt-4 border-t border-gray-100", children: [
          /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: () => setShowModal(false), className: "px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50", children: "Cancel" }, void 0, false, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 336,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("button", { type: "submit", className: "px-4 py-2 bg-amber-600 rounded-lg text-white hover:bg-amber-700 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Save, { size: 18 }, void 0, false, {
              fileName: "/app/applet/pages/Customers.tsx",
              lineNumber: 337,
              columnNumber: 139
            }, this),
            " ",
            isEditing ? "Save Changes" : "Add Customer"
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Customers.tsx",
            lineNumber: 337,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Customers.tsx",
          lineNumber: 335,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Customers.tsx",
        lineNumber: 296,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Customers.tsx",
      lineNumber: 291,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/pages/Customers.tsx",
      lineNumber: 290,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/pages/Customers.tsx",
    lineNumber: 218,
    columnNumber: 5
  }, this);
};
_s(Customers, "t+VdvpDe+hfTRxRWaeAapbL2tKM=", false, function() {
  return [useOutletContext];
});
_c = Customers;
export default Customers;
var _c;
$RefreshReg$(_c, "Customers");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/applet/pages/Customers.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/applet/pages/Customers.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QTtBQUFBO0FBQUEsZUFxQ0E7QUFBQSxRQUNBLHVCQUFDLFNBQUksV0FBVSw0REFDYjtBQUFBLGlDQUFDLFlBQU8sTUFBSyxVQUFTLFNBQVMsTUFBTW5CLGFBQWEsS0FBSyxHQUFHLFdBQVUsOEVBQTZFLHNCQUFqSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF1SjtBQUFBLFVBQ3ZKLHVCQUFDLFlBQU8sTUFBSyxVQUFTLFdBQVUsMkZBQTBGO0FBQUEsbUNBQUMsUUFBSyxNQUFNLE1BQVo7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBZTtBQUFBLFlBQUc7QUFBQSxZQUFFTyxZQUFZLGlCQUFpQjtBQUFBLGVBQTNLO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQTBMO0FBQUEsYUFGNUw7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUdBO0FBQUEsV0ExQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQTJDQTtBQUFBLFNBaERGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FpREEsS0FsREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQW1EQTtBQUFBLE9BM0hKO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0E2SEE7QUFFSjtBQUFFZixHQTlUSUQsV0FBbUI7QUFBQSxVQUMyRGQsZ0JBQWdCO0FBQUE7QUFBQSxLQUQ5RmM7QUFnVU4sZUFBZUE7QUFBVSxJQUFBMEg7QUFBQSxhQUFBQSxJQUFBIiwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VSZWYiLCJ1c2VPdXRsZXRDb250ZXh0IiwiUGx1cyIsIlNlYXJjaCIsIk1haWwiLCJNYXBQaW4iLCJQaG9uZSIsIkVkaXQyIiwiVHJhc2gyIiwiRmlsZVRleHQiLCJYIiwiU2F2ZSIsIlVwbG9hZCIsIkRvd25sb2FkIiwiZ2VuZXJhdGVDdXN0b21lckVtYWlsIiwiQ3VzdG9tZXJzIiwiX3MiLCJjdXN0b21lcnMiLCJhZGRDdXN0b21lciIsInVwZGF0ZUN1c3RvbWVyIiwiZGVsZXRlQ3VzdG9tZXIiLCJvcmRlcnMiLCJ1c2VycyIsInNob3dNb2RhbCIsInNldFNob3dNb2RhbCIsInNlYXJjaFRlcm0iLCJzZXRTZWFyY2hUZXJtIiwiZW1haWxEcmFmdCIsInNldEVtYWlsRHJhZnQiLCJsb2FkaW5nQWkiLCJzZXRMb2FkaW5nQWkiLCJpc0VkaXRpbmciLCJzZXRJc0VkaXRpbmciLCJmaWxlSW5wdXRSZWYiLCJmb3JtRGF0YSIsInNldEZvcm1EYXRhIiwiYnVzaW5lc3NOYW1lIiwib3duZXJOYW1lIiwiZ3N0IiwiZW1haWwiLCJwaG9uZSIsImFkZHJlc3MiLCJzdGF0dXMiLCJoYW5kbGVJbnB1dENoYW5nZSIsImUiLCJ0YXJnZXQiLCJuYW1lIiwidmFsdWUiLCJvcGVuQWRkTW9kYWwiLCJvcGVuRWRpdE1vZGFsIiwiY3VzdG9tZXIiLCJoYW5kbGVEZWxldGUiLCJjdXN0b21lcklkIiwiY29uZmlybSIsImhhbmRsZVN1Ym1pdCIsInByZXZlbnREZWZhdWx0IiwiaWQiLCJEYXRlIiwibm93IiwibGFzdE9yZGVyRGF0ZSIsImhhbmRsZUV4cG9ydENTViIsImhlYWRlcnMiLCJjc3ZSb3dzIiwibWFwIiwiYyIsInNhZmUiLCJzdHIiLCJyZXBsYWNlIiwiam9pbiIsImNzdkNvbnRlbnQiLCJibG9iIiwiQmxvYiIsInR5cGUiLCJ1cmwiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJsaW5rIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwidG9JU09TdHJpbmciLCJzcGxpdCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNsaWNrIiwicmVtb3ZlQ2hpbGQiLCJoYW5kbGVJbXBvcnRDbGljayIsImN1cnJlbnQiLCJoYW5kbGVGaWxlQ2hhbmdlIiwiZXZlbnQiLCJmaWxlIiwiZmlsZXMiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwidGV4dCIsInJlc3VsdCIsInByb2Nlc3NDU1YiLCJyZWFkQXNUZXh0IiwiY3N2VGV4dCIsImxpbmVzIiwibGVuZ3RoIiwiYWxlcnQiLCJhZGRlZENvdW50IiwiaSIsImxpbmUiLCJ0cmltIiwicmVnZXgiLCJtYXRjaGVzIiwibWF0Y2giLCJleGVjIiwidmFsIiwidW5kZWZpbmVkIiwicHVzaCIsImNvbHMiLCJmaWx0ZXIiLCJtIiwibmV3Q3VzdG9tZXIiLCJoYW5kbGVHZW5lcmF0ZUJpbGxFbWFpbCIsImN1c3RvbWVyT3JkZXJzIiwibyIsInNvcnQiLCJhIiwiYiIsImRhdGUiLCJnZXRUaW1lIiwibGFzdE9yZGVyIiwic2FsZXNFeGVjTmFtZSIsInNhbGVzRXhlY0lkIiwic2UiLCJmaW5kIiwidSIsImRyYWZ0IiwiZmlsdGVyZWRDdXN0b21lcnMiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwiZGlzcGxheSIsIl9jIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkN1c3RvbWVycy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZU91dGxldENvbnRleHQgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IEFwcENvbnRleHRUeXBlLCBCdXNpbmVzc093bmVyLCBPcmRlciB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFBsdXMsIFNlYXJjaCwgTWFpbCwgTWFwUGluLCBQaG9uZSwgRWRpdDIsIFRyYXNoMiwgRmlsZVRleHQsIFgsIFNhdmUsIFVwbG9hZCwgRG93bmxvYWQgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgZ2VuZXJhdGVDdXN0b21lckVtYWlsIH0gZnJvbSAnLi4vc2VydmljZXMvZ2VtaW5pU2VydmljZSc7XG5cbmNvbnN0IEN1c3RvbWVyczogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IHsgY3VzdG9tZXJzLCBhZGRDdXN0b21lciwgdXBkYXRlQ3VzdG9tZXIsIGRlbGV0ZUN1c3RvbWVyLCBvcmRlcnMsIHVzZXJzIH0gPSB1c2VPdXRsZXRDb250ZXh0PEFwcENvbnRleHRUeXBlPigpO1xuICBjb25zdCBbc2hvd01vZGFsLCBzZXRTaG93TW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2VhcmNoVGVybSwgc2V0U2VhcmNoVGVybV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtlbWFpbERyYWZ0LCBzZXRFbWFpbERyYWZ0XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbG9hZGluZ0FpLCBzZXRMb2FkaW5nQWldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNFZGl0aW5nLCBzZXRJc0VkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBmaWxlSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudD4obnVsbCk7XG5cbiAgY29uc3QgW2Zvcm1EYXRhLCBzZXRGb3JtRGF0YV0gPSB1c2VTdGF0ZTxQYXJ0aWFsPEJ1c2luZXNzT3duZXI+Pih7XG4gICAgYnVzaW5lc3NOYW1lOiAnJyxcbiAgICBvd25lck5hbWU6ICcnLFxuICAgIGdzdDogJycsXG4gICAgZW1haWw6ICcnLFxuICAgIHBob25lOiAnJyxcbiAgICBhZGRyZXNzOiAnJyxcbiAgICBzdGF0dXM6ICdBY3RpdmUnXG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudD4pID0+IHtcbiAgICBzZXRGb3JtRGF0YSh7IC4uLmZvcm1EYXRhLCBbZS50YXJnZXQubmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pO1xuICB9O1xuXG4gIGNvbnN0IG9wZW5BZGRNb2RhbCA9ICgpID0+IHtcbiAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgIHNldEZvcm1EYXRhKHsgYnVzaW5lc3NOYW1lOiAnJywgb3duZXJOYW1lOiAnJywgZ3N0OiAnJywgZW1haWw6ICcnLCBwaG9uZTogJycsIGFkZHJlc3M6ICcnLCBzdGF0dXM6ICdBY3RpdmUnIH0pO1xuICAgIHNldFNob3dNb2RhbCh0cnVlKTtcbiAgfTtcblxuICBjb25zdCBvcGVuRWRpdE1vZGFsID0gKGN1c3RvbWVyOiBCdXNpbmVzc093bmVyKSA9PiB7XG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgIHNldEZvcm1EYXRhKHsgLi4uY3VzdG9tZXIgfSk7XG4gICAgc2V0U2hvd01vZGFsKHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9IChjdXN0b21lcklkOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBjdXN0b21lcj8gVGhpcyBhY3Rpb24gY2Fubm90IGJlIHVuZG9uZS5cIikpIHtcbiAgICAgIGRlbGV0ZUN1c3RvbWVyKGN1c3RvbWVySWQpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghZm9ybURhdGEuYnVzaW5lc3NOYW1lIHx8ICFmb3JtRGF0YS5vd25lck5hbWUpIHJldHVybjtcblxuICAgIGlmIChpc0VkaXRpbmcgJiYgZm9ybURhdGEuaWQpIHtcbiAgICAgIHVwZGF0ZUN1c3RvbWVyKGZvcm1EYXRhIGFzIEJ1c2luZXNzT3duZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjdXN0b21lcjogQnVzaW5lc3NPd25lciA9IHtcbiAgICAgICAgaWQ6IGBjJHtEYXRlLm5vdygpfWAsXG4gICAgICAgIGJ1c2luZXNzTmFtZTogZm9ybURhdGEuYnVzaW5lc3NOYW1lIHx8ICdVbmtub3duJyxcbiAgICAgICAgb3duZXJOYW1lOiBmb3JtRGF0YS5vd25lck5hbWUgfHwgJ1Vua25vd24nLFxuICAgICAgICBnc3Q6IGZvcm1EYXRhLmdzdCB8fCAnJyxcbiAgICAgICAgZW1haWw6IGZvcm1EYXRhLmVtYWlsIHx8ICcnLFxuICAgICAgICBwaG9uZTogZm9ybURhdGEucGhvbmUgfHwgJycsXG4gICAgICAgIGFkZHJlc3M6IGZvcm1EYXRhLmFkZHJlc3MgfHwgJycsXG4gICAgICAgIHN0YXR1czogKGZvcm1EYXRhLnN0YXR1cyBhcyAnQWN0aXZlJyB8ICdJbmFjdGl2ZScpIHx8ICdBY3RpdmUnLFxuICAgICAgICBsYXN0T3JkZXJEYXRlOiAnTmV2ZXInXG4gICAgICB9O1xuICAgICAgYWRkQ3VzdG9tZXIoY3VzdG9tZXIpO1xuICAgICAgc2V0U2VhcmNoVGVybSgnJyk7XG4gICAgfVxuICAgIHNldFNob3dNb2RhbChmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRXhwb3J0Q1NWID0gKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlcnMgPSBbJ0J1c2luZXNzIE5hbWUnLCAnT3duZXIgTmFtZScsICdHU1QnLCAnUGhvbmUnLCAnRW1haWwnLCAnQWRkcmVzcycsICdTdGF0dXMnXTtcbiAgICBjb25zdCBjc3ZSb3dzID0gY3VzdG9tZXJzLm1hcChjID0+IHtcbiAgICAgIGNvbnN0IHNhZmUgPSAoc3RyOiBzdHJpbmcpID0+IGBcIiR7KHN0ciB8fCAnJykucmVwbGFjZSgvXCIvZywgJ1wiXCInKX1cImA7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBzYWZlKGMuYnVzaW5lc3NOYW1lKSxcbiAgICAgICAgc2FmZShjLm93bmVyTmFtZSksXG4gICAgICAgIHNhZmUoYy5nc3QpLFxuICAgICAgICBzYWZlKGMucGhvbmUpLFxuICAgICAgICBzYWZlKGMuZW1haWwpLFxuICAgICAgICBzYWZlKGMuYWRkcmVzcyksXG4gICAgICAgIHNhZmUoYy5zdGF0dXMpXG4gICAgICBdLmpvaW4oJywnKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGNzdkNvbnRlbnQgPSBbaGVhZGVycy5qb2luKCcsJyksIC4uLmNzdlJvd3NdLmpvaW4oJ1xcbicpO1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbY3N2Q29udGVudF0sIHsgdHlwZTogJ3RleHQvY3N2O2NoYXJzZXQ9dXRmLTg7JyB9KTtcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwpO1xuICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGBjdXN0b21lcnNfZXhwb3J0XyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19LmNzdmApO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgbGluay5jbGljaygpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlSW1wb3J0Q2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKGZpbGVJbnB1dFJlZi5jdXJyZW50KSB7XG4gICAgICBmaWxlSW5wdXRSZWYuY3VycmVudC5jbGljaygpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVGaWxlQ2hhbmdlID0gKGV2ZW50OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgIGNvbnN0IGZpbGUgPSBldmVudC50YXJnZXQuZmlsZXM/LlswXTtcbiAgICBpZiAoIWZpbGUpIHJldHVybjtcblxuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9ubG9hZCA9IChlKSA9PiB7XG4gICAgICAvLyBGaXggVFMxODA0NzogZS50YXJnZXQgbWlnaHQgYmUgbnVsbFxuICAgICAgY29uc3QgdGV4dCA9IGUudGFyZ2V0Py5yZXN1bHQgYXMgc3RyaW5nO1xuICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgcHJvY2Vzc0NTVih0ZXh0KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xuICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9ICcnO1xuICB9O1xuXG4gIGNvbnN0IHByb2Nlc3NDU1YgPSAoY3N2VGV4dDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgbGluZXMgPSBjc3ZUZXh0LnNwbGl0KCdcXG4nKTtcbiAgICBpZiAobGluZXMubGVuZ3RoIDwgMikge1xuICAgICAgYWxlcnQoXCJDU1YgZmlsZSBhcHBlYXJzIGVtcHR5IG9yIG1pc3NpbmcgaGVhZGVycy5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGFkZGVkQ291bnQgPSAwO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGxpbmUgPSBsaW5lc1tpXS50cmltKCk7XG4gICAgICBpZiAoIWxpbmUpIGNvbnRpbnVlO1xuXG4gICAgICBjb25zdCByZWdleCA9IC8oPzpefCwpKD86XCIoW15cIl0qKD86XCJcIlteXCJdKikqKVwifChbXlwiLF0qKSkvZztcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSBbXTtcbiAgICAgIGxldCBtYXRjaDtcbiAgICAgIHdoaWxlICgobWF0Y2ggPSByZWdleC5leGVjKGxpbmUpKSkge1xuICAgICAgICBsZXQgdmFsID0gbWF0Y2hbMV0gIT09IHVuZGVmaW5lZCA/IG1hdGNoWzFdLnJlcGxhY2UoL1wiXCIvZywgJ1wiJykgOiBtYXRjaFsyXTtcbiAgICAgICAgbWF0Y2hlcy5wdXNoKHZhbD8udHJpbSgpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgY29uc3QgY29scyA9IG1hdGNoZXMuZmlsdGVyKG0gPT4gbSAhPT0gdW5kZWZpbmVkKTtcbiAgICAgICAgY29uc3QgYnVzaW5lc3NOYW1lID0gY29sc1swXTtcbiAgICAgICAgY29uc3Qgb3duZXJOYW1lID0gY29sc1sxXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChidXNpbmVzc05hbWUgJiYgb3duZXJOYW1lKSB7XG4gICAgICAgICAgY29uc3QgbmV3Q3VzdG9tZXI6IEJ1c2luZXNzT3duZXIgPSB7XG4gICAgICAgICAgICBpZDogYGMke0RhdGUubm93KCkgKyBpfWAsXG4gICAgICAgICAgICBidXNpbmVzc05hbWU6IGJ1c2luZXNzTmFtZSxcbiAgICAgICAgICAgIG93bmVyTmFtZTogb3duZXJOYW1lLFxuICAgICAgICAgICAgZ3N0OiBjb2xzWzJdIHx8ICcnLFxuICAgICAgICAgICAgcGhvbmU6IGNvbHNbM10gfHwgJycsXG4gICAgICAgICAgICBlbWFpbDogY29sc1s0XSB8fCAnJyxcbiAgICAgICAgICAgIGFkZHJlc3M6IGNvbHNbNV0gfHwgJycsXG4gICAgICAgICAgICBzdGF0dXM6IChjb2xzWzZdID09PSAnSW5hY3RpdmUnID8gJ0luYWN0aXZlJyA6ICdBY3RpdmUnKSxcbiAgICAgICAgICAgIGxhc3RPcmRlckRhdGU6ICdOZXZlcidcbiAgICAgICAgICB9O1xuICAgICAgICAgIGFkZEN1c3RvbWVyKG5ld0N1c3RvbWVyKTtcbiAgICAgICAgICBhZGRlZENvdW50Kys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYWRkZWRDb3VudCA+IDApIHtcbiAgICAgIGFsZXJ0KGBTdWNjZXNzZnVsbHkgaW1wb3J0ZWQgJHthZGRlZENvdW50fSBjdXN0b21lcnMuYCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUdlbmVyYXRlQmlsbEVtYWlsID0gYXN5bmMgKGN1c3RvbWVyOiBCdXNpbmVzc093bmVyKSA9PiB7XG4gICAgc2V0TG9hZGluZ0FpKHRydWUpO1xuICAgIHNldEVtYWlsRHJhZnQobnVsbCk7XG5cbiAgICBjb25zdCBjdXN0b21lck9yZGVycyA9IG9yZGVyc1xuICAgICAgLmZpbHRlcihvID0+IG8uY3VzdG9tZXJJZCA9PT0gY3VzdG9tZXIuaWQpXG4gICAgICAuc29ydCgoYSwgYikgPT4gbmV3IERhdGUoYi5kYXRlKS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShhLmRhdGUpLmdldFRpbWUoKSk7XG4gICAgXG4gICAgY29uc3QgbGFzdE9yZGVyID0gY3VzdG9tZXJPcmRlcnMubGVuZ3RoID4gMCA/IGN1c3RvbWVyT3JkZXJzWzBdIDogdW5kZWZpbmVkO1xuICAgIFxuICAgIGxldCBzYWxlc0V4ZWNOYW1lID0gJ1NhbGVzIFRlYW0nO1xuICAgIGlmIChsYXN0T3JkZXIgJiYgbGFzdE9yZGVyLnNhbGVzRXhlY0lkKSB7XG4gICAgICBjb25zdCBzZSA9IHVzZXJzLmZpbmQodSA9PiB1LmlkID09PSBsYXN0T3JkZXIuc2FsZXNFeGVjSWQpO1xuICAgICAgaWYgKHNlKSBzYWxlc0V4ZWNOYW1lID0gc2UubmFtZTtcbiAgICB9XG5cbiAgICBjb25zdCBkcmFmdCA9IGF3YWl0IGdlbmVyYXRlQ3VzdG9tZXJFbWFpbChjdXN0b21lciwgbGFzdE9yZGVyLCBzYWxlc0V4ZWNOYW1lKTtcbiAgICBzZXRFbWFpbERyYWZ0KGRyYWZ0KTtcbiAgICBzZXRMb2FkaW5nQWkoZmFsc2UpO1xuICB9O1xuXG4gIGNvbnN0IGZpbHRlcmVkQ3VzdG9tZXJzID0gY3VzdG9tZXJzLmZpbHRlcihjID0+IFxuICAgIGMuYnVzaW5lc3NOYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpKSB8fCBcbiAgICBjLm93bmVyTmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSkgfHxcbiAgICAoYy5nc3QgJiYgYy5nc3QudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpKSB8fFxuICAgIChjLnBob25lICYmIGMucGhvbmUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpKVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGdhcC00XCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCI+QnVzaW5lc3MgT3duZXJzPC9oMT5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwXCI+TWFuYWdlIEIyQiByZWxhdGlvbnNoaXBzIGFuZCBiaWxsaW5nIGRldGFpbHMuPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMlwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIHJlZj17ZmlsZUlucHV0UmVmfSBhY2NlcHQ9XCIuY3N2XCIgc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19IG9uQ2hhbmdlPXtoYW5kbGVGaWxlQ2hhbmdlfSAvPlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlSW1wb3J0Q2xpY2t9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHRleHQtZ3JheS03MDAgaG92ZXI6YmctZ3JheS01MCBweC0zIHB5LTIgcm91bmRlZC1sZyB0cmFuc2l0aW9uIHNoYWRvdy1zbSB0ZXh0LXNtIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICA8VXBsb2FkIHNpemU9ezE2fSAvPiA8c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4gc206aW5saW5lXCI+SW1wb3J0IENTVjwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUV4cG9ydENTVn0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIGJnLXdoaXRlIGJvcmRlciBib3JkZXItZ3JheS0zMDAgdGV4dC1ncmF5LTcwMCBob3ZlcjpiZy1ncmF5LTUwIHB4LTMgcHktMiByb3VuZGVkLWxnIHRyYW5zaXRpb24gc2hhZG93LXNtIHRleHQtc20gZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgIDxEb3dubG9hZCBzaXplPXsxNn0gLz4gPHNwYW4gY2xhc3NOYW1lPVwiaGlkZGVuIHNtOmlubGluZVwiPkV4cG9ydCBDU1Y8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtvcGVuQWRkTW9kYWx9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiBiZy1hbWJlci02MDAgaG92ZXI6YmctYW1iZXItNzAwIHRleHQtd2hpdGUgcHgtNCBweS0yIHJvdW5kZWQtbGcgdHJhbnNpdGlvbiBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgIDxQbHVzIHNpemU9ezE4fSAvPiA8c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4gc206aW5saW5lXCI+QWRkIE5ldyBDdXN0b21lcjwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLXhsIHNoYWRvdy1zbSBib3JkZXIgYm9yZGVyLWdyYXktMTAwIHAtNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgPFNlYXJjaCBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTMgdG9wLTEvMiB0cmFuc2Zvcm0gLXRyYW5zbGF0ZS15LTEvMiB0ZXh0LWdyYXktNDAwXCIgc2l6ZT17MjB9IC8+XG4gICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGJ5IGJ1c2luZXNzLCBvd25lciwgR1NULCBvciBwaG9uZS4uLlwiIFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHBsLTEwIHByLTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMjAwIHJvdW5kZWQtbGcgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBiZy13aGl0ZSB0ZXh0LWJsYWNrIGlucHV0LXJlc3BvbnNpdmVcIlxuICAgICAgICAgICAgdmFsdWU9e3NlYXJjaFRlcm19XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlYXJjaFRlcm0oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtNlwiPlxuICAgICAgICB7ZmlsdGVyZWRDdXN0b21lcnMubWFwKGN1c3RvbWVyID0+IChcbiAgICAgICAgICA8ZGl2IGtleT17Y3VzdG9tZXIuaWR9IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQteGwgc2hhZG93LXNtIGJvcmRlciBib3JkZXItZ3JheS0xMDAgcC02IGhvdmVyOnNoYWRvdy1tZCB0cmFuc2l0aW9uIHJlbGF0aXZlIGdyb3VwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC00IHJpZ2h0LTQgZmxleCBzcGFjZS14LTEgb3BhY2l0eS0xMDAgbWQ6b3BhY2l0eS0wIG1kOmdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIHRyYW5zaXRpb25cIj5cbiAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gb3BlbkVkaXRNb2RhbChjdXN0b21lcil9IGNsYXNzTmFtZT1cInAtMS41IGJnLWdyYXktMTAwIGhvdmVyOmJnLWFtYmVyLTEwMCB0ZXh0LWdyYXktNjAwIGhvdmVyOnRleHQtYW1iZXItNzAwIHJvdW5kZWQtbWRcIj5cbiAgICAgICAgICAgICAgICAgPEVkaXQyIHNpemU9ezE2fSAvPlxuICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGhhbmRsZURlbGV0ZShjdXN0b21lci5pZCl9IGNsYXNzTmFtZT1cInAtMS41IGJnLWdyYXktMTAwIGhvdmVyOmJnLXJlZC0xMDAgdGV4dC1ncmF5LTYwMCBob3Zlcjp0ZXh0LXJlZC03MDAgcm91bmRlZC1tZFwiPlxuICAgICAgICAgICAgICAgICA8VHJhc2gyIHNpemU9ezE2fSAvPlxuICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtc3RhcnQgbWItNCBwci0xNlwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1sZyB0ZXh0LWdyYXktOTAwIGxlYWRpbmctdGlnaHRcIj57Y3VzdG9tZXIuYnVzaW5lc3NOYW1lfTwvaDM+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWFtYmVyLTcwMCBmb250LW1lZGl1bVwiPntjdXN0b21lci5vd25lck5hbWV9PC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgdGV4dC1zbSB0ZXh0LWdyYXktNjAwIG1iLTRcIj5cbiAgICAgICAgICAgICAgIHtjdXN0b21lci5nc3QgJiYgKFxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgICAgIDxGaWxlVGV4dCBzaXplPXsxNn0gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIGJnLWdyYXktMTAwIHB4LTEgcm91bmRlZCB0ZXh0LXhzXCI+e2N1c3RvbWVyLmdzdH08L3NwYW4+XG4gICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj48TWFwUGluIHNpemU9ezE2fSBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwXCIgLz48c3BhbiBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPntjdXN0b21lci5hZGRyZXNzfTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj48UGhvbmUgc2l6ZT17MTZ9IGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDBcIiAvPjxzcGFuPntjdXN0b21lci5waG9uZX08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+PE1haWwgc2l6ZT17MTZ9IGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDBcIiAvPjxhIGhyZWY9e2BtYWlsdG86JHtjdXN0b21lci5lbWFpbH1gfSBjbGFzc05hbWU9XCJob3Zlcjp0ZXh0LWFtYmVyLTYwMCB0cnVuY2F0ZSBibG9ja1wiPntjdXN0b21lci5lbWFpbH08L2E+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtNCBib3JkZXItdCBib3JkZXItZ3JheS0xMDAgZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHRleHQtc21cIj5cbiAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgJHtjdXN0b21lci5zdGF0dXMgPT09ICdBY3RpdmUnID8gJ2JnLWdyZWVuLTEwMCB0ZXh0LWdyZWVuLTcwMCcgOiAnYmctZ3JheS0xMDAgdGV4dC1ncmF5LTYwMCd9YH0+e2N1c3RvbWVyLnN0YXR1c308L3NwYW4+XG4gICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGhhbmRsZUdlbmVyYXRlQmlsbEVtYWlsKGN1c3RvbWVyKX0gY2xhc3NOYW1lPVwidGV4dC1hbWJlci02MDAgaG92ZXI6dGV4dC1hbWJlci04MDAgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMSBweC0yIHB5LTEgcm91bmRlZCBob3ZlcjpiZy1hbWJlci01MCB0cmFuc2l0aW9uXCI+XG4gICAgICAgICAgICAgICAgICA8TWFpbCBzaXplPXsxNn0gLz4gPHNwYW4+RHJhZnQgQmlsbCBFbWFpbDwvc3Bhbj5cbiAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtzaG93TW9kYWwgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgYmctYmxhY2sgYmctb3BhY2l0eS01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTQgei01MCBhbmltYXRlLWZhZGUtaW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQteGwgc2hhZG93LTJ4bCB3LWZ1bGwgbWF4LXctbGcgcC02XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBtYi00XCI+XG4gICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCI+e2lzRWRpdGluZyA/ICdFZGl0IEN1c3RvbWVyJyA6ICdBZGQgTmV3IEN1c3RvbWVyJ308L2gyPlxuICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldFNob3dNb2RhbChmYWxzZSl9IGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC1ncmF5LTYwMFwiPjxYIHNpemU9ezI0fS8+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zcGFuLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiPkJ1c2luZXNzIE5hbWUgKjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgcmVxdWlyZWQgbmFtZT1cImJ1c2luZXNzTmFtZVwiIHZhbHVlPXtmb3JtRGF0YS5idXNpbmVzc05hbWV9IG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX0gY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCBwLTIuNSBmb2N1czpyaW5nLTIgb3V0bGluZS1ub25lIHRyYW5zaXRpb24gYmctd2hpdGUgdGV4dC1ibGFjayBpbnB1dC1yZXNwb25zaXZlXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCI+T3duZXIgTmFtZSAqPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCByZXF1aXJlZCBuYW1lPVwib3duZXJOYW1lXCIgdmFsdWU9e2Zvcm1EYXRhLm93bmVyTmFtZX0gb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfSBjbGFzc05hbWU9XCJ3LWZ1bGwgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHAtMi41IGZvY3VzOnJpbmctMiBvdXRsaW5lLW5vbmUgdHJhbnNpdGlvbiBiZy13aGl0ZSB0ZXh0LWJsYWNrIGlucHV0LXJlc3BvbnNpdmVcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIj5TdGF0dXM8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPHNlbGVjdCBcbiAgICAgICAgICAgICAgICAgICAgbmFtZT1cInN0YXR1c1wiIFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEuc3RhdHVzfSBcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfSBcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCBwLTIuNSBmb2N1czpyaW5nLTIgb3V0bGluZS1ub25lIHRyYW5zaXRpb24gYmctd2hpdGUgdGV4dC1ibGFjayBpbnB1dC1yZXNwb25zaXZlXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkFjdGl2ZVwiPkFjdGl2ZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiSW5hY3RpdmVcIj5JbmFjdGl2ZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiPkdTVCBOdW1iZXI8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IG5hbWU9XCJnc3RcIiB2YWx1ZT17Zm9ybURhdGEuZ3N0fSBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9IGNsYXNzTmFtZT1cInctZnVsbCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcC0yLjUgZm9jdXM6cmluZy0yIG91dGxpbmUtbm9uZSB0cmFuc2l0aW9uIGJnLXdoaXRlIHRleHQtYmxhY2sgaW5wdXQtcmVzcG9uc2l2ZSBmb250LW1vbm9cIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIj5QaG9uZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgbmFtZT1cInBob25lXCIgdmFsdWU9e2Zvcm1EYXRhLnBob25lfSBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9IGNsYXNzTmFtZT1cInctZnVsbCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcC0yLjUgZm9jdXM6cmluZy0yIG91dGxpbmUtbm9uZSB0cmFuc2l0aW9uIGJnLXdoaXRlIHRleHQtYmxhY2sgaW5wdXQtcmVzcG9uc2l2ZVwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiPkVtYWlsPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZW1haWxcIiBuYW1lPVwiZW1haWxcIiB2YWx1ZT17Zm9ybURhdGEuZW1haWx9IG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX0gY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCBwLTIuNSBmb2N1czpyaW5nLTIgb3V0bGluZS1ub25lIHRyYW5zaXRpb24gYmctd2hpdGUgdGV4dC1ibGFjayBpbnB1dC1yZXNwb25zaXZlXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zcGFuLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiPkFkZHJlc3M8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IG5hbWU9XCJhZGRyZXNzXCIgdmFsdWU9e2Zvcm1EYXRhLmFkZHJlc3N9IG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX0gY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCBwLTIuNSBmb2N1czpyaW5nLTIgb3V0bGluZS1ub25lIHRyYW5zaXRpb24gYmctd2hpdGUgdGV4dC1ibGFjayBpbnB1dC1yZXNwb25zaXZlXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZCBzcGFjZS14LTMgcHQtNCBib3JkZXItdCBib3JkZXItZ3JheS0xMDBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93TW9kYWwoZmFsc2UpfSBjbGFzc05hbWU9XCJweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIHRleHQtZ3JheS03MDAgaG92ZXI6YmctZ3JheS01MFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cInB4LTQgcHktMiBiZy1hbWJlci02MDAgcm91bmRlZC1sZyB0ZXh0LXdoaXRlIGhvdmVyOmJnLWFtYmVyLTcwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPjxTYXZlIHNpemU9ezE4fSAvPiB7aXNFZGl0aW5nID8gJ1NhdmUgQ2hhbmdlcycgOiAnQWRkIEN1c3RvbWVyJ308L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEN1c3RvbWVycztcbiJdLCJmaWxlIjoiL2FwcC9hcHBsZXQvcGFnZXMvQ3VzdG9tZXJzLnRzeCJ9