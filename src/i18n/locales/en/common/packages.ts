export const packages = {
  sections: {
    topRated: "Top rated near you",
    endingSoon: "Ending soon",
    newArrivals: "New arrivals",
    nearYou: "Near you",
    bestValue: "Best value",
  },
  actions: {
    seeAll: "See all",
  },
  empty: {
    title: "No Packages Found",
    description: "No packages available at the moment. Check back later for new offerings!",
    withCategory: "We couldn't find any packages in the \"{{category}}\" category. Try selecting a different category.",
  },
  filters: {
    title: "Filters",
    apply: "Apply Filters",
    reset: "Reset",
    sort: {
      label: "Sort by",
      options: {
        recommended: "Recommended",
        priceAsc: "Price: Low to High",
        priceDesc: "Price: High to Low",
        endingSoon: "Ending Soon",
        distance: "Distance",
      },
    },
  },
  card: {
    price: "Price",
    save: "Save {{amount}} TL",
    savePercent: "Save {{percent}}%",
    quantity: {
      one: "{{count}} left",
      other: "{{count}} left",
    },
  },
} as const; 