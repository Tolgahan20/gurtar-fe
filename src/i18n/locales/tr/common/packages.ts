export const packages = {
  sections: {
    topRated: "Yakınınızdaki en iyiler",
    endingSoon: "Yakında bitecek",
    newArrivals: "Yeni eklenenler",
    nearYou: "Yakınınızda",
    bestValue: "En iyi fırsatlar",
  },
  actions: {
    seeAll: "Tümü",
  },
  empty: {
    title: "Paket Bulunamadı",
    description: "Şu anda mevcut paket bulunmuyor. Yeni teklifler için daha sonra tekrar kontrol edin!",
    withCategory: "\"{{category}}\" kategorisinde paket bulunamadı. Farklı bir kategori seçmeyi deneyin.",
  },
  filters: {
    title: "Filtreler",
    apply: "Filtreleri Uygula",
    reset: "Sıfırla",
    sort: {
      label: "Sırala",
      options: {
        recommended: "Önerilen",
        priceAsc: "Fiyat: Düşükten Yükseğe",
        priceDesc: "Fiyat: Yüksekten Düşüğe",
        endingSoon: "Yakında Bitecek",
        distance: "Mesafe",
      },
    },
  },
  card: {
    price: "Fiyat",
    save: "{{amount}} TL Kâr",
    savePercent: "%{{percent}} İndirim",
    quantity: {
      one: "{{count}} adet kaldı",
      other: "{{count}} adet kaldı",
    },
  },
} as const; 