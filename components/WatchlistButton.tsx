"use client";

import { useState } from "react";
import { Button } from "./ui/button";

interface WatchlistButtonProps {
  symbol: string;
  company: string;
  isInWatchlist: boolean;
}

const WatchlistButton = ({
  symbol,
  company,
  isInWatchlist,
}: WatchlistButtonProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addLabel = isSubmitting ? "Adding to watchlist..." : "Add to watchlist";
  const removeLabel = isSubmitting
    ? "Removing from watchlist..."
    : "Remove from watchlist";

  return (
    <Button
      disabled={isSubmitting}
      className="yellow-btn w-full capitalize"
    >
      {isInWatchlist ? removeLabel : addLabel}
    </Button>
  );
};

export default WatchlistButton;
