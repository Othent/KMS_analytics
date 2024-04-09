import React from "react";
import { useTransactions } from "@/contexts/TransactionsContext";

const InputBox: React.FC = () => {
  const { tags, setTags } = useTransactions();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "name" | "value",
  ) => {
    const newTags = [...tags];
    newTags[index] = { ...newTags[index], [field]: e.target.value };
    setTags(newTags);
  };

  const handleDeleteTag = (index: number) => {
    const newTags = tags.filter((_, tagIndex) => tagIndex !== index);
    setTags(newTags);
  };

  return (
    <div>
      {tags.map((tag, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            type="text"
            value={tag.name}
            onChange={(e) => handleInputChange(e, index, "name")}
            placeholder="Tag Name"
          />
          <input
            type="text"
            value={tag.value}
            onChange={(e) => handleInputChange(e, index, "value")}
            placeholder="Tag Value"
          />
          <button onClick={() => handleDeleteTag(index)}>Delete Tag</button>
        </div>
      ))}
      <button onClick={() => setTags([...tags, { name: "", value: "" }])}>
        Add Tag
      </button>
    </div>
  );
};

export default InputBox;
