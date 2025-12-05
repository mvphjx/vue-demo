<template>
  <div class="xml-json-test">
    <h1>XML & JSON 转换测试</h1>

    <div class="converter">
      <div class="section">
        <h2>XML 转 JSON</h2>
        <textarea v-model="xmlInput" placeholder="请输入 XML 数据"></textarea>
        <button @click="convertXmlToJson">转换为 JSON</button>
        <div class="result">
          <h3>转换结果:</h3>
          <pre>{{ jsonOutput }}</pre>
        </div>
      </div>

      <div class="section">
        <h2>JSON 转 XML</h2>
        <textarea v-model="jsonInput" placeholder='请输入 JSON 数据，例如: {"name": "张三", "age": 18}'></textarea>
        <button @click="convertJsonToXml">转换为 XML</button>
        <div class="result">
          <h3>转换结果:</h3>
          <pre>{{ xmlOutput }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XmlAndJson from '@/utils/JsonAndXml.js'

export default {
  name: 'XmlJsonTest',
  data() {
    return {
      xmlInput: `<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>`,
      jsonInput: `{
  "note": {
    "to": "Tove",
    "from": "Jani",
    "heading": "Reminder",
    "body": "Don't forget me this weekend!"
  }
}`,
      jsonOutput: '',
      xmlOutput: ''
    }
  },
  methods: {
    convertXmlToJson() {
      try {
        // 确保输入不为空
        if (!this.xmlInput.trim()) {
          this.jsonOutput = '请输入有效的 XML 数据';
          return;
        }

        const result = XmlAndJson.ToJson(this.xmlInput);
        this.jsonOutput = JSON.stringify(result, null, 2);
      } catch (error) {
        this.jsonOutput = '转换错误: ' + error.message;
        console.error('XML to JSON 转换错误:', error);
      }
    },
    convertJsonToXml() {
      try {
        // 确保输入不为空
        if (!this.jsonInput.trim()) {
          this.xmlOutput = '请输入有效的 JSON 数据';
          return;
        }

        const parsedJson = JSON.parse(this.jsonInput);
        this.xmlOutput = XmlAndJson.ToXml(parsedJson);
      } catch (error) {
        this.xmlOutput = '转换错误: ' + error.message;
        console.error('JSON to XML 转换错误:', error);
      }
    }
  }
}
</script>

<style scoped>
.xml-json-test {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.converter {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.section {
  flex: 1;
  min-width: 300px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
}

.section h2 {
  margin-top: 0;
  color: #333;
}

textarea {
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: monospace;
  resize: vertical;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;
}

button:hover {
  background-color: #359c6d;
}

.result {
  border-top: 1px solid #eee;
  padding-top: 15px;
}

.result pre {
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 200px;
  overflow-y: auto;
}
</style>
