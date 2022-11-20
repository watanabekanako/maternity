import moment from "moment";


/**
 *
 * @param dateStr: YYYYMMDD形式の文字列
 * @return {string | null}
 */
export const getFirstOfMonth = (dateStr) => {
  if (!dateStr) {
    return null;
  }
  if (dateStr.length !== 8) {
    return null;
  }
  return moment(dateStr).startOf("month").format("YYYYMMDD");
}