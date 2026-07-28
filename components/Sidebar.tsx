import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/components/Sidebar.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=76d1f7a8"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/applet/components/Sidebar.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
import { NavLink } from "/node_modules/.vite/deps/react-router-dom.js?v=76d1f7a8";
import { Role } from "/types.ts";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Truck,
  Settings,
  LogOut,
  PlusCircle,
  Database,
  X,
  Download
} from "/node_modules/.vite/deps/lucide-react.js?v=76d1f7a8";
const Sidebar = ({ role, onReset, onLogout, onOpenSettings, onOpenExport, isOpen, onClose }) => {
  const getNavItems = () => {
    switch (role) {
      case Role.ADMIN:
        return [
          { to: "/", label: "Dashboard", icon: LayoutDashboard },
          { to: "/order-taking", label: "New Order", icon: PlusCircle },
          { to: "/orders", label: "All Orders", icon: ShoppingCart },
          { to: "/customers", label: "Business Owners", icon: Users },
          { to: "/inventory", label: "Products", icon: Package },
          { to: "/deliveries", label: "Deliveries", icon: Truck }
        ];
      case Role.SALES_EXECUTIVE:
        return [
          { to: "/", label: "Dashboard", icon: LayoutDashboard },
          { to: "/order-taking", label: "New Order", icon: ShoppingCart },
          { to: "/orders", label: "My Orders", icon: Package },
          { to: "/customers", label: "My Customers", icon: Users }
        ];
      case Role.DELIVERY_PERSON:
        return [
          { to: "/", label: "Dashboard", icon: LayoutDashboard },
          { to: "/deliveries", label: "My Route", icon: Truck }
        ];
      default:
        return [];
    }
  };
  const navItems = getNavItems();
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    isOpen && /* @__PURE__ */ jsxDEV(
      "div",
      {
        className: "fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden",
        onClick: onClose
      },
      void 0,
      false,
      {
        fileName: "/app/applet/components/Sidebar.tsx",
        lineNumber: 83,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: `
        fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-choco-900 text-choco-100 flex flex-col h-full shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-6 border-b border-choco-800 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex justify-center", children: /* @__PURE__ */ jsxDEV(
          "img",
          {
            src: "https://ik.imagekit.io/vistadigitals/Svashicalis/logo-svashicalis-white.png",
            alt: "Svashicalis",
            className: "w-auto h-24 object-contain",
            onError: (e) => {
              e.currentTarget.style.display = "none";
            }
          },
          void 0,
          false,
          {
            fileName: "/app/applet/components/Sidebar.tsx",
            lineNumber: 97,
            columnNumber: 13
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/components/Sidebar.tsx",
          lineNumber: 96,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "lg:hidden text-choco-300 hover:text-white", children: /* @__PURE__ */ jsxDEV(X, { size: 24 }, void 0, false, {
          fileName: "/app/applet/components/Sidebar.tsx",
          lineNumber: 109,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/components/Sidebar.tsx",
          lineNumber: 108,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/components/Sidebar.tsx",
        lineNumber: 94,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("nav", { className: "flex-1 p-4 space-y-2 overflow-y-auto", children: navItems.map(
        (item) => /* @__PURE__ */ jsxDEV(
          NavLink,
          {
            to: item.to,
            onClick: onClose,
            className: ({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-amber-600 text-white shadow-md" : "hover:bg-choco-800 text-choco-200"}`,
            children: [
              /* @__PURE__ */ jsxDEV(item.icon, { size: 20 }, void 0, false, {
                fileName: "/app/applet/components/Sidebar.tsx",
                lineNumber: 127,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: item.label }, void 0, false, {
                fileName: "/app/applet/components/Sidebar.tsx",
                lineNumber: 128,
                columnNumber: 15
              }, this)
            ]
          },
          item.to,
          true,
          {
            fileName: "/app/applet/components/Sidebar.tsx",
            lineNumber: 115,
            columnNumber: 11
          },
          this
        )
      ) }, void 0, false, {
        fileName: "/app/applet/components/Sidebar.tsx",
        lineNumber: 113,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-t border-choco-800 space-y-1", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              onReset();
              onClose();
            },
            className: "flex items-center space-x-3 px-4 py-3 w-full text-left text-choco-300 hover:text-white hover:bg-choco-800 rounded-lg transition",
            title: "Reset database to demo defaults",
            children: [
              /* @__PURE__ */ jsxDEV(Database, { size: 20 }, void 0, false, {
                fileName: "/app/applet/components/Sidebar.tsx",
                lineNumber: 139,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Reset Data" }, void 0, false, {
                fileName: "/app/applet/components/Sidebar.tsx",
                lineNumber: 140,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/components/Sidebar.tsx",
            lineNumber: 134,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              onOpenSettings();
              onClose();
            },
            className: "flex items-center space-x-3 px-4 py-3 w-full text-left text-choco-300 hover:text-white hover:bg-choco-800 rounded-lg transition",
            children: [
              /* @__PURE__ */ jsxDEV(Settings, { size: 20 }, void 0, false, {
                fileName: "/app/applet/components/Sidebar.tsx",
                lineNumber: 146,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Settings" }, void 0, false, {
                fileName: "/app/applet/components/Sidebar.tsx",
                lineNumber: 147,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/components/Sidebar.tsx",
            lineNumber: 142,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              onOpenExport();
              onClose();
            },
            className: "flex items-center space-x-3 px-4 py-3 w-full text-left text-amber-400 hover:text-white hover:bg-amber-700/50 rounded-lg transition font-semibold",
            children: [
              /* @__PURE__ */ jsxDEV(Download, { size: 20 }, void 0, false, {
                fileName: "/app/applet/components/Sidebar.tsx",
                lineNumber: 153,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Download ZIP Archive" }, void 0, false, {
                fileName: "/app/applet/components/Sidebar.tsx",
                lineNumber: 154,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/components/Sidebar.tsx",
            lineNumber: 149,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: onLogout,
            className: "flex items-center space-x-3 px-4 py-3 w-full text-left text-choco-300 hover:text-white hover:bg-choco-800 rounded-lg transition",
            children: [
              /* @__PURE__ */ jsxDEV(LogOut, { size: 20 }, void 0, false, {
                fileName: "/app/applet/components/Sidebar.tsx",
                lineNumber: 160,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Logout" }, void 0, false, {
                fileName: "/app/applet/components/Sidebar.tsx",
                lineNumber: 161,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/components/Sidebar.tsx",
            lineNumber: 156,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/components/Sidebar.tsx",
        lineNumber: 133,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/components/Sidebar.tsx",
      lineNumber: 90,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/components/Sidebar.tsx",
    lineNumber: 80,
    columnNumber: 5
  }, this);
};
_c = Sidebar;
export default Sidebar;
var _c;
$RefreshReg$(_c, "Sidebar");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/applet/components/Sidebar.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/applet/components/Sidebar.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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IiwiVXNlcnMiLCJQYWNrYWdlIiwiU2hvcHBpbmdDYXJ0IiwiVHJ1Y2siLCJTZXR0aW5ncyIsIkxvZ091dCIsIlBsdXNDaXJjbGUiLCJEYXRhYmFzZSIsIlgiLCJEb3dubG9hZCIsIlNpZGViYXIiLCJyb2xlIiwib25SZXNldCIsIm9uTG9nb3V0Iiwib25PcGVuU2V0dGluZ3MiLCJvbk9wZW5FeHBvcnQiLCJpc09wZW4iLCJvbkNsb3NlIiwiZ2V0TmF2SXRlbXMiLCJBRE1JTiIsInRvIiwibGFiZWwiLCJpY29uIiwiU0FMRVNfRVhFQ1VUSVZFIiwiREVMSVZFUllfUEVSU09OIiwibmF2SXRlbXMiLCJlIiwiY3VycmVudFRhcmdldCIsInN0eWxlIiwiZGlzcGxheSIsIm1hcCIsIml0ZW0iLCJpc0FjdGl2ZSIsIl9jIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlNpZGViYXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE5hdkxpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IFJvbGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBcbiAgTGF5b3V0RGFzaGJvYXJkLCBcbiAgVXNlcnMsIFxuICBQYWNrYWdlLCBcbiAgU2hvcHBpbmdDYXJ0LCBcbiAgVHJ1Y2ssIFxuICBTZXR0aW5ncywgXG4gIExvZ091dCxcbiAgUGx1c0NpcmNsZSxcbiAgRGF0YWJhc2UsXG4gIFgsXG4gIERvd25sb2FkXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5cbmludGVyZmFjZSBTaWRlYmFyUHJvcHMge1xuICByb2xlOiBSb2xlO1xuICBvblJlc2V0OiAoKSA9PiB2b2lkO1xuICBvbkxvZ291dDogKCkgPT4gdm9pZDtcbiAgb25PcGVuU2V0dGluZ3M6ICgpID0+IHZvaWQ7XG4gIG9uT3BlbkV4cG9ydDogKCkgPT4gdm9pZDtcbiAgaXNPcGVuOiBib29sZWFuO1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xufVxuXG5jb25zdCBTaWRlYmFyOiBSZWFjdC5GQzxTaWRlYmFyUHJvcHM+ID0gKHsgcm9sZSwgb25SZXNldCwgb25Mb2dvdXQsIG9uT3BlblNldHRpbmdzLCBvbk9wZW5FeHBvcnQsIGlzT3Blbiwgb25DbG9zZSB9KSA9PiB7XG4gIGNvbnN0IGdldE5hdkl0ZW1zID0gKCkgPT4ge1xuICAgIHN3aXRjaCAocm9sZSkge1xuICAgICAgY2FzZSBSb2xlLkFETUlOOlxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIHsgdG86ICcvJywgbGFiZWw6ICdEYXNoYm9hcmQnLCBpY29uOiBMYXlvdXREYXNoYm9hcmQgfSxcbiAgICAgICAgICB7IHRvOiAnL29yZGVyLXRha2luZycsIGxhYmVsOiAnTmV3IE9yZGVyJywgaWNvbjogUGx1c0NpcmNsZSB9LFxuICAgICAgICAgIHsgdG86ICcvb3JkZXJzJywgbGFiZWw6ICdBbGwgT3JkZXJzJywgaWNvbjogU2hvcHBpbmdDYXJ0IH0sXG4gICAgICAgICAgeyB0bzogJy9jdXN0b21lcnMnLCBsYWJlbDogJ0J1c2luZXNzIE93bmVycycsIGljb246IFVzZXJzIH0sXG4gICAgICAgICAgeyB0bzogJy9pbnZlbnRvcnknLCBsYWJlbDogJ1Byb2R1Y3RzJywgaWNvbjogUGFja2FnZSB9LFxuICAgICAgICAgIHsgdG86ICcvZGVsaXZlcmllcycsIGxhYmVsOiAnRGVsaXZlcmllcycsIGljb246IFRydWNrIH0sXG4gICAgICAgIF07XG4gICAgICBjYXNlIFJvbGUuU0FMRVNfRVhFQ1VUSVZFOlxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIHsgdG86ICcvJywgbGFiZWw6ICdEYXNoYm9hcmQnLCBpY29uOiBMYXlvdXREYXNoYm9hcmQgfSxcbiAgICAgICAgICB7IHRvOiAnL29yZGVyLXRha2luZycsIGxhYmVsOiAnTmV3IE9yZGVyJywgaWNvbjogU2hvcHBpbmdDYXJ0IH0sXG4gICAgICAgICAgeyB0bzogJy9vcmRlcnMnLCBsYWJlbDogJ015IE9yZGVycycsIGljb246IFBhY2thZ2UgfSxcbiAgICAgICAgICB7IHRvOiAnL2N1c3RvbWVycycsIGxhYmVsOiAnTXkgQ3VzdG9tZXJzJywgaWNvbjogVXNlcnMgfSxcbiAgICAgICAgXTtcbiAgICAgIGNhc2UgUm9sZS5ERUxJVkVSWV9QRVJTT046XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgeyB0bzogJy8nLCBsYWJlbDogJ0Rhc2hib2FyZCcsIGljb246IExheW91dERhc2hib2FyZCB9LFxuICAgICAgICAgIHsgdG86ICcvZGVsaXZlcmllcycsIGxhYmVsOiAnTXkgUm91dGUnLCBpY29uOiBUcnVjayB9LFxuICAgICAgICBdO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBuYXZJdGVtcyA9IGdldE5hdkl0ZW1zKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgey8qIE1vYmlsZSAmIFRhYmxldCBCYWNrZHJvcCAqL31cbiAgICAgIHtpc09wZW4gJiYgKFxuICAgICAgICA8ZGl2IFxuICAgICAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgYmctYmxhY2sgYmctb3BhY2l0eS01MCB6LTQwIGxnOmhpZGRlblwiXG4gICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgPjwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIFNpZGViYXIgQ29udGFpbmVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BcbiAgICAgICAgZml4ZWQgbGc6cmVsYXRpdmUgaW5zZXQteS0wIGxlZnQtMCB6LTUwIHctNjQgYmctY2hvY28tOTAwIHRleHQtY2hvY28tMTAwIGZsZXggZmxleC1jb2wgaC1mdWxsIHNoYWRvdy14bCB0cmFuc2Zvcm0gdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMzAwIGVhc2UtaW4tb3V0XG4gICAgICAgICR7aXNPcGVuID8gJ3RyYW5zbGF0ZS14LTAnIDogJy10cmFuc2xhdGUteC1mdWxsIGxnOnRyYW5zbGF0ZS14LTAnfVxuICAgICAgYH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IGJvcmRlci1iIGJvcmRlci1jaG9jby04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgey8qIExvZ28gKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgPGltZyBcbiAgICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9pay5pbWFnZWtpdC5pby92aXN0YWRpZ2l0YWxzL1N2YXNoaWNhbGlzL2xvZ28tc3Zhc2hpY2FsaXMtd2hpdGUucG5nXCIgXG4gICAgICAgICAgICAgIGFsdD1cIlN2YXNoaWNhbGlzXCIgXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctYXV0byBoLTI0IG9iamVjdC1jb250YWluXCIgXG4gICAgICAgICAgICAgIG9uRXJyb3I9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBNb2JpbGUgJiBUYWJsZXQgQ2xvc2UgQnV0dG9uICovfVxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17b25DbG9zZX0gY2xhc3NOYW1lPVwibGc6aGlkZGVuIHRleHQtY2hvY28tMzAwIGhvdmVyOnRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgIDxYIHNpemU9ezI0fSAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxuYXYgY2xhc3NOYW1lPVwiZmxleC0xIHAtNCBzcGFjZS15LTIgb3ZlcmZsb3cteS1hdXRvXCI+XG4gICAgICAgICAge25hdkl0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgPE5hdkxpbmtcbiAgICAgICAgICAgICAga2V5PXtpdGVtLnRvfVxuICAgICAgICAgICAgICB0bz17aXRlbS50b31cbiAgICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX0gLy8gQ2xvc2Ugc2lkZWJhciB3aGVuIGxpbmsgY2xpY2tlZCBvbiBub24tZGVza3RvcFxuICAgICAgICAgICAgICBjbGFzc05hbWU9eyh7IGlzQWN0aXZlIH0pID0+XG4gICAgICAgICAgICAgICAgYGZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMyBweC00IHB5LTMgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9ycyAke1xuICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1tZCcgXG4gICAgICAgICAgICAgICAgICAgIDogJ2hvdmVyOmJnLWNob2NvLTgwMCB0ZXh0LWNob2NvLTIwMCdcbiAgICAgICAgICAgICAgICB9YFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxpdGVtLmljb24gc2l6ZT17MjB9IC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtXCI+e2l0ZW0ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgPC9OYXZMaW5rPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L25hdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBib3JkZXItdCBib3JkZXItY2hvY28tODAwIHNwYWNlLXktMVwiPlxuICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IG9uUmVzZXQoKTsgb25DbG9zZSgpOyB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zIHB4LTQgcHktMyB3LWZ1bGwgdGV4dC1sZWZ0IHRleHQtY2hvY28tMzAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6YmctY2hvY28tODAwIHJvdW5kZWQtbGcgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICB0aXRsZT1cIlJlc2V0IGRhdGFiYXNlIHRvIGRlbW8gZGVmYXVsdHNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxEYXRhYmFzZSBzaXplPXsyMH0gLz5cbiAgICAgICAgICAgIDxzcGFuPlJlc2V0IERhdGE8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgb25PcGVuU2V0dGluZ3MoKTsgb25DbG9zZSgpOyB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zIHB4LTQgcHktMyB3LWZ1bGwgdGV4dC1sZWZ0IHRleHQtY2hvY28tMzAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6YmctY2hvY28tODAwIHJvdW5kZWQtbGcgdHJhbnNpdGlvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFNldHRpbmdzIHNpemU9ezIwfSAvPlxuICAgICAgICAgICAgPHNwYW4+U2V0dGluZ3M8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgb25PcGVuRXhwb3J0KCk7IG9uQ2xvc2UoKTsgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMyBweC00IHB5LTMgdy1mdWxsIHRleHQtbGVmdCB0ZXh0LWFtYmVyLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLWFtYmVyLTcwMC81MCByb3VuZGVkLWxnIHRyYW5zaXRpb24gZm9udC1zZW1pYm9sZFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPERvd25sb2FkIHNpemU9ezIwfSAvPlxuICAgICAgICAgICAgPHNwYW4+RG93bmxvYWQgWklQIEFyY2hpdmU8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uTG9nb3V0fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zIHB4LTQgcHktMyB3LWZ1bGwgdGV4dC1sZWZ0IHRleHQtY2hvY28tMzAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6YmctY2hvY28tODAwIHJvdW5kZWQtbGcgdHJhbnNpdGlvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPExvZ091dCBzaXplPXsyMH0gLz5cbiAgICAgICAgICAgIDxzcGFuPkxvZ291dDwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNpZGViYXI7XG4iXSwiZmlsZSI6Ii9hcHAvYXBwbGV0L2NvbXBvbmVudHMvU2lkZWJhci50c3gifQ==