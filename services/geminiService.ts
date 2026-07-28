import { GoogleGenAI } from "/node_modules/.vite/deps/@google_genai.js?v=76d1f7a8";
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
export const generateSalesInsight = async (orders, products) => {
  const orderSummary = orders.map(
    (o) => `Date: ${o.date}, Amount: ₹${o.totalAmount}, Status: ${o.status}, Items: ${o.items.map((i) => i.productName).join(", ")}`
  ).join("\n");
  const productSummary = products.map((p) => `${p.name} (Stock: ${p.stock})`).join(", ");
  const prompt = `
    Act as a senior business analyst for a chocolate manufacturing company.
    Analyze the following recent order data and inventory status.
    Provide 3 key insights or recommendations to improve sales or logistics.
    Keep it concise and professional.
    
    Orders:
    ${orderSummary}

    Products in Inventory:
    ${productSummary}
  `;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt
    });
    return response.text || "No insights generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate insights at this time.";
  }
};
export const generateCustomerEmail = async (customer, lastOrder, salesExecName) => {
  const logoUrl = "https://ik.imagekit.io/vistadigitals/Svashicalis/logo-svashicalis.png";
  let context = `
    Client Business: ${customer.businessName}
    Owner Name: ${customer.ownerName}
    GST Number: ${customer.gst}
  `;
  let prompt = "";
  if (lastOrder) {
    const itemList = lastOrder.items.map((i) => `- ${i.productName} (Qty: ${i.quantity}) @ ₹${i.priceAtTime} = ₹${i.quantity * i.priceAtTime}`).join("\n");
    context += `
      Last Order ID: ${lastOrder.id}
      Order Date: ${lastOrder.date}
      Total Amount: ₹${lastOrder.totalAmount}
      Items:
      ${itemList}
      Sales Executive: ${salesExecName || "The Svashicalis Team"}
    `;
    prompt = `
      Act as ${salesExecName || "a Sales Executive"} from Svashicalis (Professional Quality of Chocolates).
      Write a professional HTML formatted email to the client containing an order summary/bill for their recent purchase.
      
      Requirements:
      1. Include the Svashicalis logo at the top: <img src="${logoUrl}" width="150" alt="Svashicalis Logo" />
      2. Polite greeting to ${customer.ownerName}.
      3. Acknowledgment of the order from ${customer.businessName}.
      4. A neat HTML list or table summarizing the items, quantities, and prices.
      5. The Total Amount clearly displayed.
      6. Mention that the order is ${lastOrder.status}.
      7. Professional closing from ${salesExecName || "Svashicalis Team"}.
      
      Do not include \`\`\`html code blocks, just return the raw HTML body content starting with a <div>.
      Context Data:
      ${context}
    `;
  } else {
    prompt = `
      Act as a Sales Executive from Svashicalis (Professional Quality of Chocolates).
      Write a professional HTML formatted welcome email for a new business client.
      
      Requirements:
      1. Include the Svashicalis logo at the top: <img src="${logoUrl}" width="150" alt="Svashicalis Logo" />
      2. Warm welcome to ${customer.ownerName} and ${customer.businessName}.
      3. Encourage them to place their first wholesale order.
      4. Professional closing.
      
      Do not include \`\`\`html code blocks, just return the raw HTML body content starting with a <div>.
    `;
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });
    return response.text || "Draft generation failed.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating email draft.";
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdlbWluaVNlcnZpY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG4vLyBGaXg6IENvcnJlY3QgaW1wb3J0IGZvciBHb29nbGVHZW5BSSBTREtcbmltcG9ydCB7IEdvb2dsZUdlbkFJIH0gZnJvbSBcIkBnb29nbGUvZ2VuYWlcIjtcbmltcG9ydCB7IE9yZGVyLCBCdXNpbmVzc093bmVyLCBQcm9kdWN0IH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vLyBGaXg6IEluaXRpYWxpemluZyBHb29nbGVHZW5BSSBjbGllbnQgd2l0aCB0aGUgcmVxdWlyZWQgcGFyYW1ldGVyIG9iamVjdCBzdHJ1Y3R1cmVcbmNvbnN0IGFpID0gbmV3IEdvb2dsZUdlbkFJKHsgYXBpS2V5OiBwcm9jZXNzLmVudi5BUElfS0VZIH0pO1xuXG4vKipcbiAqIEdlbmVyYXRlcyBzYWxlcyBpbnNpZ2h0cyBiYXNlZCBvbiBjdXJyZW50IG9yZGVycyBhbmQgaW52ZW50b3J5XG4gKi9cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVNhbGVzSW5zaWdodCA9IGFzeW5jIChvcmRlcnM6IE9yZGVyW10sIHByb2R1Y3RzOiBQcm9kdWN0W10pOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICBjb25zdCBvcmRlclN1bW1hcnkgPSBvcmRlcnMubWFwKG8gPT4gXG4gICAgYERhdGU6ICR7by5kYXRlfSwgQW1vdW50OiDigrkke28udG90YWxBbW91bnR9LCBTdGF0dXM6ICR7by5zdGF0dXN9LCBJdGVtczogJHtvLml0ZW1zLm1hcChpID0+IGkucHJvZHVjdE5hbWUpLmpvaW4oJywgJyl9YFxuICApLmpvaW4oJ1xcbicpO1xuXG4gIGNvbnN0IHByb2R1Y3RTdW1tYXJ5ID0gcHJvZHVjdHMubWFwKHAgPT4gYCR7cC5uYW1lfSAoU3RvY2s6ICR7cC5zdG9ja30pYCkuam9pbignLCAnKTtcblxuICBjb25zdCBwcm9tcHQgPSBgXG4gICAgQWN0IGFzIGEgc2VuaW9yIGJ1c2luZXNzIGFuYWx5c3QgZm9yIGEgY2hvY29sYXRlIG1hbnVmYWN0dXJpbmcgY29tcGFueS5cbiAgICBBbmFseXplIHRoZSBmb2xsb3dpbmcgcmVjZW50IG9yZGVyIGRhdGEgYW5kIGludmVudG9yeSBzdGF0dXMuXG4gICAgUHJvdmlkZSAzIGtleSBpbnNpZ2h0cyBvciByZWNvbW1lbmRhdGlvbnMgdG8gaW1wcm92ZSBzYWxlcyBvciBsb2dpc3RpY3MuXG4gICAgS2VlcCBpdCBjb25jaXNlIGFuZCBwcm9mZXNzaW9uYWwuXG4gICAgXG4gICAgT3JkZXJzOlxuICAgICR7b3JkZXJTdW1tYXJ5fVxuXG4gICAgUHJvZHVjdHMgaW4gSW52ZW50b3J5OlxuICAgICR7cHJvZHVjdFN1bW1hcnl9XG4gIGA7XG5cbiAgdHJ5IHtcbiAgICAvLyBGaXg6IFVzaW5nIGdlbWluaS0zLXByby1wcmV2aWV3IGZvciBjb21wbGV4IGJ1c2luZXNzIGFuYWx5c2lzIHRhc2tzXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhaS5tb2RlbHMuZ2VuZXJhdGVDb250ZW50KHtcbiAgICAgIG1vZGVsOiBcImdlbWluaS0zLXByby1wcmV2aWV3XCIsXG4gICAgICBjb250ZW50czogcHJvbXB0LFxuICAgIH0pO1xuICAgIC8vIEZpeDogVXNpbmcgcmVzcG9uc2UudGV4dCBwcm9wZXJ0eSBpbnN0ZWFkIG9mIG1ldGhvZFxuICAgIHJldHVybiByZXNwb25zZS50ZXh0IHx8IFwiTm8gaW5zaWdodHMgZ2VuZXJhdGVkLlwiO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJHZW1pbmkgQVBJIEVycm9yOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIFwiVW5hYmxlIHRvIGdlbmVyYXRlIGluc2lnaHRzIGF0IHRoaXMgdGltZS5cIjtcbiAgfVxufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgcHJvZmVzc2lvbmFsIGVtYWlsIGRyYWZ0cyBmb3IgY3VzdG9tZXJzXG4gKi9cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUN1c3RvbWVyRW1haWwgPSBhc3luYyAoXG4gIGN1c3RvbWVyOiBCdXNpbmVzc093bmVyLCBcbiAgbGFzdE9yZGVyPzogT3JkZXIsXG4gIHNhbGVzRXhlY05hbWU/OiBzdHJpbmdcbik6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIFxuICBjb25zdCBsb2dvVXJsID0gXCJodHRwczovL2lrLmltYWdla2l0LmlvL3Zpc3RhZGlnaXRhbHMvU3Zhc2hpY2FsaXMvbG9nby1zdmFzaGljYWxpcy5wbmdcIjtcbiAgXG4gIGxldCBjb250ZXh0ID0gYFxuICAgIENsaWVudCBCdXNpbmVzczogJHtjdXN0b21lci5idXNpbmVzc05hbWV9XG4gICAgT3duZXIgTmFtZTogJHtjdXN0b21lci5vd25lck5hbWV9XG4gICAgR1NUIE51bWJlcjogJHtjdXN0b21lci5nc3R9XG4gIGA7XG5cbiAgbGV0IHByb21wdCA9IFwiXCI7XG5cbiAgaWYgKGxhc3RPcmRlcikge1xuICAgIGNvbnN0IGl0ZW1MaXN0ID0gbGFzdE9yZGVyLml0ZW1zLm1hcChpID0+IGAtICR7aS5wcm9kdWN0TmFtZX0gKFF0eTogJHtpLnF1YW50aXR5fSkgQCDigrkke2kucHJpY2VBdFRpbWV9ID0g4oK5JHtpLnF1YW50aXR5ICogaS5wcmljZUF0VGltZX1gKS5qb2luKCdcXG4nKTtcbiAgICBcbiAgICBjb250ZXh0ICs9IGBcbiAgICAgIExhc3QgT3JkZXIgSUQ6ICR7bGFzdE9yZGVyLmlkfVxuICAgICAgT3JkZXIgRGF0ZTogJHtsYXN0T3JkZXIuZGF0ZX1cbiAgICAgIFRvdGFsIEFtb3VudDog4oK5JHtsYXN0T3JkZXIudG90YWxBbW91bnR9XG4gICAgICBJdGVtczpcbiAgICAgICR7aXRlbUxpc3R9XG4gICAgICBTYWxlcyBFeGVjdXRpdmU6ICR7c2FsZXNFeGVjTmFtZSB8fCAnVGhlIFN2YXNoaWNhbGlzIFRlYW0nfVxuICAgIGA7XG5cbiAgICBwcm9tcHQgPSBgXG4gICAgICBBY3QgYXMgJHtzYWxlc0V4ZWNOYW1lIHx8ICdhIFNhbGVzIEV4ZWN1dGl2ZSd9IGZyb20gU3Zhc2hpY2FsaXMgKFByb2Zlc3Npb25hbCBRdWFsaXR5IG9mIENob2NvbGF0ZXMpLlxuICAgICAgV3JpdGUgYSBwcm9mZXNzaW9uYWwgSFRNTCBmb3JtYXR0ZWQgZW1haWwgdG8gdGhlIGNsaWVudCBjb250YWluaW5nIGFuIG9yZGVyIHN1bW1hcnkvYmlsbCBmb3IgdGhlaXIgcmVjZW50IHB1cmNoYXNlLlxuICAgICAgXG4gICAgICBSZXF1aXJlbWVudHM6XG4gICAgICAxLiBJbmNsdWRlIHRoZSBTdmFzaGljYWxpcyBsb2dvIGF0IHRoZSB0b3A6IDxpbWcgc3JjPVwiJHtsb2dvVXJsfVwiIHdpZHRoPVwiMTUwXCIgYWx0PVwiU3Zhc2hpY2FsaXMgTG9nb1wiIC8+XG4gICAgICAyLiBQb2xpdGUgZ3JlZXRpbmcgdG8gJHtjdXN0b21lci5vd25lck5hbWV9LlxuICAgICAgMy4gQWNrbm93bGVkZ21lbnQgb2YgdGhlIG9yZGVyIGZyb20gJHtjdXN0b21lci5idXNpbmVzc05hbWV9LlxuICAgICAgNC4gQSBuZWF0IEhUTUwgbGlzdCBvciB0YWJsZSBzdW1tYXJpemluZyB0aGUgaXRlbXMsIHF1YW50aXRpZXMsIGFuZCBwcmljZXMuXG4gICAgICA1LiBUaGUgVG90YWwgQW1vdW50IGNsZWFybHkgZGlzcGxheWVkLlxuICAgICAgNi4gTWVudGlvbiB0aGF0IHRoZSBvcmRlciBpcyAke2xhc3RPcmRlci5zdGF0dXN9LlxuICAgICAgNy4gUHJvZmVzc2lvbmFsIGNsb3NpbmcgZnJvbSAke3NhbGVzRXhlY05hbWUgfHwgJ1N2YXNoaWNhbGlzIFRlYW0nfS5cbiAgICAgIFxuICAgICAgRG8gbm90IGluY2x1ZGUgXFxgXFxgXFxgaHRtbCBjb2RlIGJsb2NrcywganVzdCByZXR1cm4gdGhlIHJhdyBIVE1MIGJvZHkgY29udGVudCBzdGFydGluZyB3aXRoIGEgPGRpdj4uXG4gICAgICBDb250ZXh0IERhdGE6XG4gICAgICAke2NvbnRleHR9XG4gICAgYDtcbiAgfSBlbHNlIHtcbiAgICAvLyBXZWxjb21lIEVtYWlsIEZhbGxiYWNrXG4gICAgcHJvbXB0ID0gYFxuICAgICAgQWN0IGFzIGEgU2FsZXMgRXhlY3V0aXZlIGZyb20gU3Zhc2hpY2FsaXMgKFByb2Zlc3Npb25hbCBRdWFsaXR5IG9mIENob2NvbGF0ZXMpLlxuICAgICAgV3JpdGUgYSBwcm9mZXNzaW9uYWwgSFRNTCBmb3JtYXR0ZWQgd2VsY29tZSBlbWFpbCBmb3IgYSBuZXcgYnVzaW5lc3MgY2xpZW50LlxuICAgICAgXG4gICAgICBSZXF1aXJlbWVudHM6XG4gICAgICAxLiBJbmNsdWRlIHRoZSBTdmFzaGljYWxpcyBsb2dvIGF0IHRoZSB0b3A6IDxpbWcgc3JjPVwiJHtsb2dvVXJsfVwiIHdpZHRoPVwiMTUwXCIgYWx0PVwiU3Zhc2hpY2FsaXMgTG9nb1wiIC8+XG4gICAgICAyLiBXYXJtIHdlbGNvbWUgdG8gJHtjdXN0b21lci5vd25lck5hbWV9IGFuZCAke2N1c3RvbWVyLmJ1c2luZXNzTmFtZX0uXG4gICAgICAzLiBFbmNvdXJhZ2UgdGhlbSB0byBwbGFjZSB0aGVpciBmaXJzdCB3aG9sZXNhbGUgb3JkZXIuXG4gICAgICA0LiBQcm9mZXNzaW9uYWwgY2xvc2luZy5cbiAgICAgIFxuICAgICAgRG8gbm90IGluY2x1ZGUgXFxgXFxgXFxgaHRtbCBjb2RlIGJsb2NrcywganVzdCByZXR1cm4gdGhlIHJhdyBIVE1MIGJvZHkgY29udGVudCBzdGFydGluZyB3aXRoIGEgPGRpdj4uXG4gICAgYDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gRml4OiBVc2luZyBnZW1pbmktMy1mbGFzaC1wcmV2aWV3IGZvciBnZW5lcmFsIHRleHQgZ2VuZXJhdGlvblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYWkubW9kZWxzLmdlbmVyYXRlQ29udGVudCh7XG4gICAgICBtb2RlbDogXCJnZW1pbmktMy1mbGFzaC1wcmV2aWV3XCIsXG4gICAgICBjb250ZW50czogcHJvbXB0LFxuICAgIH0pO1xuICAgIC8vIEZpeDogVXNpbmcgcmVzcG9uc2UudGV4dCBwcm9wZXJ0eVxuICAgIHJldHVybiByZXNwb25zZS50ZXh0IHx8IFwiRHJhZnQgZ2VuZXJhdGlvbiBmYWlsZWQuXCI7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkdlbWluaSBBUEkgRXJyb3I6XCIsIGVycm9yKTtcbiAgICByZXR1cm4gXCJFcnJvciBnZW5lcmF0aW5nIGVtYWlsIGRyYWZ0LlwiO1xuICB9XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFFQSxTQUFTLG1CQUFtQjtBQUk1QixNQUFNLEtBQUssSUFBSSxZQUFZLEVBQUUsUUFBUSxRQUFRLElBQUksUUFBUSxDQUFDO0FBS25ELGFBQU0sdUJBQXVCLE9BQU8sUUFBaUIsYUFBeUM7QUFDbkcsUUFBTSxlQUFlLE9BQU87QUFBQSxJQUFJLE9BQzlCLFNBQVMsRUFBRSxJQUFJLGNBQWMsRUFBRSxXQUFXLGFBQWEsRUFBRSxNQUFNLFlBQVksRUFBRSxNQUFNLElBQUksT0FBSyxFQUFFLFdBQVcsRUFBRSxLQUFLLElBQUksQ0FBQztBQUFBLEVBQ3ZILEVBQUUsS0FBSyxJQUFJO0FBRVgsUUFBTSxpQkFBaUIsU0FBUyxJQUFJLE9BQUssR0FBRyxFQUFFLElBQUksWUFBWSxFQUFFLEtBQUssR0FBRyxFQUFFLEtBQUssSUFBSTtBQUVuRixRQUFNLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQU9YLFlBQVk7QUFBQTtBQUFBO0FBQUEsTUFHWixjQUFjO0FBQUE7QUFHbEIsTUFBSTtBQUVGLFVBQU0sV0FBVyxNQUFNLEdBQUcsT0FBTyxnQkFBZ0I7QUFBQSxNQUMvQyxPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsSUFDWixDQUFDO0FBRUQsV0FBTyxTQUFTLFFBQVE7QUFBQSxFQUMxQixTQUFTLE9BQU87QUFDZCxZQUFRLE1BQU0scUJBQXFCLEtBQUs7QUFDeEMsV0FBTztBQUFBLEVBQ1Q7QUFDRjtBQUtPLGFBQU0sd0JBQXdCLE9BQ25DLFVBQ0EsV0FDQSxrQkFDb0I7QUFFcEIsUUFBTSxVQUFVO0FBRWhCLE1BQUksVUFBVTtBQUFBLHVCQUNPLFNBQVMsWUFBWTtBQUFBLGtCQUMxQixTQUFTLFNBQVM7QUFBQSxrQkFDbEIsU0FBUyxHQUFHO0FBQUE7QUFHNUIsTUFBSSxTQUFTO0FBRWIsTUFBSSxXQUFXO0FBQ2IsVUFBTSxXQUFXLFVBQVUsTUFBTSxJQUFJLE9BQUssS0FBSyxFQUFFLFdBQVcsVUFBVSxFQUFFLFFBQVEsUUFBUSxFQUFFLFdBQVcsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsRUFBRSxLQUFLLElBQUk7QUFFbkosZUFBVztBQUFBLHVCQUNRLFVBQVUsRUFBRTtBQUFBLG9CQUNmLFVBQVUsSUFBSTtBQUFBLHVCQUNYLFVBQVUsV0FBVztBQUFBO0FBQUEsUUFFcEMsUUFBUTtBQUFBLHlCQUNTLGlCQUFpQixzQkFBc0I7QUFBQTtBQUc1RCxhQUFTO0FBQUEsZUFDRSxpQkFBaUIsbUJBQW1CO0FBQUE7QUFBQTtBQUFBO0FBQUEsOERBSVcsT0FBTztBQUFBLDhCQUN2QyxTQUFTLFNBQVM7QUFBQSw0Q0FDSixTQUFTLFlBQVk7QUFBQTtBQUFBO0FBQUEscUNBRzVCLFVBQVUsTUFBTTtBQUFBLHFDQUNoQixpQkFBaUIsa0JBQWtCO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFJaEUsT0FBTztBQUFBO0FBQUEsRUFFYixPQUFPO0FBRUwsYUFBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOERBS2lELE9BQU87QUFBQSwyQkFDMUMsU0FBUyxTQUFTLFFBQVEsU0FBUyxZQUFZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTXhFO0FBRUEsTUFBSTtBQUVGLFVBQU0sV0FBVyxNQUFNLEdBQUcsT0FBTyxnQkFBZ0I7QUFBQSxNQUMvQyxPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsSUFDWixDQUFDO0FBRUQsV0FBTyxTQUFTLFFBQVE7QUFBQSxFQUMxQixTQUFTLE9BQU87QUFDZCxZQUFRLE1BQU0scUJBQXFCLEtBQUs7QUFDeEMsV0FBTztBQUFBLEVBQ1Q7QUFDRjsiLCJuYW1lcyI6W119