import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/pages/Dashboard.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=76d1f7a8"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/applet/pages/Dashboard.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=76d1f7a8"; const useEffect = __vite__cjsImport3_react["useEffect"]; const useState = __vite__cjsImport3_react["useState"];
import { useOutletContext, Link, useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=76d1f7a8";
import { Role, OrderStatus } from "/types.ts";
import { generateSalesInsight } from "/services/geminiService.ts";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
  LabelList
} from "/node_modules/.vite/deps/recharts.js?v=76d1f7a8";
import {
  TrendingUp,
  Users,
  IndianRupee,
  Package,
  Sparkles,
  BarChart2,
  UserPlus,
  Shield,
  Lock,
  Truck,
  Briefcase,
  RefreshCw,
  Trash2,
  Edit,
  X,
  AlertCircle,
  Calendar,
  Target,
  Eye,
  UserCheck,
  ShieldCheck,
  Bike,
  Image as ImageIcon,
  PieChart as PieChartIcon
} from "/node_modules/.vite/deps/lucide-react.js?v=76d1f7a8";
import { formatDate } from "/services/dateFormatter.ts";
const COLORS = ["#8d6e63", "#00C49F", "#0088FE", "#FFBB28", "#FF8042", "#a0938e"];
const Dashboard = () => {
  _s();
  const { currentUser, orders, products, customers, users, addUser, updateUser, deleteUser } = useOutletContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [insight, setInsight] = useState("");
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inspectedStatus, setInspectedStatus] = useState(null);
  const [newUserForm, setNewUserForm] = useState({
    name: "",
    role: Role.SALES_EXECUTIVE,
    username: "",
    password: "",
    avatar: ""
  });
  useEffect(() => {
    if (!isEditing && newUserForm.name && (!newUserForm.username || !newUserForm.password)) {
      regenerateCredentials();
    }
  }, [newUserForm.name, isEditing]);
  const handleGenerateInsight = async () => {
    setLoadingInsight(true);
    const result = await generateSalesInsight(orders, products);
    setInsight(result);
    setLoadingInsight(false);
  };
  const openAddUserModal = (role = Role.SALES_EXECUTIVE) => {
    setIsEditing(false);
    setNewUserForm({
      name: "",
      role,
      username: "",
      password: "",
      avatar: `https://picsum.photos/100/100?random=${Date.now()}`
    });
    setShowUserModal(true);
  };
  const handleEditUser = (user) => {
    setIsEditing(true);
    setNewUserForm({
      id: user.id,
      name: user.name,
      role: user.role,
      username: user.username || "",
      password: user.password || "",
      avatar: user.avatar
    });
    setShowUserModal(true);
  };
  const handleDeleteUser = (userId) => {
    if (confirm("Are you sure? This will permanently delete this user account.")) deleteUser(userId);
  };
  const regenerateCredentials = () => {
    const base = newUserForm.name ? newUserForm.name.toLowerCase().replace(/[^a-z0-9]/g, "") : "user";
    const randomSuffix = Math.floor(Math.random() * 900) + 100;
    setNewUserForm((prev) => ({ ...prev, username: `${base}${randomSuffix}`, password: `Choco${randomSuffix}!` }));
  };
  const handleSubmitUser = (e) => {
    e.preventDefault();
    const finalAvatar = newUserForm.avatar || `https://picsum.photos/100/100?random=${Date.now()}`;
    if (isEditing && newUserForm.id) {
      updateUser({ ...newUserForm, avatar: finalAvatar });
    } else {
      const { id, ...userData } = newUserForm;
      addUser({ id: `u${Date.now()}`, ...userData, avatar: finalAvatar });
    }
    setShowUserModal(false);
  };
  const getMonthlyRevenue = () => {
    const months = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    orders.forEach((order) => {
      const d = new Date(order.date);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      months[key] = (months[key] || 0) + order.totalAmount;
    });
    return Object.entries(months).map(([name, revenue]) => ({ name, revenue }));
  };
  const getExecPerformance = () => {
    const execs = {};
    orders.forEach((order) => {
      const execId = order.salesExecId;
      if (!execs[execId]) {
        const user = users.find((u) => u.id === execId);
        execs[execId] = { name: user ? user.name : "Unknown", total: 0, count: 0 };
      }
      execs[execId].total += order.totalAmount;
      execs[execId].count += 1;
    });
    return Object.values(execs).sort((a, b) => b.total - a.total);
  };
  const monthlyData = getMonthlyRevenue();
  const execData = getExecPerformance();
  const ordersByStatus = [
    { name: OrderStatus.PENDING, value: orders.filter((o) => o.status === OrderStatus.PENDING).length },
    { name: OrderStatus.PROCESSING, value: orders.filter((o) => o.status === OrderStatus.PROCESSING).length },
    { name: OrderStatus.DELIVERED, value: orders.filter((o) => o.status === OrderStatus.DELIVERED).length },
    { name: OrderStatus.OUT_FOR_DELIVERY, value: orders.filter((o) => o.status === OrderStatus.OUT_FOR_DELIVERY).length },
    { name: OrderStatus.CANCELLED, value: orders.filter((o) => o.status === OrderStatus.CANCELLED).length }
  ].filter((item) => item.value > 0);
  const revenueByCustomer = customers.map((c) => {
    const customerOrders = orders.filter((o) => o.customerId === c.id);
    const total = customerOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    return { name: c.businessName, revenue: total };
  }).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const recentOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  const StatCard = ({ title, value, icon: Icon, color }) => /* @__PURE__ */ jsxDEV("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4", children: [
    /* @__PURE__ */ jsxDEV("div", { className: `p-3 rounded-full ${color} bg-opacity-10 text-${color.replace("bg-", "")}`, children: /* @__PURE__ */ jsxDEV(Icon, { size: 24 }, void 0, false, {
      fileName: "/app/applet/pages/Dashboard.tsx",
      lineNumber: 178,
      columnNumber: 99
    }, this) }, void 0, false, {
      fileName: "/app/applet/pages/Dashboard.tsx",
      lineNumber: 178,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("p", { className: "text-gray-500 text-sm", children: title }, void 0, false, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 179,
        columnNumber: 12
      }, this),
      /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-bold text-gray-900", children: value }, void 0, false, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 179,
        columnNumber: 60
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Dashboard.tsx",
      lineNumber: 179,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/pages/Dashboard.tsx",
    lineNumber: 177,
    columnNumber: 3
  }, this);
  const handlePieClick = (data) => {
    if (data && data.name) {
      setInspectedStatus(data.name);
    }
  };
  const filteredInspectedOrders = inspectedStatus ? orders.filter((o) => o.status === inspectedStatus).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];
  const usersByRole = {
    [Role.ADMIN]: users.filter((u) => u.role === Role.ADMIN),
    [Role.SALES_EXECUTIVE]: users.filter((u) => u.role === Role.SALES_EXECUTIVE),
    [Role.DELIVERY_PERSON]: users.filter((u) => u.role === Role.DELIVERY_PERSON)
  };
  const UserTableSection = ({ title, users: users2, icon: Icon, colorClass }) => /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8", children: [
    /* @__PURE__ */ jsxDEV("div", { className: `px-6 py-4 border-b border-gray-100 flex justify-between items-center ${colorClass}`, children: [
      /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-gray-900 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(Icon, { size: 20, className: "text-gray-600" }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 204,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: [
          title,
          " (",
          users2.length,
          ")"
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 205,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 203,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => openAddUserModal(users2[0]?.role || Role.SALES_EXECUTIVE),
          className: "text-xs bg-white/50 hover:bg-white px-2 py-1 rounded border border-gray-200 font-medium transition",
          children: [
            "Add ",
            title.split(" ")[0]
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 207,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Dashboard.tsx",
      lineNumber: 202,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left text-sm", children: [
      /* @__PURE__ */ jsxDEV("thead", { className: "bg-gray-50 text-gray-500 uppercase text-[10px] font-bold", children: /* @__PURE__ */ jsxDEV("tr", { children: [
        /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-3", children: "Profile" }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 218,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-3", children: "Full Name" }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 219,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-3", children: "Username" }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 220,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-3", children: "Status" }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 221,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-3 text-right", children: "Actions" }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 222,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 217,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 216,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-gray-100", children: users2.length > 0 ? users2.map(
        (user) => /* @__PURE__ */ jsxDEV("tr", { className: "hover:bg-gray-50/50 transition group", children: [
          /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-3", children: /* @__PURE__ */ jsxDEV("img", { src: user.avatar, alt: "", className: "w-8 h-8 rounded-full border border-gray-100" }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 229,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 228,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-3 font-semibold text-gray-800", children: user.name }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 231,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-3 font-mono text-xs text-gray-500", children: user.username || "---" }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 232,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-3", children: /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 text-[10px] font-bold text-green-600", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 235,
              columnNumber: 21
            }, this),
            "ACTIVE"
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 234,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 233,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-3 text-right", children: /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity", children: [
            /* @__PURE__ */ jsxDEV("button", { onClick: () => handleEditUser(user), className: "p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition", title: "Edit", children: /* @__PURE__ */ jsxDEV(Edit, { size: 16 }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 242,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 241,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("button", { onClick: () => handleDeleteUser(user.id), className: "p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition", title: "Delete", children: /* @__PURE__ */ jsxDEV(Trash2, { size: 16 }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 245,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 244,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 240,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 239,
            columnNumber: 17
          }, this)
        ] }, user.id, true, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 227,
          columnNumber: 11
        }, this)
      ) : /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("td", { colSpan: 5, className: "px-6 py-8 text-center text-gray-400 italic", children: "No members found in this category." }, void 0, false, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 252,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 251,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 225,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Dashboard.tsx",
      lineNumber: 215,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/pages/Dashboard.tsx",
      lineNumber: 214,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/pages/Dashboard.tsx",
    lineNumber: 201,
    columnNumber: 3
  }, this);
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-bold text-gray-900", children: currentUser.role === Role.ADMIN ? "Admin Dashboard" : "My Dashboard" }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 265,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-gray-500", children: [
          "Welcome back, ",
          currentUser.name
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 266,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 264,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-lg p-1 shadow-sm border border-gray-100 flex space-x-1", children: [
        /* @__PURE__ */ jsxDEV("button", { onClick: () => setActiveTab("overview"), className: `px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === "overview" ? "bg-amber-100 text-amber-800" : "text-gray-600 hover:bg-gray-50"}`, children: "Overview" }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 269,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: () => setActiveTab("analytics"), className: `px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === "analytics" ? "bg-amber-100 text-amber-800" : "text-gray-600 hover:bg-gray-50"}`, children: "Analytics" }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 270,
          columnNumber: 11
        }, this),
        currentUser.role === Role.ADMIN && /* @__PURE__ */ jsxDEV("button", { onClick: () => setActiveTab("team"), className: `px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === "team" ? "bg-amber-100 text-amber-800" : "text-gray-600 hover:bg-gray-50"}`, children: "Team" }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 272,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 268,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Dashboard.tsx",
      lineNumber: 263,
      columnNumber: 7
    }, this),
    activeTab === "overview" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 animate-fade-in", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        /* @__PURE__ */ jsxDEV(StatCard, { title: "Total Orders", value: orders.length, icon: Package, color: "bg-blue-600" }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 280,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(StatCard, { title: "Total Revenue", value: `Rs.${totalRevenue.toLocaleString()}`, icon: IndianRupee, color: "bg-green-600" }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 281,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(StatCard, { title: "Active Customers", value: customers.length, icon: Users, color: "bg-amber-600" }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 282,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(StatCard, { title: "Avg Order Value", value: `Rs.${(totalRevenue / (orders.length || 1)).toFixed(2)}`, icon: TrendingUp, color: "bg-purple-600" }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 283,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 279,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-6 border-b border-gray-100 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-lg text-gray-900", children: "Recent Transactions" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 288,
              columnNumber: 18
            }, this),
            /* @__PURE__ */ jsxDEV(Link, { to: "/orders", className: "text-amber-600 text-sm font-medium hover:underline", children: "View All Orders" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 289,
              columnNumber: 18
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 287,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left text-sm", children: /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-gray-100", children: recentOrders.length > 0 ? recentOrders.map(
            (order) => /* @__PURE__ */ jsxDEV("tr", { className: "hover:bg-gray-50 transition", children: [
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 font-medium text-amber-700", children: [
                "#",
                order.id
              ] }, void 0, true, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 295,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 text-gray-600", children: order.date }, void 0, false, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 296,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4", children: order.customerName }, void 0, false, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 297,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 font-bold text-gray-900", children: [
                "Rs.",
                order.totalAmount.toFixed(2)
              ] }, void 0, true, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 298,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${order.status === OrderStatus.DELIVERED ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`, children: order.status }, void 0, false, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 300,
                columnNumber: 27
              }, this) }, void 0, false, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 299,
                columnNumber: 25
              }, this)
            ] }, order.id, true, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 294,
              columnNumber: 17
            }, this)
          ) : /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("td", { colSpan: 5, className: "px-6 py-10 text-center text-gray-400", children: "No orders yet." }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 308,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 308,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 292,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 291,
            columnNumber: 16
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 286,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-choco-900 via-choco-800 to-choco-700 rounded-xl p-6 text-white shadow-lg flex flex-col h-full", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "font-bold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(Sparkles, { className: "text-amber-400", size: 18 }, void 0, false, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 315,
                columnNumber: 67
              }, this),
              " AI Sales Insights"
            ] }, void 0, true, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 315,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(RefreshCw, { size: 14, className: `cursor-pointer opacity-50 hover:opacity-100 ${loadingInsight ? "animate-spin" : ""}`, onClick: handleGenerateInsight }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 316,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 314,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-amber-100 opacity-80 mb-4", children: "Real-time analysis of your manufacturing data powered by Gemini 3." }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 318,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: insight ? /* @__PURE__ */ jsxDEV("div", { className: "bg-white/10 p-4 rounded-lg text-xs whitespace-pre-line border border-white/20 h-48 overflow-y-auto custom-scrollbar leading-relaxed", children: insight }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 322,
            columnNumber: 15
          }, this) : /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center justify-center h-48 border border-white/10 rounded-lg bg-black/10", children: [
            /* @__PURE__ */ jsxDEV(Sparkles, { size: 32, className: "text-amber-400/30 mb-2" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 327,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleGenerateInsight,
                disabled: loadingInsight,
                className: "text-amber-500 font-bold text-sm hover:text-amber-400 transition disabled:opacity-50",
                children: loadingInsight ? "Consulting Gemini..." : "Analyze My Business"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 328,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 326,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 320,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 313,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 285,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Dashboard.tsx",
      lineNumber: 278,
      columnNumber: 7
    }, this),
    activeTab === "analytics" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 animate-fade-in pb-20", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxDEV(StatCard, { title: "Annual Revenue", value: `Rs.${totalRevenue.toLocaleString()}`, icon: IndianRupee, color: "bg-green-600" }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 346,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV(StatCard, { title: "Best Executive", value: execData[0]?.name || "N/A", icon: Target, color: "bg-blue-600" }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 347,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV(StatCard, { title: "Avg Delivery", value: "1.5 Days", icon: Truck, color: "bg-amber-600" }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 348,
          columnNumber: 14
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 345,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-gray-900 mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Calendar, { size: 18, className: "text-amber-600" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 353,
              columnNumber: 85
            }, this),
            " Monthly Revenue Trend"
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 353,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "h-80", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(LineChart, { data: monthlyData, margin: { top: 20, right: 30, left: 20, bottom: 5 }, children: [
            /* @__PURE__ */ jsxDEV(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#f1f5f9" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 357,
              columnNumber: 22
            }, this),
            /* @__PURE__ */ jsxDEV(XAxis, { dataKey: "name", axisLine: false, tickLine: false, tick: { fontSize: 12, fill: "#64748b" } }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 358,
              columnNumber: 22
            }, this),
            /* @__PURE__ */ jsxDEV(YAxis, { axisLine: false, tickLine: false, tick: { fontSize: 12, fill: "#64748b" }, tickFormatter: (val) => `Rs.${val}` }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 359,
              columnNumber: 22
            }, this),
            /* @__PURE__ */ jsxDEV(Tooltip, { formatter: (val) => `Rs.${val}`, contentStyle: { borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" } }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 360,
              columnNumber: 22
            }, this),
            /* @__PURE__ */ jsxDEV(Line, { type: "monotone", dataKey: "revenue", stroke: "#8d6e63", strokeWidth: 3, dot: { r: 4, fill: "#8d6e63" }, activeDot: { r: 6 }, children: /* @__PURE__ */ jsxDEV(LabelList, { dataKey: "revenue", position: "top", formatter: (val) => `Rs.${val.toLocaleString()}`, style: { fontSize: "10px", fontWeight: "bold", fill: "#3e2723" } }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 362,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 361,
              columnNumber: 22
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 356,
            columnNumber: 20
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 355,
            columnNumber: 18
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 354,
            columnNumber: 16
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 352,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-gray-900 mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Briefcase, { size: 18, className: "text-amber-600" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 370,
              columnNumber: 85
            }, this),
            " Performance by Sales Executive"
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 370,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "h-80", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(BarChart, { data: execData, layout: "vertical", margin: { top: 5, right: 60, left: 20, bottom: 5 }, children: [
            /* @__PURE__ */ jsxDEV(CartesianGrid, { strokeDasharray: "3 3", horizontal: false, stroke: "#f1f5f9" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 374,
              columnNumber: 22
            }, this),
            /* @__PURE__ */ jsxDEV(XAxis, { type: "number", hide: true }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 375,
              columnNumber: 22
            }, this),
            /* @__PURE__ */ jsxDEV(YAxis, { dataKey: "name", type: "category", axisLine: false, tickLine: false, tick: { fontSize: 12, fill: "#64748b" }, width: 100 }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 376,
              columnNumber: 22
            }, this),
            /* @__PURE__ */ jsxDEV(Tooltip, { formatter: (val) => `Rs.${val}`, cursor: { fill: "#f8fafc" } }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 377,
              columnNumber: 22
            }, this),
            /* @__PURE__ */ jsxDEV(Bar, { dataKey: "total", fill: "#a0938e", radius: [0, 4, 4, 0], barSize: 24, children: /* @__PURE__ */ jsxDEV(LabelList, { dataKey: "total", position: "right", formatter: (val) => `Rs.${val.toLocaleString()}`, style: { fontSize: "11px", fontWeight: "bold", fill: "#3e2723" } }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 379,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 378,
              columnNumber: 22
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 373,
            columnNumber: 20
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 372,
            columnNumber: 18
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 371,
            columnNumber: 16
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 369,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 351,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-6", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-gray-900 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(PieChartIcon, { size: 18, className: "text-amber-600" }, void 0, false, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 391,
                columnNumber: 21
              }, this),
              "Order Fulfillment Status"
            ] }, void 0, true, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 390,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-gray-500 italic", children: "Click slices for details" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 394,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 389,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "h-72", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(PieChart, { children: [
            /* @__PURE__ */ jsxDEV(
              Pie,
              {
                data: ordersByStatus,
                cx: "50%",
                cy: "50%",
                innerRadius: 60,
                outerRadius: 80,
                paddingAngle: 5,
                dataKey: "value",
                label: ({ name, value }) => `${name}: ${value}`,
                onClick: handlePieClick,
                className: "cursor-pointer",
                children: ordersByStatus.map(
                  (entry, index) => /* @__PURE__ */ jsxDEV(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`, false, {
                    fileName: "/app/applet/pages/Dashboard.tsx",
                    lineNumber: 412,
                    columnNumber: 21
                  }, this)
                )
              },
              void 0,
              false,
              {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 399,
                columnNumber: 23
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(Tooltip, {}, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 415,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV(Legend, { iconType: "circle" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 416,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 398,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 397,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 396,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 388,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-gray-900 mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(BarChart2, { size: 18, className: "text-amber-600" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 423,
              columnNumber: 86
            }, this),
            " Top Customers by Revenue"
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 423,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "h-72", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(BarChart, { data: revenueByCustomer, margin: { top: 20, right: 30, left: 20, bottom: 5 }, children: [
            /* @__PURE__ */ jsxDEV(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#f1f5f9" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 427,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV(XAxis, { dataKey: "name", axisLine: false, tickLine: false, tick: { fontSize: 10 } }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 428,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV(YAxis, { axisLine: false, tickLine: false, tick: { fontSize: 10 } }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 429,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV(Tooltip, { formatter: (value) => `Rs.${value}` }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 430,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV(Bar, { dataKey: "revenue", fill: "#8d6e63", radius: [4, 4, 0, 0], barSize: 40, children: /* @__PURE__ */ jsxDEV(LabelList, { dataKey: "revenue", position: "top", formatter: (val) => `Rs.${val.toLocaleString()}`, style: { fontSize: "10px", fontWeight: "bold" } }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 432,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 431,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 426,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 425,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 424,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 422,
          columnNumber: 14
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 387,
        columnNumber: 11
      }, this),
      inspectedStatus && /* @__PURE__ */ jsxDEV("div", { className: "animate-fade-in bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-b border-amber-100 bg-amber-50 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-amber-900 flex items-center gap-2 uppercase tracking-wide text-sm", children: [
            /* @__PURE__ */ jsxDEV(Package, { size: 16 }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 444,
              columnNumber: 21
            }, this),
            " Orders: ",
            inspectedStatus,
            " (",
            filteredInspectedOrders.length,
            ")"
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 443,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("button", { onClick: () => setInspectedStatus(null), className: "text-amber-800 hover:bg-amber-100 p-1 rounded-full transition", children: /* @__PURE__ */ jsxDEV(X, { size: 20 }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 446,
            columnNumber: 142
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 446,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 442,
          columnNumber: 16
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left text-xs sm:text-sm", children: [
          /* @__PURE__ */ jsxDEV("thead", { className: "bg-gray-50 text-gray-500 uppercase text-[10px] font-bold", children: /* @__PURE__ */ jsxDEV("tr", { children: [
            /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-3", children: "Order ID" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 452,
              columnNumber: 24
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-3", children: "Date" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 453,
              columnNumber: 24
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-3", children: "Customer" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 454,
              columnNumber: 24
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-3", children: "Sales Exec" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 455,
              columnNumber: 24
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-3 text-right", children: "Amount" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 456,
              columnNumber: 24
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-3 text-center", children: "Action" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 457,
              columnNumber: 24
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 451,
            columnNumber: 22
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 450,
            columnNumber: 20
          }, this),
          /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-gray-100", children: filteredInspectedOrders.map(
            (order) => /* @__PURE__ */ jsxDEV("tr", { className: "hover:bg-gray-50 transition", children: [
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 font-bold text-amber-700", children: [
                "#",
                order.id
              ] }, void 0, true, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 463,
                columnNumber: 28
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 text-gray-500", children: formatDate(order.date) }, void 0, false, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 464,
                columnNumber: 28
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 font-medium", children: order.customerName }, void 0, false, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 465,
                columnNumber: 28
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 text-gray-500", children: users.find((u) => u.id === order.salesExecId)?.name || "Unknown" }, void 0, false, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 466,
                columnNumber: 28
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 font-bold text-right", children: [
                "Rs.",
                order.totalAmount.toLocaleString()
              ] }, void 0, true, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 469,
                columnNumber: 28
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 text-center", children: /* @__PURE__ */ jsxDEV(Link, { to: `/orders/${order.id}`, className: "text-amber-600 hover:text-amber-800 p-1.5 inline-block bg-amber-50 rounded-lg", children: /* @__PURE__ */ jsxDEV(Eye, { size: 16 }, void 0, false, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 471,
                columnNumber: 154
              }, this) }, void 0, false, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 471,
                columnNumber: 31
              }, this) }, void 0, false, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 470,
                columnNumber: 28
              }, this)
            ] }, order.id, true, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 462,
              columnNumber: 17
            }, this)
          ) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 460,
            columnNumber: 20
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 449,
          columnNumber: 18
        }, this) }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 448,
          columnNumber: 16
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 441,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Dashboard.tsx",
      lineNumber: 344,
      columnNumber: 7
    }, this),
    activeTab === "team" && currentUser.role === Role.ADMIN && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 animate-fade-in pb-20", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-xl text-gray-900", children: "Organization Hierarchy" }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 487,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-500", children: "Manage user access and organizational roles." }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 488,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 486,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => openAddUserModal(),
            className: "bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition shadow-md font-bold",
            children: [
              /* @__PURE__ */ jsxDEV(UserPlus, { size: 18 }, void 0, false, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 494,
                columnNumber: 15
              }, this),
              " Add New User"
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 490,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 485,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        UserTableSection,
        {
          title: "Administrators",
          users: usersByRole[Role.ADMIN],
          icon: ShieldCheck,
          colorClass: "bg-red-50/50"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 498,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        UserTableSection,
        {
          title: "Sales Executives",
          users: usersByRole[Role.SALES_EXECUTIVE],
          icon: UserCheck,
          colorClass: "bg-blue-50/50"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 505,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        UserTableSection,
        {
          title: "Delivery Personnel",
          users: usersByRole[Role.DELIVERY_PERSON],
          icon: Bike,
          colorClass: "bg-green-50/50"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 512,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Dashboard.tsx",
      lineNumber: 484,
      columnNumber: 7
    }, this),
    showUserModal && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-lg text-gray-900", children: isEditing ? "Edit Team Member" : "Add New Member" }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 525,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: () => setShowUserModal(false), className: "text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsxDEV(X, { size: 24 }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 526,
          columnNumber: 113
        }, this) }, void 0, false, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 526,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 524,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmitUser, className: "p-6 space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 mb-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 rounded-full overflow-hidden border-2 border-amber-100 bg-gray-50 shrink-0", children: /* @__PURE__ */ jsxDEV(
            "img",
            {
              src: newUserForm.avatar || "https://via.placeholder.com/100?text=User",
              alt: "Avatar Preview",
              className: "w-full h-full object-cover",
              onError: (e) => {
                e.currentTarget.src = "https://via.placeholder.com/100?text=Error";
              }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 531,
              columnNumber: 23
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 530,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Profile Picture URL" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 541,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
              /* @__PURE__ */ jsxDEV(ImageIcon, { className: "absolute left-3 top-2.5 text-gray-400", size: 16 }, void 0, false, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 543,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: newUserForm.avatar,
                  onChange: (e) => setNewUserForm({ ...newUserForm, avatar: e.target.value }),
                  placeholder: "https://...",
                  className: "w-full pl-10 rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-amber-500 outline-none transition input-responsive bg-white text-black text-sm"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/pages/Dashboard.tsx",
                  lineNumber: 544,
                  columnNumber: 25
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 542,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 540,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 529,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Full Name" }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 556,
            columnNumber: 22
          }, this),
          /* @__PURE__ */ jsxDEV("input", { required: true, type: "text", value: newUserForm.name, onChange: (e) => setNewUserForm({ ...newUserForm, name: e.target.value }), className: "w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-amber-500 outline-none transition input-responsive bg-white text-black" }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 557,
            columnNumber: 22
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 555,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Role" }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 560,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: newUserForm.role,
              onChange: (e) => setNewUserForm({ ...newUserForm, role: e.target.value }),
              className: "w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-amber-500 outline-none transition input-responsive bg-white text-black",
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: Role.SALES_EXECUTIVE, children: "Sales Executive" }, void 0, false, {
                  fileName: "/app/applet/pages/Dashboard.tsx",
                  lineNumber: 566,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: Role.DELIVERY_PERSON, children: "Delivery Person" }, void 0, false, {
                  fileName: "/app/applet/pages/Dashboard.tsx",
                  lineNumber: 567,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: Role.ADMIN, children: "Admin" }, void 0, false, {
                  fileName: "/app/applet/pages/Dashboard.tsx",
                  lineNumber: 568,
                  columnNumber: 23
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 561,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 559,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Username" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 573,
              columnNumber: 24
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
              /* @__PURE__ */ jsxDEV(Shield, { className: "absolute left-3 top-3.5 text-gray-400", size: 16 }, void 0, false, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 575,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDEV("input", { required: true, type: "text", value: newUserForm.username, onChange: (e) => setNewUserForm({ ...newUserForm, username: e.target.value }), className: "w-full pl-10 rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-amber-500 outline-none transition input-responsive font-mono text-sm bg-white text-black" }, void 0, false, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 576,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 574,
              columnNumber: 24
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 572,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Password" }, void 0, false, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 580,
              columnNumber: 24
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
              /* @__PURE__ */ jsxDEV(Lock, { className: "absolute left-3 top-3.5 text-gray-400", size: 16 }, void 0, false, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 582,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDEV("input", { required: true, type: "text", value: newUserForm.password, onChange: (e) => setNewUserForm({ ...newUserForm, password: e.target.value }), className: "w-full pl-10 rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-amber-500 outline-none transition input-responsive font-mono text-sm bg-white text-black" }, void 0, false, {
                fileName: "/app/applet/pages/Dashboard.tsx",
                lineNumber: 583,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/pages/Dashboard.tsx",
              lineNumber: 581,
              columnNumber: 24
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 579,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 571,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-amber-50 p-3 rounded-lg flex items-start gap-2 border border-amber-100", children: [
          /* @__PURE__ */ jsxDEV(AlertCircle, { size: 16, className: "text-amber-600 mt-0.5 shrink-0" }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 589,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-amber-800", children: "Assign a secure password and profile picture. Users will use these credentials to log into their respective portals." }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 590,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 588,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "pt-4 flex justify-end space-x-3", children: [
          /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: () => setShowUserModal(false), className: "px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50", children: "Cancel" }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 594,
            columnNumber: 22
          }, this),
          /* @__PURE__ */ jsxDEV("button", { type: "submit", className: "px-4 py-2 bg-amber-600 rounded-lg text-white hover:bg-amber-700 font-bold transition shadow-sm", children: isEditing ? "Save Changes" : "Create Account" }, void 0, false, {
            fileName: "/app/applet/pages/Dashboard.tsx",
            lineNumber: 595,
            columnNumber: 22
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Dashboard.tsx",
          lineNumber: 593,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Dashboard.tsx",
        lineNumber: 528,
        columnNumber: 16
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Dashboard.tsx",
      lineNumber: 523,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "/app/applet/pages/Dashboard.tsx",
      lineNumber: 522,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/pages/Dashboard.tsx",
    lineNumber: 262,
    columnNumber: 5
  }, this);
};
_s(Dashboard, "91yGMBUs2kCRodiqazayWihnUIQ=", false, function() {
  return [useOutletContext, useNavigate];
});
_c = Dashboard;
export default Dashboard;
var _c;
$RefreshReg$(_c, "Dashboard");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/applet/pages/Dashboard.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/applet/pages/Dashboard.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QUE7QUFBQTtBQUFBO0FBQUEsaUJBQTJKO0FBQUEsVUFDM0osdUJBQUMsWUFBTyxNQUFLLFVBQVMsV0FBVSxrR0FDN0JDLHNCQUFZLGlCQUFpQixvQkFEaEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLGFBSkg7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUtBO0FBQUEsV0F0RUg7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQXVFQTtBQUFBLFNBNUVIO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0E2RUEsS0E5RUg7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQStFQTtBQUFBLE9BblZMO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FxVkE7QUFFSjtBQUFFbEIsR0F4akJJRCxXQUFtQjtBQUFBLFVBQ3NFL0Msa0JBQzVFRSxXQUFXO0FBQUE7QUFBQSxLQUZ4QjZDO0FBMGpCTixlQUFlQTtBQUFVLElBQUE4STtBQUFBLGFBQUFBLElBQUEiLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZU91dGxldENvbnRleHQiLCJMaW5rIiwidXNlTmF2aWdhdGUiLCJSb2xlIiwiT3JkZXJTdGF0dXMiLCJnZW5lcmF0ZVNhbGVzSW5zaWdodCIsIlBpZUNoYXJ0IiwiUGllIiwiQ2VsbCIsIlJlc3BvbnNpdmVDb250YWluZXIiLCJCYXJDaGFydCIsIkJhciIsIlhBeGlzIiwiWUF4aXMiLCJUb29sdGlwIiwiTGVnZW5kIiwiQ2FydGVzaWFuR3JpZCIsIkxpbmVDaGFydCIsIkxpbmUiLCJMYWJlbExpc3QiLCJUcmVuZGluZ1VwIiwiVXNlcnMiLCJJbmRpYW5SdXBlZSIsIlBhY2thZ2UiLCJTcGFya2xlcyIsIkJhckNoYXJ0MiIsIlVzZXJQbHVzIiwiU2hpZWxkIiwiTG9jayIsIlRydWNrIiwiQnJpZWZjYXNlIiwiUmVmcmVzaEN3IiwiVHJhc2gyIiwiRWRpdCIsIlgiLCJBbGVydENpcmNsZSIsIkNhbGVuZGFyIiwiVGFyZ2V0IiwiRXllIiwiVXNlckNoZWNrIiwiU2hpZWxkQ2hlY2siLCJCaWtlIiwiSW1hZ2UiLCJJbWFnZUljb24iLCJQaWVDaGFydEljb24iLCJmb3JtYXREYXRlIiwiQ09MT1JTIiwiRGFzaGJvYXJkIiwiX3MiLCJjdXJyZW50VXNlciIsIm9yZGVycyIsInByb2R1Y3RzIiwiY3VzdG9tZXJzIiwidXNlcnMiLCJhZGRVc2VyIiwidXBkYXRlVXNlciIsImRlbGV0ZVVzZXIiLCJuYXZpZ2F0ZSIsImFjdGl2ZVRhYiIsInNldEFjdGl2ZVRhYiIsImluc2lnaHQiLCJzZXRJbnNpZ2h0IiwibG9hZGluZ0luc2lnaHQiLCJzZXRMb2FkaW5nSW5zaWdodCIsInNob3dVc2VyTW9kYWwiLCJzZXRTaG93VXNlck1vZGFsIiwiaXNFZGl0aW5nIiwic2V0SXNFZGl0aW5nIiwiaW5zcGVjdGVkU3RhdHVzIiwic2V0SW5zcGVjdGVkU3RhdHVzIiwibmV3VXNlckZvcm0iLCJzZXROZXdVc2VyRm9ybSIsIm5hbWUiLCJyb2xlIiwiU0FMRVNfRVhFQ1VUSVZFIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImF2YXRhciIsInJlZ2VuZXJhdGVDcmVkZW50aWFscyIsImhhbmRsZUdlbmVyYXRlSW5zaWdodCIsInJlc3VsdCIsIm9wZW5BZGRVc2VyTW9kYWwiLCJEYXRlIiwibm93IiwiaGFuZGxlRWRpdFVzZXIiLCJ1c2VyIiwiaWQiLCJoYW5kbGVEZWxldGVVc2VyIiwidXNlcklkIiwiY29uZmlybSIsImJhc2UiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJyYW5kb21TdWZmaXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJwcmV2IiwiaGFuZGxlU3VibWl0VXNlciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImZpbmFsQXZhdGFyIiwidXNlckRhdGEiLCJnZXRNb250aGx5UmV2ZW51ZSIsIm1vbnRocyIsIm1vbnRoTmFtZXMiLCJmb3JFYWNoIiwib3JkZXIiLCJkIiwiZGF0ZSIsImtleSIsImdldE1vbnRoIiwiZ2V0RnVsbFllYXIiLCJ0b3RhbEFtb3VudCIsIk9iamVjdCIsImVudHJpZXMiLCJtYXAiLCJyZXZlbnVlIiwiZ2V0RXhlY1BlcmZvcm1hbmNlIiwiZXhlY3MiLCJleGVjSWQiLCJzYWxlc0V4ZWNJZCIsImZpbmQiLCJ1IiwidG90YWwiLCJjb3VudCIsInZhbHVlcyIsInNvcnQiLCJhIiwiYiIsIm1vbnRobHlEYXRhIiwiZXhlY0RhdGEiLCJvcmRlcnNCeVN0YXR1cyIsIlBFTkRJTkciLCJ2YWx1ZSIsImZpbHRlciIsIm8iLCJzdGF0dXMiLCJsZW5ndGgiLCJQUk9DRVNTSU5HIiwiREVMSVZFUkVEIiwiT1VUX0ZPUl9ERUxJVkVSWSIsIkNBTkNFTExFRCIsIml0ZW0iLCJyZXZlbnVlQnlDdXN0b21lciIsImMiLCJjdXN0b21lck9yZGVycyIsImN1c3RvbWVySWQiLCJyZWR1Y2UiLCJzdW0iLCJidXNpbmVzc05hbWUiLCJzbGljZSIsInRvdGFsUmV2ZW51ZSIsInJlY2VudE9yZGVycyIsImdldFRpbWUiLCJTdGF0Q2FyZCIsInRpdGxlIiwiaWNvbiIsIkljb24iLCJjb2xvciIsImhhbmRsZVBpZUNsaWNrIiwiZGF0YSIsImZpbHRlcmVkSW5zcGVjdGVkT3JkZXJzIiwidXNlcnNCeVJvbGUiLCJBRE1JTiIsIkRFTElWRVJZX1BFUlNPTiIsIlVzZXJUYWJsZVNlY3Rpb24iLCJjb2xvckNsYXNzIiwic3BsaXQiLCJ0b0xvY2FsZVN0cmluZyIsInRvRml4ZWQiLCJjdXN0b21lck5hbWUiLCJ0b3AiLCJyaWdodCIsImxlZnQiLCJib3R0b20iLCJmb250U2l6ZSIsImZpbGwiLCJ2YWwiLCJib3JkZXJSYWRpdXMiLCJib3JkZXIiLCJib3hTaGFkb3ciLCJyIiwiZm9udFdlaWdodCIsImVudHJ5IiwiaW5kZXgiLCJjdXJyZW50VGFyZ2V0Iiwic3JjIiwidGFyZ2V0IiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiRGFzaGJvYXJkLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlT3V0bGV0Q29udGV4dCwgTGluaywgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IEFwcENvbnRleHRUeXBlLCBSb2xlLCBPcmRlclN0YXR1cywgVXNlciwgT3JkZXIgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBnZW5lcmF0ZVNhbGVzSW5zaWdodCB9IGZyb20gJy4uL3NlcnZpY2VzL2dlbWluaVNlcnZpY2UnO1xuaW1wb3J0IHsgXG4gIFBpZUNoYXJ0LCBQaWUsIENlbGwsIFJlc3BvbnNpdmVDb250YWluZXIsIEJhckNoYXJ0LCBCYXIsIFhBeGlzLCBZQXhpcywgVG9vbHRpcCwgTGVnZW5kLCBDYXJ0ZXNpYW5HcmlkLCBMaW5lQ2hhcnQsIExpbmUsIExhYmVsTGlzdFxufSBmcm9tICdyZWNoYXJ0cyc7XG5pbXBvcnQgeyBcbiAgVHJlbmRpbmdVcCwgVXNlcnMsIEluZGlhblJ1cGVlLCBQYWNrYWdlLCBTcGFya2xlcywgQXJyb3dSaWdodCwgXG4gIEJhckNoYXJ0MiwgTGF5b3V0RGFzaGJvYXJkLCBVc2VyUGx1cywgU2hpZWxkLCBMb2NrLCBUcnVjaywgQnJpZWZjYXNlLCBSZWZyZXNoQ3csIFBsdXNDaXJjbGUsIFRyYXNoMiwgRWRpdCwgVXNlciBhcyBVc2VySWNvbixcbiAgWCwgQWxlcnRDaXJjbGUsIENhbGVuZGFyLCBUYXJnZXQsIEV5ZSwgVXNlckNoZWNrLCBTaGllbGRDaGVjaywgQmlrZSwgSW1hZ2UgYXMgSW1hZ2VJY29uLCBQaWVDaGFydCBhcyBQaWVDaGFydEljb25cbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tICcuLi9zZXJ2aWNlcy9kYXRlRm9ybWF0dGVyJztcblxuY29uc3QgQ09MT1JTID0gWycjOGQ2ZTYzJywgJyMwMEM0OUYnLCAnIzAwODhGRScsICcjRkZCQjI4JywgJyNGRjgwNDInLCAnI2EwOTM4ZSddO1xuXG5jb25zdCBEYXNoYm9hcmQ6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCB7IGN1cnJlbnRVc2VyLCBvcmRlcnMsIHByb2R1Y3RzLCBjdXN0b21lcnMsIHVzZXJzLCBhZGRVc2VyLCB1cGRhdGVVc2VyLCBkZWxldGVVc2VyIH0gPSB1c2VPdXRsZXRDb250ZXh0PEFwcENvbnRleHRUeXBlPigpO1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZTwnb3ZlcnZpZXcnIHwgJ2FuYWx5dGljcycgfCAndGVhbSc+KCdvdmVydmlldycpO1xuICBjb25zdCBbaW5zaWdodCwgc2V0SW5zaWdodF0gPSB1c2VTdGF0ZTxzdHJpbmc+KCcnKTtcbiAgY29uc3QgW2xvYWRpbmdJbnNpZ2h0LCBzZXRMb2FkaW5nSW5zaWdodF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93VXNlck1vZGFsLCBzZXRTaG93VXNlck1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzRWRpdGluZywgc2V0SXNFZGl0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgXG4gIC8vIERyaWxsLWRvd24gc3RhdGUgZm9yIEFuYWx5dGljc1xuICBjb25zdCBbaW5zcGVjdGVkU3RhdHVzLCBzZXRJbnNwZWN0ZWRTdGF0dXNdID0gdXNlU3RhdGU8T3JkZXJTdGF0dXMgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBbbmV3VXNlckZvcm0sIHNldE5ld1VzZXJGb3JtXSA9IHVzZVN0YXRlPHtcbiAgICBpZD86IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcm9sZTogUm9sZTtcbiAgICB1c2VybmFtZTogc3RyaW5nO1xuICAgIHBhc3N3b3JkOiBzdHJpbmc7XG4gICAgYXZhdGFyOiBzdHJpbmc7XG4gIH0+KHtcbiAgICBuYW1lOiAnJyxcbiAgICByb2xlOiBSb2xlLlNBTEVTX0VYRUNVVElWRSxcbiAgICB1c2VybmFtZTogJycsXG4gICAgcGFzc3dvcmQ6ICcnLFxuICAgIGF2YXRhcjogJydcbiAgfSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzRWRpdGluZyAmJiBuZXdVc2VyRm9ybS5uYW1lICYmICghbmV3VXNlckZvcm0udXNlcm5hbWUgfHwgIW5ld1VzZXJGb3JtLnBhc3N3b3JkKSkge1xuICAgICAgcmVnZW5lcmF0ZUNyZWRlbnRpYWxzKCk7XG4gICAgfVxuICB9LCBbbmV3VXNlckZvcm0ubmFtZSwgaXNFZGl0aW5nXSk7XG5cbiAgY29uc3QgaGFuZGxlR2VuZXJhdGVJbnNpZ2h0ID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldExvYWRpbmdJbnNpZ2h0KHRydWUpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGdlbmVyYXRlU2FsZXNJbnNpZ2h0KG9yZGVycywgcHJvZHVjdHMpO1xuICAgIHNldEluc2lnaHQocmVzdWx0KTtcbiAgICBzZXRMb2FkaW5nSW5zaWdodChmYWxzZSk7XG4gIH07XG5cbiAgY29uc3Qgb3BlbkFkZFVzZXJNb2RhbCA9IChyb2xlOiBSb2xlID0gUm9sZS5TQUxFU19FWEVDVVRJVkUpID0+IHtcbiAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgIHNldE5ld1VzZXJGb3JtKHsgXG4gICAgICBuYW1lOiAnJywgXG4gICAgICByb2xlOiByb2xlLCBcbiAgICAgIHVzZXJuYW1lOiAnJywgXG4gICAgICBwYXNzd29yZDogJycsXG4gICAgICBhdmF0YXI6IGBodHRwczovL3BpY3N1bS5waG90b3MvMTAwLzEwMD9yYW5kb209JHtEYXRlLm5vdygpfWAgXG4gICAgfSk7XG4gICAgc2V0U2hvd1VzZXJNb2RhbCh0cnVlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVFZGl0VXNlciA9ICh1c2VyOiBVc2VyKSA9PiB7XG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgIHNldE5ld1VzZXJGb3JtKHsgXG4gICAgICBpZDogdXNlci5pZCwgXG4gICAgICBuYW1lOiB1c2VyLm5hbWUsIFxuICAgICAgcm9sZTogdXNlci5yb2xlLCBcbiAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lIHx8ICcnLCBcbiAgICAgIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkIHx8ICcnLCBcbiAgICAgIGF2YXRhcjogdXNlci5hdmF0YXIgXG4gICAgfSk7XG4gICAgc2V0U2hvd1VzZXJNb2RhbCh0cnVlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEZWxldGVVc2VyID0gKHVzZXJJZDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKGNvbmZpcm0oXCJBcmUgeW91IHN1cmU/IFRoaXMgd2lsbCBwZXJtYW5lbnRseSBkZWxldGUgdGhpcyB1c2VyIGFjY291bnQuXCIpKSBkZWxldGVVc2VyKHVzZXJJZCk7XG4gIH07XG5cbiAgY29uc3QgcmVnZW5lcmF0ZUNyZWRlbnRpYWxzID0gKCkgPT4ge1xuICAgIGNvbnN0IGJhc2UgPSBuZXdVc2VyRm9ybS5uYW1lID8gbmV3VXNlckZvcm0ubmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1teYS16MC05XS9nLCAnJykgOiAndXNlcic7XG4gICAgY29uc3QgcmFuZG9tU3VmZml4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOTAwKSArIDEwMDtcbiAgICBzZXROZXdVc2VyRm9ybShwcmV2ID0+ICh7IC4uLnByZXYsIHVzZXJuYW1lOiBgJHtiYXNlfSR7cmFuZG9tU3VmZml4fWAsIHBhc3N3b3JkOiBgQ2hvY28ke3JhbmRvbVN1ZmZpeH0hYCB9KSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0VXNlciA9IChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZmluYWxBdmF0YXIgPSBuZXdVc2VyRm9ybS5hdmF0YXIgfHwgYGh0dHBzOi8vcGljc3VtLnBob3Rvcy8xMDAvMTAwP3JhbmRvbT0ke0RhdGUubm93KCl9YDtcbiAgICBcbiAgICBpZiAoaXNFZGl0aW5nICYmIG5ld1VzZXJGb3JtLmlkKSB7XG4gICAgICB1cGRhdGVVc2VyKHsgLi4ubmV3VXNlckZvcm0gYXMgVXNlciwgYXZhdGFyOiBmaW5hbEF2YXRhciB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgeyBpZCwgLi4udXNlckRhdGEgfSA9IG5ld1VzZXJGb3JtO1xuICAgICAgYWRkVXNlcih7IGlkOiBgdSR7RGF0ZS5ub3coKX1gLCAuLi51c2VyRGF0YSwgYXZhdGFyOiBmaW5hbEF2YXRhciB9IGFzIFVzZXIpO1xuICAgIH1cbiAgICBzZXRTaG93VXNlck1vZGFsKGZhbHNlKTtcbiAgfTtcblxuICAvLyAtLS0gRGF0YSBUcmFuc2Zvcm1hdGlvbnMgLS0tXG5cbiAgY29uc3QgZ2V0TW9udGhseVJldmVudWUgPSAoKSA9PiB7XG4gICAgY29uc3QgbW9udGhzOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9ID0ge307XG4gICAgY29uc3QgbW9udGhOYW1lcyA9IFtcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXTtcbiAgICBcbiAgICBvcmRlcnMuZm9yRWFjaChvcmRlciA9PiB7XG4gICAgICBjb25zdCBkID0gbmV3IERhdGUob3JkZXIuZGF0ZSk7XG4gICAgICBjb25zdCBrZXkgPSBgJHttb250aE5hbWVzW2QuZ2V0TW9udGgoKV19ICR7ZC5nZXRGdWxsWWVhcigpfWA7XG4gICAgICBtb250aHNba2V5XSA9IChtb250aHNba2V5XSB8fCAwKSArIG9yZGVyLnRvdGFsQW1vdW50O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKG1vbnRocykubWFwKChbbmFtZSwgcmV2ZW51ZV0pID0+ICh7IG5hbWUsIHJldmVudWUgfSkpO1xuICB9O1xuXG4gIGNvbnN0IGdldEV4ZWNQZXJmb3JtYW5jZSA9ICgpID0+IHtcbiAgICBjb25zdCBleGVjczogeyBba2V5OiBzdHJpbmddOiB7IG5hbWU6IHN0cmluZywgdG90YWw6IG51bWJlciwgY291bnQ6IG51bWJlciB9IH0gPSB7fTtcbiAgICBcbiAgICBvcmRlcnMuZm9yRWFjaChvcmRlciA9PiB7XG4gICAgICBjb25zdCBleGVjSWQgPSBvcmRlci5zYWxlc0V4ZWNJZDtcbiAgICAgIGlmICghZXhlY3NbZXhlY0lkXSkge1xuICAgICAgICBjb25zdCB1c2VyID0gdXNlcnMuZmluZCh1ID0+IHUuaWQgPT09IGV4ZWNJZCk7XG4gICAgICAgIGV4ZWNzW2V4ZWNJZF0gPSB7IG5hbWU6IHVzZXIgPyB1c2VyLm5hbWUgOiAnVW5rbm93bicsIHRvdGFsOiAwLCBjb3VudDogMCB9O1xuICAgICAgfVxuICAgICAgZXhlY3NbZXhlY0lkXS50b3RhbCArPSBvcmRlci50b3RhbEFtb3VudDtcbiAgICAgIGV4ZWNzW2V4ZWNJZF0uY291bnQgKz0gMTtcbiAgICB9KTtcblxuICAgIHJldHVybiBPYmplY3QudmFsdWVzKGV4ZWNzKS5zb3J0KChhLCBiKSA9PiBiLnRvdGFsIC0gYS50b3RhbCk7XG4gIH07XG5cbiAgY29uc3QgbW9udGhseURhdGEgPSBnZXRNb250aGx5UmV2ZW51ZSgpO1xuICBjb25zdCBleGVjRGF0YSA9IGdldEV4ZWNQZXJmb3JtYW5jZSgpO1xuXG4gIGNvbnN0IG9yZGVyc0J5U3RhdHVzID0gW1xuICAgIHsgbmFtZTogT3JkZXJTdGF0dXMuUEVORElORywgdmFsdWU6IG9yZGVycy5maWx0ZXIobyA9PiBvLnN0YXR1cyA9PT0gT3JkZXJTdGF0dXMuUEVORElORykubGVuZ3RoIH0sXG4gICAgeyBuYW1lOiBPcmRlclN0YXR1cy5QUk9DRVNTSU5HLCB2YWx1ZTogb3JkZXJzLmZpbHRlcihvID0+IG8uc3RhdHVzID09PSBPcmRlclN0YXR1cy5QUk9DRVNTSU5HKS5sZW5ndGggfSxcbiAgICB7IG5hbWU6IE9yZGVyU3RhdHVzLkRFTElWRVJFRCwgdmFsdWU6IG9yZGVycy5maWx0ZXIobyA9PiBvLnN0YXR1cyA9PT0gT3JkZXJTdGF0dXMuREVMSVZFUkVEKS5sZW5ndGggfSxcbiAgICB7IG5hbWU6IE9yZGVyU3RhdHVzLk9VVF9GT1JfREVMSVZFUlksIHZhbHVlOiBvcmRlcnMuZmlsdGVyKG8gPT4gby5zdGF0dXMgPT09IE9yZGVyU3RhdHVzLk9VVF9GT1JfREVMSVZFUlkpLmxlbmd0aCB9LFxuICAgIHsgbmFtZTogT3JkZXJTdGF0dXMuQ0FOQ0VMTEVELCB2YWx1ZTogb3JkZXJzLmZpbHRlcihvID0+IG8uc3RhdHVzID09PSBPcmRlclN0YXR1cy5DQU5DRUxMRUQpLmxlbmd0aCB9LFxuICBdLmZpbHRlcihpdGVtID0+IGl0ZW0udmFsdWUgPiAwKTtcblxuICBjb25zdCByZXZlbnVlQnlDdXN0b21lciA9IGN1c3RvbWVycy5tYXAoYyA9PiB7XG4gICAgY29uc3QgY3VzdG9tZXJPcmRlcnMgPSBvcmRlcnMuZmlsdGVyKG8gPT4gby5jdXN0b21lcklkID09PSBjLmlkKTtcbiAgICBjb25zdCB0b3RhbCA9IGN1c3RvbWVyT3JkZXJzLnJlZHVjZSgoc3VtLCBvKSA9PiBzdW0gKyBvLnRvdGFsQW1vdW50LCAwKTtcbiAgICByZXR1cm4geyBuYW1lOiBjLmJ1c2luZXNzTmFtZSwgcmV2ZW51ZTogdG90YWwgfTtcbiAgfSkuc29ydCgoYSwgYikgPT4gYi5yZXZlbnVlIC0gYS5yZXZlbnVlKS5zbGljZSgwLCA1KTtcblxuICBjb25zdCB0b3RhbFJldmVudWUgPSBvcmRlcnMucmVkdWNlKChzdW0sIG8pID0+IHN1bSArIG8udG90YWxBbW91bnQsIDApO1xuICBjb25zdCByZWNlbnRPcmRlcnMgPSBbLi4ub3JkZXJzXS5zb3J0KChhLCBiKSA9PiBuZXcgRGF0ZShiLmRhdGUpLmdldFRpbWUoKSAtIG5ldyBEYXRlKGEuZGF0ZSkuZ2V0VGltZSgpKS5zbGljZSgwLCA1KTtcblxuICBjb25zdCBTdGF0Q2FyZCA9ICh7IHRpdGxlLCB2YWx1ZSwgaWNvbjogSWNvbiwgY29sb3IgfTogYW55KSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSBwLTYgcm91bmRlZC14bCBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTRcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcC0zIHJvdW5kZWQtZnVsbCAke2NvbG9yfSBiZy1vcGFjaXR5LTEwIHRleHQtJHtjb2xvci5yZXBsYWNlKCdiZy0nLCAnJyl9YH0+PEljb24gc2l6ZT17MjR9IC8+PC9kaXY+XG4gICAgICA8ZGl2PjxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS01MDAgdGV4dC1zbVwiPnt0aXRsZX08L3A+PGgzIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCI+e3ZhbHVlfTwvaDM+PC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgY29uc3QgaGFuZGxlUGllQ2xpY2sgPSAoZGF0YTogYW55KSA9PiB7XG4gICAgaWYgKGRhdGEgJiYgZGF0YS5uYW1lKSB7XG4gICAgICBzZXRJbnNwZWN0ZWRTdGF0dXMoZGF0YS5uYW1lIGFzIE9yZGVyU3RhdHVzKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZmlsdGVyZWRJbnNwZWN0ZWRPcmRlcnMgPSBpbnNwZWN0ZWRTdGF0dXMgXG4gICAgPyBvcmRlcnMuZmlsdGVyKG8gPT4gby5zdGF0dXMgPT09IGluc3BlY3RlZFN0YXR1cykuc29ydCgoYSwgYikgPT4gbmV3IERhdGUoYi5kYXRlKS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShhLmRhdGUpLmdldFRpbWUoKSlcbiAgICA6IFtdO1xuXG4gIC8vIEdyb3VwIFVzZXJzIGJ5IFJvbGUgZm9yIFRlYW0gVGFiXG4gIGNvbnN0IHVzZXJzQnlSb2xlID0ge1xuICAgIFtSb2xlLkFETUlOXTogdXNlcnMuZmlsdGVyKHUgPT4gdS5yb2xlID09PSBSb2xlLkFETUlOKSxcbiAgICBbUm9sZS5TQUxFU19FWEVDVVRJVkVdOiB1c2Vycy5maWx0ZXIodSA9PiB1LnJvbGUgPT09IFJvbGUuU0FMRVNfRVhFQ1VUSVZFKSxcbiAgICBbUm9sZS5ERUxJVkVSWV9QRVJTT05dOiB1c2Vycy5maWx0ZXIodSA9PiB1LnJvbGUgPT09IFJvbGUuREVMSVZFUllfUEVSU09OKSxcbiAgfTtcblxuICBjb25zdCBVc2VyVGFibGVTZWN0aW9uID0gKHsgdGl0bGUsIHVzZXJzLCBpY29uOiBJY29uLCBjb2xvckNsYXNzIH06IHsgdGl0bGU6IHN0cmluZywgdXNlcnM6IFVzZXJbXSwgaWNvbjogYW55LCBjb2xvckNsYXNzOiBzdHJpbmcgfSkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC14bCBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBvdmVyZmxvdy1oaWRkZW4gbWItOFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BweC02IHB5LTQgYm9yZGVyLWIgYm9yZGVyLWdyYXktMTAwIGZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciAke2NvbG9yQ2xhc3N9YH0+XG4gICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgIDxJY29uIHNpemU9ezIwfSBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwXCIgLz5cbiAgICAgICAgICA8c3Bhbj57dGl0bGV9ICh7dXNlcnMubGVuZ3RofSk8L3NwYW4+XG4gICAgICAgIDwvaDM+XG4gICAgICAgIDxidXR0b24gXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gb3BlbkFkZFVzZXJNb2RhbCh1c2Vyc1swXT8ucm9sZSB8fCBSb2xlLlNBTEVTX0VYRUNVVElWRSl9IFxuICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQteHMgYmctd2hpdGUvNTAgaG92ZXI6Ymctd2hpdGUgcHgtMiBweS0xIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1ncmF5LTIwMCBmb250LW1lZGl1bSB0cmFuc2l0aW9uXCJcbiAgICAgICAgPlxuICAgICAgICAgIEFkZCB7dGl0bGUuc3BsaXQoJyAnKVswXX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3cteC1hdXRvXCI+XG4gICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC1sZWZ0IHRleHQtc21cIj5cbiAgICAgICAgICA8dGhlYWQgY2xhc3NOYW1lPVwiYmctZ3JheS01MCB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0ZXh0LVsxMHB4XSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB4LTYgcHktM1wiPlByb2ZpbGU8L3RoPlxuICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHgtNiBweS0zXCI+RnVsbCBOYW1lPC90aD5cbiAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB4LTYgcHktM1wiPlVzZXJuYW1lPC90aD5cbiAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB4LTYgcHktM1wiPlN0YXR1czwvdGg+XG4gICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweC02IHB5LTMgdGV4dC1yaWdodFwiPkFjdGlvbnM8L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgIDx0Ym9keSBjbGFzc05hbWU9XCJkaXZpZGUteSBkaXZpZGUtZ3JheS0xMDBcIj5cbiAgICAgICAgICAgIHt1c2Vycy5sZW5ndGggPiAwID8gdXNlcnMubWFwKCh1c2VyKSA9PiAoXG4gICAgICAgICAgICAgIDx0ciBrZXk9e3VzZXIuaWR9IGNsYXNzTmFtZT1cImhvdmVyOmJnLWdyYXktNTAvNTAgdHJhbnNpdGlvbiBncm91cFwiPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC02IHB5LTNcIj5cbiAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXt1c2VyLmF2YXRhcn0gYWx0PVwiXCIgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1ncmF5LTEwMFwiIC8+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHgtNiBweS0zIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTgwMFwiPnt1c2VyLm5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHgtNiBweS0zIGZvbnQtbW9ubyB0ZXh0LXhzIHRleHQtZ3JheS01MDBcIj57dXNlci51c2VybmFtZSB8fCAnLS0tJ308L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC02IHB5LTNcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC1bMTBweF0gZm9udC1ib2xkIHRleHQtZ3JlZW4tNjAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xLjUgaC0xLjUgYmctZ3JlZW4tNTAwIHJvdW5kZWQtZnVsbCBhbmltYXRlLXB1bHNlXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIEFDVElWRVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB4LTYgcHktMyB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmQgZ2FwLTIgb3BhY2l0eS0wIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIHRyYW5zaXRpb24tb3BhY2l0eVwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGhhbmRsZUVkaXRVc2VyKHVzZXIpfSBjbGFzc05hbWU9XCJwLTEuNSB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtYW1iZXItNjAwIGhvdmVyOmJnLWFtYmVyLTUwIHJvdW5kZWQgdHJhbnNpdGlvblwiIHRpdGxlPVwiRWRpdFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxFZGl0IHNpemU9ezE2fSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVEZWxldGVVc2VyKHVzZXIuaWQpfSBjbGFzc05hbWU9XCJwLTEuNSB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtcmVkLTYwMCBob3ZlcjpiZy1yZWQtNTAgcm91bmRlZCB0cmFuc2l0aW9uXCIgdGl0bGU9XCJEZWxldGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8VHJhc2gyIHNpemU9ezE2fSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICApKSA6IChcbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBjb2xTcGFuPXs1fSBjbGFzc05hbWU9XCJweC02IHB5LTggdGV4dC1jZW50ZXIgdGV4dC1ncmF5LTQwMCBpdGFsaWNcIj5ObyBtZW1iZXJzIGZvdW5kIGluIHRoaXMgY2F0ZWdvcnkuPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGdhcC00XCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCI+e2N1cnJlbnRVc2VyLnJvbGUgPT09IFJvbGUuQURNSU4gPyAnQWRtaW4gRGFzaGJvYXJkJyA6ICdNeSBEYXNoYm9hcmQnfTwvaDE+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTUwMFwiPldlbGNvbWUgYmFjaywge2N1cnJlbnRVc2VyLm5hbWV9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLWxnIHAtMSBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBmbGV4IHNwYWNlLXgtMVwiPlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdvdmVydmlldycpfSBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC1tZCB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24gJHthY3RpdmVUYWIgPT09ICdvdmVydmlldycgPyAnYmctYW1iZXItMTAwIHRleHQtYW1iZXItODAwJyA6ICd0ZXh0LWdyYXktNjAwIGhvdmVyOmJnLWdyYXktNTAnfWB9Pk92ZXJ2aWV3PC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2FuYWx5dGljcycpfSBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC1tZCB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24gJHthY3RpdmVUYWIgPT09ICdhbmFseXRpY3MnID8gJ2JnLWFtYmVyLTEwMCB0ZXh0LWFtYmVyLTgwMCcgOiAndGV4dC1ncmF5LTYwMCBob3ZlcjpiZy1ncmF5LTUwJ31gfT5BbmFseXRpY3M8L2J1dHRvbj5cbiAgICAgICAgICB7Y3VycmVudFVzZXIucm9sZSA9PT0gUm9sZS5BRE1JTiAmJiAoXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYigndGVhbScpfSBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC1tZCB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24gJHthY3RpdmVUYWIgPT09ICd0ZWFtJyA/ICdiZy1hbWJlci0xMDAgdGV4dC1hbWJlci04MDAnIDogJ3RleHQtZ3JheS02MDAgaG92ZXI6YmctZ3JheS01MCd9YH0+VGVhbTwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHthY3RpdmVUYWIgPT09ICdvdmVydmlldycgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNiBhbmltYXRlLWZhZGUtaW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTQgZ2FwLTZcIj5cbiAgICAgICAgICAgIDxTdGF0Q2FyZCB0aXRsZT1cIlRvdGFsIE9yZGVyc1wiIHZhbHVlPXtvcmRlcnMubGVuZ3RofSBpY29uPXtQYWNrYWdlfSBjb2xvcj1cImJnLWJsdWUtNjAwXCIgLz5cbiAgICAgICAgICAgIDxTdGF0Q2FyZCB0aXRsZT1cIlRvdGFsIFJldmVudWVcIiB2YWx1ZT17YFJzLiR7dG90YWxSZXZlbnVlLnRvTG9jYWxlU3RyaW5nKCl9YH0gaWNvbj17SW5kaWFuUnVwZWV9IGNvbG9yPVwiYmctZ3JlZW4tNjAwXCIgLz5cbiAgICAgICAgICAgIDxTdGF0Q2FyZCB0aXRsZT1cIkFjdGl2ZSBDdXN0b21lcnNcIiB2YWx1ZT17Y3VzdG9tZXJzLmxlbmd0aH0gaWNvbj17VXNlcnN9IGNvbG9yPVwiYmctYW1iZXItNjAwXCIgLz5cbiAgICAgICAgICAgIDxTdGF0Q2FyZCB0aXRsZT1cIkF2ZyBPcmRlciBWYWx1ZVwiIHZhbHVlPXtgUnMuJHsodG90YWxSZXZlbnVlIC8gKG9yZGVycy5sZW5ndGggfHwgMSkpLnRvRml4ZWQoMil9YH0gaWNvbj17VHJlbmRpbmdVcH0gY29sb3I9XCJiZy1wdXJwbGUtNjAwXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTMgZ2FwLTZcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tMiBiZy13aGl0ZSByb3VuZGVkLXhsIHNoYWRvdy1zbSBib3JkZXIgYm9yZGVyLWdyYXktMTAwIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgYm9yZGVyLWIgYm9yZGVyLWdyYXktMTAwIGZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtbGcgdGV4dC1ncmF5LTkwMFwiPlJlY2VudCBUcmFuc2FjdGlvbnM8L2gzPlxuICAgICAgICAgICAgICAgICA8TGluayB0bz1cIi9vcmRlcnNcIiBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTYwMCB0ZXh0LXNtIGZvbnQtbWVkaXVtIGhvdmVyOnVuZGVybGluZVwiPlZpZXcgQWxsIE9yZGVyczwvTGluaz5cbiAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgdGV4dC1zbVwiPlxuICAgICAgICAgICAgICAgICAgPHRib2R5IGNsYXNzTmFtZT1cImRpdmlkZS15IGRpdmlkZS1ncmF5LTEwMFwiPlxuICAgICAgICAgICAgICAgICAgICB7cmVjZW50T3JkZXJzLmxlbmd0aCA+IDAgPyByZWNlbnRPcmRlcnMubWFwKChvcmRlcikgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e29yZGVyLmlkfSBjbGFzc05hbWU9XCJob3ZlcjpiZy1ncmF5LTUwIHRyYW5zaXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC02IHB5LTQgZm9udC1tZWRpdW0gdGV4dC1hbWJlci03MDBcIj4je29yZGVyLmlkfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHgtNiBweS00IHRleHQtZ3JheS02MDBcIj57b3JkZXIuZGF0ZX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB4LTYgcHktNFwiPntvcmRlci5jdXN0b21lck5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC02IHB5LTQgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIj5Scy57b3JkZXIudG90YWxBbW91bnQudG9GaXhlZCgyKX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB4LTYgcHktNCB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LVsxMHB4XSBmb250LWJvbGQgdXBwZXJjYXNlICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXIuc3RhdHVzID09PSBPcmRlclN0YXR1cy5ERUxJVkVSRUQgPyAnYmctZ3JlZW4tMTAwIHRleHQtZ3JlZW4tNzAwJyA6ICdiZy1hbWJlci0xMDAgdGV4dC1hbWJlci03MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7b3JkZXIuc3RhdHVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICkpIDogKFxuICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGQgY29sU3Bhbj17NX0gY2xhc3NOYW1lPVwicHgtNiBweS0xMCB0ZXh0LWNlbnRlciB0ZXh0LWdyYXktNDAwXCI+Tm8gb3JkZXJzIHlldC48L3RkPjwvdHI+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1iciBmcm9tLWNob2NvLTkwMCB2aWEtY2hvY28tODAwIHRvLWNob2NvLTcwMCByb3VuZGVkLXhsIHAtNiB0ZXh0LXdoaXRlIHNoYWRvdy1sZyBmbGV4IGZsZXgtY29sIGgtZnVsbFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi00XCI+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPjxTcGFya2xlcyBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTQwMFwiIHNpemU9ezE4fSAvPiBBSSBTYWxlcyBJbnNpZ2h0czwvaDM+XG4gICAgICAgICAgICAgICAgPFJlZnJlc2hDdyBzaXplPXsxNH0gY2xhc3NOYW1lPXtgY3Vyc29yLXBvaW50ZXIgb3BhY2l0eS01MCBob3ZlcjpvcGFjaXR5LTEwMCAke2xvYWRpbmdJbnNpZ2h0ID8gJ2FuaW1hdGUtc3BpbicgOiAnJ31gfSBvbkNsaWNrPXtoYW5kbGVHZW5lcmF0ZUluc2lnaHR9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtYW1iZXItMTAwIG9wYWNpdHktODAgbWItNFwiPlJlYWwtdGltZSBhbmFseXNpcyBvZiB5b3VyIG1hbnVmYWN0dXJpbmcgZGF0YSBwb3dlcmVkIGJ5IEdlbWluaSAzLjwvcD5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xXCI+XG4gICAgICAgICAgICAgICAge2luc2lnaHQgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlLzEwIHAtNCByb3VuZGVkLWxnIHRleHQteHMgd2hpdGVzcGFjZS1wcmUtbGluZSBib3JkZXIgYm9yZGVyLXdoaXRlLzIwIGgtNDggb3ZlcmZsb3cteS1hdXRvIGN1c3RvbS1zY3JvbGxiYXIgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICAgIHtpbnNpZ2h0fVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgaC00OCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQtbGcgYmctYmxhY2svMTBcIj5cbiAgICAgICAgICAgICAgICAgICAgPFNwYXJrbGVzIHNpemU9ezMyfSBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTQwMC8zMCBtYi0yXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVHZW5lcmF0ZUluc2lnaHR9IFxuICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtsb2FkaW5nSW5zaWdodH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTUwMCBmb250LWJvbGQgdGV4dC1zbSBob3Zlcjp0ZXh0LWFtYmVyLTQwMCB0cmFuc2l0aW9uIGRpc2FibGVkOm9wYWNpdHktNTBcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge2xvYWRpbmdJbnNpZ2h0ID8gJ0NvbnN1bHRpbmcgR2VtaW5pLi4uJyA6ICdBbmFseXplIE15IEJ1c2luZXNzJ31cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHthY3RpdmVUYWIgPT09ICdhbmFseXRpY3MnICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTYgYW5pbWF0ZS1mYWRlLWluIHBiLTIwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0zIGdhcC02XCI+XG4gICAgICAgICAgICAgPFN0YXRDYXJkIHRpdGxlPVwiQW5udWFsIFJldmVudWVcIiB2YWx1ZT17YFJzLiR7dG90YWxSZXZlbnVlLnRvTG9jYWxlU3RyaW5nKCl9YH0gaWNvbj17SW5kaWFuUnVwZWV9IGNvbG9yPVwiYmctZ3JlZW4tNjAwXCIgLz5cbiAgICAgICAgICAgICA8U3RhdENhcmQgdGl0bGU9XCJCZXN0IEV4ZWN1dGl2ZVwiIHZhbHVlPXtleGVjRGF0YVswXT8ubmFtZSB8fCAnTi9BJ30gaWNvbj17VGFyZ2V0fSBjb2xvcj1cImJnLWJsdWUtNjAwXCIgLz5cbiAgICAgICAgICAgICA8U3RhdENhcmQgdGl0bGU9XCJBdmcgRGVsaXZlcnlcIiB2YWx1ZT1cIjEuNSBEYXlzXCIgaWNvbj17VHJ1Y2t9IGNvbG9yPVwiYmctYW1iZXItNjAwXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMiBnYXAtNlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSBwLTYgcm91bmRlZC14bCBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1ncmF5LTEwMFwiPlxuICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTYgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj48Q2FsZW5kYXIgc2l6ZT17MTh9IGNsYXNzTmFtZT1cInRleHQtYW1iZXItNjAwXCIgLz4gTW9udGhseSBSZXZlbnVlIFRyZW5kPC9oMz5cbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC04MFwiPlxuICAgICAgICAgICAgICAgICA8UmVzcG9uc2l2ZUNvbnRhaW5lciB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgICAgPExpbmVDaGFydCBkYXRhPXttb250aGx5RGF0YX0gbWFyZ2luPXt7IHRvcDogMjAsIHJpZ2h0OiAzMCwgbGVmdDogMjAsIGJvdHRvbTogNSB9fT5cbiAgICAgICAgICAgICAgICAgICAgIDxDYXJ0ZXNpYW5HcmlkIHN0cm9rZURhc2hhcnJheT1cIjMgM1wiIHZlcnRpY2FsPXtmYWxzZX0gc3Ryb2tlPVwiI2YxZjVmOVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICA8WEF4aXMgZGF0YUtleT1cIm5hbWVcIiBheGlzTGluZT17ZmFsc2V9IHRpY2tMaW5lPXtmYWxzZX0gdGljaz17e2ZvbnRTaXplOiAxMiwgZmlsbDogJyM2NDc0OGInfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgIDxZQXhpcyBheGlzTGluZT17ZmFsc2V9IHRpY2tMaW5lPXtmYWxzZX0gdGljaz17e2ZvbnRTaXplOiAxMiwgZmlsbDogJyM2NDc0OGInfX0gdGlja0Zvcm1hdHRlcj17KHZhbCkgPT4gYFJzLiR7dmFsfWB9IC8+XG4gICAgICAgICAgICAgICAgICAgICA8VG9vbHRpcCBmb3JtYXR0ZXI9eyh2YWwpID0+IGBScy4ke3ZhbH1gfSBjb250ZW50U3R5bGU9e3tib3JkZXJSYWRpdXM6ICc4cHgnLCBib3JkZXI6ICdub25lJywgYm94U2hhZG93OiAnMCA0cHggNnB4IC0xcHggcmdiKDAgMCAwIC8gMC4xKSd9fSAvPlxuICAgICAgICAgICAgICAgICAgICAgPExpbmUgdHlwZT1cIm1vbm90b25lXCIgZGF0YUtleT1cInJldmVudWVcIiBzdHJva2U9XCIjOGQ2ZTYzXCIgc3Ryb2tlV2lkdGg9ezN9IGRvdD17eyByOiA0LCBmaWxsOiAnIzhkNmU2MycgfX0gYWN0aXZlRG90PXt7IHI6IDYgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWxMaXN0IGRhdGFLZXk9XCJyZXZlbnVlXCIgcG9zaXRpb249XCJ0b3BcIiBmb3JtYXR0ZXI9eyh2YWw6IGFueSkgPT4gYFJzLiR7dmFsLnRvTG9jYWxlU3RyaW5nKCl9YH0gc3R5bGU9e3sgZm9udFNpemU6ICcxMHB4JywgZm9udFdlaWdodDogJ2JvbGQnLCBmaWxsOiAnIzNlMjcyMycgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgIDwvTGluZT5cbiAgICAgICAgICAgICAgICAgICA8L0xpbmVDaGFydD5cbiAgICAgICAgICAgICAgICAgPC9SZXNwb25zaXZlQ29udGFpbmVyPlxuICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSBwLTYgcm91bmRlZC14bCBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1ncmF5LTEwMFwiPlxuICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTYgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj48QnJpZWZjYXNlIHNpemU9ezE4fSBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTYwMFwiIC8+IFBlcmZvcm1hbmNlIGJ5IFNhbGVzIEV4ZWN1dGl2ZTwvaDM+XG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtODBcIj5cbiAgICAgICAgICAgICAgICAgPFJlc3BvbnNpdmVDb250YWluZXIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgICAgIDxCYXJDaGFydCBkYXRhPXtleGVjRGF0YX0gbGF5b3V0PVwidmVydGljYWxcIiBtYXJnaW49e3sgdG9wOiA1LCByaWdodDogNjAsIGxlZnQ6IDIwLCBib3R0b206IDUgfX0+XG4gICAgICAgICAgICAgICAgICAgICA8Q2FydGVzaWFuR3JpZCBzdHJva2VEYXNoYXJyYXk9XCIzIDNcIiBob3Jpem9udGFsPXtmYWxzZX0gc3Ryb2tlPVwiI2YxZjVmOVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICA8WEF4aXMgdHlwZT1cIm51bWJlclwiIGhpZGUgLz5cbiAgICAgICAgICAgICAgICAgICAgIDxZQXhpcyBkYXRhS2V5PVwibmFtZVwiIHR5cGU9XCJjYXRlZ29yeVwiIGF4aXNMaW5lPXtmYWxzZX0gdGlja0xpbmU9e2ZhbHNlfSB0aWNrPXt7Zm9udFNpemU6IDEyLCBmaWxsOiAnIzY0NzQ4Yid9fSB3aWR0aD17MTAwfSAvPlxuICAgICAgICAgICAgICAgICAgICAgPFRvb2x0aXAgZm9ybWF0dGVyPXsodmFsKSA9PiBgUnMuJHt2YWx9YH0gY3Vyc29yPXt7ZmlsbDogJyNmOGZhZmMnfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgIDxCYXIgZGF0YUtleT1cInRvdGFsXCIgZmlsbD1cIiNhMDkzOGVcIiByYWRpdXM9e1swLCA0LCA0LCAwXX0gYmFyU2l6ZT17MjR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsTGlzdCBkYXRhS2V5PVwidG90YWxcIiBwb3NpdGlvbj1cInJpZ2h0XCIgZm9ybWF0dGVyPXsodmFsOiBhbnkpID0+IGBScy4ke3ZhbC50b0xvY2FsZVN0cmluZygpfWB9IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgZmlsbDogJyMzZTI3MjMnIH19IC8+XG4gICAgICAgICAgICAgICAgICAgICA8L0Jhcj5cbiAgICAgICAgICAgICAgICAgICA8L0JhckNoYXJ0PlxuICAgICAgICAgICAgICAgICA8L1Jlc3BvbnNpdmVDb250YWluZXI+XG4gICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0yIGdhcC02XCI+XG4gICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSBwLTYgcm91bmRlZC14bCBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1ncmF5LTEwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIG1iLTZcIj5cbiAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8UGllQ2hhcnRJY29uIHNpemU9ezE4fSBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTYwMFwiIC8+IFxuICAgICAgICAgICAgICAgICAgICBPcmRlciBGdWxmaWxsbWVudCBTdGF0dXNcbiAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZ3JheS01MDAgaXRhbGljXCI+Q2xpY2sgc2xpY2VzIGZvciBkZXRhaWxzPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC03MlwiPlxuICAgICAgICAgICAgICAgICAgPFJlc3BvbnNpdmVDb250YWluZXIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgICAgICA8UGllQ2hhcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgPFBpZVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17b3JkZXJzQnlTdGF0dXN9XG4gICAgICAgICAgICAgICAgICAgICAgICBjeD1cIjUwJVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjeT1cIjUwJVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lclJhZGl1cz17NjB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRlclJhZGl1cz17ODB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nQW5nbGU9ezV9XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhS2V5PVwidmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9eyh7IG5hbWUsIHZhbHVlIH0pID0+IGAke25hbWV9OiAke3ZhbHVlfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVQaWVDbGlja31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7b3JkZXJzQnlTdGF0dXMubWFwKChlbnRyeSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPENlbGwga2V5PXtgY2VsbC0ke2luZGV4fWB9IGZpbGw9e0NPTE9SU1tpbmRleCAlIENPTE9SUy5sZW5ndGhdfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9QaWU+XG4gICAgICAgICAgICAgICAgICAgICAgPFRvb2x0aXAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8TGVnZW5kIGljb25UeXBlPVwiY2lyY2xlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9QaWVDaGFydD5cbiAgICAgICAgICAgICAgICAgIDwvUmVzcG9uc2l2ZUNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcC02IHJvdW5kZWQteGwgc2hhZG93LXNtIGJvcmRlciBib3JkZXItZ3JheS0xMDBcIj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItNiBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPjxCYXJDaGFydDIgc2l6ZT17MTh9IGNsYXNzTmFtZT1cInRleHQtYW1iZXItNjAwXCIgLz4gVG9wIEN1c3RvbWVycyBieSBSZXZlbnVlPC9oMz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtNzJcIj5cbiAgICAgICAgICAgICAgICAgIDxSZXNwb25zaXZlQ29udGFpbmVyIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICAgICAgPEJhckNoYXJ0IGRhdGE9e3JldmVudWVCeUN1c3RvbWVyfSBtYXJnaW49e3sgdG9wOiAyMCwgcmlnaHQ6IDMwLCBsZWZ0OiAyMCwgYm90dG9tOiA1IH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxDYXJ0ZXNpYW5HcmlkIHN0cm9rZURhc2hhcnJheT1cIjMgM1wiIHZlcnRpY2FsPXtmYWxzZX0gc3Ryb2tlPVwiI2YxZjVmOVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPFhBeGlzIGRhdGFLZXk9XCJuYW1lXCIgYXhpc0xpbmU9e2ZhbHNlfSB0aWNrTGluZT17ZmFsc2V9IHRpY2s9e3tmb250U2l6ZTogMTB9fSAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxZQXhpcyBheGlzTGluZT17ZmFsc2V9IHRpY2tMaW5lPXtmYWxzZX0gdGljaz17e2ZvbnRTaXplOiAxMH19IC8+XG4gICAgICAgICAgICAgICAgICAgICAgPFRvb2x0aXAgZm9ybWF0dGVyPXsodmFsdWUpID0+IGBScy4ke3ZhbHVlfWB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgPEJhciBkYXRhS2V5PVwicmV2ZW51ZVwiIGZpbGw9XCIjOGQ2ZTYzXCIgcmFkaXVzPXtbNCwgNCwgMCwgMF19IGJhclNpemU9ezQwfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbExpc3QgZGF0YUtleT1cInJldmVudWVcIiBwb3NpdGlvbj1cInRvcFwiIGZvcm1hdHRlcj17KHZhbDogYW55KSA9PiBgUnMuJHt2YWwudG9Mb2NhbGVTdHJpbmcoKX1gfSBzdHlsZT17eyBmb250U2l6ZTogJzEwcHgnLCBmb250V2VpZ2h0OiAnYm9sZCcgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L0Jhcj5cbiAgICAgICAgICAgICAgICAgICAgPC9CYXJDaGFydD5cbiAgICAgICAgICAgICAgICAgIDwvUmVzcG9uc2l2ZUNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHtpbnNwZWN0ZWRTdGF0dXMgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbmltYXRlLWZhZGUtaW4gYmctd2hpdGUgcm91bmRlZC14bCBzaGFkb3ctbGcgYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBib3JkZXItYiBib3JkZXItYW1iZXItMTAwIGJnLWFtYmVyLTUwIGZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWFtYmVyLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZSB0ZXh0LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxQYWNrYWdlIHNpemU9ezE2fSAvPiBPcmRlcnM6IHtpbnNwZWN0ZWRTdGF0dXN9ICh7ZmlsdGVyZWRJbnNwZWN0ZWRPcmRlcnMubGVuZ3RofSlcbiAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldEluc3BlY3RlZFN0YXR1cyhudWxsKX0gY2xhc3NOYW1lPVwidGV4dC1hbWJlci04MDAgaG92ZXI6YmctYW1iZXItMTAwIHAtMSByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvblwiPjxYIHNpemU9ezIwfSAvPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJmbG93LXgtYXV0b1wiPlxuICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtbGVmdCB0ZXh0LXhzIHNtOnRleHQtc21cIj5cbiAgICAgICAgICAgICAgICAgICA8dGhlYWQgY2xhc3NOYW1lPVwiYmctZ3JheS01MCB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0ZXh0LVsxMHB4XSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB4LTYgcHktM1wiPk9yZGVyIElEPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB4LTYgcHktM1wiPkRhdGU8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHgtNiBweS0zXCI+Q3VzdG9tZXI8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHgtNiBweS0zXCI+U2FsZXMgRXhlYzwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweC02IHB5LTMgdGV4dC1yaWdodFwiPkFtb3VudDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweC02IHB5LTMgdGV4dC1jZW50ZXJcIj5BY3Rpb248L3RoPlxuICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzc05hbWU9XCJkaXZpZGUteSBkaXZpZGUtZ3JheS0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7ZmlsdGVyZWRJbnNwZWN0ZWRPcmRlcnMubWFwKG9yZGVyID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e29yZGVyLmlkfSBjbGFzc05hbWU9XCJob3ZlcjpiZy1ncmF5LTUwIHRyYW5zaXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC02IHB5LTQgZm9udC1ib2xkIHRleHQtYW1iZXItNzAwXCI+I3tvcmRlci5pZH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB4LTYgcHktNCB0ZXh0LWdyYXktNTAwXCI+e2Zvcm1hdERhdGUob3JkZXIuZGF0ZSl9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC02IHB5LTQgZm9udC1tZWRpdW1cIj57b3JkZXIuY3VzdG9tZXJOYW1lfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHgtNiBweS00IHRleHQtZ3JheS01MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt1c2Vycy5maW5kKHUgPT4gdS5pZCA9PT0gb3JkZXIuc2FsZXNFeGVjSWQpPy5uYW1lIHx8ICdVbmtub3duJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHgtNiBweS00IGZvbnQtYm9sZCB0ZXh0LXJpZ2h0XCI+UnMue29yZGVyLnRvdGFsQW1vdW50LnRvTG9jYWxlU3RyaW5nKCl9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC02IHB5LTQgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIHRvPXtgL29yZGVycy8ke29yZGVyLmlkfWB9IGNsYXNzTmFtZT1cInRleHQtYW1iZXItNjAwIGhvdmVyOnRleHQtYW1iZXItODAwIHAtMS41IGlubGluZS1ibG9jayBiZy1hbWJlci01MCByb3VuZGVkLWxnXCI+PEV5ZSBzaXplPXsxNn0gLz48L0xpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHthY3RpdmVUYWIgPT09ICd0ZWFtJyAmJiBjdXJyZW50VXNlci5yb2xlID09PSBSb2xlLkFETUlOICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTQgYW5pbWF0ZS1mYWRlLWluIHBiLTIwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgbWItNlwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXhsIHRleHQtZ3JheS05MDBcIj5Pcmdhbml6YXRpb24gSGllcmFyY2h5PC9oMz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNTAwXCI+TWFuYWdlIHVzZXIgYWNjZXNzIGFuZCBvcmdhbml6YXRpb25hbCByb2xlcy48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9wZW5BZGRVc2VyTW9kYWwoKX0gXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWFtYmVyLTYwMCBob3ZlcjpiZy1hbWJlci03MDAgdGV4dC13aGl0ZSBweC01IHB5LTIuNSByb3VuZGVkLWxnIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRyYW5zaXRpb24gc2hhZG93LW1kIGZvbnQtYm9sZFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxVc2VyUGx1cyBzaXplPXsxOH0gLz4gQWRkIE5ldyBVc2VyXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxVc2VyVGFibGVTZWN0aW9uIFxuICAgICAgICAgICAgdGl0bGU9XCJBZG1pbmlzdHJhdG9yc1wiIFxuICAgICAgICAgICAgdXNlcnM9e3VzZXJzQnlSb2xlW1JvbGUuQURNSU5dfSBcbiAgICAgICAgICAgIGljb249e1NoaWVsZENoZWNrfSBcbiAgICAgICAgICAgIGNvbG9yQ2xhc3M9XCJiZy1yZWQtNTAvNTBcIlxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8VXNlclRhYmxlU2VjdGlvbiBcbiAgICAgICAgICAgIHRpdGxlPVwiU2FsZXMgRXhlY3V0aXZlc1wiIFxuICAgICAgICAgICAgdXNlcnM9e3VzZXJzQnlSb2xlW1JvbGUuU0FMRVNfRVhFQ1VUSVZFXX0gXG4gICAgICAgICAgICBpY29uPXtVc2VyQ2hlY2t9IFxuICAgICAgICAgICAgY29sb3JDbGFzcz1cImJnLWJsdWUtNTAvNTBcIlxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8VXNlclRhYmxlU2VjdGlvbiBcbiAgICAgICAgICAgIHRpdGxlPVwiRGVsaXZlcnkgUGVyc29ubmVsXCIgXG4gICAgICAgICAgICB1c2Vycz17dXNlcnNCeVJvbGVbUm9sZS5ERUxJVkVSWV9QRVJTT05dfSBcbiAgICAgICAgICAgIGljb249e0Jpa2V9IFxuICAgICAgICAgICAgY29sb3JDbGFzcz1cImJnLWdyZWVuLTUwLzUwXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHtzaG93VXNlck1vZGFsICYmIChcbiAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCBiZy1ibGFjayBiZy1vcGFjaXR5LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCB6LTUwIGFuaW1hdGUtZmFkZS1pblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLXhsIHNoYWRvdy0yeGwgdy1mdWxsIG1heC13LW1kIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC02IHB5LTQgYm9yZGVyLWIgYm9yZGVyLWdyYXktMTAwIGJnLWdyYXktNTAgZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtbGcgdGV4dC1ncmF5LTkwMFwiPntpc0VkaXRpbmcgPyAnRWRpdCBUZWFtIE1lbWJlcicgOiAnQWRkIE5ldyBNZW1iZXInfTwvaDM+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldFNob3dVc2VyTW9kYWwoZmFsc2UpfSBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtZ3JheS02MDBcIj48WCBzaXplPXsyNH0gLz48L2J1dHRvbj5cbiAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdFVzZXJ9IGNsYXNzTmFtZT1cInAtNiBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTQgbWItNFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTYgaC0xNiByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlci0yIGJvcmRlci1hbWJlci0xMDAgYmctZ3JheS01MCBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbWcgXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e25ld1VzZXJGb3JtLmF2YXRhciB8fCBcImh0dHBzOi8vdmlhLnBsYWNlaG9sZGVyLmNvbS8xMDA/dGV4dD1Vc2VyXCJ9IFxuICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiQXZhdGFyIFByZXZpZXdcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRXJyb3I9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zcmMgPSBcImh0dHBzOi8vdmlhLnBsYWNlaG9sZGVyLmNvbS8xMDA/dGV4dD1FcnJvclwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIj5Qcm9maWxlIFBpY3R1cmUgVVJMPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2VJY29uIGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMyB0b3AtMi41IHRleHQtZ3JheS00MDBcIiBzaXplPXsxNn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld1VzZXJGb3JtLmF2YXRhcn0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3VXNlckZvcm0oeyAuLi5uZXdVc2VyRm9ybSwgYXZhdGFyOiBlLnRhcmdldC52YWx1ZSB9KX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly8uLi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcGwtMTAgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHAtMiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1hbWJlci01MDAgb3V0bGluZS1ub25lIHRyYW5zaXRpb24gaW5wdXQtcmVzcG9uc2l2ZSBiZy13aGl0ZSB0ZXh0LWJsYWNrIHRleHQtc21cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIj5GdWxsIE5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHJlcXVpcmVkIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e25ld1VzZXJGb3JtLm5hbWV9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3VXNlckZvcm0oeyAuLi5uZXdVc2VyRm9ybSwgbmFtZTogZS50YXJnZXQudmFsdWUgfSl9IGNsYXNzTmFtZT1cInctZnVsbCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcC0yLjUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYW1iZXItNTAwIG91dGxpbmUtbm9uZSB0cmFuc2l0aW9uIGlucHV0LXJlc3BvbnNpdmUgYmctd2hpdGUgdGV4dC1ibGFja1wiIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiPlJvbGU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdVc2VyRm9ybS5yb2xlfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3VXNlckZvcm0oeyAuLi5uZXdVc2VyRm9ybSwgcm9sZTogZS50YXJnZXQudmFsdWUgYXMgUm9sZSB9KX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHAtMi41IGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWFtYmVyLTUwMCBvdXRsaW5lLW5vbmUgdHJhbnNpdGlvbiBpbnB1dC1yZXNwb25zaXZlIGJnLXdoaXRlIHRleHQtYmxhY2tcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17Um9sZS5TQUxFU19FWEVDVVRJVkV9PlNhbGVzIEV4ZWN1dGl2ZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e1JvbGUuREVMSVZFUllfUEVSU09OfT5EZWxpdmVyeSBQZXJzb248L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtSb2xlLkFETUlOfT5BZG1pbjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiPlVzZXJuYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8U2hpZWxkIGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMyB0b3AtMy41IHRleHQtZ3JheS00MDBcIiBzaXplPXsxNn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHJlcXVpcmVkIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e25ld1VzZXJGb3JtLnVzZXJuYW1lfSBvbkNoYW5nZT17KGUpID0+IHNldE5ld1VzZXJGb3JtKHsgLi4ubmV3VXNlckZvcm0sIHVzZXJuYW1lOiBlLnRhcmdldC52YWx1ZSB9KX0gY2xhc3NOYW1lPVwidy1mdWxsIHBsLTEwIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCBwLTIuNSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1hbWJlci01MDAgb3V0bGluZS1ub25lIHRyYW5zaXRpb24gaW5wdXQtcmVzcG9uc2l2ZSBmb250LW1vbm8gdGV4dC1zbSBiZy13aGl0ZSB0ZXh0LWJsYWNrXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIj5QYXNzd29yZDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPExvY2sgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0zIHRvcC0zLjUgdGV4dC1ncmF5LTQwMFwiIHNpemU9ezE2fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcmVxdWlyZWQgdHlwZT1cInRleHRcIiB2YWx1ZT17bmV3VXNlckZvcm0ucGFzc3dvcmR9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3VXNlckZvcm0oeyAuLi5uZXdVc2VyRm9ybSwgcGFzc3dvcmQ6IGUudGFyZ2V0LnZhbHVlIH0pfSBjbGFzc05hbWU9XCJ3LWZ1bGwgcGwtMTAgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHAtMi41IGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWFtYmVyLTUwMCBvdXRsaW5lLW5vbmUgdHJhbnNpdGlvbiBpbnB1dC1yZXNwb25zaXZlIGZvbnQtbW9ubyB0ZXh0LXNtIGJnLXdoaXRlIHRleHQtYmxhY2tcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1hbWJlci01MCBwLTMgcm91bmRlZC1sZyBmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0yIGJvcmRlciBib3JkZXItYW1iZXItMTAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxBbGVydENpcmNsZSBzaXplPXsxNn0gY2xhc3NOYW1lPVwidGV4dC1hbWJlci02MDAgbXQtMC41IHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1hbWJlci04MDBcIj5Bc3NpZ24gYSBzZWN1cmUgcGFzc3dvcmQgYW5kIHByb2ZpbGUgcGljdHVyZS4gVXNlcnMgd2lsbCB1c2UgdGhlc2UgY3JlZGVudGlhbHMgdG8gbG9nIGludG8gdGhlaXIgcmVzcGVjdGl2ZSBwb3J0YWxzLjwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTQgZmxleCBqdXN0aWZ5LWVuZCBzcGFjZS14LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dVc2VyTW9kYWwoZmFsc2UpfSBjbGFzc05hbWU9XCJweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIHRleHQtZ3JheS03MDAgaG92ZXI6YmctZ3JheS01MFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwicHgtNCBweS0yIGJnLWFtYmVyLTYwMCByb3VuZGVkLWxnIHRleHQtd2hpdGUgaG92ZXI6YmctYW1iZXItNzAwIGZvbnQtYm9sZCB0cmFuc2l0aW9uIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICB7aXNFZGl0aW5nID8gJ1NhdmUgQ2hhbmdlcycgOiAnQ3JlYXRlIEFjY291bnQnfVxuICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkO1xuIl0sImZpbGUiOiIvYXBwL2FwcGxldC9wYWdlcy9EYXNoYm9hcmQudHN4In0=