export default function getSikorCollections(lang: string) {
  const collectionMap: { [key: string]: string[] } = {
    sma: [
      "SMA_ADMIN_20211118",
      "SMA_BIBLE_20211118",
      "SMA_FACTA_20211118",
      "SMA_FICTI_20211118",
      "SMA_LAWS_20211118",
      "SMA_NEWS_20211118",
      "SMA_SCIENCE_20211118",
    ],
    sme: [
      "SME_ADMIN_20181106",
      "SME_ASSU_20181106",
      "SME_AVVIR_20181106",
      "SME_BIBLE_20181106",
      "SME_BLOGS_20181106",
      "SME_FACTA_20181106",
      "SME_FICTI_20181106",
      "SME_LAWS_20181106",
      "SME_MINAIGI_20181106",
      "SME_MUITALUS_20170319",
      "SME_NRK_20181106",
      "SME_SCIENCE_20181106",
    ],
    smj: [
      "SMJ_BIBLE_20211118",
      "SMJ_FICTI_20211118",
      "SMJ_NEWS_20211118",
      "SMJ_LAWS_20211118",
      "SMJ_ADMIN_20211118",
      "SMJ_SCIENCE_20211118",
      "SMJ_FACTA_20211118",
    ],
    sms: [
      "SMS_ADMIN_20211118",
      "SMS_BLOGS_20211118",
      "SMS_FACTA_20211118",
      "SMS_LAWS_20211118",
      "SMS_LITERATURE_20211118",
      "SMS_NEWS_20211118",
      "SMS_SCIENCE_20211118",
    ],
    smn: [
      "SMN_ADMIN_20211118",
      "SMN_BIBLE_20211118",
      "SMN_BLOGS_20211118",
      "SMN_FACTA_20211118",
      "SMN_FICTI_20211118",
      "SMN_NEWS_20211118",
      "SMN_SCIENCE_20211118",
      "SMN_WIKIPEDIA_20211118",
    ],
  };

  return collectionMap[lang] || [];
}
