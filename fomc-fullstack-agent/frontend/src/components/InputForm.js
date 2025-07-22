import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
export function InputForm({ onSubmit, isLoading, context = 'homepage' }) {
    const [inputValue, setInputValue] = useState("");
    const textareaRef = useRef(null);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() && !isLoading) {
            onSubmit(inputValue.trim());
            setInputValue("");
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };
    const placeholderText = context === 'chat'
        ? "Respond to the Agent, refine the plan, or type 'Looks good'..."
        : "Ask me anything... e.g., A report on the latest Google I/O";
    return (_jsx("form", { onSubmit: handleSubmit, className: "flex flex-col gap-2", children: _jsxs("div", { className: "flex items-end space-x-2", children: [_jsx(Textarea, { ref: textareaRef, value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyDown: handleKeyDown, placeholder: placeholderText, rows: 1, className: "flex-1 resize-none pr-10 min-h-[40px]" }), _jsx(Button, { type: "submit", size: "icon", disabled: isLoading || !inputValue.trim(), children: isLoading ? _jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : _jsx(Send, { className: "h-4 w-4" }) })] }) }));
}
