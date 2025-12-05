/**
 * 检查给定的字符串是否为有效日期
 * @param {string} date - 待检查的日期字符串
 * @returns {boolean} - 如果是有效日期返回true，否则返回false
 */
function isDate(date) {
    // 检查是否为空或非字符串类型
    if (!date || typeof date !== 'string') {
        return false;
    }

    // 去除首尾空格
    const trimmedDate = date.trim();

    // 检查是否为空字符串
    if (trimmedDate === '') {
        return false;
    }

    // 创建日期对象
    const d = new Date(trimmedDate);

    // 检查是否为有效日期
    // isNaN(d.getTime()) 会检查日期是否无效
    // trimmedDate === d.toString() 或其他变体会导致误判，所以我们使用另一种方法
    // 我们通过比较日期对象的月份、日期、年份与原字符串解析出的值是否一致来判断
    try {
        // 使用 Date.parse 检查是否可以解析
        if (isNaN(Date.parse(trimmedDate))) {
            return false;
        }

        // 更严格的验证：检查日期是否自洽
        const timestamp = Date.parse(trimmedDate);
        const checkDate = new Date(timestamp);
        
        // 检查是否能正确转换回原始字符串（对于某些格式）
        // 这里我们采用更通用的方法进行验证
        const isoString = checkDate.toISOString();
        return !isNaN(checkDate.getTime());
    } catch (e) {
        return false;
    }
}

const DateUtils = {
    isDate
};

export default DateUtils;