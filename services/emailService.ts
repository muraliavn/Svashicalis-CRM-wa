import.meta.env = {"BASE_URL": "/", "DEV": true, "MODE": "development", "PROD": false, "SSR": false, "VITE_API_KEY": "sb_publishable_7kv-JoWvsuuUL9XGj40YIg_d4U-U0YU", "VITE_BREVO_API_KEY": "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", "VITE_FAST2SMS_API_KEY": "78BQ6vJZthOpqfPioUKs5Hd4nNIT3gzWymAG1Fb9MlVYcESu2eg3AUCoHtE6vZb41KBL5Pe79mDMGjq2", "VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlaG5qYnVpaWtqcHllenFnZ3llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5MzY1NjUsImV4cCI6MjA5NzUxMjU2NX0.qXKHyUmX6z3X1Y1TGIGAy4yT5H0DxvVHQSOIk2YEP84", "VITE_SUPABASE_URL": "https://behnjbuiikjpyezqggye.supabase.co"};import { formatDate } from "/services/dateFormatter.ts";
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const DEFAULT_BREVO_KEY = "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";
const SENDER_EMAIL = "muraliavninfo@gmail.com";
const ADMIN_EMAIL = "admin@svashicalis.com";
const getApiKey = () => {
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_BREVO_API_KEY) {
    return import.meta.env.VITE_BREVO_API_KEY;
  }
  if (typeof process !== "undefined" && process.env?.VITE_BREVO_API_KEY) {
    return process.env.VITE_BREVO_API_KEY;
  }
  return DEFAULT_BREVO_KEY;
};
const API_KEY = getApiKey();
const formatCurrency = (val) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(val);
const sendBrevoEmail = async (payload) => {
  if (!API_KEY) {
    console.warn("⚠️ Email Sending Skipped: Missing API Key.");
    return { success: false, wasBlocked: true, message: "Missing API Key" };
  }
  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      const err = await response.json();
      if (err.message && err.message.includes("unrecognised IP address")) {
        console.warn("💡 Brevo Security Notice: IP Address not authorized.");
        return { success: false, wasBlocked: true, message: "Blocked by Brevo IP Security" };
      }
      if (err.message && (err.message.includes("not enabled") || err.code === "unauthorized")) {
        console.warn("💡 Brevo Account Notice: Account or Sender not authorized.");
        return { success: false, wasBlocked: true, message: "Account/Sender Not Authorized" };
      }
      console.error("❌ Brevo API Error Details:", JSON.stringify(err, null, 2));
      return { success: false, message: err.message || "Unknown API Error" };
    }
    console.log("✅ Email sent successfully via Brevo.");
    return { success: true, message: "Sent" };
  } catch (e) {
    console.error("❌ Network Error sending email:", e);
    return { success: false, message: e.message || "Network Error" };
  }
};
export const sendOrderEmail = async (order, customer, salesExecName) => {
  const itemsHtml = order.items.map((item) => `
    <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.productName}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${formatCurrency(item.priceAtTime * item.quantity)}</td>
    </tr>
  `).join("");
  const totalHtml = `
    <tr style="background-color: #f9f9f9; font-weight: bold;">
        <td colspan="2" style="padding: 8px; border: 1px solid #ddd; text-align: right;">Total Amount</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${formatCurrency(order.totalAmount)}</td>
    </tr>
  `;
  const commonCss = `font-family: Arial, sans-serif; color: #333; line-height: 1.6; font-size: 14px;`;
  let customerRes = { success: false, message: "No email provided" };
  if (customer.email) {
    const customerHtml = `
        <div style="${commonCss} max-width: 600px; margin: 0 auto;">
            <div style="background-color: #8d6e63; padding: 15px; text-align: center; color: white;">
                <h2 style="margin:0;">Order Confirmation</h2>
            </div>
            <div style="padding: 20px; border: 1px solid #ddd; border-top: none;">
                <p>Dear ${customer.ownerName},</p>
                <p>Thank you for choosing <strong>Svashicalis</strong>. We have received your order.</p>
                
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <thead style="background-color: #f2e8e5;">
                        <tr>
                            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Product</th>
                            <th style="padding: 10px; text-align: center; border: 1px solid #ddd;">Qty</th>
                            <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                        ${totalHtml}
                    </tbody>
                </table>
                
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Date:</strong> ${formatDate(order.date)}</p>
                <br/>
                <p>We will notify you once the order is dispatched.</p>
                <p>Regards,<br/><strong>Svashicalis Team</strong></p>
            </div>
        </div>
      `;
    customerRes = await sendBrevoEmail({
      sender: { name: "Svashicalis Orders", email: SENDER_EMAIL },
      to: [{ email: customer.email, name: customer.ownerName }],
      subject: `Order Confirmation #${order.id} - Svashicalis`,
      htmlContent: customerHtml
    });
  }
  const adminHtml = `
    <div style="${commonCss} max-width: 600px;">
        <h3 style="color: #3e2723; border-bottom: 2px solid #3e2723; padding-bottom: 5px;">[New Order] ${order.id}</h3>
        
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="margin: 5px 0;"><strong>Customer:</strong> ${customer.businessName} (${customer.ownerName})</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${customer.phone}">${customer.phone}</a></p>
            <p style="margin: 5px 0;"><strong>Sales Exec:</strong> ${salesExecName}</p>
            <p style="margin: 5px 0;"><strong>Total Value:</strong> ${formatCurrency(order.totalAmount)}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead style="background-color: #3e2723; color: white;">
                <tr>
                    <th style="padding: 8px; text-align: left;">Product</th>
                    <th style="padding: 8px; text-align: center;">Qty</th>
                    <th style="padding: 8px; text-align: right;">Total</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
                ${totalHtml}
            </tbody>
        </table>
        <p style="font-size: 12px; color: #777;">This is an automated notification from the Svashicalis ERP System.</p>
    </div>
  `;
  const adminRes = await sendBrevoEmail({
    sender: { name: "Svashicalis System", email: SENDER_EMAIL },
    to: [{ email: ADMIN_EMAIL, name: "Admin" }],
    subject: `New Order: ${customer.businessName} - ${formatCurrency(order.totalAmount)}`,
    htmlContent: adminHtml
  });
  return { customer: customerRes, admin: adminRes };
};
export const getMailtoLink = (order, customer, salesExecName) => {
  const subject = `Order Confirmation #${order.id} - Svashicalis`;
  const itemsList = order.items.map((i) => `${i.productName} (x${i.quantity}) - ₹${i.quantity * i.priceAtTime}`).join("%0D%0A");
  const body = `Dear ${customer.ownerName},%0D%0A%0D%0AThank you for your order with Svashicalis!%0D%0A%0D%0AOrder ID: ${order.id}%0D%0ADate: ${formatDate(order.date)}%0D%0ASales Executive: ${salesExecName}%0D%0A%0D%0AItems:%0D%0A${itemsList}%0D%0A%0D%0ATotal Amount: ₹${order.totalAmount.toFixed(2)}%0D%0A%0D%0ARegards,%0D%0ASvashicalis Team%0D%0Aadmin@svashicalis.com`;
  return `mailto:${customer.email}?subject=${encodeURIComponent(subject)}&body=${body}&bcc=${ADMIN_EMAIL}`;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVtYWlsU2VydmljZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE9yZGVyLCBCdXNpbmVzc093bmVyIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZm9ybWF0RGF0ZSB9IGZyb20gJy4vZGF0ZUZvcm1hdHRlcic7XG5cbi8vIC0tLSBDT05GSUdVUkFUSU9OIC0tLVxuY29uc3QgQlJFVk9fQVBJX1VSTCA9ICdodHRwczovL2FwaS5icmV2by5jb20vdjMvc210cC9lbWFpbCc7XG5cbi8vIENyZWRlbnRpYWxzIHByb3ZpZGVkIGJ5IHVzZXJcbmNvbnN0IERFRkFVTFRfQlJFVk9fS0VZID0gJ3hrZXlzaWItMmU0M2VjYmQxYzY5YzNmMTY3Njg3YzZmZTNmOTBjMGRlMjdiNzlmMzExNTIyZTA4ZTJjOWI4YzZiODlkNGE2Yi1CZFA0WEFsUk1RRklKOWtpJztcbmNvbnN0IFNFTkRFUl9FTUFJTCA9ICdtdXJhbGlhdm5pbmZvQGdtYWlsLmNvbSc7XG5jb25zdCBBRE1JTl9FTUFJTCA9ICdhZG1pbkBzdmFzaGljYWxpcy5jb20nO1xuXG4vLyBIZWxwZXIgdG8gZ2V0IEFQSSBLZXkgc2FmZWx5IGZyb20gdmFyaW91cyBlbnYgc291cmNlc1xuY29uc3QgZ2V0QXBpS2V5ID0gKCkgPT4ge1xuICAvLyBAdHMtaWdub3JlXG4gIGlmICh0eXBlb2YgaW1wb3J0Lm1ldGEgIT09ICd1bmRlZmluZWQnICYmIGltcG9ydC5tZXRhLmVudj8uVklURV9CUkVWT19BUElfS0VZKSB7XG4gICAgIC8vIEB0cy1pZ25vcmVcbiAgICByZXR1cm4gaW1wb3J0Lm1ldGEuZW52LlZJVEVfQlJFVk9fQVBJX0tFWTtcbiAgfVxuICAvLyBAdHMtaWdub3JlXG4gIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5lbnY/LlZJVEVfQlJFVk9fQVBJX0tFWSkge1xuICAgIHJldHVybiBwcm9jZXNzLmVudi5WSVRFX0JSRVZPX0FQSV9LRVk7XG4gIH1cbiAgcmV0dXJuIERFRkFVTFRfQlJFVk9fS0VZO1xufTtcblxuY29uc3QgQVBJX0tFWSA9IGdldEFwaUtleSgpO1xuXG4vLyAtLS0gVFlQRVMgLS0tXG5leHBvcnQgaW50ZXJmYWNlIEVtYWlsUmVzcG9uc2Uge1xuICBzdWNjZXNzOiBib29sZWFuO1xuICB3YXNCbG9ja2VkPzogYm9vbGVhbjsgLy8gVHJ1ZSBpZiBibG9ja2VkIGJ5IElQL0FjY291bnQgc3RhdHVzXG4gIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbWFpbFJlc3VsdCB7XG4gICAgY3VzdG9tZXI6IEVtYWlsUmVzcG9uc2U7XG4gICAgYWRtaW46IEVtYWlsUmVzcG9uc2U7XG59XG5cbi8vIC0tLSBIRUxQRVJTIC0tLVxuY29uc3QgZm9ybWF0Q3VycmVuY3kgPSAodmFsOiBudW1iZXIpID0+IFxuICBuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLUlOJywgeyBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6ICdJTlInIH0pLmZvcm1hdCh2YWwpO1xuXG4vKipcbiAqIEdlbmVyaWMgZnVuY3Rpb24gdG8gc2VuZCBlbWFpbCB2aWEgQnJldm8gQVBJXG4gKi9cbmNvbnN0IHNlbmRCcmV2b0VtYWlsID0gYXN5bmMgKHBheWxvYWQ6IGFueSk6IFByb21pc2U8RW1haWxSZXNwb25zZT4gPT4ge1xuICAgIGlmICghQVBJX0tFWSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCLimqDvuI8gRW1haWwgU2VuZGluZyBTa2lwcGVkOiBNaXNzaW5nIEFQSSBLZXkuXCIpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgd2FzQmxvY2tlZDogdHJ1ZSwgbWVzc2FnZTogXCJNaXNzaW5nIEFQSSBLZXlcIiB9OyBcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKEJSRVZPX0FQSV9VUkwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdhY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ2FwaS1rZXknOiBBUElfS0VZLFxuICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSGFuZGxlIFwiVW5yZWNvZ25pc2VkIElQIEFkZHJlc3NcIiAtIFRoaXMgaXMgdGhlIG1vc3QgY29tbW9uIGVycm9yIGluIGRldlxuICAgICAgICAgICAgaWYgKGVyci5tZXNzYWdlICYmIGVyci5tZXNzYWdlLmluY2x1ZGVzKFwidW5yZWNvZ25pc2VkIElQIGFkZHJlc3NcIikpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCLwn5KhIEJyZXZvIFNlY3VyaXR5IE5vdGljZTogSVAgQWRkcmVzcyBub3QgYXV0aG9yaXplZC5cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHdhc0Jsb2NrZWQ6IHRydWUsIG1lc3NhZ2U6IFwiQmxvY2tlZCBieSBCcmV2byBJUCBTZWN1cml0eVwiIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEhhbmRsZSBcIkFjY291bnQgbm90IGFjdGl2YXRlZFwiXG4gICAgICAgICAgICBpZiAoZXJyLm1lc3NhZ2UgJiYgKGVyci5tZXNzYWdlLmluY2x1ZGVzKFwibm90IGVuYWJsZWRcIikgfHwgZXJyLmNvZGUgPT09IFwidW5hdXRob3JpemVkXCIpKSB7XG4gICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIvCfkqEgQnJldm8gQWNjb3VudCBOb3RpY2U6IEFjY291bnQgb3IgU2VuZGVyIG5vdCBhdXRob3JpemVkLlwiKTtcbiAgICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHdhc0Jsb2NrZWQ6IHRydWUsIG1lc3NhZ2U6IFwiQWNjb3VudC9TZW5kZXIgTm90IEF1dGhvcml6ZWRcIiB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi4p2MIEJyZXZvIEFQSSBFcnJvciBEZXRhaWxzOlwiLCBKU09OLnN0cmluZ2lmeShlcnIsIG51bGwsIDIpKTtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnIubWVzc2FnZSB8fCBcIlVua25vd24gQVBJIEVycm9yXCIgfTsgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKFwi4pyFIEVtYWlsIHNlbnQgc3VjY2Vzc2Z1bGx5IHZpYSBCcmV2by5cIik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IFwiU2VudFwiIH07XG5cbiAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIuKdjCBOZXR3b3JrIEVycm9yIHNlbmRpbmcgZW1haWw6XCIsIGUpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZS5tZXNzYWdlIHx8IFwiTmV0d29yayBFcnJvclwiIH07XG4gICAgfVxufTtcblxuXG4vLyAtLS0gTUFJTiBGVU5DVElPTiAtLS1cbmV4cG9ydCBjb25zdCBzZW5kT3JkZXJFbWFpbCA9IGFzeW5jIChcbiAgb3JkZXI6IE9yZGVyLFxuICBjdXN0b21lcjogQnVzaW5lc3NPd25lcixcbiAgc2FsZXNFeGVjTmFtZTogc3RyaW5nXG4pOiBQcm9taXNlPEVtYWlsUmVzdWx0PiA9PiB7XG5cbiAgLy8gLS0tIEhUTUwgQ09NUE9ORU5UUyAtLS1cbiAgY29uc3QgaXRlbXNIdG1sID0gb3JkZXIuaXRlbXMubWFwKGl0ZW0gPT4gYFxuICAgIDx0cj5cbiAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzogOHB4OyBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1wiPiR7aXRlbS5wcm9kdWN0TmFtZX08L3RkPlxuICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOiA4cHg7IGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7IHRleHQtYWxpZ246IGNlbnRlcjtcIj4ke2l0ZW0ucXVhbnRpdHl9PC90ZD5cbiAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzogOHB4OyBib3JkZXI6IDFweCBzb2xpZCAjZGRkOyB0ZXh0LWFsaWduOiByaWdodDtcIj4ke2Zvcm1hdEN1cnJlbmN5KGl0ZW0ucHJpY2VBdFRpbWUgKiBpdGVtLnF1YW50aXR5KX08L3RkPlxuICAgIDwvdHI+XG4gIGApLmpvaW4oJycpO1xuXG4gIGNvbnN0IHRvdGFsSHRtbCA9IGBcbiAgICA8dHIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5OyBmb250LXdlaWdodDogYm9sZDtcIj5cbiAgICAgICAgPHRkIGNvbHNwYW49XCIyXCIgc3R5bGU9XCJwYWRkaW5nOiA4cHg7IGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7IHRleHQtYWxpZ246IHJpZ2h0O1wiPlRvdGFsIEFtb3VudDwvdGQ+XG4gICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6IDhweDsgYm9yZGVyOiAxcHggc29saWQgI2RkZDsgdGV4dC1hbGlnbjogcmlnaHQ7XCI+JHtmb3JtYXRDdXJyZW5jeShvcmRlci50b3RhbEFtb3VudCl9PC90ZD5cbiAgICA8L3RyPlxuICBgO1xuXG4gIGNvbnN0IGNvbW1vbkNzcyA9IGBmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7IGNvbG9yOiAjMzMzOyBsaW5lLWhlaWdodDogMS42OyBmb250LXNpemU6IDE0cHg7YDtcblxuICAvLyAxLiBTZW5kIHRvIEN1c3RvbWVyIChPbmx5IGlmIGVtYWlsIGV4aXN0cylcbiAgbGV0IGN1c3RvbWVyUmVzOiBFbWFpbFJlc3BvbnNlID0geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJObyBlbWFpbCBwcm92aWRlZFwiIH07XG4gIFxuICBpZiAoY3VzdG9tZXIuZW1haWwpIHtcbiAgICAgIGNvbnN0IGN1c3RvbWVySHRtbCA9IGBcbiAgICAgICAgPGRpdiBzdHlsZT1cIiR7Y29tbW9uQ3NzfSBtYXgtd2lkdGg6IDYwMHB4OyBtYXJnaW46IDAgYXV0bztcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjOGQ2ZTYzOyBwYWRkaW5nOiAxNXB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IGNvbG9yOiB3aGl0ZTtcIj5cbiAgICAgICAgICAgICAgICA8aDIgc3R5bGU9XCJtYXJnaW46MDtcIj5PcmRlciBDb25maXJtYXRpb248L2gyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwicGFkZGluZzogMjBweDsgYm9yZGVyOiAxcHggc29saWQgI2RkZDsgYm9yZGVyLXRvcDogbm9uZTtcIj5cbiAgICAgICAgICAgICAgICA8cD5EZWFyICR7Y3VzdG9tZXIub3duZXJOYW1lfSw8L3A+XG4gICAgICAgICAgICAgICAgPHA+VGhhbmsgeW91IGZvciBjaG9vc2luZyA8c3Ryb25nPlN2YXNoaWNhbGlzPC9zdHJvbmc+LiBXZSBoYXZlIHJlY2VpdmVkIHlvdXIgb3JkZXIuPC9wPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDx0YWJsZSBzdHlsZT1cIndpZHRoOiAxMDAlOyBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlOyBtYXJnaW46IDIwcHggMDtcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogI2YyZThlNTtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9XCJwYWRkaW5nOiAxMHB4OyB0ZXh0LWFsaWduOiBsZWZ0OyBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1wiPlByb2R1Y3Q8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT1cInBhZGRpbmc6IDEwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcIj5RdHk8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT1cInBhZGRpbmc6IDEwcHg7IHRleHQtYWxpZ246IHJpZ2h0OyBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1wiPlByaWNlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICR7aXRlbXNIdG1sfVxuICAgICAgICAgICAgICAgICAgICAgICAgJHt0b3RhbEh0bWx9XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8cD48c3Ryb25nPk9yZGVyIElEOjwvc3Ryb25nPiAke29yZGVyLmlkfTwvcD5cbiAgICAgICAgICAgICAgICA8cD48c3Ryb25nPkRhdGU6PC9zdHJvbmc+ICR7Zm9ybWF0RGF0ZShvcmRlci5kYXRlKX08L3A+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICA8cD5XZSB3aWxsIG5vdGlmeSB5b3Ugb25jZSB0aGUgb3JkZXIgaXMgZGlzcGF0Y2hlZC48L3A+XG4gICAgICAgICAgICAgICAgPHA+UmVnYXJkcyw8YnIvPjxzdHJvbmc+U3Zhc2hpY2FsaXMgVGVhbTwvc3Ryb25nPjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIGA7XG5cbiAgICAgIGN1c3RvbWVyUmVzID0gYXdhaXQgc2VuZEJyZXZvRW1haWwoe1xuICAgICAgICAgIHNlbmRlcjogeyBuYW1lOiBcIlN2YXNoaWNhbGlzIE9yZGVyc1wiLCBlbWFpbDogU0VOREVSX0VNQUlMIH0sXG4gICAgICAgICAgdG86IFt7IGVtYWlsOiBjdXN0b21lci5lbWFpbCwgbmFtZTogY3VzdG9tZXIub3duZXJOYW1lIH1dLFxuICAgICAgICAgIHN1YmplY3Q6IGBPcmRlciBDb25maXJtYXRpb24gIyR7b3JkZXIuaWR9IC0gU3Zhc2hpY2FsaXNgLFxuICAgICAgICAgIGh0bWxDb250ZW50OiBjdXN0b21lckh0bWxcbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gMi4gU2VuZCB0byBBZG1pblxuICBjb25zdCBhZG1pbkh0bWwgPSBgXG4gICAgPGRpdiBzdHlsZT1cIiR7Y29tbW9uQ3NzfSBtYXgtd2lkdGg6IDYwMHB4O1wiPlxuICAgICAgICA8aDMgc3R5bGU9XCJjb2xvcjogIzNlMjcyMzsgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICMzZTI3MjM7IHBhZGRpbmctYm90dG9tOiA1cHg7XCI+W05ldyBPcmRlcl0gJHtvcmRlci5pZH08L2gzPlxuICAgICAgICBcbiAgICAgICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQ6ICNmNWY1ZjU7IHBhZGRpbmc6IDE1cHg7IGJvcmRlci1yYWRpdXM6IDVweDsgbWFyZ2luOiAxNXB4IDA7XCI+XG4gICAgICAgICAgICA8cCBzdHlsZT1cIm1hcmdpbjogNXB4IDA7XCI+PHN0cm9uZz5DdXN0b21lcjo8L3N0cm9uZz4gJHtjdXN0b21lci5idXNpbmVzc05hbWV9ICgke2N1c3RvbWVyLm93bmVyTmFtZX0pPC9wPlxuICAgICAgICAgICAgPHAgc3R5bGU9XCJtYXJnaW46IDVweCAwO1wiPjxzdHJvbmc+UGhvbmU6PC9zdHJvbmc+IDxhIGhyZWY9XCJ0ZWw6JHtjdXN0b21lci5waG9uZX1cIj4ke2N1c3RvbWVyLnBob25lfTwvYT48L3A+XG4gICAgICAgICAgICA8cCBzdHlsZT1cIm1hcmdpbjogNXB4IDA7XCI+PHN0cm9uZz5TYWxlcyBFeGVjOjwvc3Ryb25nPiAke3NhbGVzRXhlY05hbWV9PC9wPlxuICAgICAgICAgICAgPHAgc3R5bGU9XCJtYXJnaW46IDVweCAwO1wiPjxzdHJvbmc+VG90YWwgVmFsdWU6PC9zdHJvbmc+ICR7Zm9ybWF0Q3VycmVuY3kob3JkZXIudG90YWxBbW91bnQpfTwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPHRhYmxlIHN0eWxlPVwid2lkdGg6IDEwMCU7IGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7IG1hcmdpbjogMjBweCAwO1wiPlxuICAgICAgICAgICAgPHRoZWFkIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzNlMjcyMzsgY29sb3I6IHdoaXRlO1wiPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPVwicGFkZGluZzogOHB4OyB0ZXh0LWFsaWduOiBsZWZ0O1wiPlByb2R1Y3Q8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9XCJwYWRkaW5nOiA4cHg7IHRleHQtYWxpZ246IGNlbnRlcjtcIj5RdHk8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9XCJwYWRkaW5nOiA4cHg7IHRleHQtYWxpZ246IHJpZ2h0O1wiPlRvdGFsPC90aD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAke2l0ZW1zSHRtbH1cbiAgICAgICAgICAgICAgICAke3RvdGFsSHRtbH1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvdGFibGU+XG4gICAgICAgIDxwIHN0eWxlPVwiZm9udC1zaXplOiAxMnB4OyBjb2xvcjogIzc3NztcIj5UaGlzIGlzIGFuIGF1dG9tYXRlZCBub3RpZmljYXRpb24gZnJvbSB0aGUgU3Zhc2hpY2FsaXMgRVJQIFN5c3RlbS48L3A+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgY29uc3QgYWRtaW5SZXMgPSBhd2FpdCBzZW5kQnJldm9FbWFpbCh7XG4gICAgICBzZW5kZXI6IHsgbmFtZTogXCJTdmFzaGljYWxpcyBTeXN0ZW1cIiwgZW1haWw6IFNFTkRFUl9FTUFJTCB9LFxuICAgICAgdG86IFt7IGVtYWlsOiBBRE1JTl9FTUFJTCwgbmFtZTogXCJBZG1pblwiIH1dLFxuICAgICAgc3ViamVjdDogYE5ldyBPcmRlcjogJHtjdXN0b21lci5idXNpbmVzc05hbWV9IC0gJHtmb3JtYXRDdXJyZW5jeShvcmRlci50b3RhbEFtb3VudCl9YCxcbiAgICAgIGh0bWxDb250ZW50OiBhZG1pbkh0bWxcbiAgfSk7XG5cbiAgcmV0dXJuIHsgY3VzdG9tZXI6IGN1c3RvbWVyUmVzLCBhZG1pbjogYWRtaW5SZXMgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRNYWlsdG9MaW5rID0gKG9yZGVyOiBPcmRlciwgY3VzdG9tZXI6IEJ1c2luZXNzT3duZXIsIHNhbGVzRXhlY05hbWU6IHN0cmluZykgPT4ge1xuICBjb25zdCBzdWJqZWN0ID0gYE9yZGVyIENvbmZpcm1hdGlvbiAjJHtvcmRlci5pZH0gLSBTdmFzaGljYWxpc2A7XG4gIGNvbnN0IGl0ZW1zTGlzdCA9IG9yZGVyLml0ZW1zXG4gICAgLm1hcChpID0+IGAke2kucHJvZHVjdE5hbWV9ICh4JHtpLnF1YW50aXR5fSkgLSDigrkke2kucXVhbnRpdHkgKiBpLnByaWNlQXRUaW1lfWApXG4gICAgLmpvaW4oJyUwRCUwQScpOyAvLyBVUkwgZW5jb2RlZCBuZXdsaW5lc1xuXG4gIGNvbnN0IGJvZHkgPSBgRGVhciAke2N1c3RvbWVyLm93bmVyTmFtZX0sJTBEJTBBJTBEJTBBVGhhbmsgeW91IGZvciB5b3VyIG9yZGVyIHdpdGggU3Zhc2hpY2FsaXMhJTBEJTBBJTBEJTBBT3JkZXIgSUQ6ICR7b3JkZXIuaWR9JTBEJTBBRGF0ZTogJHtmb3JtYXREYXRlKG9yZGVyLmRhdGUpfSUwRCUwQVNhbGVzIEV4ZWN1dGl2ZTogJHtzYWxlc0V4ZWNOYW1lfSUwRCUwQSUwRCUwQUl0ZW1zOiUwRCUwQSR7aXRlbXNMaXN0fSUwRCUwQSUwRCUwQVRvdGFsIEFtb3VudDog4oK5JHtvcmRlci50b3RhbEFtb3VudC50b0ZpeGVkKDIpfSUwRCUwQSUwRCUwQVJlZ2FyZHMsJTBEJTBBU3Zhc2hpY2FsaXMgVGVhbSUwRCUwQWFkbWluQHN2YXNoaWNhbGlzLmNvbWA7XG5cbiAgLy8gQWRkZWQgQkNDIHRvIGFkbWluXG4gIHJldHVybiBgbWFpbHRvOiR7Y3VzdG9tZXIuZW1haWx9P3N1YmplY3Q9JHtlbmNvZGVVUklDb21wb25lbnQoc3ViamVjdCl9JmJvZHk9JHtib2R5fSZiY2M9JHtBRE1JTl9FTUFJTH1gO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBRUEsU0FBUyxrQkFBa0I7QUFHM0IsTUFBTSxnQkFBZ0I7QUFHdEIsTUFBTSxvQkFBb0I7QUFDMUIsTUFBTSxlQUFlO0FBQ3JCLE1BQU0sY0FBYztBQUdwQixNQUFNLFlBQVksTUFBTTtBQUV0QixNQUFJLE9BQU8sZ0JBQWdCLGVBQWUsWUFBWSxLQUFLLG9CQUFvQjtBQUU3RSxXQUFPLFlBQVksSUFBSTtBQUFBLEVBQ3pCO0FBRUEsTUFBSSxPQUFPLFlBQVksZUFBZSxRQUFRLEtBQUssb0JBQW9CO0FBQ3JFLFdBQU8sUUFBUSxJQUFJO0FBQUEsRUFDckI7QUFDQSxTQUFPO0FBQ1Q7QUFFQSxNQUFNLFVBQVUsVUFBVTtBQWUxQixNQUFNLGlCQUFpQixDQUFDLFFBQ3RCLElBQUksS0FBSyxhQUFhLFNBQVMsRUFBRSxPQUFPLFlBQVksVUFBVSxNQUFNLENBQUMsRUFBRSxPQUFPLEdBQUc7QUFLbkYsTUFBTSxpQkFBaUIsT0FBTyxZQUF5QztBQUNuRSxNQUFJLENBQUMsU0FBUztBQUNWLFlBQVEsS0FBSyw0Q0FBNEM7QUFDekQsV0FBTyxFQUFFLFNBQVMsT0FBTyxZQUFZLE1BQU0sU0FBUyxrQkFBa0I7QUFBQSxFQUMxRTtBQUVBLE1BQUk7QUFDQSxVQUFNLFdBQVcsTUFBTSxNQUFNLGVB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