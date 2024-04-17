import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    ArrowsUpDownIcon,
    CheckIcon,
    EyeIcon,
    EyeSlashIcon,
    PencilIcon,
} from "@heroicons/react/20/solid";
import {
    KitchenSinkToolbar,
    MDXEditor,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
} from "@mdxeditor/editor";
import '@mdxeditor/editor/style.css';
import { useState } from "react";
import Markdown from "react-markdown";

type BlockProps = {
  id: string;
  children: string;
  revealed: boolean;
  onUpdate: (content: string, revealed: boolean) => void;
};

function Block({ id, children, revealed, onUpdate }: Readonly<BlockProps>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id });

  const [content, setContent] = useState(children);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`${revealed ? "text-black" : "text-gray-400"} flex gap-4`}
    >
      <div className=" flex gap-2 text-black">
        <button ref={setActivatorNodeRef} {...listeners} {...attributes}>
          <ArrowsUpDownIcon className="w-4 h-4" />
        </button>
        {revealed && (
          <button title="Hide" onClick={() => onUpdate(content, false)}>
            <EyeSlashIcon className="w-4 h-4" />
          </button>
        )}
        {!revealed && (
          <button title="Show" onClick={() => onUpdate(content, true)}>
            <EyeIcon className="w-4 h-4" />
          </button>
        )}
        {isEditing && (
          <button
            onClick={() => {
              onUpdate(content, revealed);
              setIsEditing(false);
            }}
          >
            <CheckIcon className="w-4 h-4" />
          </button>
        )}
        {!isEditing && (
          <button onClick={() => setIsEditing(true)}>
            <PencilIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {!isEditing && (
        <div>
          <Markdown>{content}</Markdown>
        </div>
      )}
      {isEditing && (
        <MDXEditor
          className="w-full"
          markdown={content}
          onChange={(markdown) => setContent(markdown)}
          plugins={[
            toolbarPlugin({
                toolbarContents: () => <KitchenSinkToolbar />
            }),
            headingsPlugin(),
            quotePlugin(),
            listsPlugin(),
            thematicBreakPlugin(),
          ]}
        />
      )}
    </div>
  );
}

export default Block;
