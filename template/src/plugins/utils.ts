import {differenceInDays, differenceInHours, differenceInMinutes, formatDistanceToNow} from 'date-fns';

const formatMoney = (value: number | undefined) => {
    return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(value || 0);
}
export const PRODUCT_RESPONSIVE_CLASS = {
    five: 'col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2',
    four: 'col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3',
    three: 'col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4',
    two: 'col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6',
    one: 'col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12',
}
const getTimeAgo = (date: Date | undefined) => {
    const now = new Date();
    const minutesDiff = differenceInMinutes(now, date || new Date());
    const hoursDiff = differenceInHours(now, date || new Date());
    const daysDiff = differenceInDays(now, date || new Date());

    if (minutesDiff < 1) {
        return 'Vừa xong';
    } else if (minutesDiff < 60) {
        return `${minutesDiff} phút trước`;
    } else if (hoursDiff < 24) {
        return `${hoursDiff} giờ trước`;
    } else if (daysDiff < 7) {
        return `${daysDiff} ngày trước`;
    } else {
        return formatDistanceToNow(date || new Date(), {addSuffix: true});
    }
}
export {formatMoney};
export {getTimeAgo};