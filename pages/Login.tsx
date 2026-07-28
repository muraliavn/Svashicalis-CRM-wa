import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/pages/Login.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=76d1f7a8"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/applet/pages/Login.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=76d1f7a8"; const useState = __vite__cjsImport3_react["useState"];
import { Role } from "/types.ts";
import { Lock, User as UserIcon, ArrowRight, AlertCircle, Eye, EyeOff } from "/node_modules/.vite/deps/lucide-react.js?v=76d1f7a8";
const Login = ({ onLogin, users, loading }) => {
  _s();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const success = await onLogin(username, password);
    if (!success) {
      setError("Invalid username or password");
      setIsSubmitting(false);
    }
  };
  const demoLogin = (role) => {
    const demoUser = users.find((u) => u.role === role);
    if (demoUser && demoUser.username && demoUser.password) {
      setUsername(demoUser.username);
      setPassword(demoUser.password);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-choco-900 flex items-center justify-center p-4 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 w-full h-full overflow-hidden z-0", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-24 -left-24 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" }, void 0, false, {
        fileName: "/app/applet/pages/Login.tsx",
        lineNumber: 66,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 -right-24 w-96 h-96 bg-choco-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" }, void 0, false, {
        fileName: "/app/applet/pages/Login.tsx",
        lineNumber: 67,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute -bottom-32 left-20 w-96 h-96 bg-amber-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" }, void 0, false, {
        fileName: "/app/applet/pages/Login.tsx",
        lineNumber: 68,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Login.tsx",
      lineNumber: 65,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-2xl shadow-2xl flex w-full max-w-4xl overflow-hidden z-10 min-h-[500px]", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "hidden md:flex w-1/2 bg-choco-800 relative flex-col justify-between p-10 text-white", children: [
        /* @__PURE__ */ jsxDEV(
          "img",
          {
            src: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            alt: "Chocolate Making",
            className: "absolute inset-0 w-full h-full object-cover opacity-40"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/pages/Login.tsx",
            lineNumber: 74,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "mb-6", children: /* @__PURE__ */ jsxDEV("img", { src: "https://ik.imagekit.io/vistadigitals/Svashicalis/logo-svashicalis-white.png", alt: "Svashicalis", className: "w-auto h-24 object-contain" }, void 0, false, {
            fileName: "/app/applet/pages/Login.tsx",
            lineNumber: 81,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Login.tsx",
            lineNumber: 80,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h1", { className: "text-4xl font-bold mb-4 leading-tight", children: "Master the Art of Chocolate Management" }, void 0, false, {
            fileName: "/app/applet/pages/Login.tsx",
            lineNumber: 83,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-amber-100 text-lg", children: "Streamline orders, manage inventory, and delight customers with our premium ERP solution." }, void 0, false, {
            fileName: "/app/applet/pages/Login.tsx",
            lineNumber: 84,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Login.tsx",
          lineNumber: 79,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 text-base text-white", children: "Developed by Sanjusree - VistaDigitals.com" }, void 0, false, {
          fileName: "/app/applet/pages/Login.tsx",
          lineNumber: 86,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Login.tsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-center md:text-left mb-8", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "md:hidden flex flex-col items-center mb-6", children: /* @__PURE__ */ jsxDEV("img", { src: "https://ik.imagekit.io/vistadigitals/Svashicalis/logo-svashicalis.png", alt: "Svashicalis", className: "w-64 h-auto object-contain mb-2" }, void 0, false, {
            fileName: "/app/applet/pages/Login.tsx",
            lineNumber: 95,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/pages/Login.tsx",
            lineNumber: 94,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "text-3xl font-bold text-gray-900", children: "Welcome Back" }, void 0, false, {
            fileName: "/app/applet/pages/Login.tsx",
            lineNumber: 97,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-gray-500 mt-2", children: "Please enter your details to sign in." }, void 0, false, {
            fileName: "/app/applet/pages/Login.tsx",
            lineNumber: 98,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Login.tsx",
          lineNumber: 93,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Username" }, void 0, false, {
              fileName: "/app/applet/pages/Login.tsx",
              lineNumber: 103,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsxDEV(UserIcon, { size: 18, className: "text-gray-400" }, void 0, false, {
                fileName: "/app/applet/pages/Login.tsx",
                lineNumber: 106,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/pages/Login.tsx",
                lineNumber: 105,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  required: true,
                  value: username,
                  onChange: (e) => setUsername(e.target.value),
                  className: "block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition input-responsive bg-white text-black",
                  placeholder: "Enter your username"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/pages/Login.tsx",
                  lineNumber: 108,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/pages/Login.tsx",
              lineNumber: 104,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Login.tsx",
            lineNumber: 102,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Password" }, void 0, false, {
              fileName: "/app/applet/pages/Login.tsx",
              lineNumber: 120,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsxDEV(Lock, { size: 18, className: "text-gray-400" }, void 0, false, {
                fileName: "/app/applet/pages/Login.tsx",
                lineNumber: 123,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/pages/Login.tsx",
                lineNumber: 122,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: showPassword ? "text" : "password",
                  required: true,
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  className: "block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition input-responsive bg-white text-black",
                  placeholder: "••••••••"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/pages/Login.tsx",
                  lineNumber: 125,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  type: "button",
                  onClick: () => setShowPassword(!showPassword),
                  className: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600",
                  children: showPassword ? /* @__PURE__ */ jsxDEV(EyeOff, { size: 18 }, void 0, false, {
                    fileName: "/app/applet/pages/Login.tsx",
                    lineNumber: 138,
                    columnNumber: 35
                  }, this) : /* @__PURE__ */ jsxDEV(Eye, { size: 18 }, void 0, false, {
                    fileName: "/app/applet/pages/Login.tsx",
                    lineNumber: 138,
                    columnNumber: 58
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/pages/Login.tsx",
                  lineNumber: 133,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/pages/Login.tsx",
              lineNumber: 121,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Login.tsx",
            lineNumber: 119,
            columnNumber: 13
          }, this),
          error && /* @__PURE__ */ jsxDEV("div", { className: "bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center animate-fade-in", children: [
            /* @__PURE__ */ jsxDEV(AlertCircle, { size: 16, className: "mr-2 flex-shrink-0" }, void 0, false, {
              fileName: "/app/applet/pages/Login.tsx",
              lineNumber: 145,
              columnNumber: 17
            }, this),
            error
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Login.tsx",
            lineNumber: 144,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "submit",
              disabled: isSubmitting || loading,
              className: `w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all ${isSubmitting || loading ? "opacity-70 cursor-wait" : ""}`,
              children: isSubmitting || loading ? /* @__PURE__ */ jsxDEV("div", { className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" }, void 0, false, {
                fileName: "/app/applet/pages/Login.tsx",
                lineNumber: 158,
                columnNumber: 15
              }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                "Sign In ",
                /* @__PURE__ */ jsxDEV(ArrowRight, { size: 16, className: "ml-2" }, void 0, false, {
                  fileName: "/app/applet/pages/Login.tsx",
                  lineNumber: 161,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/pages/Login.tsx",
                lineNumber: 160,
                columnNumber: 15
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/pages/Login.tsx",
              lineNumber: 150,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Login.tsx",
          lineNumber: 101,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-8 pt-6 border-t border-gray-100", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-center text-gray-400 mb-3 uppercase tracking-wider", children: "Quick Demo Login" }, void 0, false, {
            fileName: "/app/applet/pages/Login.tsx",
            lineNumber: 169,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV("button", { onClick: () => demoLogin(Role.ADMIN), className: "text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded transition", children: "Admin" }, void 0, false, {
              fileName: "/app/applet/pages/Login.tsx",
              lineNumber: 171,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("button", { onClick: () => demoLogin(Role.SALES_EXECUTIVE), className: "text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded transition", children: "Sales" }, void 0, false, {
              fileName: "/app/applet/pages/Login.tsx",
              lineNumber: 172,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("button", { onClick: () => demoLogin(Role.DELIVERY_PERSON), className: "text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded transition", children: "Delivery" }, void 0, false, {
              fileName: "/app/applet/pages/Login.tsx",
              lineNumber: 173,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/pages/Login.tsx",
            lineNumber: 170,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/pages/Login.tsx",
          lineNumber: 168,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/pages/Login.tsx",
        lineNumber: 92,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/pages/Login.tsx",
      lineNumber: 71,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/pages/Login.tsx",
    lineNumber: 63,
    columnNumber: 5
  }, this);
};
_s(Login, "e/KerofJAFrjelHVbARR2R3mt6I=");
_c = Login;
export default Login;
var _c;
$RefreshReg$(_c, "Login");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/applet/pages/Login.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/applet/pages/Login.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QUE7QUFBQTtBQUFBO0FBQUEsbUJBQTZKO0FBQUEsZUFIL0o7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFJQTtBQUFBLGFBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQU9BO0FBQUEsV0FuRkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQW9GQTtBQUFBLFNBekdGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0EwR0E7QUFBQSxPQWxIRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBbUhBO0FBRUo7QUFBRTNCLEdBckpJSixPQUEyQjtBQUFBLEtBQTNCQTtBQXVKTixlQUFlQTtBQUFNLElBQUFnQztBQUFBLGFBQUFBLElBQUEiLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsIlJvbGUiLCJMb2NrIiwiVXNlciIsIlVzZXJJY29uIiwiQXJyb3dSaWdodCIsIkFsZXJ0Q2lyY2xlIiwiRXllIiwiRXllT2ZmIiwiTG9naW4iLCJvbkxvZ2luIiwidXNlcnMiLCJsb2FkaW5nIiwiX3MiLCJ1c2VybmFtZSIsInNldFVzZXJuYW1lIiwicGFzc3dvcmQiLCJzZXRQYXNzd29yZCIsImVycm9yIiwic2V0RXJyb3IiLCJzaG93UGFzc3dvcmQiLCJzZXRTaG93UGFzc3dvcmQiLCJpc1N1Ym1pdHRpbmciLCJzZXRJc1N1Ym1pdHRpbmciLCJoYW5kbGVTdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJzdWNjZXNzIiwiZGVtb0xvZ2luIiwicm9sZSIsImRlbW9Vc2VyIiwiZmluZCIsInUiLCJ0YXJnZXQiLCJ2YWx1ZSIsIkFETUlOIiwiU0FMRVNfRVhFQ1VUSVZFIiwiREVMSVZFUllfUEVSU09OIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiTG9naW4udHN4Il0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVXNlciwgUm9sZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IExvY2ssIFVzZXIgYXMgVXNlckljb24sIEFycm93UmlnaHQsIEFsZXJ0Q2lyY2xlLCBFeWUsIEV5ZU9mZiB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5cbmludGVyZmFjZSBMb2dpblByb3BzIHtcbiAgb25Mb2dpbjogKHU6IHN0cmluZywgcDogc3RyaW5nKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICB1c2VyczogVXNlcltdO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5jb25zdCBMb2dpbjogUmVhY3QuRkM8TG9naW5Qcm9wcz4gPSAoeyBvbkxvZ2luLCB1c2VycywgbG9hZGluZyB9KSA9PiB7XG4gIGNvbnN0IFt1c2VybmFtZSwgc2V0VXNlcm5hbWVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbcGFzc3dvcmQsIHNldFBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtzaG93UGFzc3dvcmQsIHNldFNob3dQYXNzd29yZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc1N1Ym1pdHRpbmcsIHNldElzU3VibWl0dGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRFcnJvcignJyk7XG4gICAgc2V0SXNTdWJtaXR0aW5nKHRydWUpO1xuICAgIFxuICAgIC8vIFNpbXVsYXRlIG5ldHdvcmsgZGVsYXkgZm9yIGVmZmVjdFxuICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCA4MDApKTtcblxuICAgIGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCBvbkxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCk7XG4gICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICBzZXRFcnJvcignSW52YWxpZCB1c2VybmFtZSBvciBwYXNzd29yZCcpO1xuICAgICAgc2V0SXNTdWJtaXR0aW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gSGVscGVyIHRvIHByZS1maWxsIGZvciBkZW1vIHB1cnBvc2VzXG4gIGNvbnN0IGRlbW9Mb2dpbiA9IChyb2xlOiBSb2xlKSA9PiB7XG4gICAgY29uc3QgZGVtb1VzZXIgPSB1c2Vycy5maW5kKHUgPT4gdS5yb2xlID09PSByb2xlKTtcbiAgICBpZiAoZGVtb1VzZXIgJiYgZGVtb1VzZXIudXNlcm5hbWUgJiYgZGVtb1VzZXIucGFzc3dvcmQpIHtcbiAgICAgIHNldFVzZXJuYW1lKGRlbW9Vc2VyLnVzZXJuYW1lKTtcbiAgICAgIHNldFBhc3N3b3JkKGRlbW9Vc2VyLnBhc3N3b3JkKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1jaG9jby05MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00IHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgey8qIEJhY2tncm91bmQgRGVjb3JhdGl2ZSBFbGVtZW50cyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgbGVmdC0wIHctZnVsbCBoLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIHotMFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMjQgLWxlZnQtMjQgdy05NiBoLTk2IGJnLWFtYmVyLTYwMCByb3VuZGVkLWZ1bGwgbWl4LWJsZW5kLW11bHRpcGx5IGZpbHRlciBibHVyLTN4bCBvcGFjaXR5LTIwIGFuaW1hdGUtYmxvYlwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIC1yaWdodC0yNCB3LTk2IGgtOTYgYmctY2hvY28tNjAwIHJvdW5kZWQtZnVsbCBtaXgtYmxlbmQtbXVsdGlwbHkgZmlsdGVyIGJsdXItM3hsIG9wYWNpdHktMjAgYW5pbWF0ZS1ibG9iIGFuaW1hdGlvbi1kZWxheS0yMDAwXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLWJvdHRvbS0zMiBsZWZ0LTIwIHctOTYgaC05NiBiZy1hbWJlci04MDAgcm91bmRlZC1mdWxsIG1peC1ibGVuZC1tdWx0aXBseSBmaWx0ZXIgYmx1ci0zeGwgb3BhY2l0eS0yMCBhbmltYXRlLWJsb2IgYW5pbWF0aW9uLWRlbGF5LTQwMDBcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHNoYWRvdy0yeGwgZmxleCB3LWZ1bGwgbWF4LXctNHhsIG92ZXJmbG93LWhpZGRlbiB6LTEwIG1pbi1oLVs1MDBweF1cIj5cbiAgICAgICAgey8qIExlZnQgU2lkZSAtIEhlcm8gSW1hZ2UgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuIG1kOmZsZXggdy0xLzIgYmctY2hvY28tODAwIHJlbGF0aXZlIGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBwLTEwIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NDkwMDc5OTQtY2I5MmNhZWJkNTRiP2l4bGliPXJiLTQuMC4zJmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9MTAwMCZxPTgwXCIgXG4gICAgICAgICAgICBhbHQ9XCJDaG9jb2xhdGUgTWFraW5nXCIgXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIG9wYWNpdHktNDBcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTZcIj5cbiAgICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL2lrLmltYWdla2l0LmlvL3Zpc3RhZGlnaXRhbHMvU3Zhc2hpY2FsaXMvbG9nby1zdmFzaGljYWxpcy13aGl0ZS5wbmdcIiBhbHQ9XCJTdmFzaGljYWxpc1wiIGNsYXNzTmFtZT1cInctYXV0byBoLTI0IG9iamVjdC1jb250YWluXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtNHhsIGZvbnQtYm9sZCBtYi00IGxlYWRpbmctdGlnaHRcIj5NYXN0ZXIgdGhlIEFydCBvZiBDaG9jb2xhdGUgTWFuYWdlbWVudDwvaDE+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTEwMCB0ZXh0LWxnXCI+U3RyZWFtbGluZSBvcmRlcnMsIG1hbmFnZSBpbnZlbnRvcnksIGFuZCBkZWxpZ2h0IGN1c3RvbWVycyB3aXRoIG91ciBwcmVtaXVtIEVSUCBzb2x1dGlvbi48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTEwIHRleHQtYmFzZSB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICBEZXZlbG9wZWQgYnkgU2FuanVzcmVlIC0gVmlzdGFEaWdpdGFscy5jb21cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFJpZ2h0IFNpZGUgLSBMb2dpbiBGb3JtICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtZDp3LTEvMiBwLTggbWQ6cC0xMiBmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyIGJnLXdoaXRlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBtZDp0ZXh0LWxlZnQgbWItOFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZDpoaWRkZW4gZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgbWItNlwiPlxuICAgICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vaWsuaW1hZ2VraXQuaW8vdmlzdGFkaWdpdGFscy9TdmFzaGljYWxpcy9sb2dvLXN2YXNoaWNhbGlzLnBuZ1wiIGFsdD1cIlN2YXNoaWNhbGlzXCIgY2xhc3NOYW1lPVwidy02NCBoLWF1dG8gb2JqZWN0LWNvbnRhaW4gbWItMlwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMFwiPldlbGNvbWUgQmFjazwvaDI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwIG10LTJcIj5QbGVhc2UgZW50ZXIgeW91ciBkZXRhaWxzIHRvIHNpZ24gaW4uPC9wPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIj5Vc2VybmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCBsZWZ0LTAgcGwtMyBmbGV4IGl0ZW1zLWNlbnRlciBwb2ludGVyLWV2ZW50cy1ub25lXCI+XG4gICAgICAgICAgICAgICAgICA8VXNlckljb24gc2l6ZT17MTh9IGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXt1c2VybmFtZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VXNlcm5hbWUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmxvY2sgdy1mdWxsIHBsLTEwIHByLTMgcHktMyBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiB0cmFuc2l0aW9uIGlucHV0LXJlc3BvbnNpdmUgYmctd2hpdGUgdGV4dC1ibGFja1wiXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgdXNlcm5hbWVcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiPlBhc3N3b3JkPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIGxlZnQtMCBwbC0zIGZsZXggaXRlbXMtY2VudGVyIHBvaW50ZXItZXZlbnRzLW5vbmVcIj5cbiAgICAgICAgICAgICAgICAgIDxMb2NrIHNpemU9ezE4fSBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9e3Nob3dQYXNzd29yZCA/IFwidGV4dFwiIDogXCJwYXNzd29yZFwifVxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtwYXNzd29yZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UGFzc3dvcmQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmxvY2sgdy1mdWxsIHBsLTEwIHByLTEwIHB5LTMgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgdHJhbnNpdGlvbiBpbnB1dC1yZXNwb25zaXZlIGJnLXdoaXRlIHRleHQtYmxhY2tcIlxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLigKLigKLigKLigKLigKLigKLigKLigKJcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93UGFzc3dvcmQoIXNob3dQYXNzd29yZCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBwci0zIGZsZXggaXRlbXMtY2VudGVyIHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC1ncmF5LTYwMFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3Nob3dQYXNzd29yZCA/IDxFeWVPZmYgc2l6ZT17MTh9IC8+IDogPEV5ZSBzaXplPXsxOH0gLz59XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHtlcnJvciAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctcmVkLTUwIHRleHQtcmVkLTYwMCBwLTMgcm91bmRlZC1sZyB0ZXh0LXNtIGZsZXggaXRlbXMtY2VudGVyIGFuaW1hdGUtZmFkZS1pblwiPlxuICAgICAgICAgICAgICAgIDxBbGVydENpcmNsZSBzaXplPXsxNn0gY2xhc3NOYW1lPVwibXItMiBmbGV4LXNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICB7ZXJyb3J9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzU3VibWl0dGluZyB8fCBsb2FkaW5nfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgcHktMyBweC00IGJvcmRlciBib3JkZXItdHJhbnNwYXJlbnQgcm91bmRlZC1sZyBzaGFkb3ctc20gdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LXdoaXRlIGJnLWFtYmVyLTYwMCBob3ZlcjpiZy1hbWJlci03MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLW9mZnNldC0yIGZvY3VzOnJpbmctYW1iZXItNTAwIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgKGlzU3VibWl0dGluZyB8fCBsb2FkaW5nKSA/ICdvcGFjaXR5LTcwIGN1cnNvci13YWl0JyA6ICcnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7KGlzU3VibWl0dGluZyB8fCBsb2FkaW5nKSA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctNSBoLTUgYm9yZGVyLTIgYm9yZGVyLXdoaXRlIGJvcmRlci10LXRyYW5zcGFyZW50IHJvdW5kZWQtZnVsbCBhbmltYXRlLXNwaW5cIj48L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgU2lnbiBJbiA8QXJyb3dSaWdodCBzaXplPXsxNn0gY2xhc3NOYW1lPVwibWwtMlwiIC8+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Zvcm0+XG5cbiAgICAgICAgICB7LyogUXVpY2sgTG9naW4gZm9yIERlbW8gKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC04IHB0LTYgYm9yZGVyLXQgYm9yZGVyLWdyYXktMTAwXCI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtY2VudGVyIHRleHQtZ3JheS00MDAgbWItMyB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIj5RdWljayBEZW1vIExvZ2luPC9wPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGRlbW9Mb2dpbihSb2xlLkFETUlOKX0gY2xhc3NOYW1lPVwidGV4dC14cyBiZy1ncmF5LTEwMCBob3ZlcjpiZy1ncmF5LTIwMCB0ZXh0LWdyYXktNjAwIHB4LTMgcHktMSByb3VuZGVkIHRyYW5zaXRpb25cIj5BZG1pbjwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGRlbW9Mb2dpbihSb2xlLlNBTEVTX0VYRUNVVElWRSl9IGNsYXNzTmFtZT1cInRleHQteHMgYmctZ3JheS0xMDAgaG92ZXI6YmctZ3JheS0yMDAgdGV4dC1ncmF5LTYwMCBweC0zIHB5LTEgcm91bmRlZCB0cmFuc2l0aW9uXCI+U2FsZXM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBkZW1vTG9naW4oUm9sZS5ERUxJVkVSWV9QRVJTT04pfSBjbGFzc05hbWU9XCJ0ZXh0LXhzIGJnLWdyYXktMTAwIGhvdmVyOmJnLWdyYXktMjAwIHRleHQtZ3JheS02MDAgcHgtMyBweS0xIHJvdW5kZWQgdHJhbnNpdGlvblwiPkRlbGl2ZXJ5PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2luO1xuIl0sImZpbGUiOiIvYXBwL2FwcGxldC9wYWdlcy9Mb2dpbi50c3gifQ==