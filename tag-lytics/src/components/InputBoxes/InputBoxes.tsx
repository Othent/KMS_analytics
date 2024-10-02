import React from "react";
import { useTransactions } from "@/contexts/TransactionsContext";
import styles from "./inputBoxes.module.css";

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
    setTags(newTags.length ? newTags : [{ name: "", value: "" }]);
  };

  React.useEffect(() => {
    if (!tags.length) {
      setTags([{ name: "Test", value: "Test" }]);
    }
  }, [tags, setTags]);

  const handleAddTag = () => {
    if (tags.length < 6) {
      setTags([...tags, { name: "", value: "" }]);
    } else {
      alert("Maximum of 6 tags reached.");
    }
  };

  return (
    <div className={styles.inputBoxesContainer}>
      {tags.map((tag, index) => (
        <div key={index} className={styles.inputBox}>
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
          <button
            className={styles.deleteButton}
            onClick={() => handleDeleteTag(index)}
          >
            X
          </button>
        </div>
      ))}
      {tags.length < 6 && (
        <button className={styles.addButton} onClick={handleAddTag}>
          Add Tag
        </button>
      )}
    </div>
  );
};

export default InputBox;
