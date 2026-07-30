import React, { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eye,
  Edit3,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormatting = (prefix: string, suffix: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end) || defaultText;
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newValue =
      textarea.value.substring(0, start) + replacement + textarea.value.substring(end);

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 0);
  };

  const handleLink = () => {
    const url = prompt("Enter link URL:", "https://");
    if (url) {
      insertFormatting("[", `](${url})`, "Link Text");
    }
  };

  const handleImage = () => {
    // Create hidden file input for inline PNG/JPG upload
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg, image/jpg, image/webp";
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (uploadEvent) => {
          const resultUrl = uploadEvent.target?.result as string;
          if (resultUrl) {
            insertFormatting(`<img src="${resultUrl}" alt="${file.name.replace(/\.[^/.]+$/, "")}" class="rounded-xl my-4 max-h-96 w-full object-cover shadow-sm" />\n`, "", "");
          }
        };
        reader.readAsDataURL(file);
      }
    };

    const choice = confirm("Click 'OK' to upload a PNG/JPG image file from your computer, or 'Cancel' to enter an Image URL.");
    if (choice) {
      input.click();
    } else {
      const url = prompt("Enter Image URL:", "https://");
      if (url && url !== "https://") {
        insertFormatting(`<img src="${url}" alt="Blog Image" class="rounded-xl my-4 max-h-96 w-full object-cover shadow-sm" />\n`, "", "");
      }
    }
  };

  const handleTable = () => {
    const tableTemplate = `\n| Header 1 | Header 2 | Header 3 |\n| --- | --- | --- |\n| Row 1 Col 1 | Row 1 Col 2 | Row 1 Col 3 |\n| Row 2 Col 1 | Row 2 Col 2 | Row 2 Col 3 |\n`;
    insertFormatting(tableTemplate, "", "");
  };

  return (
    <div className="border border-slate-300 rounded-xl overflow-hidden bg-white shadow-xs">
      {/* Editor Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center justify-between gap-1.5 text-slate-700">
        <div className="flex flex-wrap items-center gap-1">
          {/* Headings */}
          <button
            type="button"
            title="Heading 1"
            onClick={() => insertFormatting("# ", "", "Heading 1")}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Heading 2"
            onClick={() => insertFormatting("## ", "", "Heading 2")}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Heading 3"
            onClick={() => insertFormatting("### ", "", "Heading 3")}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
          >
            <Heading3 className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-5 bg-slate-300 mx-1" />

          {/* Text Style */}
          <button
            type="button"
            title="Bold"
            onClick={() => insertFormatting("**", "**", "bold text")}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Italic"
            onClick={() => insertFormatting("*", "*", "italic text")}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Underline"
            onClick={() => insertFormatting("<u>", "</u>", "underlined text")}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
          >
            <Underline className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-5 bg-slate-300 mx-1" />

          {/* Lists */}
          <button
            type="button"
            title="Bullet List"
            onClick={() => insertFormatting("- ", "", "List item")}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Numbered List"
            onClick={() => insertFormatting("1. ", "", "List item")}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-5 bg-slate-300 mx-1" />

          {/* Media & Formatting */}
          <button
            type="button"
            title="Insert Link"
            onClick={handleLink}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Insert Image"
            onClick={handleImage}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Insert Table"
            onClick={handleTable}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
          >
            <TableIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Quote"
            onClick={() => insertFormatting("> ", "", "Quote text")}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Code Block"
            onClick={() => insertFormatting("```\n", "\n```", "code block")}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
          >
            <Code className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-5 bg-slate-300 mx-1" />

          {/* Alignment */}
          <button
            type="button"
            title="Align Left"
            onClick={() => insertFormatting('<div align="left">\n', "\n</div>", "Left aligned text")}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Align Center"
            onClick={() => insertFormatting('<div align="center">\n', "\n</div>", "Centered text")}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Align Right"
            onClick={() => insertFormatting('<div align="right">\n', "\n</div>", "Right aligned text")}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all ${
              activeTab === "edit" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all ${
              activeTab === "preview" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Textarea or Live Preview */}
      {activeTab === "edit" ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Write blog content here... Supports Markdown & HTML formatting."}
          rows={14}
          className="w-full p-4 text-sm font-mono text-slate-800 bg-white focus:outline-hidden resize-y leading-relaxed"
        />
      ) : (
        <div className="p-6 bg-slate-50 min-h-[300px] prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed overflow-y-auto">
          {value ? (
            <div
              className="space-y-3 whitespace-pre-wrap font-sans"
              dangerouslySetInnerHTML={{
                __html: value
                  .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-slate-900 mt-4 mb-2">$1</h3>')
                  .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-slate-900 mt-6 mb-3">$1</h2>')
                  .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-slate-900 mt-6 mb-3">$1</h1>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-[#0F2D63] pl-4 py-1 italic bg-blue-50/50 my-3 text-slate-700">$1</blockquote>')
                  .replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs overflow-x-auto my-3">$1</pre>')
                  .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="rounded-xl my-4 max-h-96 object-cover shadow-sm" />')
                  .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-[#0F2D63] font-semibold underline">$1</a>'),
              }}
            />
          ) : (
            <p className="text-slate-400 italic">Nothing to preview yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
