import { CURRENCY_SYMBOL } from "../common/constant";

export const toMoneyString = function(num) { return (Math.round(parseFloat(num) * 100) / 100).toFixed(2).toString() + CURRENCY_SYMBOL; }
export const toMoney = function(num) { return (Math.round(parseFloat(num) * 100) / 100).toFixed(2)}