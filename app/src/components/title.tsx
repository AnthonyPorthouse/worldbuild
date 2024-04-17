import {
    CheckIcon,
    PencilIcon
} from "@heroicons/react/20/solid";
import { useState } from "react";

type TitleProps = {
  title: string;
  onUpdate: (title: string) => void;
};

function Title({ title: initialTitle, onUpdate }: Readonly<TitleProps>) {
  const [title, setTitle] = useState(initialTitle);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={`flex gap-4`}>
      {!isEditing && <h1 className="text-2xl">{title}</h1>}
      {isEditing && (
        <input
          className="text-2xl w-full border rounded p-2 py-1"
          onChange={(e) => setTitle(e.currentTarget.value)}
          value={title}
        />
      )}
      <div className="w-10 flex gap-2">
        {isEditing && (
          <button
            onClick={() => {
              onUpdate(title);
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
    </div>
    
  );
}

export default Title;
