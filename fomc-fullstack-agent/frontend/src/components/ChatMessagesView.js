import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Copy, CopyCheck } from "lucide-react";
import { InputForm } from "@/components/InputForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { cn } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { ActivityTimeline } from "@/components/ActivityTimeline";
// Markdown components (from former ReportView.tsx)
const mdComponents = {
    h1: ({ className, children, ...props }) => (_jsx("h1", { className: cn("text-2xl font-bold mt-4 mb-2", className), ...props, children: children })),
    h2: ({ className, children, ...props }) => (_jsx("h2", { className: cn("text-xl font-bold mt-3 mb-2", className), ...props, children: children })),
    h3: ({ className, children, ...props }) => (_jsx("h3", { className: cn("text-lg font-bold mt-3 mb-1", className), ...props, children: children })),
    p: ({ className, children, ...props }) => (_jsx("p", { className: cn("mb-3 leading-7", className), ...props, children: children })),
    a: ({ className, children, href, ...props }) => (_jsx(Badge, { className: "text-xs mx-0.5", children: _jsx("a", { className: cn("text-blue-400 hover:text-blue-300 text-xs", className), href: href, target: "_blank", rel: "noopener noreferrer", ...props, children: children }) })),
    ul: ({ className, children, ...props }) => (_jsx("ul", { className: cn("list-disc pl-6 mb-3", className), ...props, children: children })),
    ol: ({ className, children, ...props }) => (_jsx("ol", { className: cn("list-decimal pl-6 mb-3", className), ...props, children: children })),
    li: ({ className, children, ...props }) => (_jsx("li", { className: cn("mb-1", className), ...props, children: children })),
    blockquote: ({ className, children, ...props }) => (_jsx("blockquote", { className: cn("border-l-4 border-neutral-600 pl-4 italic my-3 text-sm", className), ...props, children: children })),
    code: ({ className, children, ...props }) => (_jsx("code", { className: cn("bg-neutral-900 rounded px-1 py-0.5 font-mono text-xs", className), ...props, children: children })),
    pre: ({ className, children, ...props }) => (_jsx("pre", { className: cn("bg-neutral-900 p-3 rounded-lg overflow-x-auto font-mono text-xs my-3", className), ...props, children: children })),
    hr: ({ className, ...props }) => (_jsx("hr", { className: cn("border-neutral-600 my-4", className), ...props })),
    table: ({ className, children, ...props }) => (_jsx("div", { className: "my-3 overflow-x-auto", children: _jsx("table", { className: cn("border-collapse w-full", className), ...props, children: children }) })),
    th: ({ className, children, ...props }) => (_jsx("th", { className: cn("border border-neutral-600 px-3 py-2 text-left font-bold", className), ...props, children: children })),
    td: ({ className, children, ...props }) => (_jsx("td", { className: cn("border border-neutral-600 px-3 py-2", className), ...props, children: children })),
};
// HumanMessageBubble Component
const HumanMessageBubble = ({ message, mdComponents, }) => {
    return (_jsx("div", { className: "text-white rounded-3xl break-words min-h-7 bg-neutral-700 max-w-[100%] sm:max-w-[90%] px-4 pt-3 rounded-br-lg", children: _jsx(ReactMarkdown, { components: mdComponents, remarkPlugins: [remarkGfm], children: message.content }) }));
};
// AiMessageBubble Component
const AiMessageBubble = ({ message, mdComponents, handleCopy, copiedMessageId, agent, finalReportWithCitations, processedEvents, websiteCount, isLoading, }) => {
    // Show ActivityTimeline if we have processedEvents (this will be the first AI message)
    const shouldShowTimeline = processedEvents.length > 0;
    // Condition for DIRECT DISPLAY (interactive_planner_agent OR final report)
    const shouldDisplayDirectly = agent === "interactive_planner_agent" ||
        (agent === "report_composer_with_citations" && finalReportWithCitations);
    if (shouldDisplayDirectly) {
        // Direct display - show content with copy button, and timeline if available
        return (_jsxs("div", { className: "relative break-words flex flex-col w-full", children: [shouldShowTimeline && agent === "interactive_planner_agent" && (_jsx("div", { className: "w-full mb-2", children: _jsx(ActivityTimeline, { processedEvents: processedEvents, isLoading: isLoading, websiteCount: websiteCount }) })), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "flex-1", children: _jsx(ReactMarkdown, { components: mdComponents, remarkPlugins: [remarkGfm], children: message.content }) }), _jsx("button", { onClick: () => handleCopy(message.content, message.id), className: "p-1 hover:bg-neutral-700 rounded", children: copiedMessageId === message.id ? (_jsx(CopyCheck, { className: "h-4 w-4 text-green-500" })) : (_jsx(Copy, { className: "h-4 w-4 text-neutral-400" })) })] })] }));
    }
    else if (shouldShowTimeline) {
        // First AI message with timeline only (no direct content display)
        return (_jsxs("div", { className: "relative break-words flex flex-col w-full", children: [_jsx("div", { className: "w-full", children: _jsx(ActivityTimeline, { processedEvents: processedEvents, isLoading: isLoading, websiteCount: websiteCount }) }), message.content && message.content.trim() && agent !== "interactive_planner_agent" && (_jsxs("div", { className: "flex items-start gap-3 mt-2", children: [_jsx("div", { className: "flex-1", children: _jsx(ReactMarkdown, { components: mdComponents, remarkPlugins: [remarkGfm], children: message.content }) }), _jsx("button", { onClick: () => handleCopy(message.content, message.id), className: "p-1 hover:bg-neutral-700 rounded", children: copiedMessageId === message.id ? (_jsx(CopyCheck, { className: "h-4 w-4 text-green-500" })) : (_jsx(Copy, { className: "h-4 w-4 text-neutral-400" })) })] }))] }));
    }
    else {
        // Fallback for other messages - just show content
        return (_jsx("div", { className: "relative break-words flex flex-col w-full", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "flex-1", children: _jsx(ReactMarkdown, { components: mdComponents, remarkPlugins: [remarkGfm], children: message.content }) }), _jsx("button", { onClick: () => handleCopy(message.content, message.id), className: "p-1 hover:bg-neutral-700 rounded", children: copiedMessageId === message.id ? (_jsx(CopyCheck, { className: "h-4 w-4 text-green-500" })) : (_jsx(Copy, { className: "h-4 w-4 text-neutral-400" })) })] }) }));
    }
};
export function ChatMessagesView({ messages, isLoading, scrollAreaRef, onSubmit, onCancel, messageEvents, websiteCount, }) {
    const [copiedMessageId, setCopiedMessageId] = useState(null);
    const handleCopy = async (text, messageId) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedMessageId(messageId);
            setTimeout(() => setCopiedMessageId(null), 2000);
        }
        catch (err) {
            console.error("Failed to copy text:", err);
        }
    };
    const handleNewChat = () => {
        window.location.reload();
    };
    // Find the ID of the last AI message
    const lastAiMessage = messages.slice().reverse().find(m => m.type === "ai");
    const lastAiMessageId = lastAiMessage?.id;
    return (_jsxs("div", { className: "flex flex-col h-full w-full", children: [_jsx("div", { className: "border-b border-neutral-700 p-4 bg-neutral-800", children: _jsxs("div", { className: "max-w-4xl mx-auto flex justify-between items-center", children: [_jsx("h1", { className: "text-lg font-semibold text-neutral-100", children: "Chat" }), _jsx(Button, { onClick: handleNewChat, variant: "outline", className: "bg-neutral-700 hover:bg-neutral-600 text-neutral-100 border-neutral-600 hover:border-neutral-500", children: "New Chat" })] }) }), _jsx("div", { className: "flex-1 flex flex-col w-full", children: _jsx(ScrollArea, { ref: scrollAreaRef, className: "flex-1 w-full", children: _jsxs("div", { className: "p-4 md:p-6 space-y-2 max-w-4xl mx-auto", children: [messages.map((message) => {
                                const eventsForMessage = message.type === "ai" ? (messageEvents.get(message.id) || []) : [];
                                // Determine if the current AI message is the last one
                                const isCurrentMessageTheLastAiMessage = message.type === "ai" && message.id === lastAiMessageId;
                                return (_jsx("div", { className: `flex ${message.type === "human" ? "justify-end" : "justify-start"}`, children: message.type === "human" ? (_jsx(HumanMessageBubble, { message: message, mdComponents: mdComponents })) : (_jsx(AiMessageBubble, { message: message, mdComponents: mdComponents, handleCopy: handleCopy, copiedMessageId: copiedMessageId, agent: message.agent, finalReportWithCitations: message.finalReportWithCitations, processedEvents: eventsForMessage, 
                                        // MODIFIED: Pass websiteCount only if it's the last AI message
                                        websiteCount: isCurrentMessageTheLastAiMessage ? websiteCount : 0, 
                                        // MODIFIED: Pass isLoading only if it's the last AI message and global isLoading is true
                                        isLoading: isCurrentMessageTheLastAiMessage && isLoading })) }, message.id));
                            }), isLoading && !lastAiMessage && messages.some(m => m.type === 'human') && (_jsx("div", { className: "flex justify-start", children: _jsxs("div", { className: "flex items-center gap-2 text-neutral-400", children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin" }), _jsx("span", { children: "Thinking..." })] }) })), isLoading && messages.length > 0 && messages[messages.length - 1].type === 'human' && (_jsxs("div", { className: "flex justify-start pl-10 pt-2", children: [" ", _jsxs("div", { className: "flex items-center gap-2 text-neutral-400", children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin" }), _jsx("span", { children: "Thinking..." })] })] }))] }) }) }), _jsx("div", { className: "border-t border-neutral-700 p-4 w-full", children: _jsxs("div", { className: "max-w-3xl mx-auto", children: [_jsx(InputForm, { onSubmit: onSubmit, isLoading: isLoading, context: "chat" }), isLoading && (_jsx("div", { className: "mt-4 flex justify-center", children: _jsx(Button, { variant: "outline", onClick: onCancel, className: "text-red-400 hover:text-red-300", children: "Cancel" }) }))] }) })] }));
}
