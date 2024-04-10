import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../components.module.css";

interface SearchBarProps {
  // @ts-ignore
  searchParams: ReturnType<typeof useSearchParams>;
  onGatewayChange: (gateway: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchParams,
  onGatewayChange,
}) => {
  const [selectedGateway, setSelectedGateway] = useState(
    "https://arweave.net/graphql",
  );
  const [customGateway, setCustomGateway] = useState("");
  const [savedGateways, setSavedGateways] = useState<string[]>([]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedGateways = localStorage.getItem("savedGateways");
    if (storedGateways) {
      setSavedGateways(JSON.parse(storedGateways));
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    router.push(`/?${params}`);
  }, [selectedGateway]);

  const handleGatewayChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const gateway = e.target.value;
    if (gateway === "custom") {
      setShowCustomInput(true);
    } else {
      try {
        setSelectedGateway(gateway);
        await onGatewayChange(gateway);
        setError("");
      } catch (error) {
        console.error("Error switching gateway:", error);
        setError(
          "The selected gateway doesn't work. Please switch to another gateway.",
        );
      }
      setShowCustomInput(false);
    }
  };

  const handleCustomGatewayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCustomGateway(e.target.value);
  };

  const handleSaveGateway = async () => {
    if (customGateway.trim() !== "") {
      const updatedGateways = [...savedGateways, customGateway];
      setSavedGateways(updatedGateways);
      localStorage.setItem("savedGateways", JSON.stringify(updatedGateways));
      try {
        setSelectedGateway(customGateway);
        await onGatewayChange(customGateway);
        setError("");
      } catch (error) {
        console.error("Error switching to custom gateway:", error);
        setError(
          "The custom gateway doesn't work. Please try a different gateway.",
        );
      }
      setCustomGateway("");
      setShowCustomInput(false);
    }
  };

  const handleDeleteGateway = (gateway: string) => {
    const updatedGateways = savedGateways.filter((g) => g !== gateway);
    setSavedGateways(updatedGateways);
    localStorage.setItem("savedGateways", JSON.stringify(updatedGateways));
    if (selectedGateway === gateway) {
      setSelectedGateway("https://arweave-search.goldsky.com/graphql");
      onGatewayChange("https://arweave-search.goldsky.com/graphql");
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.gatewaySelectorContainer}>
        <label htmlFor="gatewaySelect" className={styles.label}>
          Gateway
        </label>
        <div className={styles.selectContainer}>
          <select
            id="gatewaySelect"
            value={selectedGateway}
            onChange={handleGatewayChange}
            className={styles.select}
          >
            <option value="https://arweave.net/graphql">
              https://arweave.net/graphql
            </option>
            <option value="https://arweave-search.goldsky.com/graphql">
              https://arweave-search.goldsky.com/graphql
            </option>
            {savedGateways.map((gateway) => (
              <option key={gateway} value={gateway}>
                {gateway}
              </option>
            ))}
            <option value="custom">Enter custom gateway URL...</option>
          </select>
          {selectedGateway !== "custom" &&
            savedGateways.includes(selectedGateway) && (
              <button
                onClick={() => handleDeleteGateway(selectedGateway)}
                className={styles.deleteButton}
              >
                ✕
              </button>
            )}
        </div>
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {showCustomInput && (
        <div className={styles.customInputContainer}>
          <input
            type="text"
            value={customGateway}
            onChange={handleCustomGatewayChange}
            placeholder="Enter custom gateway URL"
            className={styles.customInput}
          />
          <button onClick={handleSaveGateway} className={styles.saveButton}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
