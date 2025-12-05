/*
处理Xml转换为Json
*parmas 一个Xml数据文件
*return  一个Json结构数据
*/
function ToJson(xml) {
    try {
        // 创建DOMParser解析XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "text/xml");

        // 检查是否解析出错
        const parseError = xmlDoc.getElementsByTagName("parsererror");
        if (parseError.length > 0) {
            throw new Error("XML解析错误: " + parseError[0].textContent);
        }

        // 将XML转换为JSON
        function xmlNodeToJson(node) {
            const obj = {};

            // 处理元素节点
            if (node.nodeType === Node.ELEMENT_NODE) {
                // 处理属性
                if (node.attributes && node.attributes.length > 0) {
                    obj._attributes = {};
                    for (let i = 0; i < node.attributes.length; i++) {
                        const attr = node.attributes[i];
                        obj._attributes[attr.name] = attr.value;
                    }
                }

                // 处理子节点
                const children = node.childNodes;
                let hasElementChildren = false;
                let textContent = "";

                for (let i = 0; i < children.length; i++) {
                    const child = children[i];

                    if (child.nodeType === Node.ELEMENT_NODE) {
                        hasElementChildren = true;
                        const childName = child.nodeName;
                        const childJson = xmlNodeToJson(child);

                        // 如果已经有同名子节点，转换为数组
                        if (obj[childName]) {
                            if (!Array.isArray(obj[childName])) {
                                obj[childName] = [obj[childName]];
                            }
                            obj[childName].push(childJson);
                        } else {
                            obj[childName] = childJson;
                        }
                    } else if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
                        textContent += child.textContent.trim();
                    }
                }

                // 如果没有元素子节点但有文本内容
                if (!hasElementChildren && textContent) {
                    obj._text = textContent;
                }

                return obj;
            }

            return null;
        }

        const root = xmlDoc.documentElement;
        const result = {};
        result[root.nodeName] = xmlNodeToJson(root);
        return result;

    } catch (error) {
        console.error('XML转JSON失败:', error);
        return null;
    }
}

/* 处理Json转换为Xml
*parmas  一个Json结构数据
*return  一个Xml数据文件
*/
function ToXml(yourjson) {
    try {
        function jsonToXml(obj, rootName = null) {
            let xml = '';

            // 如果obj是数组
            if (Array.isArray(obj)) {
                for (const item of obj) {
                    xml += jsonToXml(item, rootName);
                }
                return xml;
            }

            // 如果obj是对象
            if (typeof obj === 'object' && obj !== null) {
                // 获取对象的所有键
                const keys = Object.keys(obj);

                // 处理每个键
                for (const key of keys) {
                    const value = obj[key];

                    // 跳过特殊键
                    if (key === '_attributes' || key === '_text') {
                        continue;
                    }

                    // 处理数组
                    if (Array.isArray(value)) {
                        xml += jsonToXml(value, key);
                    } else if (typeof value === 'object' && value !== null) {
                        // 处理嵌套对象
                        const childXml = jsonToXml(value, key);
                        xml += `<${key}`;

                        // 添加属性
                        if (value._attributes) {
                            for (const [attrName, attrValue] of Object.entries(value._attributes)) {
                                xml += ` ${attrName}="${attrValue}"`;
                            }
                        }

                        if (childXml || (value._text !== undefined && value._text !== '')) {
                            xml += `>${childXml || ''}${value._text || ''}</${key}>`;
                        } else {
                            xml += ` />`;
                        }
                    } else {
                        // 处理简单值
                        xml += `<${key}>${value}</${key}>`;
                    }
                }

                return xml;
            }

            // 处理简单值
            if (rootName) {
                xml += `<${rootName}>${obj}</${rootName}>`;
            }

            return xml;
        }

        // 获取根元素名
        const rootName = Object.keys(yourjson)[0];
        const rootObj = yourjson[rootName];

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;

        // 构建根元素
        xml += `<${rootName}`;

        // 添加根元素属性
        if (rootObj._attributes) {
            for (const [attrName, attrValue] of Object.entries(rootObj._attributes)) {
                xml += ` ${attrName}="${attrValue}"`;
            }
        }

        xml += `>`;

        // 添加内容
        const content = jsonToXml(rootObj);
        xml += content;

        // 添加根元素文本内容
        if (rootObj._text) {
            xml += rootObj._text;
        }

        xml += `</${rootName}>`;

        return xml;

    } catch (error) {
        console.error('JSON转XML失败:', error);
        return null;
    }
}

const XmlAndJson = {
    ToJson,
    ToXml
}
export default XmlAndJson
