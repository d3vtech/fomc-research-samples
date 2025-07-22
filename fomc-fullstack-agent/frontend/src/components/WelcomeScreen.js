import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { InputForm } from "@/components/InputForm";
export function WelcomeScreen({ handleSubmit, isLoading, onCancel, }) {
    return (
    // This container fills the space provided by its parent layout (e.g., the left panel in a split view)
    // and centers its content (the card) within itself.
    _jsx("div", { className: "flex-1 flex flex-col items-center justify-center p-4 overflow-hidden relative", children: _jsxs("div", { className: "w-full max-w-2xl z-10\n                      bg-neutral-900/50 backdrop-blur-md \n                      p-8 rounded-2xl border border-neutral-700 \n                      shadow-2xl shadow-black/60 \n                      transition-all duration-300 hover:border-neutral-600", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsx("h1", { className: "text-4xl font-bold text-white flex items-center justify-center gap-3", children: "\u2728 Gemini FullStack - ADK \uD83D\uDE80" }), _jsx("p", { className: "text-lg text-neutral-300 max-w-md mx-auto", children: "Turns your questions into comprehensive reports!" })] }), _jsxs("div", { className: "mt-8", children: [_jsx(InputForm, { onSubmit: handleSubmit, isLoading: isLoading, context: "homepage" }), isLoading && (_jsx("div", { className: "mt-4 flex justify-center", children: _jsx(Button, { variant: "outline", onClick: onCancel, className: "text-red-400 hover:text-red-300 hover:bg-red-900/20 border-red-700/50" // Enhanced cancel button
                                , children: "Cancel" }) }))] })] }) }));
}
