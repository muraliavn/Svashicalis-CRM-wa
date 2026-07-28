import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/App.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=76d1f7a8"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/applet/App.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=76d1f7a8"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { HashRouter, Routes, Route, Navigate, Outlet } from "/node_modules/.vite/deps/react-router-dom.js?v=76d1f7a8";
import Sidebar from "/components/Sidebar.tsx";
import Dashboard from "/pages/Dashboard.tsx";
import Customers from "/pages/Customers.tsx";
import OrderTaking from "/pages/OrderTaking.tsx";
import Deliveries from "/pages/Deliveries.tsx";
import OrderDetails from "/pages/OrderDetails.tsx";
import Inventory from "/pages/Inventory.tsx";
import Login from "/pages/Login.tsx";
import Orders from "/pages/Orders.tsx";
import { supabase, isSupabaseConfigured, saveSupabaseCredentials } from "/services/supabaseClient.ts";
import { getWhatsAppConfig, saveWhatsAppConfig, sendWhatsAppSessionMessage } from "/services/whatsappService.ts";
import { downloadProjectZip } from "/services/exportService.ts";
import {
  MOCK_USERS,
  MOCK_CUSTOMERS,
  MOCK_ORDERS,
  MOCK_PRODUCTS
} from "/constants.ts";
import { AlertCircle, Database, Copy, Check, Menu, X, Save, Settings as SettingsIcon, MessageSquare, Download } from "/node_modules/.vite/deps/lucide-react.js?v=76d1f7a8";
const Layout = (props) => {
  _s();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return /* @__PURE__ */ jsxDEV("div", { className: "flex h-screen bg-choco-50 font-sans overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV(
      Sidebar,
      {
        role: props.currentUser.role,
        onReset: props.resetData,
        onLogout: props.logout,
        onOpenSettings: props.onOpenSettings,
        onOpenExport: props.onOpenExport,
        isOpen: isSidebarOpen,
        onClose: () => setIsSidebarOpen(false)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/App.tsx",
        lineNumber: 65,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex flex-col h-full overflow-hidden w-full", children: [
      !props.isDbConnected && /* @__PURE__ */ jsxDEV("div", { className: "bg-amber-100 text-amber-800 px-4 sm:px-6 py-2 text-sm font-medium border-b border-amber-200 flex flex-col sm:flex-row justify-between items-center shadow-sm z-10 gap-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxDEV(AlertCircle, { size: 16 }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 80,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Demo Mode: Using local mock data." }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 81,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 79,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: props.onOpenConnect,
            className: "text-xs bg-white border border-amber-300 hover:bg-amber-50 text-amber-900 px-3 py-1 rounded flex items-center space-x-1 transition shadow-sm",
            children: [
              /* @__PURE__ */ jsxDEV(Database, { size: 12 }, void 0, false, {
                fileName: "/app/applet/App.tsx",
                lineNumber: 88,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Connect Database" }, void 0, false, {
                fileName: "/app/applet/App.tsx",
                lineNumber: 89,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/App.tsx",
            lineNumber: 84,
            columnNumber: 15
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 83,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 78,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("header", { className: "bg-white shadow-sm border-b border-gray-100 h-16 flex items-center justify-between px-4 sm:px-8 shrink-0", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setIsSidebarOpen(true),
              className: "lg:hidden text-gray-500 hover:text-amber-600 focus:outline-none",
              children: /* @__PURE__ */ jsxDEV(Menu, { size: 24 }, void 0, false, {
                fileName: "/app/applet/App.tsx",
                lineNumber: 102,
                columnNumber: 16
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/App.tsx",
              lineNumber: 98,
              columnNumber: 14
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "img",
            {
              src: "https://ik.imagekit.io/vistadigitals/Svashicalis/logo-svashicalis.png",
              alt: "Svashicalis",
              className: "h-10 w-auto lg:hidden"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/App.tsx",
              lineNumber: 106,
              columnNumber: 14
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 96,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-4", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3 pl-4 border-l border-gray-100", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-right hidden sm:block", children: [
            /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-bold text-gray-900", children: props.currentUser.name }, void 0, false, {
              fileName: "/app/applet/App.tsx",
              lineNumber: 116,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-500", children: props.currentUser.role.replace("_", " ") }, void 0, false, {
              fileName: "/app/applet/App.tsx",
              lineNumber: 117,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 115,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("img", { src: props.currentUser.avatar, alt: "Profile", className: "w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200" }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 119,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 114,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 113,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 95,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("main", { className: "flex-1 overflow-auto p-4 sm:p-8 w-full", children: /* @__PURE__ */ jsxDEV(Outlet, { context: props }, void 0, false, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 125,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 124,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/App.tsx",
      lineNumber: 75,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/App.tsx",
    lineNumber: 64,
    columnNumber: 5
  }, this);
};
_s(Layout, "7pDpjxpt81vLgIcSls7O8aGkvA4=");
_c = Layout;
const SQL_SETUP_SCRIPT = `-- SUPABASE SETUP SCRIPT FOR SVASHICALIS
-- Run this entire script in the SQL Editor to reset/setup your database with robust dummy data.

-- 1. CLEANUP (Drop existing tables to ensure fresh schema)
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.customers CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- 2. CREATE TABLES

-- Users Table
CREATE TABLE public.users (
    id text PRIMARY KEY,
    name text NOT NULL,
    role text NOT NULL,
    avatar text,
    username text NOT NULL,
    password text NOT NULL
);

-- Customers (Business Owners) Table
CREATE TABLE public.customers (
    id text PRIMARY KEY,
    "businessName" text NOT NULL,
    "ownerName" text NOT NULL,
    gst text,
    address text,
    phone text,
    email text,
    status text DEFAULT 'Active',
    "lastOrderDate" text
);

-- Products Table
CREATE TABLE public.products (
    id text PRIMARY KEY,
    name text NOT NULL,
    category text NOT NULL,
    price numeric NOT NULL,
    stock numeric DEFAULT 0,
    description text,
    image text
);

-- Orders Table
CREATE TABLE public.orders (
    id text PRIMARY KEY,
    "customerId" text REFERENCES public.customers(id),
    "customerName" text,
    "customerAddress" text,
    "salesExecId" text REFERENCES public.users(id),
    "deliveryPersonId" text REFERENCES public.users(id),
    "totalAmount" numeric NOT NULL,
    status text NOT NULL,
    date text NOT NULL, -- Stored as YYYY-MM-DD
    "deliveryDate" text,
    notes text,
    "paymentStatus" text,
    items jsonb -- Stores the array of order items
);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create Open Policies (For Demo/Internal Tool Purposes)
CREATE POLICY "Enable all access for all users" ON public.users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for all customers" ON public.customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for all products" ON public.products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for all orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

-- Grant permissions to anonymous and authenticated users (Fixes API permission errors)
GRANT ALL ON public.users TO anon, authenticated;
GRANT ALL ON public.customers TO anon, authenticated;
GRANT ALL ON public.products TO anon, authenticated;
GRANT ALL ON public.orders TO anon, authenticated;


-- 4. SEED DUMMY DATA

-- Users (1 Admin, 2 Sales, 2 Delivery)
INSERT INTO public.users (id, name, role, avatar, username, password) VALUES
('u1', 'Alice Admin', 'ADMIN', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', 'admin', 'password123'),
('u2', 'Sam Sales', 'SALES_EXECUTIVE', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam', 'sam.sales', 'salespassword'),
('u3', 'Sarah Sales', 'SALES_EXECUTIVE', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', 'sarah.sales', 'salespassword2'),
('u4', 'Dave Delivery', 'DELIVERY_PERSON', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dave', 'dave.delivery', 'deliverypassword'),
('u5', 'Mike Mover', 'DELIVERY_PERSON', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', 'mike.delivery', 'deliverypassword2');

-- Products
INSERT INTO public.products (id, name, category, price, stock, description, image) VALUES
('p1', 'Belgian Dark Chocolate Bar (70%)', 'Bars', 250.00, 500, 'Rich dark chocolate made from premium Belgian beans.', 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=300&q=80'),
('p2', 'Milk Chocolate Roasted Hazelnuts', 'Dragees', 450.00, 200, 'Crunchy hazelnuts coated in creamy milk chocolate.', 'https://images.unsplash.com/photo-1548197982-126284a1651e?auto=format&fit=crop&w=300&q=80'),
('p3', 'White Chocolate Raspberry Bar', 'Bars', 280.00, 350, 'Smooth white chocolate infused with freeze-dried raspberry.', 'https://images.unsplash.com/photo-1621255755176-574f88e7a049?auto=format&fit=crop&w=300&q=80'),
('p4', 'Luxury Truffle Assortment (12pc)', 'Gift Boxes', 1200.00, 100, 'Handcrafted truffles with exotic fillings.', 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=300&q=80'),
('p5', 'Salted Caramel Bonbons', 'Bonbons', 850.00, 150, 'Liquid salted caramel encased in a dark chocolate shell.', 'https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?auto=format&fit=crop&w=300&q=80'),
('p6', 'Almond Rocks Pouch', 'Dragees', 350.00, 400, 'Roasted almonds clusters in dark chocolate.', 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=300&q=80'),
('p7', 'Corporate Gifting Hamper', 'Hampers', 2500.00, 50, 'A grand selection of bars, dragees, and cookies.', 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=300&q=80'),
('p8', 'Dark Chocolate Spread (200g)', 'Spreads', 300.00, 250, 'Velvety dark chocolate spread for toast and baking.', 'https://images.unsplash.com/photo-1589115794503-4f93892837ce?auto=format&fit=crop&w=300&q=80');

-- Customers
INSERT INTO public.customers (id, "businessName", "ownerName", gst, address, phone, email, status, "lastOrderDate") VALUES
('c1', 'The Chocolate Room', 'Rahul Verma', '29ABCDE1234F1Z5', '12, Indiranagar, Bangalore', '9988776655', 'rahul@chocoroom.com', 'Active', to_char(CURRENT_DATE - INTERVAL '2 days', 'YYYY-MM-DD')),
('c2', 'Glen''s Bakehouse', 'Anjali Menon', '29FGHIJ5678K1Z9', '45, Lavelle Road, Bangalore', '9876543210', 'anjali@glens.com', 'Active', to_char(CURRENT_DATE - INTERVAL '5 days', 'YYYY-MM-DD')),
('c3', 'Cafe Coffee Day - HQ', 'Robert D''souza', '29LMNOP9012Q1Z3', '78, Vittal Mallya Rd, Bangalore', '9123456789', 'robert@ccd.com', 'Active', to_char(CURRENT_DATE - INTERVAL '15 days', 'YYYY-MM-DD')),
('c4', 'Third Wave Coffee', 'Sushmita Sen', '29QRSTU3456V1Z1', '88, Koramangala 4th Block, Bangalore', '9900112233', 'sushmita@thirdwave.com', 'Active', to_char(CURRENT_DATE - INTERVAL '1 month', 'YYYY-MM-DD')),
('c5', 'Sweet Nothings Gift Shop', 'Priya Kapoor', '29WXYZ1234A1Z7', 'Mall of Asia, Hebbal, Bangalore', '9888777666', 'priya@sweetnothings.com', 'Active', to_char(CURRENT_DATE - INTERVAL '2 months', 'YYYY-MM-DD')),
('c6', 'The Oberoi Gourmet', 'Chef Vikas', '29BCDEF6789G1Z2', 'MG Road, Bangalore', '9777666555', 'vikas@oberoi.com', 'Inactive', to_char(CURRENT_DATE - INTERVAL '4 months', 'YYYY-MM-DD'));

-- Orders (Generated dynamically relative to current date)
-- We use a CTE or direct inserts. Using direct inserts with date math for compatibility.

-- CURRENT MONTH (Month 0) - Active Sales
INSERT INTO public.orders (id, "customerId", "customerName", "customerAddress", "salesExecId", "deliveryPersonId", "totalAmount", status, date, "deliveryDate", notes, "paymentStatus", items) VALUES
('1001', 'c1', 'The Chocolate Room', '12, Indiranagar, Bangalore', 'u2', 'u4', 5000.00, 'Delivered', to_char(CURRENT_DATE - INTERVAL '2 days', 'YYYY-MM-DD'), to_char(CURRENT_DATE - INTERVAL '1 day', 'YYYY-MM-DD'), 'Urgent delivery', 'Paid', '[{"productId": "p1", "quantity": 10, "priceAtTime": 250, "productName": "Belgian Dark Chocolate Bar (70%)"}, {"productId": "p4", "quantity": 2, "priceAtTime": 1200, "productName": "Luxury Truffle Assortment (12pc)"}]'),
('1002', 'c2', 'Glen''s Bakehouse', '45, Lavelle Road, Bangalore', 'u2', 'u5', 9000.00, 'Out for Delivery', to_char(CURRENT_DATE, 'YYYY-MM-DD'), to_char(CURRENT_DATE + INTERVAL '1 day', 'YYYY-MM-DD'), 'Call on arrival', 'Paid', '[{"productId": "p2", "quantity": 20, "priceAtTime": 450, "productName": "Milk Chocolate Roasted Hazelnuts"}]'),
('1003', 'c3', 'Cafe Coffee Day - HQ', '78, Vittal Mallya Rd, Bangalore', 'u3', NULL, 2500.00, 'Processing', to_char(CURRENT_DATE, 'YYYY-MM-DD'), to_char(CURRENT_DATE + INTERVAL '2 days', 'YYYY-MM-DD'), NULL, 'Pending', '[{"productId": "p7", "quantity": 1, "priceAtTime": 2500, "productName": "Corporate Gifting Hamper"}]'),
('1004', 'c4', 'Third Wave Coffee', '88, Koramangala 4th Block, Bangalore', 'u3', NULL, 12500.00, 'Pending', to_char(CURRENT_DATE, 'YYYY-MM-DD'), to_char(CURRENT_DATE + INTERVAL '3 days', 'YYYY-MM-DD'), 'Leave at front desk', 'Pending', '[{"productId": "p1", "quantity": 50, "priceAtTime": 250, "productName": "Belgian Dark Chocolate Bar (70%)"}]');

-- LAST MONTH (Month -1) - Good for Monthly Sales Chart
INSERT INTO public.orders (id, "customerId", "customerName", "customerAddress", "salesExecId", "deliveryPersonId", "totalAmount", status, date, "deliveryDate", notes, "paymentStatus", items) VALUES
('901', 'c1', 'The Chocolate Room', '12, Indiranagar, Bangalore', 'u2', 'u4', 3500.00, 'Delivered', to_char(CURRENT_DATE - INTERVAL '1 month' - INTERVAL '5 days', 'YYYY-MM-DD'), to_char(CURRENT_DATE - INTERVAL '1 month' - INTERVAL '3 days', 'YYYY-MM-DD'), '', 'Paid', '[{"productId": "p6", "quantity": 10, "priceAtTime": 350, "productName": "Almond Rocks Pouch"}]'),
('902', 'c2', 'Glen''s Bakehouse', '45, Lavelle Road, Bangalore', 'u3', 'u5', 18000.00, 'Delivered', to_char(CURRENT_DATE - INTERVAL '1 month' - INTERVAL '10 days', 'YYYY-MM-DD'), to_char(CURRENT_DATE - INTERVAL '1 month' - INTERVAL '8 days', 'YYYY-MM-DD'), 'Bulk order for festival', 'Paid', '[{"productId": "p4", "quantity": 15, "priceAtTime": 1200, "productName": "Luxury Truffle Assortment"}]'),
('903', 'c5', 'Sweet Nothings Gift Shop', 'Mall of Asia, Hebbal, Bangalore', 'u2', 'u4', 4250.00, 'Delivered', to_char(CURRENT_DATE - INTERVAL '1 month' - INTERVAL '15 days', 'YYYY-MM-DD'), to_char(CURRENT_DATE - INTERVAL '1 month' - INTERVAL '14 days', 'YYYY-MM-DD'), '', 'Paid', '[{"productId": "p5", "quantity": 5, "priceAtTime": 850, "productName": "Salted Caramel Bonbons"}]'),
('904', 'c3', 'Cafe Coffee Day - HQ', '78, Vittal Mallya Rd, Bangalore', 'u3', 'u5', 6000.00, 'Cancelled', to_char(CURRENT_DATE - INTERVAL '1 month' - INTERVAL '20 days', 'YYYY-MM-DD'), NULL, 'Customer cancelled', 'Pending', '[{"productId": "p8", "quantity": 20, "priceAtTime": 300, "productName": "Dark Chocolate Spread"}]');

-- 2 MONTHS AGO (Month -2) - More Data
INSERT INTO public.orders (id, "customerId", "customerName", "customerAddress", "salesExecId", "deliveryPersonId", "totalAmount", status, date, "deliveryDate", notes, "paymentStatus", items) VALUES
('801', 'c1', 'The Chocolate Room', '12, Indiranagar, Bangalore', 'u2', 'u4', 7500.00, 'Delivered', to_char(CURRENT_DATE - INTERVAL '2 months' - INTERVAL '2 days', 'YYYY-MM-DD'), NULL, '', 'Paid', '[{"productId": "p1", "quantity": 30, "priceAtTime": 250, "productName": "Belgian Dark Chocolate Bar"}]'),
('802', 'c4', 'Third Wave Coffee', '88, Koramangala 4th Block, Bangalore', 'u3', 'u5', 5600.00, 'Delivered', to_char(CURRENT_DATE - INTERVAL '2 months' - INTERVAL '12 days', 'YYYY-MM-DD'), NULL, '', 'Paid', '[{"productId": "p3", "quantity": 20, "priceAtTime": 280, "productName": "White Chocolate Raspberry"}]'),
('803', 'c2', 'Glen''s Bakehouse', '45, Lavelle Road, Bangalore', 'u2', 'u4', 11000.00, 'Delivered', to_char(CURRENT_DATE - INTERVAL '2 months' - INTERVAL '25 days', 'YYYY-MM-DD'), NULL, '', 'Paid', '[{"productId": "p4", "quantity": 5, "priceAtTime": 1200, "productName": "Truffle Assortment"}, {"productId": "p2", "quantity": 10, "priceAtTime": 450, "productName": "Hazelnuts"}]');
`;
function App() {
  _s2();
  const [currentUser, setCurrentUser] = useState(MOCK_USERS[0]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDbConnected, setIsDbConnected] = useState(true);
  const [showDbSetup, setShowDbSetup] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState("database");
  const [whatsappApiKey, setWhatsappApiKey] = useState("");
  const [whatsappPhoneId, setWhatsappPhoneId] = useState("");
  const [testPhoneNumber, setTestPhoneNumber] = useState("");
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [exportStatus, setExportStatus] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const handleExportZip = async () => {
    setIsExporting(true);
    setExportStatus("Initializing project bundle...");
    try {
      await downloadProjectZip((status) => {
        setExportStatus(status);
      });
      setExportStatus("✅ Project ZIP downloaded successfully!");
    } catch (err) {
      setExportStatus(`❌ Export failed: ${err.message || err}`);
    } finally {
      setIsExporting(false);
    }
  };
  const [customUrl, setCustomUrl] = useState("https://ckrrxsszpdoiizjjktjy.supabase.co");
  const [customKey, setCustomKey] = useState("");
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [copied, setCopied] = useState(false);
  const fetchAllData = async () => {
    setLoading(true);
    const loadMocks = () => {
      setCustomers(MOCK_CUSTOMERS);
      setProducts(MOCK_PRODUCTS);
      setOrders(MOCK_ORDERS);
      setUsers(MOCK_USERS);
      setIsDbConnected(false);
    };
    if (!isSupabaseConfigured()) {
      console.warn("Supabase not configured. Loading demo data.");
      loadMocks();
      setLoading(false);
      return;
    }
    try {
      const { data: customersData, error: customersError } = await supabase.from("customers").select("*");
      if (customersError) throw customersError;
      const { data: productsData, error: productsError } = await supabase.from("products").select("*");
      if (productsError) throw productsError;
      const { data: ordersData, error: ordersError } = await supabase.from("orders").select("*");
      if (ordersError) throw ordersError;
      const { data: usersData, error: usersError } = await supabase.from("users").select("*");
      if (usersError) throw usersError;
      if (customersData) setCustomers(customersData);
      if (productsData) setProducts(productsData);
      if (ordersData) setOrders(ordersData);
      if (usersData) setUsers(usersData);
      console.log("Supabase Connected. Customers found:", customersData?.length || 0);
      setIsDbConnected(true);
      setShowDbSetup(false);
    } catch (error) {
      const isMissingTable = error.code === "42P01" || error.message && error.message.includes("Could not find the table");
      if (isMissingTable) {
        console.warn("Supabase Connected, but tables missing. Prompting setup.");
        setShowDbSetup(true);
      } else {
        console.warn("Error fetching data from Supabase (falling back to demo mode gracefully):", error.message || error);
      }
      loadMocks();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const hasStoredKey = localStorage.getItem("sb_key");
    if (!hasStoredKey && !isSupabaseConfigured()) {
    }
    fetchAllData();
  }, []);
  useEffect(() => {
    if (showSettingsModal) {
      const config = getWhatsAppConfig();
      setWhatsappApiKey(config.apiKey);
      setWhatsappPhoneId(config.phoneNumberId);
      setTestResult(null);
    }
  }, [showSettingsModal]);
  const handleSaveWhatsAppConfig = () => {
    saveWhatsAppConfig(whatsappApiKey, whatsappPhoneId);
    alert("WhatsApp configuration saved successfully!");
  };
  const handleSendTestWhatsApp = async () => {
    if (!testPhoneNumber) {
      setTestResult("⚠️ Please enter a valid phone number.");
      return;
    }
    setIsSendingTest(true);
    setTestResult(null);
    try {
      const res = await sendWhatsAppSessionMessage({
        phoneNumber: testPhoneNumber,
        type: "text",
        text: "Hello! This is a test message from Svashicalis ERP System. Your WhatsApp Integration is configured successfully! 🍫"
      });
      if (res.success) {
        setTestResult("✅ Success! Test session message sent via Fast2SMS.");
      } else {
        setTestResult(`❌ Error: ${res.message}`);
      }
    } catch (error) {
      setTestResult(`❌ Network Error: ${error.message || error}`);
    } finally {
      setIsSendingTest(false);
    }
  };
  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SETUP_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const handleSaveConnection = () => {
    if (customUrl && customKey) {
      saveSupabaseCredentials(customUrl, customKey);
    }
  };
  const switchRole = (role) => {
    const user = users.find((u) => u.role === role) || MOCK_USERS.find((u) => u.role === role);
    if (user) setCurrentUser(user);
  };
  const login = async (username, password) => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };
  const logout = () => {
    setIsAuthenticated(false);
  };
  const addCustomer = async (customer) => {
    setCustomers((prev) => [customer, ...prev]);
    if (isDbConnected) {
      const { error } = await supabase.from("customers").insert(customer);
      if (error) {
        console.error("Error adding customer:", error.message || error);
        const isSchemaError = error.message && (error.message.toLowerCase().includes("gst") || error.message.includes("column") || error.message.includes("schema cache"));
        if (isSchemaError) {
          setShowDbSetup(true);
          setTimeout(() => {
            alert("Database Schema Error: Missing 'gst' Column\n\nYour database table is outdated. I have opened the 'Database Setup' window.\n\nPLEASE COPY the SQL script and RUN it in Supabase to fix this.");
          }, 500);
        } else {
          alert("Failed to save customer: " + error.message);
        }
        fetchAllData();
      }
    }
  };
  const updateCustomer = async (customer) => {
    setCustomers((prev) => prev.map((c) => c.id === customer.id ? customer : c));
    if (isDbConnected) {
      const { error } = await supabase.from("customers").update(customer).eq("id", customer.id);
      if (error) {
        console.error("Error updating customer:", error.message || error);
        const isSchemaError = error.message && (error.message.toLowerCase().includes("gst") || error.message.includes("column") || error.message.includes("schema cache"));
        if (isSchemaError) {
          setShowDbSetup(true);
          setTimeout(() => {
            alert("Database Schema Error: Missing 'gst' Column\n\nYour database table is outdated. I have opened the 'Database Setup' window.\n\nPLEASE COPY the SQL script and RUN it in Supabase to fix this.");
          }, 500);
        } else {
          alert("Failed to update customer: " + error.message);
        }
        fetchAllData();
      }
    }
  };
  const deleteCustomer = async (customerId) => {
    setCustomers((prev) => prev.filter((c) => c.id !== customerId));
    if (isDbConnected) {
      const { error } = await supabase.from("customers").delete().eq("id", customerId);
      if (error) {
        console.error("Error deleting customer:", error.message || error);
        alert("Failed to delete customer: " + error.message);
        fetchAllData();
      }
    }
  };
  const addProduct = async (product) => {
    setProducts((prev) => [...prev, product]);
    if (isDbConnected) {
      const { error } = await supabase.from("products").insert(product);
      if (error) {
        console.error("Error adding product:", error.message || error);
        fetchAllData();
      }
    }
  };
  const updateProduct = async (product) => {
    setProducts((prev) => prev.map((p) => p.id === product.id ? product : p));
    if (isDbConnected) {
      const { error } = await supabase.from("products").update(product).eq("id", product.id);
      if (error) {
        console.error("Error updating product:", error.message || error);
        fetchAllData();
      }
    }
  };
  const deleteProduct = async (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    if (isDbConnected) {
      const { error } = await supabase.from("products").delete().eq("id", productId);
      if (error) {
        console.error("Error deleting product:", error.message || error);
        alert(`Failed to delete product: ${error.message}`);
        fetchAllData();
      }
    }
  };
  const addOrder = async (order) => {
    setOrders((prev) => [order, ...prev]);
    setCustomers((prev) => prev.map(
      (c) => c.id === order.customerId ? { ...c, lastOrderDate: order.date } : c
    ));
    if (isDbConnected) {
      const { error: orderError } = await supabase.from("orders").insert(order);
      if (orderError) {
        console.error("Error creating order:", orderError.message || orderError);
        fetchAllData();
        return;
      }
      await supabase.from("customers").update({ lastOrderDate: order.date }).eq("id", order.customerId);
    }
  };
  const addUser = async (user) => {
    setUsers((prev) => [...prev, user]);
    if (isDbConnected) {
      const { error } = await supabase.from("users").insert(user);
      if (error) {
        console.error("Error adding user:", error.message || error);
        fetchAllData();
      }
    }
  };
  const updateUser = async (user) => {
    setUsers((prev) => prev.map((u) => u.id === user.id ? user : u));
    if (isDbConnected) {
      const { error } = await supabase.from("users").update({
        name: user.name,
        role: user.role,
        username: user.username,
        password: user.password,
        avatar: user.avatar
      }).eq("id", user.id);
      if (error) {
        console.error("Error updating user:", error.message || error);
        fetchAllData();
      }
    }
  };
  const deleteUser = async (userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    if (isDbConnected) {
      const { error } = await supabase.from("users").delete().eq("id", userId);
      if (error) {
        console.error("Error deleting user:", error.message || error);
        fetchAllData();
      }
    }
  };
  const updateOrderStatus = async (orderId, status) => {
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status } : o));
    if (isDbConnected) {
      const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
      if (error) {
        console.error("Error updating order status:", error.message || error);
        fetchAllData();
      }
    }
  };
  const assignDriver = async (orderId, driverId) => {
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, deliveryPersonId: driverId === "" ? void 0 : driverId } : o));
    if (isDbConnected) {
      const val = driverId === "" ? null : driverId;
      const { error } = await supabase.from("orders").update({ deliveryPersonId: val }).eq("id", orderId);
      if (error) {
        console.error("Error assigning driver:", error.message);
        fetchAllData();
      }
    }
  };
  const resetData = async () => {
    if (!isDbConnected) {
      setCustomers(MOCK_CUSTOMERS);
      setProducts(MOCK_PRODUCTS);
      setOrders(MOCK_ORDERS);
      setUsers(MOCK_USERS);
      alert("Demo data reset (Local).");
      return;
    }
    if (confirm("RESET database? This DELETES ALL data and re-seeds defaults.")) {
      setLoading(true);
      try {
        await supabase.from("orders").delete().neq("id", "0");
        await supabase.from("products").delete().neq("id", "0");
        await supabase.from("customers").delete().neq("id", "0");
        await supabase.from("users").delete().neq("id", "0");
        await supabase.from("customers").insert(MOCK_CUSTOMERS);
        await supabase.from("products").insert(MOCK_PRODUCTS);
        await supabase.from("orders").insert(MOCK_ORDERS);
        await supabase.from("users").insert(MOCK_USERS);
        await fetchAllData();
        alert("Database reset to demo data.");
      } catch (e) {
        console.error(e);
        if (e.message && (e.message.includes("gst") || e.message.includes("schema cache"))) {
          setShowDbSetup(true);
          setTimeout(() => {
            alert("Reset Failed: Database Schema Error.\nThe 'gst' column is missing. Please run the provided SQL script.");
          }, 500);
        } else {
          alert("Reset failed: " + (e.message || "Unknown error"));
        }
      } finally {
        setLoading(false);
      }
    }
  };
  const contextValue = {
    currentUser,
    switchRole,
    users,
    addUser,
    updateUser,
    deleteUser,
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    addOrder,
    updateOrderStatus,
    assignDriver,
    resetData,
    isAuthenticated,
    login,
    logout
  };
  return /* @__PURE__ */ jsxDEV(HashRouter, { children: [
    showDbSetup && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 animate-fade-in", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-6 border-b border-gray-100 bg-amber-50", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3 text-amber-800", children: [
          /* @__PURE__ */ jsxDEV(Database, { size: 24 }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 674,
            columnNumber: 18
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold", children: "Database Setup Required" }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 675,
            columnNumber: 18
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 673,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-amber-700 text-sm mt-2", children: "Your connection is successful, but the database tables or permissions need updating." }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 677,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 672,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-6 overflow-y-auto flex-1", children: /* @__PURE__ */ jsxDEV("div", { className: "mt-4 relative group", children: [
        /* @__PURE__ */ jsxDEV("pre", { className: "bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto border border-gray-700 font-mono leading-relaxed h-64", children: SQL_SETUP_SCRIPT }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 683,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleCopySql,
            className: "absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded text-xs backdrop-blur-sm transition flex items-center space-x-1",
            children: [
              copied ? /* @__PURE__ */ jsxDEV(Check, { size: 14 }, void 0, false, {
                fileName: "/app/applet/App.tsx",
                lineNumber: 690,
                columnNumber: 29
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { size: 14 }, void 0, false, {
                fileName: "/app/applet/App.tsx",
                lineNumber: 690,
                columnNumber: 51
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: copied ? "Copied!" : "Copy SQL" }, void 0, false, {
                fileName: "/app/applet/App.tsx",
                lineNumber: 691,
                columnNumber: 19
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/App.tsx",
            lineNumber: 686,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 682,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 681,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3", children: [
        /* @__PURE__ */ jsxDEV("button", { onClick: () => setShowDbSetup(false), className: "px-4 py-2 text-gray-500 hover:text-gray-700 font-medium transition", children: "Close" }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 696,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: () => window.location.reload(), className: "bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-bold transition shadow-sm", children: "Reload App" }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 697,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 695,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/App.tsx",
      lineNumber: 671,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/App.tsx",
      lineNumber: 670,
      columnNumber: 7
    }, this),
    showSettingsModal && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 animate-fade-in backdrop-blur-sm", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center shrink-0", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2.5", children: [
          /* @__PURE__ */ jsxDEV(SettingsIcon, { className: "text-amber-600", size: 22 }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 709,
            columnNumber: 18
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-gray-900", children: "System Settings & Integrations" }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 710,
            columnNumber: 18
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 708,
          columnNumber: 16
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: () => setShowSettingsModal(false), className: "text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition", children: /* @__PURE__ */ jsxDEV(X, { size: 20 }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 712,
          columnNumber: 160
        }, this) }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 712,
          columnNumber: 16
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 707,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex border-b border-gray-100 bg-gray-50/50 px-6 shrink-0", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveSettingsTab("database"),
            className: `py-3 px-4 font-semibold text-sm border-b-2 transition-all flex items-center gap-2 ${activeSettingsTab === "database" ? "border-amber-600 text-amber-800" : "border-transparent text-gray-500 hover:text-gray-700"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Database, { size: 16 }, void 0, false, {
                fileName: "/app/applet/App.tsx",
                lineNumber: 721,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Database Connection" }, void 0, false, {
                fileName: "/app/applet/App.tsx",
                lineNumber: 722,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/App.tsx",
            lineNumber: 717,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveSettingsTab("whatsapp"),
            className: `py-3 px-4 font-semibold text-sm border-b-2 transition-all flex items-center gap-2 ${activeSettingsTab === "whatsapp" ? "border-amber-600 text-amber-800" : "border-transparent text-gray-500 hover:text-gray-700"}`,
            children: [
              /* @__PURE__ */ jsxDEV(MessageSquare, { size: 16 }, void 0, false, {
                fileName: "/app/applet/App.tsx",
                lineNumber: 728,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "WhatsApp Integration" }, void 0, false, {
                fileName: "/app/applet/App.tsx",
                lineNumber: 729,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/App.tsx",
            lineNumber: 724,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveSettingsTab("export"),
            className: `py-3 px-4 font-semibold text-sm border-b-2 transition-all flex items-center gap-2 ${activeSettingsTab === "export" ? "border-amber-600 text-amber-800" : "border-transparent text-gray-500 hover:text-gray-700"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Download, { size: 16 }, void 0, false, {
                fileName: "/app/applet/App.tsx",
                lineNumber: 735,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Export Project ZIP" }, void 0, false, {
                fileName: "/app/applet/App.tsx",
                lineNumber: 736,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/App.tsx",
            lineNumber: 731,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 716,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-6 overflow-y-auto flex-1 space-y-6", children: activeSettingsTab === "database" ? /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-blue-50 p-4 rounded-xl text-sm text-blue-800 border border-blue-100 flex items-start gap-3", children: [
          /* @__PURE__ */ jsxDEV(Database, { className: "mt-0.5 text-blue-600 shrink-0", size: 18 }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 744,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("p", { className: "font-bold", children: "Database Settings" }, void 0, false, {
              fileName: "/app/applet/App.tsx",
              lineNumber: 746,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "mt-0.5 text-blue-700", children: [
              "Configure your connection to Supabase. You can find these values in your Supabase Dashboard under ",
              /* @__PURE__ */ jsxDEV("strong", { children: "Project Settings > API" }, void 0, false, {
                fileName: "/app/applet/App.tsx",
                lineNumber: 747,
                columnNumber: 157
              }, this),
              "."
            ] }, void 0, true, {
              fileName: "/app/applet/App.tsx",
              lineNumber: 747,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 745,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 743,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1", children: "Project URL" }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 751,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              value: customUrl,
              onChange: (e) => setCustomUrl(e.target.value),
              className: "w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm bg-white text-black",
              placeholder: "https://...supabase.co"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/App.tsx",
              lineNumber: 752,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 750,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1", children: "Anon Key (public)" }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 761,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              value: customKey,
              onChange: (e) => setCustomKey(e.target.value),
              className: "w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm font-mono bg-white text-black",
              placeholder: "eyJh..."
            },
            void 0,
            false,
            {
              fileName: "/app/applet/App.tsx",
              lineNumber: 762,
              columnNumber: 21
            },
            this
          ),
          customKey.includes("process.env") && /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-red-500 mt-1", children: '⚠️ Warning: The provided key seems to be a template expression. Please paste the actual long key string starting with "ey...".' }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 770,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 760,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "pt-4 border-t border-gray-100 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-gray-500", children: "Need to create tables or seed dummy data?" }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 777,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                setShowSettingsModal(false);
                setShowDbSetup(true);
              },
              className: "text-xs text-amber-700 hover:text-amber-950 font-bold flex items-center gap-1 hover:underline",
              children: [
                /* @__PURE__ */ jsxDEV(Copy, { size: 12 }, void 0, false, {
                  fileName: "/app/applet/App.tsx",
                  lineNumber: 782,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Show SQL Setup Script" }, void 0, false, {
                  fileName: "/app/applet/App.tsx",
                  lineNumber: 783,
                  columnNumber: 23
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/App.tsx",
              lineNumber: 778,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 776,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 742,
        columnNumber: 13
      }, this) : activeSettingsTab === "whatsapp" ? /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-green-50 p-4 rounded-xl text-sm text-green-800 border border-green-100 flex items-start gap-3", children: [
          /* @__PURE__ */ jsxDEV(MessageSquare, { className: "mt-0.5 text-green-600 shrink-0", size: 18 }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 790,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("p", { className: "font-bold", children: "Fast2SMS WhatsApp Integration" }, void 0, false, {
              fileName: "/app/applet/App.tsx",
              lineNumber: 792,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "mt-0.5 text-green-700", children: [
              "Enter your Fast2SMS credentials below. The approved order confirmation template (ID: ",
              /* @__PURE__ */ jsxDEV("strong", { children: "23965" }, void 0, false, {
                fileName: "/app/applet/App.tsx",
                lineNumber: 793,
                columnNumber: 145
              }, this),
              ") will be triggered when placing orders."
            ] }, void 0, true, {
              fileName: "/app/applet/App.tsx",
              lineNumber: 793,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 791,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 789,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1", children: "Fast2SMS Authorization Key" }, void 0, false, {
              fileName: "/app/applet/App.tsx",
              lineNumber: 799,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "password",
                value: whatsappApiKey,
                onChange: (e) => setWhatsappApiKey(e.target.value),
                className: "w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm bg-white text-black",
                placeholder: "Enter Fast2SMS API Key"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/App.tsx",
                lineNumber: 800,
                columnNumber: 23
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 798,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1", children: "WhatsApp Phone Number ID" }, void 0, false, {
              fileName: "/app/applet/App.tsx",
              lineNumber: 809,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                value: whatsappPhoneId,
                onChange: (e) => setWhatsappPhoneId(e.target.value),
                className: "w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm bg-white text-black font-mono",
                placeholder: "e.g. 966233469897941"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/App.tsx",
                lineNumber: 810,
                columnNumber: 23
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 808,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 797,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleSaveWhatsAppConfig,
            className: "bg-amber-600 hover:bg-amber-700 text-white text-sm px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 shadow transition",
            children: [
              /* @__PURE__ */ jsxDEV(Save, { size: 16 }, void 0, false, {
                fileName: "/app/applet/App.tsx",
                lineNumber: 825,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Save WhatsApp Credentials" }, void 0, false, {
                fileName: "/app/applet/App.tsx",
                lineNumber: 826,
                columnNumber: 23
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/App.tsx",
            lineNumber: 821,
            columnNumber: 21
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 820,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "pt-6 border-t border-gray-100 space-y-4", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-gray-800", children: "Send Test Session Message" }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 832,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-500", children: "Ensure credentials are saved. This sends a quick greeting session message to confirm the link works." }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 833,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                value: testPhoneNumber,
                onChange: (e) => setTestPhoneNumber(e.target.value),
                className: "flex-1 rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm bg-white text-black",
                placeholder: "e.g. 9790703936"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/App.tsx",
                lineNumber: 836,
                columnNumber: 23
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleSendTestWhatsApp,
                disabled: isSendingTest,
                className: `px-5 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${isSendingTest ? "bg-gray-200 text-gray-400" : "bg-green-600 hover:bg-green-700 text-white shadow-md"}`,
                children: isSendingTest ? /* @__PURE__ */ jsxDEV("div", { className: "w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin" }, void 0, false, {
                  fileName: "/app/applet/App.tsx",
                  lineNumber: 849,
                  columnNumber: 21
                }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                  /* @__PURE__ */ jsxDEV(MessageSquare, { size: 16 }, void 0, false, {
                    fileName: "/app/applet/App.tsx",
                    lineNumber: 852,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Send Test" }, void 0, false, {
                    fileName: "/app/applet/App.tsx",
                    lineNumber: 853,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/App.tsx",
                  lineNumber: 851,
                  columnNumber: 21
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/App.tsx",
                lineNumber: 843,
                columnNumber: 23
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 835,
            columnNumber: 21
          }, this),
          testResult && /* @__PURE__ */ jsxDEV("div", { className: `p-3 rounded-lg text-xs font-semibold ${testResult.startsWith("✅") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`, children: testResult }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 860,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 831,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 788,
        columnNumber: 13
      }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-amber-50 p-4 rounded-xl text-sm text-amber-900 border border-amber-200 flex items-start gap-3", children: [
          /* @__PURE__ */ jsxDEV(Download, { className: "mt-0.5 text-amber-700 shrink-0", size: 18 }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 869,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("p", { className: "font-bold", children: "Export Complete Project as ZIP" }, void 0, false, {
              fileName: "/app/applet/App.tsx",
              lineNumber: 871,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "mt-0.5 text-amber-800", children: "Download the entire source code, components, services, and configuration files as a `.zip` archive for manual upload, backup, or offline development." }, void 0, false, {
              fileName: "/app/applet/App.tsx",
              lineNumber: 872,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 870,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 868,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center justify-center p-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl space-y-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center shadow-inner", children: /* @__PURE__ */ jsxDEV(Download, { size: 28 }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 878,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 877,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-gray-900 text-base", children: "svashicalis-erp-project.zip" }, void 0, false, {
              fileName: "/app/applet/App.tsx",
              lineNumber: 881,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-500 mt-1", children: "Includes all React components, TypeScript services, Tailwind styles, and Vite build config." }, void 0, false, {
              fileName: "/app/applet/App.tsx",
              lineNumber: 882,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 880,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleExportZip,
              disabled: isExporting,
              className: `px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all flex items-center gap-2 ${isExporting ? "bg-amber-400 cursor-not-allowed" : "bg-amber-600 hover:bg-amber-700 active:scale-95"}`,
              children: isExporting ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }, void 0, false, {
                  fileName: "/app/applet/App.tsx",
                  lineNumber: 892,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Packaging ZIP..." }, void 0, false, {
                  fileName: "/app/applet/App.tsx",
                  lineNumber: 893,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/App.tsx",
                lineNumber: 891,
                columnNumber: 19
              }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV(Download, { size: 18 }, void 0, false, {
                  fileName: "/app/applet/App.tsx",
                  lineNumber: 897,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Download ZIP Archive" }, void 0, false, {
                  fileName: "/app/applet/App.tsx",
                  lineNumber: 898,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/App.tsx",
                lineNumber: 896,
                columnNumber: 19
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/App.tsx",
              lineNumber: 885,
              columnNumber: 21
            },
            this
          ),
          exportStatus && /* @__PURE__ */ jsxDEV("div", { className: `mt-2 p-3 rounded-lg text-xs font-semibold w-full text-center ${exportStatus.startsWith("✅") ? "bg-green-50 text-green-800 border border-green-200" : exportStatus.startsWith("❌") ? "bg-red-50 text-red-800 border border-red-200" : "bg-blue-50 text-blue-800 border border-blue-200"}`, children: exportStatus }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 904,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 876,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 867,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 740,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3 shrink-0", children: [
        /* @__PURE__ */ jsxDEV("button", { onClick: () => setShowSettingsModal(false), className: "px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-semibold text-sm transition", children: "Cancel" }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 914,
          columnNumber: 16
        }, this),
        activeSettingsTab === "database" && /* @__PURE__ */ jsxDEV("button", { onClick: handleSaveConnection, className: "bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow transition", children: [
          /* @__PURE__ */ jsxDEV(Save, { size: 16 }, void 0, false, {
            fileName: "/app/applet/App.tsx",
            lineNumber: 917,
            columnNumber: 20
          }, this),
          " Save & Connect DB"
        ] }, void 0, true, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 916,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 913,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/App.tsx",
      lineNumber: 706,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/App.tsx",
      lineNumber: 705,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Routes, { children: [
      /* @__PURE__ */ jsxDEV(Route, { path: "/login", element: isAuthenticated ? /* @__PURE__ */ jsxDEV(Navigate, { to: "/", replace: true }, void 0, false, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 926,
        columnNumber: 57
      }, this) : /* @__PURE__ */ jsxDEV(Login, { onLogin: login, users, loading }, void 0, false, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 926,
        columnNumber: 87
      }, this) }, void 0, false, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 926,
        columnNumber: 9
      }, this),
      isAuthenticated ? /* @__PURE__ */ jsxDEV(Route, { element: /* @__PURE__ */ jsxDEV(
        Layout,
        {
          ...contextValue,
          isDbConnected,
          onOpenDbSetup: () => setShowDbSetup(true),
          onOpenConnect: () => {
            setShowSettingsModal(true);
            setActiveSettingsTab("database");
          },
          onOpenSettings: () => {
            setShowSettingsModal(true);
            setActiveSettingsTab("whatsapp");
          },
          onOpenExport: () => {
            setShowSettingsModal(true);
            setActiveSettingsTab("export");
          }
        },
        void 0,
        false,
        {
          fileName: "/app/applet/App.tsx",
          lineNumber: 929,
          columnNumber: 9
        },
        this
      ), children: [
        /* @__PURE__ */ jsxDEV(Route, { path: "/", element: /* @__PURE__ */ jsxDEV(Dashboard, {}, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 938,
          columnNumber: 38
        }, this) }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 938,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Route, { path: "/customers", element: /* @__PURE__ */ jsxDEV(Customers, {}, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 939,
          columnNumber: 47
        }, this) }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 939,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Route, { path: "/order-taking", element: /* @__PURE__ */ jsxDEV(OrderTaking, {}, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 940,
          columnNumber: 50
        }, this) }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 940,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Route, { path: "/orders", element: /* @__PURE__ */ jsxDEV(Orders, {}, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 941,
          columnNumber: 44
        }, this) }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 941,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Route, { path: "/orders/:id", element: /* @__PURE__ */ jsxDEV(OrderDetails, {}, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 942,
          columnNumber: 48
        }, this) }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 942,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Route, { path: "/deliveries", element: /* @__PURE__ */ jsxDEV(Deliveries, {}, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 943,
          columnNumber: 48
        }, this) }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 943,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Route, { path: "/inventory", element: /* @__PURE__ */ jsxDEV(Inventory, {}, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 944,
          columnNumber: 47
        }, this) }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 944,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Route, { path: "*", element: /* @__PURE__ */ jsxDEV(Navigate, { to: "/", replace: true }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 945,
          columnNumber: 38
        }, this) }, void 0, false, {
          fileName: "/app/applet/App.tsx",
          lineNumber: 945,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 928,
        columnNumber: 9
      }, this) : /* @__PURE__ */ jsxDEV(Route, { path: "*", element: /* @__PURE__ */ jsxDEV(Navigate, { to: "/login", replace: true }, void 0, false, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 948,
        columnNumber: 34
      }, this) }, void 0, false, {
        fileName: "/app/applet/App.tsx",
        lineNumber: 948,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/App.tsx",
      lineNumber: 925,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/App.tsx",
    lineNumber: 667,
    columnNumber: 5
  }, this);
}
_s2(App, "awyaweRwwg/pNHu1pslDuKvf+K8=");
_c2 = App;
export default App;
var _c, _c2;
$RefreshReg$(_c, "Layout");
$RefreshReg$(_c2, "App");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/applet/App.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/applet/App.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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LFNBQU0sTUFBSyxlQUFjLFNBQVMsdUJBQUMsZ0JBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFXLEtBQTlDO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBa0Q7QUFBQSxRQUNsRCx1QkFBQyxTQUFNLE1BQUssY0FBYSxTQUFTLHVCQUFDLGVBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFVLEtBQTVDO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBZ0Q7QUFBQSxRQUNoRCx1QkFBQyxTQUFNLE1BQUssS0FBSSxTQUFTLHVCQUFDLFlBQVMsSUFBRyxLQUFJLFNBQU8sUUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUF3QixLQUFqRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQXFEO0FBQUEsV0FqQnZEO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFrQkEsSUFFQSx1QkFBQyxTQUFNLE1BQUssS0FBSSxTQUFTLHVCQUFDLFlBQVMsSUFBRyxVQUFTLFNBQU8sUUFBN0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUE2QixLQUF0RDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQTBEO0FBQUEsU0F2QjlEO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0F5QkE7QUFBQSxPQTNSRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBNFJBO0FBRUo7QUFBQ2QsSUE5cUJRRCxLQUFHO0FBQUEsTUFBSEE7QUFnckJULGVBQWVBO0FBQUksSUFBQWlKLElBQUFDO0FBQUEsYUFBQUQsSUFBQTtBQUFBLGFBQUFDLEtBQUEiLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIkhhc2hSb3V0ZXIiLCJSb3V0ZXMiLCJSb3V0ZSIsIk5hdmlnYXRlIiwiT3V0bGV0IiwiU2lkZWJhciIsIkRhc2hib2FyZCIsIkN1c3RvbWVycyIsIk9yZGVyVGFraW5nIiwiRGVsaXZlcmllcyIsIk9yZGVyRGV0YWlscyIsIkludmVudG9yeSIsIkxvZ2luIiwiT3JkZXJzIiwic3VwYWJhc2UiLCJpc1N1cGFiYXNlQ29uZmlndXJlZCIsInNhdmVTdXBhYmFzZUNyZWRlbnRpYWxzIiwiZ2V0V2hhdHNBcHBDb25maWciLCJzYXZlV2hhdHNBcHBDb25maWciLCJzZW5kV2hhdHNBcHBTZXNzaW9uTWVzc2FnZSIsImRvd25sb2FkUHJvamVjdFppcCIsIk1PQ0tfVVNFUlMiLCJNT0NLX0NVU1RPTUVSUyIsIk1PQ0tfT1JERVJTIiwiTU9DS19QUk9EVUNUUyIsIkFsZXJ0Q2lyY2xlIiwiRGF0YWJhc2UiLCJDb3B5IiwiQ2hlY2siLCJNZW51IiwiWCIsIlNhdmUiLCJTZXR0aW5ncyIsIlNldHRpbmdzSWNvbiIsIk1lc3NhZ2VTcXVhcmUiLCJEb3dubG9hZCIsIkxheW91dCIsInByb3BzIiwiX3MiLCJpc1NpZGViYXJPcGVuIiwic2V0SXNTaWRlYmFyT3BlbiIsImN1cnJlbnRVc2VyIiwicm9sZSIsInJlc2V0RGF0YSIsImxvZ291dCIsIm9uT3BlblNldHRpbmdzIiwib25PcGVuRXhwb3J0IiwiaXNEYkNvbm5lY3RlZCIsIm9uT3BlbkNvbm5lY3QiLCJuYW1lIiwicmVwbGFjZSIsImF2YXRhciIsIlNRTF9TRVRVUF9TQ1JJUFQiLCJBcHAiLCJfczIiLCJzZXRDdXJyZW50VXNlciIsImlzQXV0aGVudGljYXRlZCIsInNldElzQXV0aGVudGljYXRlZCIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwic2V0SXNEYkNvbm5lY3RlZCIsInNob3dEYlNldHVwIiwic2V0U2hvd0RiU2V0dXAiLCJzaG93Q29ubmVjdE1vZGFsIiwic2V0U2hvd0Nvbm5lY3RNb2RhbCIsInNob3dTZXR0aW5nc01vZGFsIiwic2V0U2hvd1NldHRpbmdzTW9kYWwiLCJhY3RpdmVTZXR0aW5nc1RhYiIsInNldEFjdGl2ZVNldHRpbmdzVGFiIiwid2hhdHNhcHBBcGlLZXkiLCJzZXRXaGF0c2FwcEFwaUtleSIsIndoYXRzYXBwUGhvbmVJZCIsInNldFdoYXRzYXBwUGhvbmVJZCIsInRlc3RQaG9uZU51bWJlciIsInNldFRlc3RQaG9uZU51bWJlciIsImlzU2VuZGluZ1Rlc3QiLCJzZXRJc1NlbmRpbmdUZXN0IiwidGVzdFJlc3VsdCIsInNldFRlc3RSZXN1bHQiLCJleHBvcnRTdGF0dXMiLCJzZXRFeHBvcnRTdGF0dXMiLCJpc0V4cG9ydGluZyIsInNldElzRXhwb3J0aW5nIiwiaGFuZGxlRXhwb3J0WmlwIiwic3RhdHVzIiwiZXJyIiwibWVzc2FnZSIsImN1c3RvbVVybCIsInNldEN1c3RvbVVybCIsImN1c3RvbUtleSIsInNldEN1c3RvbUtleSIsImN1c3RvbWVycyIsInNldEN1c3RvbWVycyIsIm9yZGVycyIsInNldE9yZGVycyIsInByb2R1Y3RzIiwic2V0UHJvZHVjdHMiLCJ1c2VycyIsInNldFVzZXJzIiwiY29waWVkIiwic2V0Q29waWVkIiwiZmV0Y2hBbGxEYXRhIiwibG9hZE1vY2tzIiwiY29uc29sZSIsIndhcm4iLCJkYXRhIiwiY3VzdG9tZXJzRGF0YSIsImVycm9yIiwiY3VzdG9tZXJzRXJyb3IiLCJmcm9tIiwic2VsZWN0IiwicHJvZHVjdHNEYXRhIiwicHJvZHVjdHNFcnJvciIsIm9yZGVyc0RhdGEiLCJvcmRlcnNFcnJvciIsInVzZXJzRGF0YSIsInVzZXJzRXJyb3IiLCJsb2ciLCJsZW5ndGgiLCJpc01pc3NpbmdUYWJsZSIsImNvZGUiLCJpbmNsdWRlcyIsImhhc1N0b3JlZEtleSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJjb25maWciLCJhcGlLZXkiLCJwaG9uZU51bWJlcklkIiwiaGFuZGxlU2F2ZVdoYXRzQXBwQ29uZmlnIiwiYWxlcnQiLCJoYW5kbGVTZW5kVGVzdFdoYXRzQXBwIiwicmVzIiwicGhvbmVOdW1iZXIiLCJ0eXBlIiwidGV4dCIsInN1Y2Nlc3MiLCJoYW5kbGVDb3B5U3FsIiwibmF2aWdhdG9yIiwiY2xpcGJvYXJkIiwid3JpdGVUZXh0Iiwic2V0VGltZW91dCIsImhhbmRsZVNhdmVDb25uZWN0aW9uIiwic3dpdGNoUm9sZSIsInVzZXIiLCJmaW5kIiwidSIsImxvZ2luIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImFkZEN1c3RvbWVyIiwiY3VzdG9tZXIiLCJwcmV2IiwiaW5zZXJ0IiwiaXNTY2hlbWFFcnJvciIsInRvTG93ZXJDYXNlIiwidXBkYXRlQ3VzdG9tZXIiLCJtYXAiLCJjIiwiaWQiLCJ1cGRhdGUiLCJlcSIsImRlbGV0ZUN1c3RvbWVyIiwiY3VzdG9tZXJJZCIsImZpbHRlciIsImRlbGV0ZSIsImFkZFByb2R1Y3QiLCJwcm9kdWN0IiwidXBkYXRlUHJvZHVjdCIsInAiLCJkZWxldGVQcm9kdWN0IiwicHJvZHVjdElkIiwiYWRkT3JkZXIiLCJvcmRlciIsImxhc3RPcmRlckRhdGUiLCJkYXRlIiwib3JkZXJFcnJvciIsImFkZFVzZXIiLCJ1cGRhdGVVc2VyIiwiZGVsZXRlVXNlciIsInVzZXJJZCIsInVwZGF0ZU9yZGVyU3RhdHVzIiwib3JkZXJJZCIsIm8iLCJhc3NpZ25Ecml2ZXIiLCJkcml2ZXJJZCIsImRlbGl2ZXJ5UGVyc29uSWQiLCJ1bmRlZmluZWQiLCJ2YWwiLCJjb25maXJtIiwibmVxIiwiZSIsImNvbnRleHRWYWx1ZSIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwidGFyZ2V0IiwidmFsdWUiLCJzdGFydHNXaXRoIiwiX2MiLCJfYzIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiQXBwLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgSGFzaFJvdXRlciwgUm91dGVzLCBSb3V0ZSwgTmF2aWdhdGUsIE91dGxldCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IFNpZGViYXIgZnJvbSAnLi9jb21wb25lbnRzL1NpZGViYXInO1xuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuL3BhZ2VzL0Rhc2hib2FyZCc7XG5pbXBvcnQgQ3VzdG9tZXJzIGZyb20gJy4vcGFnZXMvQ3VzdG9tZXJzJztcbmltcG9ydCBPcmRlclRha2luZyBmcm9tICcuL3BhZ2VzL09yZGVyVGFraW5nJztcbmltcG9ydCBEZWxpdmVyaWVzIGZyb20gJy4vcGFnZXMvRGVsaXZlcmllcyc7XG5pbXBvcnQgT3JkZXJEZXRhaWxzIGZyb20gJy4vcGFnZXMvT3JkZXJEZXRhaWxzJztcbmltcG9ydCBJbnZlbnRvcnkgZnJvbSAnLi9wYWdlcy9JbnZlbnRvcnknO1xuaW1wb3J0IExvZ2luIGZyb20gJy4vcGFnZXMvTG9naW4nO1xuaW1wb3J0IE9yZGVycyBmcm9tICcuL3BhZ2VzL09yZGVycyc7XG5pbXBvcnQgeyBzdXBhYmFzZSwgaXNTdXBhYmFzZUNvbmZpZ3VyZWQsIHNhdmVTdXBhYmFzZUNyZWRlbnRpYWxzIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdXBhYmFzZUNsaWVudCc7XG5pbXBvcnQgeyBnZXRXaGF0c0FwcENvbmZpZywgc2F2ZVdoYXRzQXBwQ29uZmlnLCBzZW5kV2hhdHNBcHBTZXNzaW9uTWVzc2FnZSB9IGZyb20gJy4vc2VydmljZXMvd2hhdHNhcHBTZXJ2aWNlJztcbmltcG9ydCB7IGRvd25sb2FkUHJvamVjdFppcCB9IGZyb20gJy4vc2VydmljZXMvZXhwb3J0U2VydmljZSc7XG5pbXBvcnQgeyBcbiAgUm9sZSwgXG4gIFVzZXIsIFxuICBBcHBDb250ZXh0VHlwZSwgXG4gIE9yZGVyLCBcbiAgQnVzaW5lc3NPd25lciwgXG4gIFByb2R1Y3QsIFxuICBPcmRlclN0YXR1cyBcbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBcbiAgTU9DS19VU0VSUywgXG4gIE1PQ0tfQ1VTVE9NRVJTLCBcbiAgTU9DS19PUkRFUlMsIFxuICBNT0NLX1BST0RVQ1RTIFxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBBbGVydENpcmNsZSwgRGF0YWJhc2UsIENvcHksIENoZWNrLCBNZW51LCBYLCBTYXZlLCBTZXR0aW5ncyBhcyBTZXR0aW5nc0ljb24sIE1lc3NhZ2VTcXVhcmUsIERvd25sb2FkIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuaW50ZXJmYWNlIExheW91dFByb3BzIGV4dGVuZHMgQXBwQ29udGV4dFR5cGUge1xuICBpc0RiQ29ubmVjdGVkOiBib29sZWFuO1xuICBvbk9wZW5EYlNldHVwOiAoKSA9PiB2b2lkO1xuICBvbk9wZW5Db25uZWN0OiAoKSA9PiB2b2lkO1xuICBvbk9wZW5TZXR0aW5nczogKCkgPT4gdm9pZDtcbiAgb25PcGVuRXhwb3J0OiAoKSA9PiB2b2lkO1xufVxuXG5jb25zdCBMYXlvdXQ6IFJlYWN0LkZDPExheW91dFByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCBbaXNTaWRlYmFyT3Blbiwgc2V0SXNTaWRlYmFyT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaC1zY3JlZW4gYmctY2hvY28tNTAgZm9udC1zYW5zIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgPFNpZGViYXIgXG4gICAgICAgIHJvbGU9e3Byb3BzLmN1cnJlbnRVc2VyLnJvbGV9IFxuICAgICAgICBvblJlc2V0PXtwcm9wcy5yZXNldERhdGF9IFxuICAgICAgICBvbkxvZ291dD17cHJvcHMubG9nb3V0fSBcbiAgICAgICAgb25PcGVuU2V0dGluZ3M9e3Byb3BzLm9uT3BlblNldHRpbmdzfVxuICAgICAgICBvbk9wZW5FeHBvcnQ9e3Byb3BzLm9uT3BlbkV4cG9ydH1cbiAgICAgICAgaXNPcGVuPXtpc1NpZGViYXJPcGVufVxuICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRJc1NpZGViYXJPcGVuKGZhbHNlKX1cbiAgICAgIC8+XG4gICAgICBcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggZmxleC1jb2wgaC1mdWxsIG92ZXJmbG93LWhpZGRlbiB3LWZ1bGxcIj5cbiAgICAgICAgXG4gICAgICAgIHshcHJvcHMuaXNEYkNvbm5lY3RlZCAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1hbWJlci0xMDAgdGV4dC1hbWJlci04MDAgcHgtNCBzbTpweC02IHB5LTIgdGV4dC1zbSBmb250LW1lZGl1bSBib3JkZXItYiBib3JkZXItYW1iZXItMjAwIGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBzaGFkb3ctc20gei0xMCBnYXAtMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgPEFsZXJ0Q2lyY2xlIHNpemU9ezE2fSAvPlxuICAgICAgICAgICAgICA8c3Bhbj5EZW1vIE1vZGU6IFVzaW5nIGxvY2FsIG1vY2sgZGF0YS48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgb25DbGljaz17cHJvcHMub25PcGVuQ29ubmVjdH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXhzIGJnLXdoaXRlIGJvcmRlciBib3JkZXItYW1iZXItMzAwIGhvdmVyOmJnLWFtYmVyLTUwIHRleHQtYW1iZXItOTAwIHB4LTMgcHktMSByb3VuZGVkIGZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMSB0cmFuc2l0aW9uIHNoYWRvdy1zbVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8RGF0YWJhc2Ugc2l6ZT17MTJ9IC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+Q29ubmVjdCBEYXRhYmFzZTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cImJnLXdoaXRlIHNoYWRvdy1zbSBib3JkZXItYiBib3JkZXItZ3JheS0xMDAgaC0xNiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtNCBzbTpweC04IHNocmluay0wXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTRcIj5cbiAgICAgICAgICAgICB7LyogTW9iaWxlICYgVGFibGV0IE1lbnUgQnV0dG9uICovfVxuICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc1NpZGViYXJPcGVuKHRydWUpfVxuICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGc6aGlkZGVuIHRleHQtZ3JheS01MDAgaG92ZXI6dGV4dC1hbWJlci02MDAgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICA8TWVudSBzaXplPXsyNH0gLz5cbiAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICB7LyogTW9iaWxlICYgVGFibGV0IExvZ28gKFZpc2libGUgb25seSB3aGVuIHNpZGViYXIgaGlkZGVuKSAqL31cbiAgICAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9pay5pbWFnZWtpdC5pby92aXN0YWRpZ2l0YWxzL1N2YXNoaWNhbGlzL2xvZ28tc3Zhc2hpY2FsaXMucG5nXCIgXG4gICAgICAgICAgICAgICBhbHQ9XCJTdmFzaGljYWxpc1wiIFxuICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC0xMCB3LWF1dG8gbGc6aGlkZGVuXCJcbiAgICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMyBwbC00IGJvcmRlci1sIGJvcmRlci1ncmF5LTEwMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcmlnaHQgaGlkZGVuIHNtOmJsb2NrXCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC1ncmF5LTkwMFwiPntwcm9wcy5jdXJyZW50VXNlci5uYW1lfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZ3JheS01MDBcIj57cHJvcHMuY3VycmVudFVzZXIucm9sZS5yZXBsYWNlKCdfJywgJyAnKX08L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aW1nIHNyYz17cHJvcHMuY3VycmVudFVzZXIuYXZhdGFyfSBhbHQ9XCJQcm9maWxlXCIgY2xhc3NOYW1lPVwidy04IGgtOCBzbTp3LTkgc206aC05IHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLWdyYXktMjAwXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgXG4gICAgICAgIDxtYWluIGNsYXNzTmFtZT1cImZsZXgtMSBvdmVyZmxvdy1hdXRvIHAtNCBzbTpwLTggdy1mdWxsXCI+XG4gICAgICAgICAgPE91dGxldCBjb250ZXh0PXtwcm9wc30gLz5cbiAgICAgICAgPC9tYWluPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5jb25zdCBTUUxfU0VUVVBfU0NSSVBUID0gYC0tIFNVUEFCQVNFIFNFVFVQIFNDUklQVCBGT1IgU1ZBU0hJQ0FMSVNcbi0tIFJ1biB0aGlzIGVudGlyZSBzY3JpcHQgaW4gdGhlIFNRTCBFZGl0b3IgdG8gcmVzZXQvc2V0dXAgeW91ciBkYXRhYmFzZSB3aXRoIHJvYnVzdCBkdW1teSBkYXRhLlxuXG4tLSAxLiBDTEVBTlVQIChEcm9wIGV4aXN0aW5nIHRhYmxlcyB0byBlbnN1cmUgZnJlc2ggc2NoZW1hKVxuRFJPUCBUQUJMRSBJRiBFWElTVFMgcHVibGljLm9yZGVycyBDQVNDQURFO1xuRFJPUCBUQUJMRSBJRiBFWElTVFMgcHVibGljLnByb2R1Y3RzIENBU0NBREU7XG5EUk9QIFRBQkxFIElGIEVYSVNUUyBwdWJsaWMuY3VzdG9tZXJzIENBU0NBREU7XG5EUk9QIFRBQkxFIElGIEVYSVNUUyBwdWJsaWMudXNlcnMgQ0FTQ0FERTtcblxuLS0gMi4gQ1JFQVRFIFRBQkxFU1xuXG4tLSBVc2VycyBUYWJsZVxuQ1JFQVRFIFRBQkxFIHB1YmxpYy51c2VycyAoXG4gICAgaWQgdGV4dCBQUklNQVJZIEtFWSxcbiAgICBuYW1lIHRleHQgTk9UIE5VTEwsXG4gICAgcm9sZSB0ZXh0IE5PVCBOVUxMLFxuICAgIGF2YXRhciB0ZXh0LFxuICAgIHVzZXJuYW1lIHRleHQgTk9UIE5VTEwsXG4gICAgcGFzc3dvcmQgdGV4dCBOT1QgTlVMTFxuKTtcblxuLS0gQ3VzdG9tZXJzIChCdXNpbmVzcyBPd25lcnMpIFRhYmxlXG5DUkVBVEUgVEFCTEUgcHVibGljLmN1c3RvbWVycyAoXG4gICAgaWQgdGV4dCBQUklNQVJZIEtFWSxcbiAgICBcImJ1c2luZXNzTmFtZVwiIHRleHQgTk9UIE5VTEwsXG4gICAgXCJvd25lck5hbWVcIiB0ZXh0IE5PVCBOVUxMLFxuICAgIGdzdCB0ZXh0LFxuICAgIGFkZHJlc3MgdGV4dCxcbiAgICBwaG9uZSB0ZXh0LFxuICAgIGVtYWlsIHRleHQsXG4gICAgc3RhdHVzIHRleHQgREVGQVVMVCAnQWN0aXZlJyxcbiAgICBcImxhc3RPcmRlckRhdGVcIiB0ZXh0XG4pO1xuXG4tLSBQcm9kdWN0cyBUYWJsZVxuQ1JFQVRFIFRBQkxFIHB1YmxpYy5wcm9kdWN0cyAoXG4gICAgaWQgdGV4dCBQUklNQVJZIEtFWSxcbiAgICBuYW1lIHRleHQgTk9UIE5VTEwsXG4gICAgY2F0ZWdvcnkgdGV4dCBOT1QgTlVMTCxcbiAgICBwcmljZSBudW1lcmljIE5PVCBOVUxMLFxuICAgIHN0b2NrIG51bWVyaWMgREVGQVVMVCAwLFxuICAgIGRlc2NyaXB0aW9uIHRleHQsXG4gICAgaW1hZ2UgdGV4dFxuKTtcblxuLS0gT3JkZXJzIFRhYmxlXG5DUkVBVEUgVEFCTEUgcHVibGljLm9yZGVycyAoXG4gICAgaWQgdGV4dCBQUklNQVJZIEtFWSxcbiAgICBcImN1c3RvbWVySWRcIiB0ZXh0IFJFRkVSRU5DRVMgcHVibGljLmN1c3RvbWVycyhpZCksXG4gICAgXCJjdXN0b21lck5hbWVcIiB0ZXh0LFxuICAgIFwiY3VzdG9tZXJBZGRyZXNzXCIgdGV4dCxcbiAgICBcInNhbGVzRXhlY0lkXCIgdGV4dCBSRUZFUkVOQ0VTIHB1YmxpYy51c2VycyhpZCksXG4gICAgXCJkZWxpdmVyeVBlcnNvbklkXCIgdGV4dCBSRUZFUkVOQ0VTIHB1YmxpYy51c2VycyhpZCksXG4gICAgXCJ0b3RhbEFtb3VudFwiIG51bWVyaWMgTk9UIE5VTEwsXG4gICAgc3RhdHVzIHRleHQgTk9UIE5VTEwsXG4gICAgZGF0ZSB0ZXh0IE5PVCBOVUxMLCAtLSBTdG9yZWQgYXMgWVlZWS1NTS1ERFxuICAgIFwiZGVsaXZlcnlEYXRlXCIgdGV4dCxcbiAgICBub3RlcyB0ZXh0LFxuICAgIFwicGF5bWVudFN0YXR1c1wiIHRleHQsXG4gICAgaXRlbXMganNvbmIgLS0gU3RvcmVzIHRoZSBhcnJheSBvZiBvcmRlciBpdGVtc1xuKTtcblxuLS0gMy4gRU5BQkxFIFJPVyBMRVZFTCBTRUNVUklUWSAoUkxTKVxuQUxURVIgVEFCTEUgcHVibGljLnVzZXJzIEVOQUJMRSBST1cgTEVWRUwgU0VDVVJJVFk7XG5BTFRFUiBUQUJMRSBwdWJsaWMuY3VzdG9tZXJzIEVOQUJMRSBST1cgTEVWRUwgU0VDVVJJVFk7XG5BTFRFUiBUQUJMRSBwdWJsaWMucHJvZHVjdHMgRU5BQkxFIFJPVyBMRVZFTCBTRUNVUklUWTtcbkFMVEVSIFRBQkxFIHB1YmxpYy5vcmRlcnMgRU5BQkxFIFJPVyBMRVZFTCBTRUNVUklUWTtcblxuLS0gQ3JlYXRlIE9wZW4gUG9saWNpZXMgKEZvciBEZW1vL0ludGVybmFsIFRvb2wgUHVycG9zZXMpXG5DUkVBVEUgUE9MSUNZIFwiRW5hYmxlIGFsbCBhY2Nlc3MgZm9yIGFsbCB1c2Vyc1wiIE9OIHB1YmxpYy51c2VycyBGT1IgQUxMIFVTSU5HICh0cnVlKSBXSVRIIENIRUNLICh0cnVlKTtcbkNSRUFURSBQT0xJQ1kgXCJFbmFibGUgYWxsIGFjY2VzcyBmb3IgYWxsIGN1c3RvbWVyc1wiIE9OIHB1YmxpYy5jdXN0b21lcnMgRk9SIEFMTCBVU0lORyAodHJ1ZSkgV0lUSCBDSEVDSyAodHJ1ZSk7XG5DUkVBVEUgUE9MSUNZIFwiRW5hYmxlIGFsbCBhY2Nlc3MgZm9yIGFsbCBwcm9kdWN0c1wiIE9OIHB1YmxpYy5wcm9kdWN0cyBGT1IgQUxMIFVTSU5HICh0cnVlKSBXSVRIIENIRUNLICh0cnVlKTtcbkNSRUFURSBQT0xJQ1kgXCJFbmFibGUgYWxsIGFjY2VzcyBmb3IgYWxsIG9yZGVyc1wiIE9OIHB1YmxpYy5vcmRlcnMgRk9SIEFMTCBVU0lORyAodHJ1ZSkgV0lUSCBDSEVDSyAodHJ1ZSk7XG5cbi0tIEdyYW50IHBlcm1pc3Npb25zIHRvIGFub255bW91cyBhbmQgYXV0aGVudGljYXRlZCB1c2VycyAoRml4ZXMgQVBJIHBlcm1pc3Npb24gZXJyb3JzKVxuR1JBTlQgQUxMIE9OIHB1YmxpYy51c2VycyBUTyBhbm9uLCBhdXRoZW50aWNhdGVkO1xuR1JBTlQgQUxMIE9OIHB1YmxpYy5jdXN0b21lcnMgVE8gYW5vbiwgYXV0aGVudGljYXRlZDtcbkdSQU5UIEFMTCBPTiBwdWJsaWMucHJvZHVjdHMgVE8gYW5vbiwgYXV0aGVudGljYXRlZDtcbkdSQU5UIEFMTCBPTiBwdWJsaWMub3JkZXJzIFRPIGFub24sIGF1dGhlbnRpY2F0ZWQ7XG5cblxuLS0gNC4gU0VFRCBEVU1NWSBEQVRBXG5cbi0tIFVzZXJzICgxIEFkbWluLCAyIFNhbGVzLCAyIERlbGl2ZXJ5KVxuSU5TRVJUIElOVE8gcHVibGljLnVzZXJzIChpZCwgbmFtZSwgcm9sZSwgYXZhdGFyLCB1c2VybmFtZSwgcGFzc3dvcmQpIFZBTFVFU1xuKCd1MScsICdBbGljZSBBZG1pbicsICdBRE1JTicsICdodHRwczovL2FwaS5kaWNlYmVhci5jb20vNy54L2F2YXRhYWFycy9zdmc/c2VlZD1BbGljZScsICdhZG1pbicsICdwYXNzd29yZDEyMycpLFxuKCd1MicsICdTYW0gU2FsZXMnLCAnU0FMRVNfRVhFQ1VUSVZFJywgJ2h0dHBzOi8vYXBpLmRpY2ViZWFyLmNvbS83LngvYXZhdGFhYXJzL3N2Zz9zZWVkPVNhbScsICdzYW0uc2FsZXMnLCAnc2FsZXNwYXNzd29yZCcpLFxuKCd1MycsICdTYXJhaCBTYWxlcycsICdTQUxFU19FWEVDVVRJVkUnLCAnaHR0cHM6Ly9hcGkuZGljZWJlYXIuY29tLzcueC9hdmF0YWFhcnMvc3ZnP3NlZWQ9U2FyYWgnLCAnc2FyYWguc2FsZXMnLCAnc2FsZXNwYXNzd29yZDInKSxcbigndTQnLCAnRGF2ZSBEZWxpdmVyeScsICdERUxJVkVSWV9QRVJTT04nLCAnaHR0cHM6Ly9hcGkuZGljZWJlYXIuY29tLzcueC9hdmF0YWFhcnMvc3ZnP3NlZWQ9RGF2ZScsICdkYXZlLmRlbGl2ZXJ5JywgJ2RlbGl2ZXJ5cGFzc3dvcmQnKSxcbigndTUnLCAnTWlrZSBNb3ZlcicsICdERUxJVkVSWV9QRVJTT04nLCAnaHR0cHM6Ly9hcGkuZGljZWJlYXIuY29tLzcueC9hdmF0YWFhcnMvc3ZnP3NlZWQ9TWlrZScsICdtaWtlLmRlbGl2ZXJ5JywgJ2RlbGl2ZXJ5cGFzc3dvcmQyJyk7XG5cbi0tIFByb2R1Y3RzXG5JTlNFUlQgSU5UTyBwdWJsaWMucHJvZHVjdHMgKGlkLCBuYW1lLCBjYXRlZ29yeSwgcHJpY2UsIHN0b2NrLCBkZXNjcmlwdGlvbiwgaW1hZ2UpIFZBTFVFU1xuKCdwMScsICdCZWxnaWFuIERhcmsgQ2hvY29sYXRlIEJhciAoNzAlKScsICdCYXJzJywgMjUwLjAwLCA1MDAsICdSaWNoIGRhcmsgY2hvY29sYXRlIG1hZGUgZnJvbSBwcmVtaXVtIEJlbGdpYW4gYmVhbnMuJywgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTQ4OTA3MDQwLTRiYWE0MmQxMDkxOT9hdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTMwMCZxPTgwJyksXG4oJ3AyJywgJ01pbGsgQ2hvY29sYXRlIFJvYXN0ZWQgSGF6ZWxudXRzJywgJ0RyYWdlZXMnLCA0NTAuMDAsIDIwMCwgJ0NydW5jaHkgaGF6ZWxudXRzIGNvYXRlZCBpbiBjcmVhbXkgbWlsayBjaG9jb2xhdGUuJywgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTQ4MTk3OTgyLTEyNjI4NGExNjUxZT9hdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTMwMCZxPTgwJyksXG4oJ3AzJywgJ1doaXRlIENob2NvbGF0ZSBSYXNwYmVycnkgQmFyJywgJ0JhcnMnLCAyODAuMDAsIDM1MCwgJ1Ntb290aCB3aGl0ZSBjaG9jb2xhdGUgaW5mdXNlZCB3aXRoIGZyZWV6ZS1kcmllZCByYXNwYmVycnkuJywgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjIxMjU1NzU1MTc2LTU3NGY4OGU3YTA0OT9hdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTMwMCZxPTgwJyksXG4oJ3A0JywgJ0x1eHVyeSBUcnVmZmxlIEFzc29ydG1lbnQgKDEycGMpJywgJ0dpZnQgQm94ZXMnLCAxMjAwLjAwLCAxMDAsICdIYW5kY3JhZnRlZCB0cnVmZmxlcyB3aXRoIGV4b3RpYyBmaWxsaW5ncy4nLCAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NDkwMDc5OTQtY2I5MmNhZWJkNTRiP2F1dG89Zm9ybWF0JmZpdD1jcm9wJnc9MzAwJnE9ODAnKSxcbigncDUnLCAnU2FsdGVkIENhcmFtZWwgQm9uYm9ucycsICdCb25ib25zJywgODUwLjAwLCAxNTAsICdMaXF1aWQgc2FsdGVkIGNhcmFtZWwgZW5jYXNlZCBpbiBhIGRhcmsgY2hvY29sYXRlIHNoZWxsLicsICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUyNjA4MTM0NzU4OS03ZmEzY2I0MWI0YjI/YXV0bz1mb3JtYXQmZml0PWNyb3Amdz0zMDAmcT04MCcpLFxuKCdwNicsICdBbG1vbmQgUm9ja3MgUG91Y2gnLCAnRHJhZ2VlcycsIDM1MC4wMCwgNDAwLCAnUm9hc3RlZCBhbG1vbmRzIGNsdXN0ZXJzIGluIGRhcmsgY2hvY29sYXRlLicsICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxMTM4MTkzOTQxNS1lNDQwMTU0NjY4MzQ/YXV0bz1mb3JtYXQmZml0PWNyb3Amdz0zMDAmcT04MCcpLFxuKCdwNycsICdDb3Jwb3JhdGUgR2lmdGluZyBIYW1wZXInLCAnSGFtcGVycycsIDI1MDAuMDAsIDUwLCAnQSBncmFuZCBzZWxlY3Rpb24gb2YgYmFycywgZHJhZ2VlcywgYW5kIGNvb2tpZXMuJywgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTQ5MDA3OTk0LWNiOTJjYWViZDU0Yj9hdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTMwMCZxPTgwJyksXG4oJ3A4JywgJ0RhcmsgQ2hvY29sYXRlIFNwcmVhZCAoMjAwZyknLCAnU3ByZWFkcycsIDMwMC4wMCwgMjUwLCAnVmVsdmV0eSBkYXJrIGNob2NvbGF0ZSBzcHJlYWQgZm9yIHRvYXN0IGFuZCBiYWtpbmcuJywgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTg5MTE1Nzk0NTAzLTRmOTM4OTI4MzdjZT9hdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTMwMCZxPTgwJyk7XG5cbi0tIEN1c3RvbWVyc1xuSU5TRVJUIElOVE8gcHVibGljLmN1c3RvbWVycyAoaWQsIFwiYnVzaW5lc3NOYW1lXCIsIFwib3duZXJOYW1lXCIsIGdzdCwgYWRkcmVzcywgcGhvbmUsIGVtYWlsLCBzdGF0dXMsIFwibGFzdE9yZGVyRGF0ZVwiKSBWQUxVRVNcbignYzEnLCAnVGhlIENob2NvbGF0ZSBSb29tJywgJ1JhaHVsIFZlcm1hJywgJzI5QUJDREUxMjM0RjFaNScsICcxMiwgSW5kaXJhbmFnYXIsIEJhbmdhbG9yZScsICc5OTg4Nzc2NjU1JywgJ3JhaHVsQGNob2Nvcm9vbS5jb20nLCAnQWN0aXZlJywgdG9fY2hhcihDVVJSRU5UX0RBVEUgLSBJTlRFUlZBTCAnMiBkYXlzJywgJ1lZWVktTU0tREQnKSksXG4oJ2MyJywgJ0dsZW4nJ3MgQmFrZWhvdXNlJywgJ0FuamFsaSBNZW5vbicsICcyOUZHSElKNTY3OEsxWjknLCAnNDUsIExhdmVsbGUgUm9hZCwgQmFuZ2Fsb3JlJywgJzk4NzY1NDMyMTAnLCAnYW5qYWxpQGdsZW5zLmNvbScsICdBY3RpdmUnLCB0b19jaGFyKENVUlJFTlRfREFURSAtIElOVEVSVkFMICc1IGRheXMnLCAnWVlZWS1NTS1ERCcpKSxcbignYzMnLCAnQ2FmZSBDb2ZmZWUgRGF5IC0gSFEnLCAnUm9iZXJ0IEQnJ3NvdXphJywgJzI5TE1OT1A5MDEyUTFaMycsICc3OCwgVml0dGFsIE1hbGx5YSBSZCwgQmFuZ2Fsb3JlJywgJzkxMjM0NTY3ODknLCAncm9iZXJ0QGNjZC5jb20nLCAnQWN0aXZlJywgdG9fY2hhcihDVVJSRU5UX0RBVEUgLSBJTlRFUlZBTCAnMTUgZGF5cycsICdZWVlZLU1NLUREJykpLFxuKCdjNCcsICdUaGlyZCBXYXZlIENvZmZlZScsICdTdXNobWl0YSBTZW4nLCAnMjlRUlNUVTM0NTZWMVoxJywgJzg4LCBLb3JhbWFuZ2FsYSA0dGggQmxvY2ssIEJhbmdhbG9yZScsICc5OTAwMTEyMjMzJywgJ3N1c2htaXRhQHRoaXJkd2F2ZS5jb20nLCAnQWN0aXZlJywgdG9fY2hhcihDVVJSRU5UX0RBVEUgLSBJTlRFUlZBTCAnMSBtb250aCcsICdZWVlZLU1NLUREJykpLFxuKCdjNScsICdTd2VldCBOb3RoaW5ncyBHaWZ0IFNob3AnLCAnUHJpeWEgS2Fwb29yJywgJzI5V1hZWjEyMzRBMVo3JywgJ01hbGwgb2YgQXNpYSwgSGViYmFsLCBCYW5nYWxvcmUnLCAnOTg4ODc3NzY2NicsICdwcml5YUBzd2VldG5vdGhpbmdzLmNvbScsICdBY3RpdmUnLCB0b19jaGFyKENVUlJFTlRfREFURSAtIElOVEVSVkFMICcyIG1vbnRocycsICdZWVlZLU1NLUREJykpLFxuKCdjNicsICdUaGUgT2Jlcm9pIEdvdXJtZXQnLCAnQ2hlZiBWaWthcycsICcyOUJDREVGNjc4OUcxWjInLCAnTUcgUm9hZCwgQmFuZ2Fsb3JlJywgJzk3Nzc2NjY1NTUnLCAndmlrYXNAb2Jlcm9pLmNvbScsICdJbmFjdGl2ZScsIHRvX2NoYXIoQ1VSUkVOVF9EQVRFIC0gSU5URVJWQUwgJzQgbW9udGhzJywgJ1lZWVktTU0tREQnKSk7XG5cbi0tIE9yZGVycyAoR2VuZXJhdGVkIGR5bmFtaWNhbGx5IHJlbGF0aXZlIHRvIGN1cnJlbnQgZGF0ZSlcbi0tIFdlIHVzZSBhIENURSBvciBkaXJlY3QgaW5zZXJ0cy4gVXNpbmcgZGlyZWN0IGluc2VydHMgd2l0aCBkYXRlIG1hdGggZm9yIGNvbXBhdGliaWxpdHkuXG5cbi0tIENVUlJFTlQgTU9OVEggKE1vbnRoIDApIC0gQWN0aXZlIFNhbGVzXG5JTlNFUlQgSU5UTyBwdWJsaWMub3JkZXJzIChpZCwgXCJjdXN0b21lcklkXCIsIFwiY3VzdG9tZXJOYW1lXCIsIFwiY3VzdG9tZXJBZGRyZXNzXCIsIFwic2FsZXNFeGVjSWRcIiwgXCJkZWxpdmVyeVBlcnNvbklkXCIsIFwidG90YWxBbW91bnRcIiwgc3RhdHVzLCBkYXRlLCBcImRlbGl2ZXJ5RGF0ZVwiLCBub3RlcywgXCJwYXltZW50U3RhdHVzXCIsIGl0ZW1zKSBWQUxVRVNcbignMTAwMScsICdjMScsICdUaGUgQ2hvY29sYXRlIFJvb20nLCAnMTIsIEluZGlyYW5hZ2FyLCBCYW5nYWxvcmUnLCAndTInLCAndTQnLCA1MDAwLjAwLCAnRGVsaXZlcmVkJywgdG9fY2hhcihDVVJSRU5UX0RBVEUgLSBJTlRFUlZBTCAnMiBkYXlzJywgJ1lZWVktTU0tREQnKSwgdG9fY2hhcihDVVJSRU5UX0RBVEUgLSBJTlRFUlZBTCAnMSBkYXknLCAnWVlZWS1NTS1ERCcpLCAnVXJnZW50IGRlbGl2ZXJ5JywgJ1BhaWQnLCAnW3tcInByb2R1Y3RJZFwiOiBcInAxXCIsIFwicXVhbnRpdHlcIjogMTAsIFwicHJpY2VBdFRpbWVcIjogMjUwLCBcInByb2R1Y3ROYW1lXCI6IFwiQmVsZ2lhbiBEYXJrIENob2NvbGF0ZSBCYXIgKDcwJSlcIn0sIHtcInByb2R1Y3RJZFwiOiBcInA0XCIsIFwicXVhbnRpdHlcIjogMiwgXCJwcmljZUF0VGltZVwiOiAxMjAwLCBcInByb2R1Y3ROYW1lXCI6IFwiTHV4dXJ5IFRydWZmbGUgQXNzb3J0bWVudCAoMTJwYylcIn1dJyksXG4oJzEwMDInLCAnYzInLCAnR2xlbicncyBCYWtlaG91c2UnLCAnNDUsIExhdmVsbGUgUm9hZCwgQmFuZ2Fsb3JlJywgJ3UyJywgJ3U1JywgOTAwMC4wMCwgJ091dCBmb3IgRGVsaXZlcnknLCB0b19jaGFyKENVUlJFTlRfREFURSwgJ1lZWVktTU0tREQnKSwgdG9fY2hhcihDVVJSRU5UX0RBVEUgKyBJTlRFUlZBTCAnMSBkYXknLCAnWVlZWS1NTS1ERCcpLCAnQ2FsbCBvbiBhcnJpdmFsJywgJ1BhaWQnLCAnW3tcInByb2R1Y3RJZFwiOiBcInAyXCIsIFwicXVhbnRpdHlcIjogMjAsIFwicHJpY2VBdFRpbWVcIjogNDUwLCBcInByb2R1Y3ROYW1lXCI6IFwiTWlsayBDaG9jb2xhdGUgUm9hc3RlZCBIYXplbG51dHNcIn1dJyksXG4oJzEwMDMnLCAnYzMnLCAnQ2FmZSBDb2ZmZWUgRGF5IC0gSFEnLCAnNzgsIFZpdHRhbCBNYWxseWEgUmQsIEJhbmdhbG9yZScsICd1MycsIE5VTEwsIDI1MDAuMDAsICdQcm9jZXNzaW5nJywgdG9fY2hhcihDVVJSRU5UX0RBVEUsICdZWVlZLU1NLUREJyksIHRvX2NoYXIoQ1VSUkVOVF9EQVRFICsgSU5URVJWQUwgJzIgZGF5cycsICdZWVlZLU1NLUREJyksIE5VTEwsICdQZW5kaW5nJywgJ1t7XCJwcm9kdWN0SWRcIjogXCJwN1wiLCBcInF1YW50aXR5XCI6IDEsIFwicHJpY2VBdFRpbWVcIjogMjUwMCwgXCJwcm9kdWN0TmFtZVwiOiBcIkNvcnBvcmF0ZSBHaWZ0aW5nIEhhbXBlclwifV0nKSxcbignMTAwNCcsICdjNCcsICdUaGlyZCBXYXZlIENvZmZlZScsICc4OCwgS29yYW1hbmdhbGEgNHRoIEJsb2NrLCBCYW5nYWxvcmUnLCAndTMnLCBOVUxMLCAxMjUwMC4wMCwgJ1BlbmRpbmcnLCB0b19jaGFyKENVUlJFTlRfREFURSwgJ1lZWVktTU0tREQnKSwgdG9fY2hhcihDVVJSRU5UX0RBVEUgKyBJTlRFUlZBTCAnMyBkYXlzJywgJ1lZWVktTU0tREQnKSwgJ0xlYXZlIGF0IGZyb250IGRlc2snLCAnUGVuZGluZycsICdbe1wicHJvZHVjdElkXCI6IFwicDFcIiwgXCJxdWFudGl0eVwiOiA1MCwgXCJwcmljZUF0VGltZVwiOiAyNTAsIFwicHJvZHVjdE5hbWVcIjogXCJCZWxnaWFuIERhcmsgQ2hvY29sYXRlIEJhciAoNzAlKVwifV0nKTtcblxuLS0gTEFTVCBNT05USCAoTW9udGggLTEpIC0gR29vZCBmb3IgTW9udGhseSBTYWxlcyBDaGFydFxuSU5TRVJUIElOVE8gcHVibGljLm9yZGVycyAoaWQsIFwiY3VzdG9tZXJJZFwiLCBcImN1c3RvbWVyTmFtZVwiLCBcImN1c3RvbWVyQWRkcmVzc1wiLCBcInNhbGVzRXhlY0lkXCIsIFwiZGVsaXZlcnlQZXJzb25JZFwiLCBcInRvdGFsQW1vdW50XCIsIHN0YXR1cywgZGF0ZSwgXCJkZWxpdmVyeURhdGVcIiwgbm90ZXMsIFwicGF5bWVudFN0YXR1c1wiLCBpdGVtcykgVkFMVUVTXG4oJzkwMScsICdjMScsICdUaGUgQ2hvY29sYXRlIFJvb20nLCAnMTIsIEluZGlyYW5hZ2FyLCBCYW5nYWxvcmUnLCAndTInLCAndTQnLCAzNTAwLjAwLCAnRGVsaXZlcmVkJywgdG9fY2hhcihDVVJSRU5UX0RBVEUgLSBJTlRFUlZBTCAnMSBtb250aCcgLSBJTlRFUlZBTCAnNSBkYXlzJywgJ1lZWVktTU0tREQnKSwgdG9fY2hhcihDVVJSRU5UX0RBVEUgLSBJTlRFUlZBTCAnMSBtb250aCcgLSBJTlRFUlZBTCAnMyBkYXlzJywgJ1lZWVktTU0tREQnKSwgJycsICdQYWlkJywgJ1t7XCJwcm9kdWN0SWRcIjogXCJwNlwiLCBcInF1YW50aXR5XCI6IDEwLCBcInByaWNlQXRUaW1lXCI6IDM1MCwgXCJwcm9kdWN0TmFtZVwiOiBcIkFsbW9uZCBSb2NrcyBQb3VjaFwifV0nKSxcbignOTAyJywgJ2MyJywgJ0dsZW4nJ3MgQmFrZWhvdXNlJywgJzQ1LCBMYXZlbGxlIFJvYWQsIEJhbmdhbG9yZScsICd1MycsICd1NScsIDE4MDAwLjAwLCAnRGVsaXZlcmVkJywgdG9fY2hhcihDVVJSRU5UX0RBVEUgLSBJTlRFUlZBTCAnMSBtb250aCcgLSBJTlRFUlZBTCAnMTAgZGF5cycsICdZWVlZLU1NLUREJyksIHRvX2NoYXIoQ1VSUkVOVF9EQVRFIC0gSU5URVJWQUwgJzEgbW9udGgnIC0gSU5URVJWQUwgJzggZGF5cycsICdZWVlZLU1NLUREJyksICdCdWxrIG9yZGVyIGZvciBmZXN0aXZhbCcsICdQYWlkJywgJ1t7XCJwcm9kdWN0SWRcIjogXCJwNFwiLCBcInF1YW50aXR5XCI6IDE1LCBcInByaWNlQXRUaW1lXCI6IDEyMDAsIFwicHJvZHVjdE5hbWVcIjogXCJMdXh1cnkgVHJ1ZmZsZSBBc3NvcnRtZW50XCJ9XScpLFxuKCc5MDMnLCAnYzUnLCAnU3dlZXQgTm90aGluZ3MgR2lmdCBTaG9wJywgJ01hbGwgb2YgQXNpYSwgSGViYmFsLCBCYW5nYWxvcmUnLCAndTInLCAndTQnLCA0MjUwLjAwLCAnRGVsaXZlcmVkJywgdG9fY2hhcihDVVJSRU5UX0RBVEUgLSBJTlRFUlZBTCAnMSBtb250aCcgLSBJTlRFUlZBTCAnMTUgZGF5cycsICdZWVlZLU1NLUREJyksIHRvX2NoYXIoQ1VSUkVOVF9EQVRFIC0gSU5URVJWQUwgJzEgbW9udGgnIC0gSU5URVJWQUwgJzE0IGRheXMnLCAnWVlZWS1NTS1ERCcpLCAnJywgJ1BhaWQnLCAnW3tcInByb2R1Y3RJZFwiOiBcInA1XCIsIFwicXVhbnRpdHlcIjogNSwgXCJwcmljZUF0VGltZVwiOiA4NTAsIFwicHJvZHVjdE5hbWVcIjogXCJTYWx0ZWQgQ2FyYW1lbCBCb25ib25zXCJ9XScpLFxuKCc5MDQnLCAnYzMnLCAnQ2FmZSBDb2ZmZWUgRGF5IC0gSFEnLCAnNzgsIFZpdHRhbCBNYWxseWEgUmQsIEJhbmdhbG9yZScsICd1MycsICd1NScsIDYwMDAuMDAsICdDYW5jZWxsZWQnLCB0b19jaGFyKENVUlJFTlRfREFURSAtIElOVEVSVkFMICcxIG1vbnRoJyAtIElOVEVSVkFMICcyMCBkYXlzJywgJ1lZWVktTU0tREQnKSwgTlVMTCwgJ0N1c3RvbWVyIGNhbmNlbGxlZCcsICdQZW5kaW5nJywgJ1t7XCJwcm9kdWN0SWRcIjogXCJwOFwiLCBcInF1YW50aXR5XCI6IDIwLCBcInByaWNlQXRUaW1lXCI6IDMwMCwgXCJwcm9kdWN0TmFtZVwiOiBcIkRhcmsgQ2hvY29sYXRlIFNwcmVhZFwifV0nKTtcblxuLS0gMiBNT05USFMgQUdPIChNb250aCAtMikgLSBNb3JlIERhdGFcbklOU0VSVCBJTlRPIHB1YmxpYy5vcmRlcnMgKGlkLCBcImN1c3RvbWVySWRcIiwgXCJjdXN0b21lck5hbWVcIiwgXCJjdXN0b21lckFkZHJlc3NcIiwgXCJzYWxlc0V4ZWNJZFwiLCBcImRlbGl2ZXJ5UGVyc29uSWRcIiwgXCJ0b3RhbEFtb3VudFwiLCBzdGF0dXMsIGRhdGUsIFwiZGVsaXZlcnlEYXRlXCIsIG5vdGVzLCBcInBheW1lbnRTdGF0dXNcIiwgaXRlbXMpIFZBTFVFU1xuKCc4MDEnLCAnYzEnLCAnVGhlIENob2NvbGF0ZSBSb29tJywgJzEyLCBJbmRpcmFuYWdhciwgQmFuZ2Fsb3JlJywgJ3UyJywgJ3U0JywgNzUwMC4wMCwgJ0RlbGl2ZXJlZCcsIHRvX2NoYXIoQ1VSUkVOVF9EQVRFIC0gSU5URVJWQUwgJzIgbW9udGhzJyAtIElOVEVSVkFMICcyIGRheXMnLCAnWVlZWS1NTS1ERCcpLCBOVUxMLCAnJywgJ1BhaWQnLCAnW3tcInByb2R1Y3RJZFwiOiBcInAxXCIsIFwicXVhbnRpdHlcIjogMzAsIFwicHJpY2VBdFRpbWVcIjogMjUwLCBcInByb2R1Y3ROYW1lXCI6IFwiQmVsZ2lhbiBEYXJrIENob2NvbGF0ZSBCYXJcIn1dJyksXG4oJzgwMicsICdjNCcsICdUaGlyZCBXYXZlIENvZmZlZScsICc4OCwgS29yYW1hbmdhbGEgNHRoIEJsb2NrLCBCYW5nYWxvcmUnLCAndTMnLCAndTUnLCA1NjAwLjAwLCAnRGVsaXZlcmVkJywgdG9fY2hhcihDVVJSRU5UX0RBVEUgLSBJTlRFUlZBTCAnMiBtb250aHMnIC0gSU5URVJWQUwgJzEyIGRheXMnLCAnWVlZWS1NTS1ERCcpLCBOVUxMLCAnJywgJ1BhaWQnLCAnW3tcInByb2R1Y3RJZFwiOiBcInAzXCIsIFwicXVhbnRpdHlcIjogMjAsIFwicHJpY2VBdFRpbWVcIjogMjgwLCBcInByb2R1Y3ROYW1lXCI6IFwiV2hpdGUgQ2hvY29sYXRlIFJhc3BiZXJyeVwifV0nKSxcbignODAzJywgJ2MyJywgJ0dsZW4nJ3MgQmFrZWhvdXNlJywgJzQ1LCBMYXZlbGxlIFJvYWQsIEJhbmdhbG9yZScsICd1MicsICd1NCcsIDExMDAwLjAwLCAnRGVsaXZlcmVkJywgdG9fY2hhcihDVVJSRU5UX0RBVEUgLSBJTlRFUlZBTCAnMiBtb250aHMnIC0gSU5URVJWQUwgJzI1IGRheXMnLCAnWVlZWS1NTS1ERCcpLCBOVUxMLCAnJywgJ1BhaWQnLCAnW3tcInByb2R1Y3RJZFwiOiBcInA0XCIsIFwicXVhbnRpdHlcIjogNSwgXCJwcmljZUF0VGltZVwiOiAxMjAwLCBcInByb2R1Y3ROYW1lXCI6IFwiVHJ1ZmZsZSBBc3NvcnRtZW50XCJ9LCB7XCJwcm9kdWN0SWRcIjogXCJwMlwiLCBcInF1YW50aXR5XCI6IDEwLCBcInByaWNlQXRUaW1lXCI6IDQ1MCwgXCJwcm9kdWN0TmFtZVwiOiBcIkhhemVsbnV0c1wifV0nKTtcbmA7XG5cbmZ1bmN0aW9uIEFwcCgpIHtcbiAgY29uc3QgW2N1cnJlbnRVc2VyLCBzZXRDdXJyZW50VXNlcl0gPSB1c2VTdGF0ZTxVc2VyPihNT0NLX1VTRVJTWzBdKTtcbiAgY29uc3QgW2lzQXV0aGVudGljYXRlZCwgc2V0SXNBdXRoZW50aWNhdGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtpc0RiQ29ubmVjdGVkLCBzZXRJc0RiQ29ubmVjdGVkXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbc2hvd0RiU2V0dXAsIHNldFNob3dEYlNldHVwXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dDb25uZWN0TW9kYWwsIHNldFNob3dDb25uZWN0TW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIFVuaWZpZWQgU2V0dGluZ3MgYW5kIFdoYXRzQXBwIFN0YXRlc1xuICBjb25zdCBbc2hvd1NldHRpbmdzTW9kYWwsIHNldFNob3dTZXR0aW5nc01vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2FjdGl2ZVNldHRpbmdzVGFiLCBzZXRBY3RpdmVTZXR0aW5nc1RhYl0gPSB1c2VTdGF0ZTwnZGF0YWJhc2UnIHwgJ3doYXRzYXBwJyB8ICdleHBvcnQnPignZGF0YWJhc2UnKTtcbiAgY29uc3QgW3doYXRzYXBwQXBpS2V5LCBzZXRXaGF0c2FwcEFwaUtleV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFt3aGF0c2FwcFBob25lSWQsIHNldFdoYXRzYXBwUGhvbmVJZF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFt0ZXN0UGhvbmVOdW1iZXIsIHNldFRlc3RQaG9uZU51bWJlcl0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtpc1NlbmRpbmdUZXN0LCBzZXRJc1NlbmRpbmdUZXN0XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Rlc3RSZXN1bHQsIHNldFRlc3RSZXN1bHRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtleHBvcnRTdGF0dXMsIHNldEV4cG9ydFN0YXR1c10gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzRXhwb3J0aW5nLCBzZXRJc0V4cG9ydGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaGFuZGxlRXhwb3J0WmlwID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldElzRXhwb3J0aW5nKHRydWUpO1xuICAgIHNldEV4cG9ydFN0YXR1cygnSW5pdGlhbGl6aW5nIHByb2plY3QgYnVuZGxlLi4uJyk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRvd25sb2FkUHJvamVjdFppcCgoc3RhdHVzKSA9PiB7XG4gICAgICAgIHNldEV4cG9ydFN0YXR1cyhzdGF0dXMpO1xuICAgICAgfSk7XG4gICAgICBzZXRFeHBvcnRTdGF0dXMoJ+KchSBQcm9qZWN0IFpJUCBkb3dubG9hZGVkIHN1Y2Nlc3NmdWxseSEnKTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgc2V0RXhwb3J0U3RhdHVzKGDinYwgRXhwb3J0IGZhaWxlZDogJHtlcnIubWVzc2FnZSB8fCBlcnJ9YCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzRXhwb3J0aW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQ29ubmVjdCBNb2RhbCBTdGF0ZVxuICBjb25zdCBbY3VzdG9tVXJsLCBzZXRDdXN0b21VcmxdID0gdXNlU3RhdGUoJ2h0dHBzOi8vY2tycnhzc3pwZG9paXpqamt0ankuc3VwYWJhc2UuY28nKTtcbiAgY29uc3QgW2N1c3RvbUtleSwgc2V0Q3VzdG9tS2V5XSA9IHVzZVN0YXRlKCcnKTtcblxuICBjb25zdCBbY3VzdG9tZXJzLCBzZXRDdXN0b21lcnNdID0gdXNlU3RhdGU8QnVzaW5lc3NPd25lcltdPihbXSk7XG4gIGNvbnN0IFtvcmRlcnMsIHNldE9yZGVyc10gPSB1c2VTdGF0ZTxPcmRlcltdPihbXSk7XG4gIGNvbnN0IFtwcm9kdWN0cywgc2V0UHJvZHVjdHNdID0gdXNlU3RhdGU8UHJvZHVjdFtdPihbXSk7XG4gIGNvbnN0IFt1c2Vycywgc2V0VXNlcnNdID0gdXNlU3RhdGU8VXNlcltdPihbXSk7XG4gIFxuICBjb25zdCBbY29waWVkLCBzZXRDb3BpZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIC0tIFN1cGFiYXNlIERhdGEgRmV0Y2hpbmcgLS1cblxuICBjb25zdCBmZXRjaEFsbERhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0TG9hZGluZyh0cnVlKTtcblxuICAgIGNvbnN0IGxvYWRNb2NrcyA9ICgpID0+IHtcbiAgICAgIHNldEN1c3RvbWVycyhNT0NLX0NVU1RPTUVSUyk7XG4gICAgICBzZXRQcm9kdWN0cyhNT0NLX1BST0RVQ1RTKTtcbiAgICAgIHNldE9yZGVycyhNT0NLX09SREVSUyk7XG4gICAgICBzZXRVc2VycyhNT0NLX1VTRVJTKTtcbiAgICAgIHNldElzRGJDb25uZWN0ZWQoZmFsc2UpO1xuICAgIH07XG5cbiAgICBpZiAoIWlzU3VwYWJhc2VDb25maWd1cmVkKCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlN1cGFiYXNlIG5vdCBjb25maWd1cmVkLiBMb2FkaW5nIGRlbW8gZGF0YS5cIik7XG4gICAgICBsb2FkTW9ja3MoKTtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAvLyBGZXRjaCBDdXN0b21lcnNcbiAgICAgIGNvbnN0IHsgZGF0YTogY3VzdG9tZXJzRGF0YSwgZXJyb3I6IGN1c3RvbWVyc0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKCdjdXN0b21lcnMnKS5zZWxlY3QoJyonKTtcbiAgICAgIGlmIChjdXN0b21lcnNFcnJvcikgdGhyb3cgY3VzdG9tZXJzRXJyb3I7XG4gICAgICBcbiAgICAgIC8vIEZldGNoIFByb2R1Y3RzXG4gICAgICBjb25zdCB7IGRhdGE6IHByb2R1Y3RzRGF0YSwgZXJyb3I6IHByb2R1Y3RzRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oJ3Byb2R1Y3RzJykuc2VsZWN0KCcqJyk7XG4gICAgICBpZiAocHJvZHVjdHNFcnJvcikgdGhyb3cgcHJvZHVjdHNFcnJvcjtcbiAgICAgIFxuICAgICAgLy8gRmV0Y2ggT3JkZXJzXG4gICAgICBjb25zdCB7IGRhdGE6IG9yZGVyc0RhdGEsIGVycm9yOiBvcmRlcnNFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbSgnb3JkZXJzJykuc2VsZWN0KCcqJyk7XG4gICAgICBpZiAob3JkZXJzRXJyb3IpIHRocm93IG9yZGVyc0Vycm9yO1xuICAgICAgXG4gICAgICAvLyBGZXRjaCBVc2Vyc1xuICAgICAgY29uc3QgeyBkYXRhOiB1c2Vyc0RhdGEsIGVycm9yOiB1c2Vyc0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKCd1c2VycycpLnNlbGVjdCgnKicpO1xuICAgICAgaWYgKHVzZXJzRXJyb3IpIHRocm93IHVzZXJzRXJyb3I7XG4gICAgICBcbiAgICAgIC8vIFVwZGF0ZSBTdGF0ZVxuICAgICAgaWYgKGN1c3RvbWVyc0RhdGEpIHNldEN1c3RvbWVycyhjdXN0b21lcnNEYXRhKTtcbiAgICAgIGlmIChwcm9kdWN0c0RhdGEpIHNldFByb2R1Y3RzKHByb2R1Y3RzRGF0YSk7XG4gICAgICBpZiAob3JkZXJzRGF0YSkgc2V0T3JkZXJzKG9yZGVyc0RhdGEpO1xuICAgICAgaWYgKHVzZXJzRGF0YSkgc2V0VXNlcnModXNlcnNEYXRhKTtcbiAgICAgIFxuICAgICAgLy8gRGVidWcgTG9nXG4gICAgICBjb25zb2xlLmxvZyhcIlN1cGFiYXNlIENvbm5lY3RlZC4gQ3VzdG9tZXJzIGZvdW5kOlwiLCBjdXN0b21lcnNEYXRhPy5sZW5ndGggfHwgMCk7XG4gICAgICBcbiAgICAgIHNldElzRGJDb25uZWN0ZWQodHJ1ZSk7XG4gICAgICBzZXRTaG93RGJTZXR1cChmYWxzZSk7XG5cbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICBjb25zdCBpc01pc3NpbmdUYWJsZSA9IFxuICAgICAgICBlcnJvci5jb2RlID09PSAnNDJQMDEnIHx8IFxuICAgICAgICAoZXJyb3IubWVzc2FnZSAmJiBlcnJvci5tZXNzYWdlLmluY2x1ZGVzKCdDb3VsZCBub3QgZmluZCB0aGUgdGFibGUnKSk7XG5cbiAgICAgIGlmIChpc01pc3NpbmdUYWJsZSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJTdXBhYmFzZSBDb25uZWN0ZWQsIGJ1dCB0YWJsZXMgbWlzc2luZy4gUHJvbXB0aW5nIHNldHVwLlwiKTtcbiAgICAgICAgc2V0U2hvd0RiU2V0dXAodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJFcnJvciBmZXRjaGluZyBkYXRhIGZyb20gU3VwYWJhc2UgKGZhbGxpbmcgYmFjayB0byBkZW1vIG1vZGUgZ3JhY2VmdWxseSk6XCIsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBsb2FkTW9ja3MoKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gQ2hlY2sgaWYgd2UgbmVlZCB0byBzaG93IHRoZSBjb25uZWN0IG1vZGFsIGluaXRpYWxseVxuICAgIGNvbnN0IGhhc1N0b3JlZEtleSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzYl9rZXknKTtcbiAgICBpZiAoIWhhc1N0b3JlZEtleSAmJiAhaXNTdXBhYmFzZUNvbmZpZ3VyZWQoKSkge1xuICAgICAgIC8vIE9wdGlvbmFsOiBBdXRvIG9wZW4gbW9kYWwgaWYgeW91IHdhbnQgdG8gZm9yY2UgY29ubmVjdGlvblxuICAgICAgIC8vIHNldFNob3dDb25uZWN0TW9kYWwodHJ1ZSk7IFxuICAgIH1cbiAgICBmZXRjaEFsbERhdGEoKTtcbiAgfSwgW10pO1xuXG4gIC8vIExvYWQgV2hhdHNBcHAgY29uZmlnIHdoZW4gU2V0dGluZ3Mgb3BlbnNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoc2hvd1NldHRpbmdzTW9kYWwpIHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IGdldFdoYXRzQXBwQ29uZmlnKCk7XG4gICAgICBzZXRXaGF0c2FwcEFwaUtleShjb25maWcuYXBpS2V5KTtcbiAgICAgIHNldFdoYXRzYXBwUGhvbmVJZChjb25maWcucGhvbmVOdW1iZXJJZCk7XG4gICAgICBzZXRUZXN0UmVzdWx0KG51bGwpO1xuICAgIH1cbiAgfSwgW3Nob3dTZXR0aW5nc01vZGFsXSk7XG5cbiAgY29uc3QgaGFuZGxlU2F2ZVdoYXRzQXBwQ29uZmlnID0gKCkgPT4ge1xuICAgIHNhdmVXaGF0c0FwcENvbmZpZyh3aGF0c2FwcEFwaUtleSwgd2hhdHNhcHBQaG9uZUlkKTtcbiAgICBhbGVydChcIldoYXRzQXBwIGNvbmZpZ3VyYXRpb24gc2F2ZWQgc3VjY2Vzc2Z1bGx5IVwiKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZW5kVGVzdFdoYXRzQXBwID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghdGVzdFBob25lTnVtYmVyKSB7XG4gICAgICBzZXRUZXN0UmVzdWx0KFwi4pqg77iPIFBsZWFzZSBlbnRlciBhIHZhbGlkIHBob25lIG51bWJlci5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldElzU2VuZGluZ1Rlc3QodHJ1ZSk7XG4gICAgc2V0VGVzdFJlc3VsdChudWxsKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgc2VuZFdoYXRzQXBwU2Vzc2lvbk1lc3NhZ2Uoe1xuICAgICAgICBwaG9uZU51bWJlcjogdGVzdFBob25lTnVtYmVyLFxuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIHRleHQ6ICdIZWxsbyEgVGhpcyBpcyBhIHRlc3QgbWVzc2FnZSBmcm9tIFN2YXNoaWNhbGlzIEVSUCBTeXN0ZW0uIFlvdXIgV2hhdHNBcHAgSW50ZWdyYXRpb24gaXMgY29uZmlndXJlZCBzdWNjZXNzZnVsbHkhIPCfjasnXG4gICAgICB9KTtcbiAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICBzZXRUZXN0UmVzdWx0KFwi4pyFIFN1Y2Nlc3MhIFRlc3Qgc2Vzc2lvbiBtZXNzYWdlIHNlbnQgdmlhIEZhc3QyU01TLlwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRlc3RSZXN1bHQoYOKdjCBFcnJvcjogJHtyZXMubWVzc2FnZX1gKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICBzZXRUZXN0UmVzdWx0KGDinYwgTmV0d29yayBFcnJvcjogJHtlcnJvci5tZXNzYWdlIHx8IGVycm9yfWApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc1NlbmRpbmdUZXN0KGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ29weVNxbCA9ICgpID0+IHtcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChTUUxfU0VUVVBfU0NSSVBUKTtcbiAgICBzZXRDb3BpZWQodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWQoZmFsc2UpLCAyMDAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTYXZlQ29ubmVjdGlvbiA9ICgpID0+IHtcbiAgICBpZiAoY3VzdG9tVXJsICYmIGN1c3RvbUtleSkge1xuICAgICAgc2F2ZVN1cGFiYXNlQ3JlZGVudGlhbHMoY3VzdG9tVXJsLCBjdXN0b21LZXkpO1xuICAgIH1cbiAgfTtcblxuICAvLyAtLSBMb2dpYyAtLVxuXG4gIGNvbnN0IHN3aXRjaFJvbGUgPSAocm9sZTogUm9sZSkgPT4ge1xuICAgIGNvbnN0IHVzZXIgPSB1c2Vycy5maW5kKHUgPT4gdS5yb2xlID09PSByb2xlKSB8fCBNT0NLX1VTRVJTLmZpbmQodSA9PiB1LnJvbGUgPT09IHJvbGUpO1xuICAgIGlmICh1c2VyKSBzZXRDdXJyZW50VXNlcih1c2VyKTtcbiAgfTtcblxuICBjb25zdCBsb2dpbiA9IGFzeW5jICh1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgY29uc3QgdXNlciA9IHVzZXJzLmZpbmQodSA9PiB1LnVzZXJuYW1lID09PSB1c2VybmFtZSAmJiB1LnBhc3N3b3JkID09PSBwYXNzd29yZCk7XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIHNldEN1cnJlbnRVc2VyKHVzZXIpO1xuICAgICAgc2V0SXNBdXRoZW50aWNhdGVkKHRydWUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBsb2dvdXQgPSAoKSA9PiB7XG4gICAgc2V0SXNBdXRoZW50aWNhdGVkKGZhbHNlKTtcbiAgfTtcblxuICAvLyBDdXN0b21lciBDUlVEXG4gIGNvbnN0IGFkZEN1c3RvbWVyID0gYXN5bmMgKGN1c3RvbWVyOiBCdXNpbmVzc093bmVyKSA9PiB7XG4gICAgc2V0Q3VzdG9tZXJzKHByZXYgPT4gW2N1c3RvbWVyLCAuLi5wcmV2XSk7XG4gICAgaWYgKGlzRGJDb25uZWN0ZWQpIHtcbiAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oJ2N1c3RvbWVycycpLmluc2VydChjdXN0b21lcik7XG4gICAgICBpZiAoZXJyb3IpIHsgXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBhZGRpbmcgY3VzdG9tZXI6XCIsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpOyBcbiAgICAgICAgXG4gICAgICAgIC8vIERldGVjdCBzY2hlbWEgZXJyb3JzIHNwZWNpZmljYWxseVxuICAgICAgICBjb25zdCBpc1NjaGVtYUVycm9yID0gZXJyb3IubWVzc2FnZSAmJiAoXG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJnc3RcIikgfHwgXG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlLmluY2x1ZGVzKFwiY29sdW1uXCIpIHx8XG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlLmluY2x1ZGVzKFwic2NoZW1hIGNhY2hlXCIpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGlzU2NoZW1hRXJyb3IpIHtcbiAgICAgICAgICAgIHNldFNob3dEYlNldHVwKHRydWUpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJEYXRhYmFzZSBTY2hlbWEgRXJyb3I6IE1pc3NpbmcgJ2dzdCcgQ29sdW1uXFxuXFxuWW91ciBkYXRhYmFzZSB0YWJsZSBpcyBvdXRkYXRlZC4gSSBoYXZlIG9wZW5lZCB0aGUgJ0RhdGFiYXNlIFNldHVwJyB3aW5kb3cuXFxuXFxuUExFQVNFIENPUFkgdGhlIFNRTCBzY3JpcHQgYW5kIFJVTiBpdCBpbiBTdXBhYmFzZSB0byBmaXggdGhpcy5cIik7XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoXCJGYWlsZWQgdG8gc2F2ZSBjdXN0b21lcjogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZldGNoQWxsRGF0YSgpOyBcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlQ3VzdG9tZXIgPSBhc3luYyAoY3VzdG9tZXI6IEJ1c2luZXNzT3duZXIpID0+IHtcbiAgICBzZXRDdXN0b21lcnMocHJldiA9PiBwcmV2Lm1hcChjID0+IGMuaWQgPT09IGN1c3RvbWVyLmlkID8gY3VzdG9tZXIgOiBjKSk7XG4gICAgaWYgKGlzRGJDb25uZWN0ZWQpIHtcbiAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oJ2N1c3RvbWVycycpLnVwZGF0ZShjdXN0b21lcikuZXEoJ2lkJywgY3VzdG9tZXIuaWQpO1xuICAgICAgaWYgKGVycm9yKSB7IFxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgY3VzdG9tZXI6XCIsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpOyBcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGlzU2NoZW1hRXJyb3IgPSBlcnJvci5tZXNzYWdlICYmIChcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcImdzdFwiKSB8fCBcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJjb2x1bW5cIikgfHxcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJzY2hlbWEgY2FjaGVcIilcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoaXNTY2hlbWFFcnJvcikge1xuICAgICAgICAgICAgIHNldFNob3dEYlNldHVwKHRydWUpO1xuICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRGF0YWJhc2UgU2NoZW1hIEVycm9yOiBNaXNzaW5nICdnc3QnIENvbHVtblxcblxcbllvdXIgZGF0YWJhc2UgdGFibGUgaXMgb3V0ZGF0ZWQuIEkgaGF2ZSBvcGVuZWQgdGhlICdEYXRhYmFzZSBTZXR1cCcgd2luZG93LlxcblxcblBMRUFTRSBDT1BZIHRoZSBTUUwgc2NyaXB0IGFuZCBSVU4gaXQgaW4gU3VwYWJhc2UgdG8gZml4IHRoaXMuXCIpO1xuICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgYWxlcnQoXCJGYWlsZWQgdG8gdXBkYXRlIGN1c3RvbWVyOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgZmV0Y2hBbGxEYXRhKCk7IFxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBkZWxldGVDdXN0b21lciA9IGFzeW5jIChjdXN0b21lcklkOiBzdHJpbmcpID0+IHtcbiAgICBzZXRDdXN0b21lcnMocHJldiA9PiBwcmV2LmZpbHRlcihjID0+IGMuaWQgIT09IGN1c3RvbWVySWQpKTtcbiAgICBpZiAoaXNEYkNvbm5lY3RlZCkge1xuICAgICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbSgnY3VzdG9tZXJzJykuZGVsZXRlKCkuZXEoJ2lkJywgY3VzdG9tZXJJZCk7XG4gICAgICBpZiAoZXJyb3IpIHsgXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBjdXN0b21lcjpcIiwgZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7IFxuICAgICAgICBhbGVydChcIkZhaWxlZCB0byBkZWxldGUgY3VzdG9tZXI6IFwiICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIGZldGNoQWxsRGF0YSgpOyBcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWRkUHJvZHVjdCA9IGFzeW5jIChwcm9kdWN0OiBQcm9kdWN0KSA9PiB7XG4gICAgc2V0UHJvZHVjdHMocHJldiA9PiBbLi4ucHJldiwgcHJvZHVjdF0pO1xuICAgIGlmIChpc0RiQ29ubmVjdGVkKSB7XG4gICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKCdwcm9kdWN0cycpLmluc2VydChwcm9kdWN0KTtcbiAgICAgIGlmIChlcnJvcikgeyBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWRkaW5nIHByb2R1Y3Q6XCIsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpOyBmZXRjaEFsbERhdGEoKTsgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCB1cGRhdGVQcm9kdWN0ID0gYXN5bmMgKHByb2R1Y3Q6IFByb2R1Y3QpID0+IHtcbiAgICBzZXRQcm9kdWN0cyhwcmV2ID0+IHByZXYubWFwKHAgPT4gcC5pZCA9PT0gcHJvZHVjdC5pZCA/IHByb2R1Y3QgOiBwKSk7XG4gICAgaWYgKGlzRGJDb25uZWN0ZWQpIHtcbiAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oJ3Byb2R1Y3RzJykudXBkYXRlKHByb2R1Y3QpLmVxKCdpZCcsIHByb2R1Y3QuaWQpO1xuICAgICAgaWYgKGVycm9yKSB7IGNvbnNvbGUuZXJyb3IoXCJFcnJvciB1cGRhdGluZyBwcm9kdWN0OlwiLCBlcnJvci5tZXNzYWdlIHx8IGVycm9yKTsgZmV0Y2hBbGxEYXRhKCk7IH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGVsZXRlUHJvZHVjdCA9IGFzeW5jIChwcm9kdWN0SWQ6IHN0cmluZykgPT4ge1xuICAgIHNldFByb2R1Y3RzKHByZXYgPT4gcHJldi5maWx0ZXIocCA9PiBwLmlkICE9PSBwcm9kdWN0SWQpKTtcbiAgICBpZiAoaXNEYkNvbm5lY3RlZCkge1xuICAgICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbSgncHJvZHVjdHMnKS5kZWxldGUoKS5lcSgnaWQnLCBwcm9kdWN0SWQpO1xuICAgICAgaWYgKGVycm9yKSB7IFxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgcHJvZHVjdDpcIiwgZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7IFxuICAgICAgICBhbGVydChgRmFpbGVkIHRvIGRlbGV0ZSBwcm9kdWN0OiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgICAgIGZldGNoQWxsRGF0YSgpOyBcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWRkT3JkZXIgPSBhc3luYyAob3JkZXI6IE9yZGVyKSA9PiB7XG4gICAgc2V0T3JkZXJzKHByZXYgPT4gW29yZGVyLCAuLi5wcmV2XSk7XG4gICAgc2V0Q3VzdG9tZXJzKHByZXYgPT4gcHJldi5tYXAoYyA9PiBcbiAgICAgIGMuaWQgPT09IG9yZGVyLmN1c3RvbWVySWQgPyB7IC4uLmMsIGxhc3RPcmRlckRhdGU6IG9yZGVyLmRhdGUgfSA6IGNcbiAgICApKTtcblxuICAgIGlmIChpc0RiQ29ubmVjdGVkKSB7XG4gICAgICBjb25zdCB7IGVycm9yOiBvcmRlckVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKCdvcmRlcnMnKS5pbnNlcnQob3JkZXIpO1xuICAgICAgaWYgKG9yZGVyRXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGNyZWF0aW5nIG9yZGVyOlwiLCBvcmRlckVycm9yLm1lc3NhZ2UgfHwgb3JkZXJFcnJvcik7XG4gICAgICAgIGZldGNoQWxsRGF0YSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKCdjdXN0b21lcnMnKS51cGRhdGUoeyBsYXN0T3JkZXJEYXRlOiBvcmRlci5kYXRlIH0pLmVxKCdpZCcsIG9yZGVyLmN1c3RvbWVySWQpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhZGRVc2VyID0gYXN5bmMgKHVzZXI6IFVzZXIpID0+IHtcbiAgICBzZXRVc2VycyhwcmV2ID0+IFsuLi5wcmV2LCB1c2VyXSk7XG4gICAgaWYgKGlzRGJDb25uZWN0ZWQpIHtcbiAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oJ3VzZXJzJykuaW5zZXJ0KHVzZXIpO1xuICAgICAgaWYgKGVycm9yKSB7IGNvbnNvbGUuZXJyb3IoXCJFcnJvciBhZGRpbmcgdXNlcjpcIiwgZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7IGZldGNoQWxsRGF0YSgpOyB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZVVzZXIgPSBhc3luYyAodXNlcjogVXNlcikgPT4ge1xuICAgIHNldFVzZXJzKHByZXYgPT4gcHJldi5tYXAodSA9PiB1LmlkID09PSB1c2VyLmlkID8gdXNlciA6IHUpKTtcbiAgICBpZiAoaXNEYkNvbm5lY3RlZCkge1xuICAgICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbSgndXNlcnMnKS51cGRhdGUoe1xuICAgICAgICBuYW1lOiB1c2VyLm5hbWUsIHJvbGU6IHVzZXIucm9sZSwgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUsIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkLCBhdmF0YXI6IHVzZXIuYXZhdGFyXG4gICAgICB9KS5lcSgnaWQnLCB1c2VyLmlkKTtcbiAgICAgIGlmIChlcnJvcikgeyBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgdXNlcjpcIiwgZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7IGZldGNoQWxsRGF0YSgpOyB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRlbGV0ZVVzZXIgPSBhc3luYyAodXNlcklkOiBzdHJpbmcpID0+IHtcbiAgICBzZXRVc2VycyhwcmV2ID0+IHByZXYuZmlsdGVyKHUgPT4gdS5pZCAhPT0gdXNlcklkKSk7XG4gICAgaWYgKGlzRGJDb25uZWN0ZWQpIHtcbiAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oJ3VzZXJzJykuZGVsZXRlKCkuZXEoJ2lkJywgdXNlcklkKTtcbiAgICAgIGlmIChlcnJvcikgeyBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgdXNlcjpcIiwgZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7IGZldGNoQWxsRGF0YSgpOyB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZU9yZGVyU3RhdHVzID0gYXN5bmMgKG9yZGVySWQ6IHN0cmluZywgc3RhdHVzOiBPcmRlclN0YXR1cykgPT4ge1xuICAgIHNldE9yZGVycyhwcmV2ID0+IHByZXYubWFwKG8gPT4gby5pZCA9PT0gb3JkZXJJZCA/IHsgLi4ubywgc3RhdHVzIH0gOiBvKSk7XG4gICAgaWYgKGlzRGJDb25uZWN0ZWQpIHtcbiAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oJ29yZGVycycpLnVwZGF0ZSh7IHN0YXR1cyB9KS5lcSgnaWQnLCBvcmRlcklkKTtcbiAgICAgIGlmIChlcnJvcikgeyBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgb3JkZXIgc3RhdHVzOlwiLCBlcnJvci5tZXNzYWdlIHx8IGVycm9yKTsgZmV0Y2hBbGxEYXRhKCk7IH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYXNzaWduRHJpdmVyID0gYXN5bmMgKG9yZGVySWQ6IHN0cmluZywgZHJpdmVySWQ6IHN0cmluZykgPT4ge1xuICAgIC8vIE9wdGltaXN0aWMgdXBkYXRlXG4gICAgc2V0T3JkZXJzKHByZXYgPT4gcHJldi5tYXAobyA9PiBvLmlkID09PSBvcmRlcklkID8geyAuLi5vLCBkZWxpdmVyeVBlcnNvbklkOiBkcml2ZXJJZCA9PT0gJycgPyB1bmRlZmluZWQgOiBkcml2ZXJJZCB9IDogbykpO1xuICAgIFxuICAgIC8vIERCIFVwZGF0ZVxuICAgIGlmIChpc0RiQ29ubmVjdGVkKSB7XG4gICAgICBjb25zdCB2YWwgPSBkcml2ZXJJZCA9PT0gJycgPyBudWxsIDogZHJpdmVySWQ7XG4gICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKCdvcmRlcnMnKS51cGRhdGUoeyBkZWxpdmVyeVBlcnNvbklkOiB2YWwgfSkuZXEoJ2lkJywgb3JkZXJJZCk7XG4gICAgICBpZiAoZXJyb3IpIHsgXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFzc2lnbmluZyBkcml2ZXI6XCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIGZldGNoQWxsRGF0YSgpOyAvLyBSZXZlcnQgb24gZXJyb3JcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVzZXREYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghaXNEYkNvbm5lY3RlZCkge1xuICAgICAgc2V0Q3VzdG9tZXJzKE1PQ0tfQ1VTVE9NRVJTKTsgc2V0UHJvZHVjdHMoTU9DS19QUk9EVUNUUyk7IHNldE9yZGVycyhNT0NLX09SREVSUyk7IHNldFVzZXJzKE1PQ0tfVVNFUlMpO1xuICAgICAgYWxlcnQoXCJEZW1vIGRhdGEgcmVzZXQgKExvY2FsKS5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjb25maXJtKFwiUkVTRVQgZGF0YWJhc2U/IFRoaXMgREVMRVRFUyBBTEwgZGF0YSBhbmQgcmUtc2VlZHMgZGVmYXVsdHMuXCIpKSB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgc3VwYWJhc2UuZnJvbSgnb3JkZXJzJykuZGVsZXRlKCkubmVxKCdpZCcsICcwJyk7IFxuICAgICAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKCdwcm9kdWN0cycpLmRlbGV0ZSgpLm5lcSgnaWQnLCAnMCcpO1xuICAgICAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKCdjdXN0b21lcnMnKS5kZWxldGUoKS5uZXEoJ2lkJywgJzAnKTtcbiAgICAgICAgYXdhaXQgc3VwYWJhc2UuZnJvbSgndXNlcnMnKS5kZWxldGUoKS5uZXEoJ2lkJywgJzAnKTtcbiAgICAgICAgXG4gICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oJ2N1c3RvbWVycycpLmluc2VydChNT0NLX0NVU1RPTUVSUyk7XG4gICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oJ3Byb2R1Y3RzJykuaW5zZXJ0KE1PQ0tfUFJPRFVDVFMpO1xuICAgICAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKCdvcmRlcnMnKS5pbnNlcnQoTU9DS19PUkRFUlMpO1xuICAgICAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKCd1c2VycycpLmluc2VydChNT0NLX1VTRVJTKTtcbiAgICAgICAgYXdhaXQgZmV0Y2hBbGxEYXRhKCk7XG4gICAgICAgIGFsZXJ0KFwiRGF0YWJhc2UgcmVzZXQgdG8gZGVtbyBkYXRhLlwiKTtcbiAgICAgIH0gY2F0Y2ggKGU6IGFueSkgeyBcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTsgXG4gICAgICAgIGlmIChlLm1lc3NhZ2UgJiYgKGUubWVzc2FnZS5pbmNsdWRlcygnZ3N0JykgfHwgZS5tZXNzYWdlLmluY2x1ZGVzKCdzY2hlbWEgY2FjaGUnKSkpIHtcbiAgICAgICAgICAgICBzZXRTaG93RGJTZXR1cCh0cnVlKTtcbiAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBhbGVydChcIlJlc2V0IEZhaWxlZDogRGF0YWJhc2UgU2NoZW1hIEVycm9yLlxcblRoZSAnZ3N0JyBjb2x1bW4gaXMgbWlzc2luZy4gUGxlYXNlIHJ1biB0aGUgcHJvdmlkZWQgU1FMIHNjcmlwdC5cIik7XG4gICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICBhbGVydChcIlJlc2V0IGZhaWxlZDogXCIgKyAoZS5tZXNzYWdlIHx8IFwiVW5rbm93biBlcnJvclwiKSk7IFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmaW5hbGx5IHsgc2V0TG9hZGluZyhmYWxzZSk7IH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY29udGV4dFZhbHVlOiBBcHBDb250ZXh0VHlwZSA9IHtcbiAgICBjdXJyZW50VXNlciwgc3dpdGNoUm9sZSwgdXNlcnMsIGFkZFVzZXIsIHVwZGF0ZVVzZXIsIGRlbGV0ZVVzZXIsXG4gICAgY3VzdG9tZXJzLCBhZGRDdXN0b21lciwgdXBkYXRlQ3VzdG9tZXIsIGRlbGV0ZUN1c3RvbWVyLFxuICAgIHByb2R1Y3RzLCBhZGRQcm9kdWN0LCB1cGRhdGVQcm9kdWN0LCBkZWxldGVQcm9kdWN0LCBvcmRlcnMsIGFkZE9yZGVyLCB1cGRhdGVPcmRlclN0YXR1cywgYXNzaWduRHJpdmVyLFxuICAgIHJlc2V0RGF0YSwgaXNBdXRoZW50aWNhdGVkLCBsb2dpbiwgbG9nb3V0XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8SGFzaFJvdXRlcj5cbiAgICAgIHsvKiBEQiBTZXR1cCAvIFNjaGVtYSBNb2RhbCAqL31cbiAgICAgIHtzaG93RGJTZXR1cCAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCBiZy1ibGFjayBiZy1vcGFjaXR5LTcwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCB6LTUwIGFuaW1hdGUtZmFkZS1pblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC14bCBzaGFkb3ctMnhsIHctZnVsbCBtYXgtdy0yeGwgb3ZlcmZsb3ctaGlkZGVuIGZsZXggZmxleC1jb2wgbWF4LWgtWzkwdmhdXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiBib3JkZXItYiBib3JkZXItZ3JheS0xMDAgYmctYW1iZXItNTBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTMgdGV4dC1hbWJlci04MDBcIj5cbiAgICAgICAgICAgICAgICAgPERhdGFiYXNlIHNpemU9ezI0fSAvPlxuICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGRcIj5EYXRhYmFzZSBTZXR1cCBSZXF1aXJlZDwvaDI+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTcwMCB0ZXh0LXNtIG10LTJcIj5cbiAgICAgICAgICAgICAgICBZb3VyIGNvbm5lY3Rpb24gaXMgc3VjY2Vzc2Z1bCwgYnV0IHRoZSBkYXRhYmFzZSB0YWJsZXMgb3IgcGVybWlzc2lvbnMgbmVlZCB1cGRhdGluZy5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiBvdmVyZmxvdy15LWF1dG8gZmxleC0xXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCByZWxhdGl2ZSBncm91cFwiPlxuICAgICAgICAgICAgICAgIDxwcmUgY2xhc3NOYW1lPVwiYmctZ3JheS05MDAgdGV4dC1ncmF5LTEwMCBwLTQgcm91bmRlZC1sZyB0ZXh0LXhzIG92ZXJmbG93LXgtYXV0byBib3JkZXIgYm9yZGVyLWdyYXktNzAwIGZvbnQtbW9ubyBsZWFkaW5nLXJlbGF4ZWQgaC02NFwiPlxuICAgICAgICAgICAgICAgICAge1NRTF9TRVRVUF9TQ1JJUFR9XG4gICAgICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNvcHlTcWx9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMiByaWdodC0yIGJnLXdoaXRlLzEwIGhvdmVyOmJnLXdoaXRlLzIwIHRleHQtd2hpdGUgcHgtMyBweS0xLjUgcm91bmRlZCB0ZXh0LXhzIGJhY2tkcm9wLWJsdXItc20gdHJhbnNpdGlvbiBmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTFcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtjb3BpZWQgPyA8Q2hlY2sgc2l6ZT17MTR9IC8+IDogPENvcHkgc2l6ZT17MTR9IC8+fVxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2NvcGllZCA/ICdDb3BpZWQhJyA6ICdDb3B5IFNRTCd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgYm9yZGVyLXQgYm9yZGVyLWdyYXktMTAwIGJnLWdyYXktNTAgZmxleCBqdXN0aWZ5LWVuZCBzcGFjZS14LTNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93RGJTZXR1cChmYWxzZSl9IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LWdyYXktNTAwIGhvdmVyOnRleHQtZ3JheS03MDAgZm9udC1tZWRpdW0gdHJhbnNpdGlvblwiPkNsb3NlPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpfSBjbGFzc05hbWU9XCJiZy1hbWJlci02MDAgaG92ZXI6YmctYW1iZXItNzAwIHRleHQtd2hpdGUgcHgtNiBweS0yIHJvdW5kZWQtbGcgZm9udC1ib2xkIHRyYW5zaXRpb24gc2hhZG93LXNtXCI+UmVsb2FkIEFwcDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIFVuaWZpZWQgU2V0dGluZ3MgJiBJbnRlZ3JhdGlvbnMgTW9kYWwgKi99XG4gICAgICB7c2hvd1NldHRpbmdzTW9kYWwgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgYmctYmxhY2sgYmctb3BhY2l0eS03MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTQgei01MCBhbmltYXRlLWZhZGUtaW4gYmFja2Ryb3AtYmx1ci1zbVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC14bCBzaGFkb3ctMnhsIHctZnVsbCBtYXgtdy0yeGwgb3ZlcmZsb3ctaGlkZGVuIGZsZXggZmxleC1jb2wgbWF4LWgtWzkwdmhdXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiBib3JkZXItYiBib3JkZXItZ3JheS0xMDAgYmctZ3JheS01MCBmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yLjVcIj5cbiAgICAgICAgICAgICAgICAgPFNldHRpbmdzSWNvbiBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTYwMFwiIHNpemU9ezIyfSAvPlxuICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMFwiPlN5c3RlbSBTZXR0aW5ncyAmIEludGVncmF0aW9uczwvaDI+XG4gICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0U2hvd1NldHRpbmdzTW9kYWwoZmFsc2UpfSBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtZ3JheS02MDAgcC0xIGhvdmVyOmJnLWdyYXktMTAwIHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uXCI+PFggc2l6ZT17MjB9IC8+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgey8qIFRhYnMgSGVhZGVyICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGJvcmRlci1iIGJvcmRlci1ncmF5LTEwMCBiZy1ncmF5LTUwLzUwIHB4LTYgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVTZXR0aW5nc1RhYignZGF0YWJhc2UnKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweS0zIHB4LTQgZm9udC1zZW1pYm9sZCB0ZXh0LXNtIGJvcmRlci1iLTIgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgJHthY3RpdmVTZXR0aW5nc1RhYiA9PT0gJ2RhdGFiYXNlJyA/ICdib3JkZXItYW1iZXItNjAwIHRleHQtYW1iZXItODAwJyA6ICdib3JkZXItdHJhbnNwYXJlbnQgdGV4dC1ncmF5LTUwMCBob3Zlcjp0ZXh0LWdyYXktNzAwJ31gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPERhdGFiYXNlIHNpemU9ezE2fSAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkRhdGFiYXNlIENvbm5lY3Rpb248L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVNldHRpbmdzVGFiKCd3aGF0c2FwcCcpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB5LTMgcHgtNCBmb250LXNlbWlib2xkIHRleHQtc20gYm9yZGVyLWItMiB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiAke2FjdGl2ZVNldHRpbmdzVGFiID09PSAnd2hhdHNhcHAnID8gJ2JvcmRlci1hbWJlci02MDAgdGV4dC1hbWJlci04MDAnIDogJ2JvcmRlci10cmFuc3BhcmVudCB0ZXh0LWdyYXktNTAwIGhvdmVyOnRleHQtZ3JheS03MDAnfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8TWVzc2FnZVNxdWFyZSBzaXplPXsxNn0gLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5XaGF0c0FwcCBJbnRlZ3JhdGlvbjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlU2V0dGluZ3NUYWIoJ2V4cG9ydCcpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB5LTMgcHgtNCBmb250LXNlbWlib2xkIHRleHQtc20gYm9yZGVyLWItMiB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiAke2FjdGl2ZVNldHRpbmdzVGFiID09PSAnZXhwb3J0JyA/ICdib3JkZXItYW1iZXItNjAwIHRleHQtYW1iZXItODAwJyA6ICdib3JkZXItdHJhbnNwYXJlbnQgdGV4dC1ncmF5LTUwMCBob3Zlcjp0ZXh0LWdyYXktNzAwJ31gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPERvd25sb2FkIHNpemU9ezE2fSAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkV4cG9ydCBQcm9qZWN0IFpJUDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgb3ZlcmZsb3cteS1hdXRvIGZsZXgtMSBzcGFjZS15LTZcIj5cbiAgICAgICAgICAgICAge2FjdGl2ZVNldHRpbmdzVGFiID09PSAnZGF0YWJhc2UnID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWJsdWUtNTAgcC00IHJvdW5kZWQteGwgdGV4dC1zbSB0ZXh0LWJsdWUtODAwIGJvcmRlciBib3JkZXItYmx1ZS0xMDAgZmxleCBpdGVtcy1zdGFydCBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgICA8RGF0YWJhc2UgY2xhc3NOYW1lPVwibXQtMC41IHRleHQtYmx1ZS02MDAgc2hyaW5rLTBcIiBzaXplPXsxOH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvbGRcIj5EYXRhYmFzZSBTZXR0aW5nczwvcD5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0wLjUgdGV4dC1ibHVlLTcwMFwiPkNvbmZpZ3VyZSB5b3VyIGNvbm5lY3Rpb24gdG8gU3VwYWJhc2UuIFlvdSBjYW4gZmluZCB0aGVzZSB2YWx1ZXMgaW4geW91ciBTdXBhYmFzZSBEYXNoYm9hcmQgdW5kZXIgPHN0cm9uZz5Qcm9qZWN0IFNldHRpbmdzICZndDsgQVBJPC9zdHJvbmc+LjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgbWItMVwiPlByb2plY3QgVVJMPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2N1c3RvbVVybH0gXG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRDdXN0b21VcmwoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcC0yLjUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYW1iZXItNTAwIGZvY3VzOmJvcmRlci1hbWJlci01MDAgb3V0bGluZS1ub25lIHRleHQtc20gYmctd2hpdGUgdGV4dC1ibGFja1wiXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJodHRwczovLy4uLnN1cGFiYXNlLmNvXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBtYi0xXCI+QW5vbiBLZXkgKHB1YmxpYyk8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y3VzdG9tS2V5fSBcbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEN1c3RvbUtleShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCBwLTIuNSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1hbWJlci01MDAgZm9jdXM6Ym9yZGVyLWFtYmVyLTUwMCBvdXRsaW5lLW5vbmUgdGV4dC1zbSBmb250LW1vbm8gYmctd2hpdGUgdGV4dC1ibGFja1wiXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJleUpoLi4uXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAge2N1c3RvbUtleS5pbmNsdWRlcyhcInByb2Nlc3MuZW52XCIpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtcmVkLTUwMCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICDimqDvuI8gV2FybmluZzogVGhlIHByb3ZpZGVkIGtleSBzZWVtcyB0byBiZSBhIHRlbXBsYXRlIGV4cHJlc3Npb24uIFBsZWFzZSBwYXN0ZSB0aGUgYWN0dWFsIGxvbmcga2V5IHN0cmluZyBzdGFydGluZyB3aXRoIFwiZXkuLi5cIi5cbiAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC00IGJvcmRlci10IGJvcmRlci1ncmF5LTEwMCBmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWdyYXktNTAwXCI+TmVlZCB0byBjcmVhdGUgdGFibGVzIG9yIHNlZWQgZHVtbXkgZGF0YT88L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRTaG93U2V0dGluZ3NNb2RhbChmYWxzZSk7IHNldFNob3dEYlNldHVwKHRydWUpOyB9fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1hbWJlci03MDAgaG92ZXI6dGV4dC1hbWJlci05NTAgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGhvdmVyOnVuZGVybGluZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8Q29weSBzaXplPXsxMn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5TaG93IFNRTCBTZXR1cCBTY3JpcHQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiBhY3RpdmVTZXR0aW5nc1RhYiA9PT0gJ3doYXRzYXBwJyA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmVlbi01MCBwLTQgcm91bmRlZC14bCB0ZXh0LXNtIHRleHQtZ3JlZW4tODAwIGJvcmRlciBib3JkZXItZ3JlZW4tMTAwIGZsZXggaXRlbXMtc3RhcnQgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VTcXVhcmUgY2xhc3NOYW1lPVwibXQtMC41IHRleHQtZ3JlZW4tNjAwIHNocmluay0wXCIgc2l6ZT17MTh9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1ib2xkXCI+RmFzdDJTTVMgV2hhdHNBcHAgSW50ZWdyYXRpb248L3A+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMC41IHRleHQtZ3JlZW4tNzAwXCI+RW50ZXIgeW91ciBGYXN0MlNNUyBjcmVkZW50aWFscyBiZWxvdy4gVGhlIGFwcHJvdmVkIG9yZGVyIGNvbmZpcm1hdGlvbiB0ZW1wbGF0ZSAoSUQ6IDxzdHJvbmc+MjM5NjU8L3N0cm9uZz4pIHdpbGwgYmUgdHJpZ2dlcmVkIHdoZW4gcGxhY2luZyBvcmRlcnMuPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtZ3JheS01MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIG1iLTFcIj5GYXN0MlNNUyBBdXRob3JpemF0aW9uIEtleTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17d2hhdHNhcHBBcGlLZXl9IFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRXaGF0c2FwcEFwaUtleShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHAtMi41IGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWFtYmVyLTUwMCBmb2N1czpib3JkZXItYW1iZXItNTAwIG91dGxpbmUtbm9uZSB0ZXh0LXNtIGJnLXdoaXRlIHRleHQtYmxhY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBGYXN0MlNNUyBBUEkgS2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtZ3JheS01MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIG1iLTFcIj5XaGF0c0FwcCBQaG9uZSBOdW1iZXIgSUQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17d2hhdHNhcHBQaG9uZUlkfSBcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0V2hhdHNhcHBQaG9uZUlkKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcC0yLjUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYW1iZXItNTAwIGZvY3VzOmJvcmRlci1hbWJlci01MDAgb3V0bGluZS1ub25lIHRleHQtc20gYmctd2hpdGUgdGV4dC1ibGFjayBmb250LW1vbm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIDk2NjIzMzQ2OTg5Nzk0MVwiXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktZW5kXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2F2ZVdoYXRzQXBwQ29uZmlnfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWFtYmVyLTYwMCBob3ZlcjpiZy1hbWJlci03MDAgdGV4dC13aGl0ZSB0ZXh0LXNtIHB4LTQgcHktMiByb3VuZGVkLWxnIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdyB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxTYXZlIHNpemU9ezE2fSAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlNhdmUgV2hhdHNBcHAgQ3JlZGVudGlhbHM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBUZXN0IFNlY3Rpb24gKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTYgYm9yZGVyLXQgYm9yZGVyLWdyYXktMTAwIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC1ncmF5LTgwMFwiPlNlbmQgVGVzdCBTZXNzaW9uIE1lc3NhZ2U8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZ3JheS01MDBcIj5FbnN1cmUgY3JlZGVudGlhbHMgYXJlIHNhdmVkLiBUaGlzIHNlbmRzIGEgcXVpY2sgZ3JlZXRpbmcgc2Vzc2lvbiBtZXNzYWdlIHRvIGNvbmZpcm0gdGhlIGxpbmsgd29ya3MuPC9wPlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0ZXN0UGhvbmVOdW1iZXJ9IFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRUZXN0UGhvbmVOdW1iZXIoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCBwLTIuNSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1hbWJlci01MDAgZm9jdXM6Ym9yZGVyLWFtYmVyLTUwMCBvdXRsaW5lLW5vbmUgdGV4dC1zbSBiZy13aGl0ZSB0ZXh0LWJsYWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZS5nLiA5NzkwNzAzOTM2XCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTZW5kVGVzdFdoYXRzQXBwfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzU2VuZGluZ1Rlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC01IHB5LTIuNSByb3VuZGVkLWxnIGZvbnQtYm9sZCB0ZXh0LXNtIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yICR7aXNTZW5kaW5nVGVzdCA/ICdiZy1ncmF5LTIwMCB0ZXh0LWdyYXktNDAwJyA6ICdiZy1ncmVlbi02MDAgaG92ZXI6YmctZ3JlZW4tNzAwIHRleHQtd2hpdGUgc2hhZG93LW1kJ31gfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpc1NlbmRpbmdUZXN0ID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctNCBoLTQgYm9yZGVyLTIgYm9yZGVyLWdyYXktNDAwIGJvcmRlci10LXdoaXRlIHJvdW5kZWQtZnVsbCBhbmltYXRlLXNwaW5cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VTcXVhcmUgc2l6ZT17MTZ9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+U2VuZCBUZXN0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHt0ZXN0UmVzdWx0ICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtMyByb3VuZGVkLWxnIHRleHQteHMgZm9udC1zZW1pYm9sZCAke3Rlc3RSZXN1bHQuc3RhcnRzV2l0aCgn4pyFJykgPyAnYmctZ3JlZW4tNTAgdGV4dC1ncmVlbi03MDAgYm9yZGVyIGJvcmRlci1ncmVlbi0yMDAnIDogJ2JnLXJlZC01MCB0ZXh0LXJlZC03MDAgYm9yZGVyIGJvcmRlci1yZWQtMjAwJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXN0UmVzdWx0fVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctYW1iZXItNTAgcC00IHJvdW5kZWQteGwgdGV4dC1zbSB0ZXh0LWFtYmVyLTkwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJtdC0wLjUgdGV4dC1hbWJlci03MDAgc2hyaW5rLTBcIiBzaXplPXsxOH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvbGRcIj5FeHBvcnQgQ29tcGxldGUgUHJvamVjdCBhcyBaSVA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMC41IHRleHQtYW1iZXItODAwXCI+RG93bmxvYWQgdGhlIGVudGlyZSBzb3VyY2UgY29kZSwgY29tcG9uZW50cywgc2VydmljZXMsIGFuZCBjb25maWd1cmF0aW9uIGZpbGVzIGFzIGEgYC56aXBgIGFyY2hpdmUgZm9yIG1hbnVhbCB1cGxvYWQsIGJhY2t1cCwgb3Igb2ZmbGluZSBkZXZlbG9wbWVudC48L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC04IGJnLWdyYXktNTAgYm9yZGVyLTIgYm9yZGVyLWRhc2hlZCBib3JkZXItZ3JheS0yMDAgcm91bmRlZC14bCBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTE2IGgtMTYgYmctYW1iZXItMTAwIHRleHQtYW1iZXItNzAwIHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctaW5uZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8RG93bmxvYWQgc2l6ZT17Mjh9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIHRleHQtYmFzZVwiPnN2YXNoaWNhbGlzLWVycC1wcm9qZWN0LnppcDwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWdyYXktNTAwIG10LTFcIj5JbmNsdWRlcyBhbGwgUmVhY3QgY29tcG9uZW50cywgVHlwZVNjcmlwdCBzZXJ2aWNlcywgVGFpbHdpbmQgc3R5bGVzLCBhbmQgVml0ZSBidWlsZCBjb25maWcuPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRXhwb3J0WmlwfVxuICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0V4cG9ydGluZ31cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC02IHB5LTMgcm91bmRlZC14bCBmb250LWJvbGQgdGV4dC1zbSB0ZXh0LXdoaXRlIHNoYWRvdy1sZyB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiAke2lzRXhwb3J0aW5nID8gJ2JnLWFtYmVyLTQwMCBjdXJzb3Itbm90LWFsbG93ZWQnIDogJ2JnLWFtYmVyLTYwMCBob3ZlcjpiZy1hbWJlci03MDAgYWN0aXZlOnNjYWxlLTk1J31gfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge2lzRXhwb3J0aW5nID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTQgaC00IGJvcmRlci0yIGJvcmRlci13aGl0ZSBib3JkZXItdC10cmFuc3BhcmVudCByb3VuZGVkLWZ1bGwgYW5pbWF0ZS1zcGluXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlBhY2thZ2luZyBaSVAuLi48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPERvd25sb2FkIHNpemU9ezE4fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Eb3dubG9hZCBaSVAgQXJjaGl2ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgIHtleHBvcnRTdGF0dXMgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbXQtMiBwLTMgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdy1mdWxsIHRleHQtY2VudGVyICR7ZXhwb3J0U3RhdHVzLnN0YXJ0c1dpdGgoJ+KchScpID8gJ2JnLWdyZWVuLTUwIHRleHQtZ3JlZW4tODAwIGJvcmRlciBib3JkZXItZ3JlZW4tMjAwJyA6IGV4cG9ydFN0YXR1cy5zdGFydHNXaXRoKCfinYwnKSA/ICdiZy1yZWQtNTAgdGV4dC1yZWQtODAwIGJvcmRlciBib3JkZXItcmVkLTIwMCcgOiAnYmctYmx1ZS01MCB0ZXh0LWJsdWUtODAwIGJvcmRlciBib3JkZXItYmx1ZS0yMDAnfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAge2V4cG9ydFN0YXR1c31cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IGJvcmRlci10IGJvcmRlci1ncmF5LTEwMCBiZy1ncmF5LTUwIGZsZXgganVzdGlmeS1lbmQgc3BhY2UteC0zIHNocmluay0wXCI+XG4gICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldFNob3dTZXR0aW5nc01vZGFsKGZhbHNlKX0gY2xhc3NOYW1lPVwicHgtNSBweS0yIHRleHQtZ3JheS02MDAgaG92ZXI6YmctZ3JheS0xMDAgcm91bmRlZC1sZyBmb250LXNlbWlib2xkIHRleHQtc20gdHJhbnNpdGlvblwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAge2FjdGl2ZVNldHRpbmdzVGFiID09PSAnZGF0YWJhc2UnICYmIChcbiAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVTYXZlQ29ubmVjdGlvbn0gY2xhc3NOYW1lPVwiYmctZ3JlZW4tNjAwIGhvdmVyOmJnLWdyZWVuLTcwMCB0ZXh0LXdoaXRlIHB4LTUgcHktMiByb3VuZGVkLWxnIGZvbnQtYm9sZCB0ZXh0LXNtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHNoYWRvdyB0cmFuc2l0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgPFNhdmUgc2l6ZT17MTZ9IC8+IFNhdmUgJiBDb25uZWN0IERCXG4gICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIDxSb3V0ZXM+XG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiL2xvZ2luXCIgZWxlbWVudD17aXNBdXRoZW50aWNhdGVkID8gPE5hdmlnYXRlIHRvPVwiL1wiIHJlcGxhY2UgLz4gOiA8TG9naW4gb25Mb2dpbj17bG9naW59IHVzZXJzPXt1c2Vyc30gbG9hZGluZz17bG9hZGluZ30gLz59IC8+XG4gICAgICAgIHtpc0F1dGhlbnRpY2F0ZWQgPyAoXG4gICAgICAgICAgPFJvdXRlIGVsZW1lbnQ9e1xuICAgICAgICAgICAgPExheW91dCBcbiAgICAgICAgICAgICAgey4uLmNvbnRleHRWYWx1ZX0gXG4gICAgICAgICAgICAgIGlzRGJDb25uZWN0ZWQ9e2lzRGJDb25uZWN0ZWR9IFxuICAgICAgICAgICAgICBvbk9wZW5EYlNldHVwPXsoKSA9PiBzZXRTaG93RGJTZXR1cCh0cnVlKX0gXG4gICAgICAgICAgICAgIG9uT3BlbkNvbm5lY3Q9eygpID0+IHsgc2V0U2hvd1NldHRpbmdzTW9kYWwodHJ1ZSk7IHNldEFjdGl2ZVNldHRpbmdzVGFiKCdkYXRhYmFzZScpOyB9fSBcbiAgICAgICAgICAgICAgb25PcGVuU2V0dGluZ3M9eygpID0+IHsgc2V0U2hvd1NldHRpbmdzTW9kYWwodHJ1ZSk7IHNldEFjdGl2ZVNldHRpbmdzVGFiKCd3aGF0c2FwcCcpOyB9fVxuICAgICAgICAgICAgICBvbk9wZW5FeHBvcnQ9eygpID0+IHsgc2V0U2hvd1NldHRpbmdzTW9kYWwodHJ1ZSk7IHNldEFjdGl2ZVNldHRpbmdzVGFiKCdleHBvcnQnKTsgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgfT5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL1wiIGVsZW1lbnQ9ezxEYXNoYm9hcmQgLz59IC8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9jdXN0b21lcnNcIiBlbGVtZW50PXs8Q3VzdG9tZXJzIC8+fSAvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvb3JkZXItdGFraW5nXCIgZWxlbWVudD17PE9yZGVyVGFraW5nIC8+fSAvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvb3JkZXJzXCIgZWxlbWVudD17PE9yZGVycyAvPn0gLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL29yZGVycy86aWRcIiBlbGVtZW50PXs8T3JkZXJEZXRhaWxzIC8+fSAvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvZGVsaXZlcmllc1wiIGVsZW1lbnQ9ezxEZWxpdmVyaWVzIC8+fSAvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvaW52ZW50b3J5XCIgZWxlbWVudD17PEludmVudG9yeSAvPn0gLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiKlwiIGVsZW1lbnQ9ezxOYXZpZ2F0ZSB0bz1cIi9cIiByZXBsYWNlIC8+fSAvPlxuICAgICAgICAgIDwvUm91dGU+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPFJvdXRlIHBhdGg9XCIqXCIgZWxlbWVudD17PE5hdmlnYXRlIHRvPVwiL2xvZ2luXCIgcmVwbGFjZSAvPn0gLz5cbiAgICAgICAgKX1cbiAgICAgIDwvUm91dGVzPlxuICAgIDwvSGFzaFJvdXRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIl0sImZpbGUiOiIvYXBwL2FwcGxldC9BcHAudHN4In0=