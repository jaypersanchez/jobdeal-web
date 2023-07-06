import { Rating, StickerStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function StarRating({ value }: { value: number }) {
  return (
    <Rating
      style={{ maxWidth: 120 }}
      itemStyles={{
        itemShapes: StickerStar,
        activeFillColor: "#43DF9B",
        inactiveFillColor: "#bbb",
      }}
      value={value}
      readOnly
    />
  );
}
