import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Activity, Info, Search, TextSearch, Brain, Pen, ChevronDown, ChevronUp, Link, } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
export function ActivityTimeline({ processedEvents, isLoading, websiteCount, }) {
    const [isTimelineCollapsed, setIsTimelineCollapsed] = useState(false);
    const formatEventData = (data) => {
        // Handle new structured data types
        if (typeof data === "object" && data !== null && data.type) {
            switch (data.type) {
                case 'functionCall':
                    return `Calling function: ${data.name}\nArguments: ${JSON.stringify(data.args, null, 2)}`;
                case 'functionResponse':
                    return `Function ${data.name} response:\n${JSON.stringify(data.response, null, 2)}`;
                case 'text':
                    return data.content;
                case 'sources':
                    const sources = data.content;
                    if (Object.keys(sources).length === 0) {
                        return "No sources found.";
                    }
                    return Object.values(sources)
                        .map(source => `[${source.title || 'Untitled Source'}](${source.url})`).join(', ');
                default:
                    return JSON.stringify(data, null, 2);
            }
        }
        // Existing logic for backward compatibility
        if (typeof data === "string") {
            // Try to parse as JSON first
            try {
                const parsed = JSON.parse(data);
                return JSON.stringify(parsed, null, 2);
            }
            catch {
                // If not JSON, return as string (could be markdown)
                return data;
            }
        }
        else if (Array.isArray(data)) {
            return data.join(", ");
        }
        else if (typeof data === "object" && data !== null) {
            return JSON.stringify(data, null, 2);
        }
        return String(data);
    };
    const isJsonData = (data) => {
        // Handle new structured data types
        if (typeof data === "object" && data !== null && data.type) {
            if (data.type === 'sources') {
                return false; // Let ReactMarkdown handle this
            }
            return data.type === 'functionCall' || data.type === 'functionResponse';
        }
        // Existing logic
        if (typeof data === "string") {
            try {
                JSON.parse(data);
                return true;
            }
            catch {
                return false;
            }
        }
        return typeof data === "object" && data !== null;
    };
    const getEventIcon = (title, index) => {
        if (index === 0 && isLoading && processedEvents.length === 0) {
            return _jsx(Loader2, { className: "h-4 w-4 text-neutral-400 animate-spin" });
        }
        if (title.toLowerCase().includes("function call")) {
            return _jsx(Activity, { className: "h-4 w-4 text-blue-400" });
        }
        else if (title.toLowerCase().includes("function response")) {
            return _jsx(Activity, { className: "h-4 w-4 text-green-400" });
        }
        else if (title.toLowerCase().includes("generating")) {
            return _jsx(TextSearch, { className: "h-4 w-4 text-neutral-400" });
        }
        else if (title.toLowerCase().includes("thinking")) {
            return _jsx(Loader2, { className: "h-4 w-4 text-neutral-400 animate-spin" });
        }
        else if (title.toLowerCase().includes("reflection")) {
            return _jsx(Brain, { className: "h-4 w-4 text-neutral-400" });
        }
        else if (title.toLowerCase().includes("research")) {
            return _jsx(Search, { className: "h-4 w-4 text-neutral-400" });
        }
        else if (title.toLowerCase().includes("finalizing")) {
            return _jsx(Pen, { className: "h-4 w-4 text-neutral-400" });
        }
        else if (title.toLowerCase().includes("retrieved sources")) {
            return _jsx(Link, { className: "h-4 w-4 text-yellow-400" });
        }
        return _jsx(Activity, { className: "h-4 w-4 text-neutral-400" });
    };
    useEffect(() => {
        if (!isLoading && processedEvents.length !== 0) {
            setIsTimelineCollapsed(true);
        }
    }, [isLoading, processedEvents]);
    return (_jsxs(Card, { className: `border-none rounded-lg bg-neutral-700 ${isTimelineCollapsed ? "h-10 py-2" : "max-h-96 py-2"}`, children: [_jsx(CardHeader, { className: "py-0", children: _jsx(CardDescription, { className: "flex items-center justify-between", children: _jsxs("div", { className: "flex items-center justify-start text-sm w-full cursor-pointer gap-2 text-neutral-100", onClick: () => setIsTimelineCollapsed(!isTimelineCollapsed), children: [_jsx("span", { children: "Research" }), websiteCount > 0 && (_jsxs("span", { className: "text-xs bg-neutral-600 px-2 py-0.5 rounded-full", children: [websiteCount, " websites"] })), isTimelineCollapsed ? (_jsx(ChevronDown, { className: "h-4 w-4 mr-2" })) : (_jsx(ChevronUp, { className: "h-4 w-4 mr-2" }))] }) }) }), !isTimelineCollapsed && (_jsx(ScrollArea, { className: "max-h-80 overflow-y-auto", children: _jsxs(CardContent, { children: [isLoading && processedEvents.length === 0 && (_jsxs("div", { className: "relative pl-8 pb-4", children: [_jsx("div", { className: "absolute left-3 top-3.5 h-full w-0.5 bg-neutral-800" }), _jsx("div", { className: "absolute left-0.5 top-2 h-5 w-5 rounded-full bg-neutral-800 flex items-center justify-center ring-4 ring-neutral-900", children: _jsx(Loader2, { className: "h-3 w-3 text-neutral-400 animate-spin" }) }), _jsx("div", { children: _jsx("p", { className: "text-sm text-neutral-300 font-medium", children: "Thinking..." }) })] })), processedEvents.length > 0 ? (_jsxs("div", { className: "space-y-0", children: [processedEvents.map((eventItem, index) => (_jsxs("div", { className: "relative pl-8 pb-4", children: [index < processedEvents.length - 1 ||
                                            (isLoading && index === processedEvents.length - 1) ? (_jsx("div", { className: "absolute left-3 top-3.5 h-full w-0.5 bg-neutral-600" })) : null, _jsx("div", { className: "absolute left-0.5 top-2 h-6 w-6 rounded-full bg-neutral-600 flex items-center justify-center ring-4 ring-neutral-700", children: getEventIcon(eventItem.title, index) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-neutral-200 font-medium mb-0.5", children: eventItem.title }), _jsx("div", { className: "text-xs text-neutral-300 leading-relaxed", children: isJsonData(eventItem.data) ? (_jsx("pre", { className: "bg-neutral-800 p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap", children: formatEventData(eventItem.data) })) : (_jsx(ReactMarkdown, { components: {
                                                            p: ({ children }) => _jsx("span", { children: children }),
                                                            a: ({ href, children }) => (_jsx("a", { href: href, target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:text-blue-300 underline", children: children })),
                                                            code: ({ children }) => (_jsx("code", { className: "bg-neutral-800 px-1 py-0.5 rounded text-xs", children: children })),
                                                        }, children: formatEventData(eventItem.data) })) })] })] }, index))), isLoading && processedEvents.length > 0 && (_jsxs("div", { className: "relative pl-8 pb-4", children: [_jsx("div", { className: "absolute left-0.5 top-2 h-5 w-5 rounded-full bg-neutral-600 flex items-center justify-center ring-4 ring-neutral-700", children: _jsx(Loader2, { className: "h-3 w-3 text-neutral-400 animate-spin" }) }), _jsx("div", { children: _jsx("p", { className: "text-sm text-neutral-300 font-medium", children: "Thinking..." }) })] }))] })) : !isLoading ? ( // Only show "No activity" if not loading and no events
                        _jsxs("div", { className: "flex flex-col items-center justify-center h-full text-neutral-500 pt-10", children: [_jsx(Info, { className: "h-6 w-6 mb-3" }), _jsx("p", { className: "text-sm", children: "No activity to display." }), _jsx("p", { className: "text-xs text-neutral-600 mt-1", children: "Timeline will update during processing." })] })) : null] }) }))] }));
}
