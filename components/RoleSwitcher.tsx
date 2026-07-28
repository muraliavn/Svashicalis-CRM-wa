import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/components/RoleSwitcher.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=76d1f7a8"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/applet/components/RoleSwitcher.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
import { Role } from "/types.ts";
const RoleSwitcher = ({ currentUser, onSwitch }) => {
  return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-4 bg-white p-2 rounded-lg shadow-sm border border-gray-100", children: [
    /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Demo View As:" }, void 0, false, {
      fileName: "/app/applet/components/RoleSwitcher.tsx",
      lineNumber: 31,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      "select",
      {
        value: currentUser.role,
        onChange: (e) => onSwitch(e.target.value),
        className: "form-select text-sm border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 px-3 py-1 bg-gray-50",
        children: [
          /* @__PURE__ */ jsxDEV("option", { value: Role.ADMIN, children: "Admin" }, void 0, false, {
            fileName: "/app/applet/components/RoleSwitcher.tsx",
            lineNumber: 37,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("option", { value: Role.SALES_EXECUTIVE, children: "Sales Executive" }, void 0, false, {
            fileName: "/app/applet/components/RoleSwitcher.tsx",
            lineNumber: 38,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("option", { value: Role.DELIVERY_PERSON, children: "Delivery Person" }, void 0, false, {
            fileName: "/app/applet/components/RoleSwitcher.tsx",
            lineNumber: 39,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/components/RoleSwitcher.tsx",
        lineNumber: 32,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/components/RoleSwitcher.tsx",
    lineNumber: 30,
    columnNumber: 5
  }, this);
};
_c = RoleSwitcher;
export default RoleSwitcher;
var _c;
$RefreshReg$(_c, "RoleSwitcher");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/applet/components/RoleSwitcher.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/applet/components/RoleSwitcher.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBV007Ozs7Ozs7Ozs7Ozs7Ozs7QUFWTixTQUFTQSxZQUFrQjtBQU8zQixNQUFNQyxlQUE0Q0EsQ0FBQyxFQUFFQyxhQUFhQyxTQUFTLE1BQU07QUFDL0UsU0FDRSx1QkFBQyxTQUFJLFdBQVUsd0ZBQ2I7QUFBQSwyQkFBQyxVQUFLLFdBQVUsZ0VBQStELDZCQUEvRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQTRGO0FBQUEsSUFDNUY7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU9ELFlBQVlFO0FBQUFBLFFBQ25CLFVBQVUsQ0FBQ0MsTUFBTUYsU0FBU0UsRUFBRUMsT0FBT0MsS0FBYTtBQUFBLFFBQ2hELFdBQVU7QUFBQSxRQUVWO0FBQUEsaUNBQUMsWUFBTyxPQUFPUCxLQUFLUSxPQUFPLHFCQUEzQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFnQztBQUFBLFVBQ2hDLHVCQUFDLFlBQU8sT0FBT1IsS0FBS1MsaUJBQWlCLCtCQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFvRDtBQUFBLFVBQ3BELHVCQUFDLFlBQU8sT0FBT1QsS0FBS1UsaUJBQWlCLCtCQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFvRDtBQUFBO0FBQUE7QUFBQSxNQVB0RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFRQTtBQUFBLE9BVkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQVdBO0FBRUo7QUFBRUMsS0FmSVY7QUFpQk4sZUFBZUE7QUFBYSxJQUFBVTtBQUFBLGFBQUFBLElBQUEiLCJuYW1lcyI6WyJSb2xlIiwiUm9sZVN3aXRjaGVyIiwiY3VycmVudFVzZXIiLCJvblN3aXRjaCIsInJvbGUiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJBRE1JTiIsIlNBTEVTX0VYRUNVVElWRSIsIkRFTElWRVJZX1BFUlNPTiIsIl9jIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlJvbGVTd2l0Y2hlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJvbGUsIFVzZXIgfSBmcm9tICcuLi90eXBlcyc7XG5cbmludGVyZmFjZSBSb2xlU3dpdGNoZXJQcm9wcyB7XG4gIGN1cnJlbnRVc2VyOiBVc2VyO1xuICBvblN3aXRjaDogKHJvbGU6IFJvbGUpID0+IHZvaWQ7XG59XG5cbmNvbnN0IFJvbGVTd2l0Y2hlcjogUmVhY3QuRkM8Um9sZVN3aXRjaGVyUHJvcHM+ID0gKHsgY3VycmVudFVzZXIsIG9uU3dpdGNoIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtNCBiZy13aGl0ZSBwLTIgcm91bmRlZC1sZyBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1ncmF5LTEwMFwiPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtZ3JheS01MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCI+RGVtbyBWaWV3IEFzOjwvc3Bhbj5cbiAgICAgIDxzZWxlY3QgXG4gICAgICAgIHZhbHVlPXtjdXJyZW50VXNlci5yb2xlfVxuICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uU3dpdGNoKGUudGFyZ2V0LnZhbHVlIGFzIFJvbGUpfVxuICAgICAgICBjbGFzc05hbWU9XCJmb3JtLXNlbGVjdCB0ZXh0LXNtIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLW1kIHNoYWRvdy1zbSBmb2N1czpib3JkZXItYW1iZXItNTAwIGZvY3VzOnJpbmcgZm9jdXM6cmluZy1hbWJlci0yMDAgZm9jdXM6cmluZy1vcGFjaXR5LTUwIHB4LTMgcHktMSBiZy1ncmF5LTUwXCJcbiAgICAgID5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT17Um9sZS5BRE1JTn0+QWRtaW48L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT17Um9sZS5TQUxFU19FWEVDVVRJVkV9PlNhbGVzIEV4ZWN1dGl2ZTwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPXtSb2xlLkRFTElWRVJZX1BFUlNPTn0+RGVsaXZlcnkgUGVyc29uPC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJvbGVTd2l0Y2hlcjsiXSwiZmlsZSI6Ii9hcHAvYXBwbGV0L2NvbXBvbmVudHMvUm9sZVN3aXRjaGVyLnRzeCJ9