import FeedsItem from "@/components/FeedsItem.jsx";
import { FeedItemInfo } from "@/types";

export default ({ itemsGroup }: { itemsGroup: Record<string, FeedItemInfo[]> }) => {
  return (
    <div>
      {Object.keys(itemsGroup).map((key) => {
        return (
          <div class="flex flex-col my-10">
            <h3 class="text-2xl font-bold mb-2">{key}</h3>
            {itemsGroup[key].map((item) => {
              return <FeedsItem item={item} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
