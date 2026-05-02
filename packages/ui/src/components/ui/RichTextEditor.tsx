"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Undo,
  Redo,
} from "lucide-react";

interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const toggleClass = (isActive: boolean) =>
    `p-1.5 rounded-md transition-colors ${
      isActive
        ? "bg-[#3B82F6]/20 text-[#3B82F6]"
        : "text-slate-400 hover:text-white hover:bg-slate-800"
    }`;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-700 bg-[#1E293B] rounded-t-xl shrink-0">
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        className={toggleClass(editor.isActive("bold"))}
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        className={toggleClass(editor.isActive("italic"))}
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleUnderline().run();
        }}
        className={toggleClass(editor.isActive("underline"))}
        title="Underline"
      >
        <UnderlineIcon className="w-4 h-4" />
      </button>

      <div className="w-px h-4 bg-slate-700 mx-1" />

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
        className={toggleClass(editor.isActive("heading", { level: 1 }))}
        title="Heading 1"
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        className={toggleClass(editor.isActive("heading", { level: 2 }))}
        title="Heading 2"
      >
        <Heading2 className="w-4 h-4" />
      </button>

      <div className="w-px h-4 bg-slate-700 mx-1" />

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        className={toggleClass(editor.isActive("bulletList"))}
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={toggleClass(editor.isActive("orderedList"))}
        title="Ordered List"
      >
        <ListOrdered className="w-4 h-4" />
      </button>

      <div className="w-px h-4 bg-slate-700 mx-1" />

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
        className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().redo().run();
        }}
        className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <Redo className="w-4 h-4" />
      </button>
    </div>
  );
};

export function RichTextEditor({
  label,
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-sm sm:prose-base focus:outline-none min-h-[150px] p-4 bg-[#0B1120]/50 rounded-b-xl text-slate-300",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-300">{label}</label>
      )}
      <div className="border border-slate-700 rounded-xl focus-within:border-[#3B82F6]/50 focus-within:ring-1 focus-within:ring-[#3B82F6]/50 transition-all bg-[#0B1120]">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
