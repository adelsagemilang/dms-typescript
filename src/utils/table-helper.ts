export function KPIFetcher(data: any) {
  if (data.hasOwnProperty('_id')) delete data._id;

  const dataList = Object.entries(data);
  const items: any = [];

  for (const [key, value] of dataList) {
    items.push(KPIFetcherLevel2(value, key));
  }

  return items;
}

function KPIFetcherLevel2(data: any, title: string) {
  const item: any = [];
  const dataListItem = Object.entries(data);

  item.title = title;
  for (const [keyItem, valueItem] of dataListItem) {
    item[keyItem] = valueItem;
  }

  return item;
}
